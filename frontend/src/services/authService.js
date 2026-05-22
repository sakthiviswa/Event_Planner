import api from '../api/axios'

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  adminLogin: (data) => api.post('/admin/login', data),
  adminRegister: (data) => api.post('/admin/register', data),
}
