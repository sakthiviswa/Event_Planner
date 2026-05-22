import { useState, useEffect, useCallback } from 'react'
import { eventService } from '../services/eventService'
import api from '../api/axios'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [wishlist, setWishlist] = useState([])
  const { user } = useAuth()

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category) params.category = category
      const { data } = await eventService.getAll(params)
      setEvents(data)
    } catch (err) {
      toast.error(err.message || err.response?.data?.error || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }, [search, category])

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 300)
    return () => clearTimeout(timer)
  }, [fetchEvents])

  useEffect(() => {
    if (user) {
      api.get('/wishlist').then(r => setWishlist(r.data.map(e => e.id))).catch(() => {})
    }
  }, [user])

  const toggleWishlist = async (eventId) => {
    if (!user) return toast.error('Please login to save events')
    try {
      if (wishlist.includes(eventId)) {
        await api.delete(`/wishlist/${eventId}`)
        setWishlist(prev => prev.filter(id => id !== eventId))
        toast.success('Removed from wishlist')
      } else {
        await api.post(`/wishlist/${eventId}`)
        setWishlist(prev => [...prev, eventId])
        toast.success('Added to wishlist')
      }
    } catch {
      toast.error('Failed to update wishlist')
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">Upcoming Events</h1>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterPanel selected={category} onSelect={setCategory} />
      </div>

      {loading ? (
        <Loader />
      ) : events.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: 64 }}>🎭</p>
          <h3>No events found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
            {events.length} event{events.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid-3">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(event.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
