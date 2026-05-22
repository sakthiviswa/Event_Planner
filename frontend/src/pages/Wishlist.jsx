import { useState, useEffect } from 'react'
import api from '../api/axios'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/wishlist')
      .then(r => setEvents(r.data))
      .catch(() => toast.error('Failed to load wishlist'))
      .finally(() => setLoading(false))
  }, [])

  const removeFromWishlist = async (eventId) => {
    try {
      await api.delete(`/wishlist/${eventId}`)
      setEvents(prev => prev.filter(e => e.id !== eventId))
      toast.success('Removed from wishlist')
    } catch {
      toast.error('Failed to remove')
    }
  }

  return (
    <div>
      <h1 className="section-title">My Wishlist</h1>
      {loading ? <Loader /> : events.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: 64 }}>❤️</p>
          <h3>Your wishlist is empty</h3>
          <p>Save events you're interested in</p>
        </div>
      ) : (
        <div className="grid-3">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onWishlist={removeFromWishlist}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}
