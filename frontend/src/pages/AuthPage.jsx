import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserLoginForm from '../components/auth/UserLoginForm'
import UserSignupForm from '../components/auth/UserSignupForm'
import AdminLoginForm from '../components/auth/AdminLoginForm'
import AdminSignupForm from '../components/auth/AdminSignupForm'
import { FiUser, FiUserPlus, FiShield } from 'react-icons/fi'

const TABS = [
  { id: 'login', label: 'Sign In', icon: FiUser },
  { id: 'signup', label: 'Sign Up', icon: FiUserPlus },
  { id: 'admin', label: 'Admin Login', icon: FiShield },
  { id: 'admin-signup', label: 'Admin Sign Up', icon: FiShield },
]

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')
  const { user } = useAuth()

  if (user) return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/events'} replace />

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden'
    }}>
      {/* Background blobs in matching warm hues */}
      <div style={{
        position: 'fixed', top: '-10%', left: '-10%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(197, 168, 128, 0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', bottom: '-15%', right: '-10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(211, 85, 67, 0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            <img src="/logo.png" alt="EventHub Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          <h1 className="display-font" style={{ 
            fontSize: 30, 
            fontWeight: 600, 
            color: 'var(--primary)', 
            letterSpacing: '0.04em',
            margin: 0
          }}>
            EventHub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4, letterSpacing: '0.02em' }}>
            Discover & Book Amazing Events
          </p>
        </div>

        <div className="glass-strong animate-fade-in" style={{ 
          padding: 36, 
          borderRadius: 24,
          border: '1px solid var(--border)' 
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', 
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12, 
            padding: 4, 
            marginBottom: 28, 
            gap: 4
          }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 6, 
                  padding: '10px 4px', 
                  borderRadius: 9, 
                  border: 'none',
                  cursor: 'pointer', 
                  fontSize: 12, 
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  background: activeTab === id ? 'var(--gradient)' : 'transparent',
                  color: activeTab === id ? 'white' : 'var(--text-muted)',
                  boxShadow: activeTab === id ? '0 4px 15px rgba(211, 85, 67, 0.25)' : 'none'
                }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {/* Form title */}
          <div style={{ marginBottom: 24 }}>
            <h2 className="display-font" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
              {activeTab === 'login' && 'Welcome Back'}
              {activeTab === 'signup' && 'Create Account'}
              {activeTab === 'admin' && 'Admin Portal'}
              {activeTab === 'admin-signup' && 'Register Admin'}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              {activeTab === 'login' && 'Sign in to your EventHub account'}
              {activeTab === 'signup' && 'Join thousands of event enthusiasts'}
              {activeTab === 'admin' && 'Manage events, users, and bookings'}
              {activeTab === 'admin-signup' && 'Create a new administrative account'}
            </p>
          </div>

          {/* Animated form */}
          <div key={activeTab} className="fade-in">
            {activeTab === 'login' && <UserLoginForm />}
            {activeTab === 'signup' && <UserSignupForm />}
            {activeTab === 'admin' && <AdminLoginForm />}
            {activeTab === 'admin-signup' && <AdminSignupForm />}
          </div>

          {activeTab === 'login' && (
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <button onClick={() => setActiveTab('signup')}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, outline: 'none' }}>
                Sign up
              </button>
            </p>
          )}
          {activeTab === 'signup' && (
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <button onClick={() => setActiveTab('login')}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, outline: 'none' }}>
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
