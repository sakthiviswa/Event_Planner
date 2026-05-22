import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import MyBookings from './pages/MyBookings'
import Wishlist from './pages/Wishlist'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import ManageUsers from './pages/ManageUsers'
import ManageBookings from './pages/ManageBookings'
import ManageEvents from './pages/ManageEvents'
import Analytics from './pages/Analytics'

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="page-layout">
      <Navbar onMenuToggle={() => setSidebarOpen(o => !o)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content" style={{ paddingTop: 88 }}>
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(15,15,26,0.95)',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              fontSize: '14px'
            }
          }}
        />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />

          {/* User routes */}
          <Route path="/home" element={<ProtectedRoute><AppLayout><Home /></AppLayout></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><AppLayout><Events /></AppLayout></ProtectedRoute>} />
          <Route path="/events/:id" element={<ProtectedRoute><AppLayout><EventDetails /></AppLayout></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><AppLayout><MyBookings /></AppLayout></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><AppLayout><Wishlist /></AppLayout></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><AppLayout><Notifications /></AppLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AppLayout><AdminDashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/create-event" element={<ProtectedRoute adminOnly><AppLayout><CreateEvent /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/edit-event/:id" element={<ProtectedRoute adminOnly><AppLayout><EditEvent /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute adminOnly><AppLayout><ManageEvents /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><AppLayout><ManageUsers /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AppLayout><ManageBookings /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute adminOnly><AppLayout><Analytics /></AppLayout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
