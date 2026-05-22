import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers = config.headers || {}
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/auth'
    }
    if (!err.response) {
      // Network error - backend not running
      err.message = 'Cannot connect to server. Please make sure the backend is running on port 8080.'
    }
    return Promise.reject(err)
  }
)

export default api
