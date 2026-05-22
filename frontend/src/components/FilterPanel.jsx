const CATEGORIES = ['All', 'Technology', 'Music', 'Business', 'Arts', 'Sports', 'Food', 'Health', 'Education', 'Networking', 'Film', 'Fashion', 'Other']

export default function FilterPanel({ selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat === 'All' ? '' : cat)}
          style={{
            padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.2s',
            background: (selected === cat || (!selected && cat === 'All'))
              ? 'var(--gradient)' : 'var(--bg-card)',
            color: (selected === cat || (!selected && cat === 'All'))
              ? 'white' : 'var(--text-secondary)',
            border: '1px solid var(--border)'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
