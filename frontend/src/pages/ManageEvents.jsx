import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { eventService } from '../services/eventService'
import Loader from '../components/Loader'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ManageEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    eventService.getAll()
      .then(r => setEvents(r.data))
      .catch(() => toast.error('Failed to load events'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    try {
      await eventService.delete(id)
      setEvents(prev => prev.filter(e => e.id !== id))
      toast.success('Event deleted')
    } catch {
      toast.error('Failed to delete event')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 className="section-title" style={{ marginBottom: 0 }}>Manage Events</h1>
        <Link to="/admin/create-event" className="btn btn-primary btn-sm">
          <FiPlus size={15} /> New Event
        </Link>
      </div>

      {loading ? <Loader /> : (
        <div className="table-wrapper glass" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Date</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.location}</div>
                  </td>
                  <td><span className="badge badge-secondary">{e.category}</span></td>
                  <td>{e.date}</td>
                  <td>₹{e.price}</td>
                  <td>{e.availableSeats}/{e.totalSeats}</td>
                  <td>
                    <span className={`badge ${e.status === 'ACTIVE' ? 'badge-success' : e.status === 'CANCELLED' ? 'badge-danger' : 'badge-warning'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link to={`/admin/edit-event/${e.id}`} className="btn btn-outline btn-sm">
                        <FiEdit2 size={13} /> Edit
                      </Link>
                      <button onClick={() => handleDelete(e.id)} className="btn btn-danger btn-sm">
                        <FiTrash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && (
            <div className="empty-state">
              <p style={{ fontSize: 48 }}>📅</p>
              <h3>No events yet</h3>
              <Link to="/admin/create-event" className="btn btn-primary">Create First Event</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
