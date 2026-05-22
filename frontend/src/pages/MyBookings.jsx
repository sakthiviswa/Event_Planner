import { useState, useEffect } from 'react'
import { bookingService } from '../services/bookingService'
import BookingTable from '../components/BookingTable'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookingService.getMyBookings()
      .then(r => setBookings(r.data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return
    try {
      await bookingService.cancel(id)
      setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: 'CANCELLED', paymentStatus: 'REFUNDED' } : b))
      toast.success('Booking cancelled. Refund initiated.')
    } catch {
      toast.error('Failed to cancel booking')
    }
  }

  return (
    <div>
      <h1 className="section-title">My Bookings</h1>
      {loading ? <Loader /> : <BookingTable bookings={bookings} onCancel={handleCancel} />}
    </div>
  )
}
