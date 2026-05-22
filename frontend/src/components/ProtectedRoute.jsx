import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './Loader'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader fullScreen />
  if (!user) return <Navigate to="/auth" replace />
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/events" replace />

  return children
}
