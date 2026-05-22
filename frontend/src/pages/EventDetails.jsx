import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { eventService } from '../services/eventService'
import { bookingService } from '../services/bookingService'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiStar, FiMinus, FiPlus, FiShare2 } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [event, setEvent] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [ticketCount, setTicketCount] = useState(1)
  const [booking, setBooking] = useState(false)
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    Promise.all([
      eventService.getById(id),
      api.get(`/reviews/event/${id}`)
    ]).then(([evRes, revRes]) => {
      setEvent(evRes.data)
      setReviews(revRes.data)
    }).catch(() => toast.error('Failed to load event'))
      .finally(() => setLoading(false))
  }, [id])

  const handleBook = async () => {
    if (!user) return navigate('/auth')
    setBooking(true)
    try {
      await bookingService.book({ eventId: Number(id), ticketCount })
      toast.success('Booking confirmed! 🎉')
      navigate('/my-bookings')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Booking failed')
    } finally {
      setBooking(false)
    }
  }

  const handleShareEvent = async () => {
    const shareUrl = `${window.location.origin}/events/${event.id}`
    const shareData = {
      title: event.title,
      text: `Check out this event: ${event.title} on ${event.date} at ${event.location}.`,
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        // swallow user cancellation
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Event link copied to clipboard')
    } else {
      window.prompt('Copy this event link', shareUrl)
    }
  }

  const handleReview = async e => {
    e.preventDefault()
    if (!user) return navigate('/auth')
    setSubmittingReview(true)
    try {
      const { data } = await api.post('/reviews', { eventId: Number(id), ...review })
      setReviews(prev => [data, ...prev])
      setReview({ rating: 5, comment: '' })
      toast.success('Review submitted!')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) return <Loader />
  if (!event) return <div className="empty-state"><h3>Event not found</h3></div>

  const total = (event.price * ticketCount).toFixed(2)
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null

  return (
    <div className="fade-in">
      {/* Banner */}
      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 320, marginBottom: 28, position: 'relative', border: '1px solid var(--border)' }}>
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
          <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            {event.category}
          </span>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: 'white', marginTop: 8 }}>{event.title}</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Info */}
          <div className="glass" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Event Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: FiCalendar, label: 'Date', value: event.date },
                { icon: FiClock, label: 'Time', value: event.time || 'TBA' },
                { icon: FiMapPin, label: 'Location', value: event.location },
                { icon: FiUsers, label: 'Available Seats', value: `${event.availableSeats} / ${event.totalSeats}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(197, 168, 128, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {event.description && (
              <>
                <div className="divider" />
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 14 }}>{event.description}</p>
              </>
            )}
          </div>

          {/* Reviews */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Reviews</h2>
              {avgRating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiStar size={16} color="#f59e0b" fill="#f59e0b" />
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{avgRating}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>({reviews.length})</span>
                </div>
              )}
            </div>

            {user && (
              <form onSubmit={handleReview} style={{ marginBottom: 24, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setReview(r => ({ ...r, rating: n }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: n <= review.rating ? '#f59e0b' : 'var(--text-muted)' }}>
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Share your experience..."
                  value={review.comment}
                  onChange={e => setReview(r => ({ ...r, comment: e.target.value }))}
                  style={{ resize: 'vertical', marginBottom: 10 }}
                />
                <button type="submit" className="btn btn-primary btn-sm" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}

            {reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No reviews yet. Be the first!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {reviews.map(r => (
                  <div key={r.id} style={{ padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{r.userName}</span>
                      <span style={{ color: '#f59e0b', fontSize: 13 }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Booking card */}
        <div className="glass" style={{ padding: 24, position: 'sticky', top: 88 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Price per ticket</p>
              <p style={{ fontSize: 32, fontWeight: 800, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {event.price === 0 ? 'Free' : `₹${event.price}`}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleShareEvent}
              style={{ whiteSpace: 'nowrap' }}
            >
              <FiShare2 size={16} style={{ marginRight: 6 }} /> Share Event
            </button>
          </div>

          <div className="divider" />

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>Number of tickets</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => setTicketCount(t => Math.max(1, t - 1))}
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FiMinus size={16} />
              </button>
              <span style={{ fontSize: 20, fontWeight: 700, minWidth: 30, textAlign: 'center' }}>{ticketCount}</span>
              <button
                onClick={() => setTicketCount(t => Math.min(event.availableSeats, t + 1))}
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          <div style={{ padding: '14px 16px', background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6 }}>
              <span>Subtotal</span><span>₹{event.price} × {ticketCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="btn btn-primary btn-lg"
            disabled={booking || event.availableSeats === 0}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {booking ? 'Booking...' : event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
            {event.availableSeats} seats remaining
          </p>
        </div>
      </div>
    </div>
  )
}
