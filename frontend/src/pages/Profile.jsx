import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'
import { FiUser, FiMail, FiEdit2, FiSave } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, login } = useAuth()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', profileImage: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/users/profile')
      .then(r => {
        setProfile(r.data)
        setForm({ name: r.data.name, profileImage: r.data.profileImage || '' })
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data } = await api.put('/users/profile', form)
      setProfile(data)
      login({ ...user, name: data.name }, localStorage.getItem('token'))
      setEditing(false)
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 className="section-title">My Profile</h1>
      <div className="glass" style={{ padding: 32 }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 800, color: 'white',
            boxShadow: '0 8px 24px rgba(211, 85, 67, 0.4)'
          }}>
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>{profile?.name}</h2>
            <span className={`badge ${profile?.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'}`}>
              {profile?.role}
            </span>
          </div>
        </div>

        <div className="divider" />

        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Profile Image URL</label>
              <input className="form-input" value={form.profileImage} onChange={e => setForm({ ...form, profileImage: e.target.value })} placeholder="https://..." />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button onClick={() => setEditing(false)} className="btn btn-outline">Cancel</button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            {[
              { icon: FiUser, label: 'Full Name', value: profile?.name },
              { icon: FiMail, label: 'Email', value: profile?.email },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <Icon size={18} color="var(--primary)" />
                <div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</p>
                  <p style={{ fontSize: 15, fontWeight: 500 }}>{value}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 6, padding: '14px 0' }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Member since</p>
              <p style={{ fontSize: 15, fontWeight: 500 }}>{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}</p>
            </div>
            <button onClick={() => setEditing(true)} className="btn btn-primary" style={{ marginTop: 16 }}>
              <FiEdit2 size={15} /> Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
