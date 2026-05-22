import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiCalendar, FiUsers, FiStar, FiArrowRight } from 'react-icons/fi'

export default function Home() {
  const { user } = useAuth()

  const stats = [
    { icon: FiCalendar, value: '500+', label: 'Events' },
    { icon: FiUsers, value: '10K+', label: 'Users' },
    { icon: FiStar, value: '4.8', label: 'Rating' },
  ]

  const categoryHighlights = [
    {
      title: 'Classical Performances',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Cultural Fairs',
      image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Theater Productions',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Music Gigs',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Conferences',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Running Events',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80'
    },
  ]

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 32, 
      padding: '16px 24px 40px 24px', 
      maxWidth: 1280, 
      margin: '0 auto' 
    }} className="fade-in">
      
      {/* Hero Banner Container */}
      <div style={{
        position: 'relative',
        height: 480,
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border)'
      }}>
        {/* Background image montage panels */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>

        {/* Translucent overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(29, 23, 22, 0.45) 0%, rgba(18, 22, 32, 0.85) 100%)',
          zIndex: 1
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16
        }}>
          <h1 className="editorial-font" style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '0.12em',
            color: '#eed4b7',
            textTransform: 'uppercase',
            margin: 0
          }}>
            Experience the Exceptional
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: 'var(--text-secondary)',
            margin: '0 0 12px 0',
            fontWeight: 300,
            letterSpacing: '0.04em'
          }}>
            Discover & Book Amazing Events
          </p>

          <Link to={user ? '/events' : '/auth'} className="btn btn-primary" style={{
            padding: '14px 36px',
            borderRadius: 30,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 20px rgba(211, 85, 67, 0.3)',
            textDecoration: 'none',
            color: 'white',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Browse Events <FiArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Category Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="grid-6" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 16
        }}>
          {categoryHighlights.map((cat, idx) => (
            <Link key={idx} to={user ? `/events?category=${encodeURIComponent(cat.title.split(' ')[0])}` : '/auth'} style={{ textDecoration: 'none' }}>
              <div className="glass glow-card" style={{
                padding: 10,
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{
                  height: 110,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <p style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  margin: '0 2px 2px 2px',
                  textAlign: 'left',
                  letterSpacing: '0.02em'
                }}>
                  {cat.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="glass" style={{
        padding: '20px 40px',
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {stats.map(({ icon: Icon, value, label }, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <Icon size={20} color="var(--primary)" />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '-0.02em'
              }}>
                {value}
              </span>
              <span style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}>
                {label}
              </span>
            </div>
          </div>
        ))}

        {/* Decorative Sparkle Accent */}
        <div style={{
          position: 'absolute',
          right: 28,
          color: 'var(--primary)',
          opacity: 0.8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          {/* Custom SVG Star matching mockup */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
