import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminLoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authService.adminLogin(form)
      login({ id: data.id, name: data.name, email: data.email, role: data.role }, data.token)
      toast.success(`Welcome, Admin ${data.name}!`)
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
        background: 'rgba(197, 168, 128, 0.08)', borderRadius: 10, border: '1px solid var(--border)'
      }}>
        <FiShield size={18} color="var(--primary)" />
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Admin access only. Unauthorized access is prohibited.</span>
      </div>
      <div className="form-group">
        <label>Admin Email</label>
        <div style={{ position: 'relative' }}>
          <FiMail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input
            className="form-input"
            style={{ paddingLeft: 42 }}
            type="email"
            placeholder="admin@eventhub.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Password</label>
        <div style={{ position: 'relative' }}>
          <FiLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input
            className="form-input"
            style={{ paddingLeft: 42, paddingRight: 42 }}
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="button" onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: 4 }}>
        {loading ? 'Authenticating...' : 'Admin Sign In'}
      </button>
    </form>
  )
}
