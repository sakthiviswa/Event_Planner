import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiBell, FiLogOut, FiUser, FiMenu, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/auth')
  }

  // Use a high quality avatar image or generate initials
  const avatarUrl = user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: isMobile ? 0 : 260,
      right: 0,
      zIndex: 95,
      height: 80,
      background: 'rgba(22, 28, 40, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 16px' : '0 40px',
      transition: 'left 0.3s ease',
    }}>
      {/* Left side: mobile menu and brand */}
      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onMenuToggle}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0
            }}
          >
            <FiMenu size={24} />
          </button>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.png" alt="EventHub Logo" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} />
            <span className="display-font" style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>
              EventHub
            </span>
          </Link>
        </div>
      ) : (
        <div /> /* Spacer to align right items */
      )}

      {/* Right side items */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Search Icon */}
          <Link
            to="/events"
            style={{
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
          >
            <FiSearch size={18} />
          </Link>

          {/* Notifications Bell */}
          <Link
            to="/notifications"
            style={{
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
          >
            <FiBell size={18} />
            <span style={{
              position: 'absolute',
              top: 10,
              right: 11,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--secondary)' /* Coral red badge */
            }} />
          </Link>

          {/* User Profile Pill */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 24,
                padding: '5px 16px 5px 6px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {/* Avatar circle */}
              <img
                src={avatarUrl}
                alt={user.name}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid var(--primary)'
                }}
              />
              <span style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em'
              }}>
                {user.name?.toLowerCase()}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                background: 'rgba(22, 28, 40, 0.95)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '8px',
                minWidth: 180,
                backdropFilter: 'blur(24px)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 10,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: 13,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <FiUser size={14} color="var(--primary)" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 10,
                    color: 'var(--danger)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(224, 90, 71, 0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
