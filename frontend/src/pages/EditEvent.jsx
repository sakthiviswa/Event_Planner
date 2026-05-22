import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eventService } from '../services/eventService'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

const CATEGORIES = ['Technology', 'Music', 'Business', 'Arts', 'Sports', 'Food', 'Health', 'Education', 'Networking', 'Film', 'Fashion', 'Other']

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    eventService.getById(id)
      .then(r => setForm({
        ...r.data,
        date: r.data.date || '',
        time: r.data.time || '',
        price: r.data.price || 0,
        totalSeats: r.data.totalSeats || 0
      }))
      .catch(() => toast.error('Failed to load event'))
      .finally(() => setLoading(false))
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      await eventService.update(id, form)
      toast.success('Event updated!')
      navigate('/admin/events')
    } catch {
      toast.error('Failed to update event')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 className="section-title">Edit Event</h1>
      <div className="glass" style={{ padding: 32 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="grid-2">
            <div className="form-group">
              <label>Event Title *</label>
              <input className="form-input" value={form.title || ''} onChange={e => set('title', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-input" value={form.category || ''} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input" rows={4} value={form.description || ''} onChange={e => set('description', e.target.value)} style={{ resize: 'vertical' }} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Date</label>
              <input className="form-input" type="date" value={form.date || ''} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input className="form-input" type="time" value={form.time || ''} onChange={e => set('time', e.target.value)} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Location</label>
              <input className="form-input" value={form.location || ''} onChange={e => set('location', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Organizer</label>
              <input className="form-input" value={form.organizer || ''} onChange={e => set('organizer', e.target.value)} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Price (₹)</label>
              <input className="form-input" type="number" min="0" value={form.price || 0} onChange={e => set('price', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select className="form-input" value={form.status || 'ACTIVE'} onChange={e => set('status', e.target.value)}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input className="form-input" value={form.imageUrl || ''} onChange={e => set('imageUrl', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate('/admin/events')} className="btn btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
