export default function Loader({ fullScreen = false, size = 40 }) {
  const spinner = (
    <div style={{
      width: size,
      height: size,
      border: `3px solid rgba(197, 168, 128, 0.2)`,
      borderTop: `3px solid var(--primary)`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  )

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--gradient-bg)', zIndex: 9999
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {spinner}
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Loading EventHub...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      {spinner}
    </div>
  )
}
