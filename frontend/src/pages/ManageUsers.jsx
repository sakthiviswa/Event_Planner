import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import Loader from '../components/Loader'
import { FiTrash2, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminService.getUsers()
      .then(r => setUsers(r.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      await adminService.deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
      toast.success('User deleted')
    } catch {
      toast.error('Failed to delete user')
    }
  }

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 className="section-title" style={{ marginBottom: 0 }}>Manage Users</h1>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{users.length} total users</span>
      </div>

      <input
        className="form-input"
        style={{ maxWidth: 320, marginBottom: 20 }}
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? <Loader /> : (
        <div className="table-wrapper glass" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'var(--gradient)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0
                      }}>
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    {u.role !== 'ADMIN' && (
                      <button onClick={() => handleDelete(u.id)} className="btn btn-danger btn-sm">
                        <FiTrash2 size={13} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">
              <FiUser size={48} />
              <h3>No users found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
