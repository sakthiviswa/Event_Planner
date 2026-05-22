export default function DashboardCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="glass" style={{
      padding: 24, transition: 'all 0.3s ease',
      borderLeft: `3px solid ${color}`
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{title}</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>{value}</p>
          {subtitle && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{subtitle}</p>}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${color}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: color
        }}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}
