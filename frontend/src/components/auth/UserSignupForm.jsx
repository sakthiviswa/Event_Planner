import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function UserSignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirm) return toast.error('Passwords do not match')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    try {
      const { data } = await authService.register({ name: form.name, email: form.email, password: form.password })
      login({ id: data.id, name: data.name, email: data.email, role: data.role }, data.token)
      toast.success(`Welcome to EventHub, ${data.name}!`)
      navigate('/events')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="form-group">
        <label>Full Name</label>
        <div style={{ position: 'relative' }}>
          <FiUser style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input className="form-input" style={{ paddingLeft: 42 }} type="text" placeholder="John Doe"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <div style={{ position: 'relative' }}>
          <FiMail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input className="form-input" style={{ paddingLeft: 42 }} type="email" placeholder="you@example.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
      </div>

      <div className="form-group">
        <label>Password</label>
        <div style={{ position: 'relative' }}>
          <FiLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input className="form-input" style={{ paddingLeft: 42, paddingRight: 42 }}
            type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button type="button" onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <div style={{ position: 'relative' }}>
          <FiLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input className="form-input" style={{ paddingLeft: 42 }} type="password" placeholder="Repeat password"
            value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: 4 }}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}
