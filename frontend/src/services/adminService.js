import api from '../api/axios'

export const adminService = {
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getBookings: () => api.get('/admin/bookings'),
  getAnalytics: () => api.get('/admin/analytics'),
}
