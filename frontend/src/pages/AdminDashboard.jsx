import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import DashboardCard from '../components/DashboardCard'
import Loader from '../components/Loader'
import { FiUsers, FiCalendar, FiBookmark, FiDollarSign, FiActivity, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getAnalytics()
      .then(r => setAnalytics(r.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const cards = [
    { title: 'Total Users', value: analytics?.totalUsers ?? 0, icon: FiUsers, color: '#c5a880', subtitle: 'Registered accounts' },
    { title: 'Total Events', value: analytics?.totalEvents ?? 0, icon: FiCalendar, color: '#ac8d63', subtitle: 'All events' },
    { title: 'Total Bookings', value: analytics?.totalBookings ?? 0, icon: FiBookmark, color: '#d35543', subtitle: 'All time' },
    { title: 'Revenue', value: `₹${analytics?.totalRevenue ?? 0}`, icon: FiDollarSign, color: '#10b981', subtitle: 'Total earnings' },
    { title: 'Active Events', value: analytics?.activeEvents ?? 0, icon: FiActivity, color: '#e28e46', subtitle: 'Currently live' },
    { title: 'Confirmed Bookings', value: analytics?.confirmedBookings ?? 0, icon: FiCheckCircle, color: '#3a628a', subtitle: 'Active bookings' },
  ]

  return (
    <div>
      <h1 className="section-title">Admin Dashboard</h1>
      <div className="grid-3" style={{ marginBottom: 32 }}>
        {cards.map(card => <DashboardCard key={card.title} {...card} />)}
      </div>

      <div className="glass" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Quick Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 16, background: 'rgba(197, 168, 128, 0.08)', borderRadius: 12 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Booking Rate</p>
            <p style={{ fontSize: 20, fontWeight: 700 }}>
              {analytics?.totalBookings && analytics?.totalEvents
                ? ((analytics.confirmedBookings / analytics.totalBookings) * 100).toFixed(1) + '%'
                : '0%'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Confirmed vs total</p>
          </div>
          <div style={{ padding: 16, background: 'rgba(16,185,129,0.08)', borderRadius: 12 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Avg Revenue/Booking</p>
            <p style={{ fontSize: 20, fontWeight: 700 }}>
              {analytics?.totalBookings > 0
                ? `₹${(analytics.totalRevenue / analytics.totalBookings).toFixed(0)}`
                : '₹0'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Per booking average</p>
          </div>
        </div>
      </div>
    </div>
  )
}
