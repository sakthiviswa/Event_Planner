import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eventService } from '../services/eventService'
import toast from 'react-hot-toast'

const CATEGORIES = ['Technology', 'Music', 'Business', 'Arts', 'Sports', 'Food', 'Health', 'Education', 'Networking', 'Film', 'Fashion', 'Other']

export default function CreateEvent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', category: 'Technology',
    location: '', date: '', time: '', organizer: '',
    price: '', totalSeats: '', imageUrl: ''
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await eventService.create({
        ...form,
        price: parseFloat(form.price) || 0,
        totalSeats: parseInt(form.totalSeats) || 0
      })
      toast.success('Event created successfully!')
      navigate('/admin/events')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { marginBottom: 0 }

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 className="section-title">Create New Event</h1>
      <div className="glass" style={{ padding: 32 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="grid-2">
            <div className="form-group">
              <label>Event Title *</label>
              <input className="form-input" style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Amazing Tech Summit" required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-input" style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input" rows={4} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe your event..." style={{ resize: 'vertical' }} />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Date *</label>
              <input className="form-input" style={inputStyle} type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input className="form-input" style={inputStyle} type="time" value={form.time} onChange={e => set('time', e.target.value)} />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Location</label>
              <input className="form-input" style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Mumbai Convention Center" />
            </div>
            <div className="form-group">
              <label>Organizer</label>
              <input className="form-input" style={inputStyle} value={form.organizer} onChange={e => set('organizer', e.target.value)} placeholder="TechCorp India" />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Ticket Price (₹)</label>
              <input className="form-input" style={inputStyle} type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0 for free" />
            </div>
            <div className="form-group">
              <label>Total Seats *</label>
              <input className="form-input" style={inputStyle} type="number" min="1" value={form.totalSeats} onChange={e => set('totalSeats', e.target.value)} placeholder="500" required />
            </div>
          </div>

          <div className="form-group">
            <label>Event Image URL</label>
            <input className="form-input" value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://images.unsplash.com/..." />
          </div>

          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" style={{ height: 160, objectFit: 'cover', borderRadius: 10 }}
              onError={e => e.target.style.display = 'none'} />
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Event'}
            </button>
            <button type="button" onClick={() => navigate('/admin/events')} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
