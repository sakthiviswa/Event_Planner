import api from '../api/axios'

export const bookingService = {
  book: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my'),
  cancel: (id) => api.delete(`/bookings/${id}`),
}
