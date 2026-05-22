import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FiHome, FiCalendar, FiSearch, FiTag, FiBell,
  FiUser, FiGrid, FiPlusCircle, FiUsers, FiList, FiBarChart2
} from 'react-icons/fi'

const userLinks = [
  { to: '/home', icon: FiHome, label: 'Home' },
  { to: '/events', icon: FiSearch, label: 'Explore' },
  { to: '/events?view=calendar', icon: FiCalendar, label: 'Calendar' },
  { to: '/my-bookings', icon: FiTag, label: 'My Tickets' },
  { to: '/notifications', icon: FiBell, label: 'Alerts' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
]

const adminLinks = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/create-event', icon: FiPlusCircle, label: 'Create Event' },
  { to: '/admin/events', icon: FiCalendar, label: 'Manage Events' },
  { to: '/admin/users', icon: FiUsers, label: 'Manage Users' },
  { to: '/admin/bookings', icon: FiList, label: 'Manage Bookings' },
  { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { isAdmin } = useAuth()
  const links = isAdmin() ? adminLinks : userLinks

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 98
          }}
          className="sidebar-overlay"
        />
      )}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 260,
        zIndex: 99,
        background: '#1d1716', /* Dark warm copper/charcoal tint */
        borderRight: '1px solid var(--border)',
        padding: '32px 18px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'transform 0.3s ease',
      }}
        className={isOpen ? 'sidebar-open' : ''}
      >
        {/* Brand Logo */}
        <div style={{ padding: '0 12px 20px 12px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="EventHub Logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
            <span className="display-font" style={{ 
              fontSize: 22, 
              fontWeight: 600, 
              color: 'var(--primary)', 
              letterSpacing: '0.04em',
            }}>
              EventHub
            </span>
          </Link>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ 
            fontSize: 10, 
            fontWeight: 700, 
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: 1.5, 
            padding: '0 12px', 
            marginBottom: 12 
          }}>
            {isAdmin() ? 'Admin Panel' : 'Navigation'}
          </p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {links.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 16px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.25s ease',
                  background: isActive ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  borderLeft: isActive ? '3px solid var(--secondary)' : '3px solid transparent',
                  paddingLeft: isActive ? 13 : 16 /* Adjust padding to account for border */
                })}
                onMouseEnter={e => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                  }
                }}
                onMouseLeave={e => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
