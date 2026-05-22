import { useState, useEffect } from 'react'
import api from '../api/axios'
import Loader from '../components/Loader'
import { FiBell, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/notifications')
      .then(r => setNotifications(r.data))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false))
  }, [])

  const markAllRead = async () => {
    try {
      await api.put('/notifications/read-all')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      toast.success('All marked as read')
    } catch {
      toast.error('Failed to update')
    }
  }

  const unread = notifications.filter(n => !n.read).length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 className="section-title" style={{ marginBottom: 0 }}>
          Notifications {unread > 0 && <span style={{ fontSize: 14, background: 'var(--primary)', color: 'white', borderRadius: 20, padding: '2px 8px', marginLeft: 8 }}>{unread}</span>}
        </h1>
        {unread > 0 && (
          <button onClick={markAllRead} className="btn btn-outline btn-sm">
            <FiCheck size={14} /> Mark all read
          </button>
        )}
      </div>

      {loading ? <Loader /> : notifications.length === 0 ? (
        <div className="empty-state">
          <FiBell size={64} />
          <h3>No notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notifications.map(n => (
            <div key={n.id} className="glass" style={{
              padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start',
              borderLeft: `3px solid ${n.read ? 'var(--border)' : 'var(--primary)'}`,
              opacity: n.read ? 0.7 : 1
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: n.read ? 'var(--bg-card)' : 'rgba(197, 168, 128, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: n.read ? 'var(--text-muted)' : 'var(--primary)'
              }}>
                <FiBell size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{n.title}</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.message}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.read && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
