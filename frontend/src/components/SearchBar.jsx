import { FiSearch, FiX } from 'react-icons/fi'

export default function SearchBar({ value, onChange, placeholder = 'Search events...' }) {
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <FiSearch style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: 'var(--text-muted)', pointerEvents: 'none'
      }} size={16} />
      <input
        className="form-input"
        style={{ paddingLeft: 42, paddingRight: value ? 40 : 16 }}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
          }}
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  )
}
