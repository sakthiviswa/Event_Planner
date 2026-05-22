import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiUsers, FiHeart } from 'react-icons/fi'

export default function EventCard({ event, onWishlist, isWishlisted }) {
  const categoryColors = {
    Technology: '#3a628a',
    Music: '#d35543',
    Business: '#c5a880',
    Arts: '#ac8d63',
    Sports: '#e28e46',
    Food: '#e05a47',
    Health: '#4b7a69',
    Education: '#857564',
    Networking: '#ac8d63',
    Film: '#a36d55',
    Fashion: '#ac8c7d',
    default: '#c5a880'
  }
  const color = categoryColors[event.category] || categoryColors.default

  return (
    <div className="glass" style={{
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      cursor: 'pointer',
      position: 'relative',
      borderRadius: 16,
      border: '1px solid var(--border)'
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(197, 168, 128, 0.15)'
        e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={event.imageUrl || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400`}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18, 22, 32, 0.8) 0%, transparent 60%)'
        }} />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: color, color: 'white',
          padding: '4px 12px', borderRadius: 20,
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}>{event.category}</span>
        
        {onWishlist && (
          <button
            onClick={e => { e.preventDefault(); onWishlist(event.id) }}
            style={{
              position: 'absolute', top: 10, right: 10,
              background: 'rgba(18, 22, 32, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%', width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: isWishlisted ? 'var(--secondary)' : 'white',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(18, 22, 32, 0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(18, 22, 32, 0.6)'}
          >
            <FiHeart size={16} fill={isWishlisted ? 'var(--secondary)' : 'none'} />
          </button>
        )}
        <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
          <span style={{
            background: 'rgba(18, 22, 32, 0.85)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--primary)',
            padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700,
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}>
            {event.price === 0 ? 'Free' : `₹${event.price}`}
          </span>
        </div>
      </div>

      <div style={{ padding: '18px' }}>
        <h3 className="display-font" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)', lineHeight: 1.3, height: 42, overflow: 'hidden' }}>
          {event.title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
            <FiCalendar size={13} color="var(--primary)" />
            <span>{event.date} {event.time && `• ${event.time}`}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
            <FiMapPin size={13} color="var(--primary)" />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
            <FiUsers size={13} color="var(--primary)" />
            <span>{event.availableSeats} seats left</span>
          </div>
        </div>
        <Link
          to={`/events/${event.id}`}
          style={{
            display: 'block', padding: '10px',
            background: 'var(--gradient)', color: 'white',
            borderRadius: 10, textAlign: 'center', textDecoration: 'none',
            fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(211, 85, 67, 0.2)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.9'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(211, 85, 67, 0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(211, 85, 67, 0.2)'
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
