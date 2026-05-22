import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import BookingTable from '../components/BookingTable'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function ManageBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getBookings()
      .then(r => setBookings(r.data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 className="section-title" style={{ marginBottom: 0 }}>Manage Bookings</h1>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{bookings.length} total bookings</span>
      </div>
      {loading ? <Loader /> : <BookingTable bookings={bookings} showUser />}
    </div>
  )
}
