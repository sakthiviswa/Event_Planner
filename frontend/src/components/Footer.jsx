export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '20px 24px',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 13,
      marginTop: 'auto'
    }}>
      <p>© 2024 <span className="gradient-text" style={{ fontWeight: 600 }}>EventHub</span> — Discover & Book Amazing Events</p>
    </footer>
  )
}
