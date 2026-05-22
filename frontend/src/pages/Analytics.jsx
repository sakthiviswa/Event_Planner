import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import DashboardCard from '../components/DashboardCard'
import Loader from '../components/Loader'
import { FiUsers, FiCalendar, FiBookmark, FiDollarSign, FiActivity, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getAnalytics()
      .then(r => setData(r.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const cards = [
    { title: 'Total Users', value: data?.totalUsers ?? 0, icon: FiUsers, color: '#c5a880' },
    { title: 'Total Events', value: data?.totalEvents ?? 0, icon: FiCalendar, color: '#ac8d63' },
    { title: 'Total Bookings', value: data?.totalBookings ?? 0, icon: FiBookmark, color: '#d35543' },
    { title: 'Total Revenue', value: `₹${data?.totalRevenue ?? 0}`, icon: FiDollarSign, color: '#10b981' },
    { title: 'Active Events', value: data?.activeEvents ?? 0, icon: FiActivity, color: '#e28e46' },
    { title: 'Confirmed Bookings', value: data?.confirmedBookings ?? 0, icon: FiCheckCircle, color: '#3a628a' },
  ]

  const metrics = [
    { label: 'Cancellation Rate', value: data?.totalBookings > 0 ? (((data.totalBookings - data.confirmedBookings) / data.totalBookings) * 100).toFixed(1) + '%' : '0%', color: '#ef4444' },
    { label: 'Avg Ticket Price', value: data?.totalBookings > 0 ? `₹${(data.totalRevenue / data.totalBookings).toFixed(0)}` : '₹0', color: '#10b981' },
    { label: 'Events Utilization', value: data?.totalEvents > 0 ? ((data.activeEvents / data.totalEvents) * 100).toFixed(1) + '%' : '0%', color: '#c5a880' },
    { label: 'Bookings/Event', value: data?.totalEvents > 0 ? (data.totalBookings / data.totalEvents).toFixed(1) : '0', color: '#e28e46' },
  ]

  return (
    <div>
      <h1 className="section-title">Analytics</h1>
      <div className="grid-3" style={{ marginBottom: 28 }}>
        {cards.map(c => <DashboardCard key={c.title} {...c} />)}
      </div>

      <div className="glass" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Key Metrics</h2>
        <div className="grid-4">
          {metrics.map(({ label, value, color }) => (
            <div key={label} style={{ padding: 20, background: `${color}10`, borderRadius: 12, borderLeft: `3px solid ${color}` }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
