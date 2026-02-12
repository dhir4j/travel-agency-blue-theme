// API Integration Layer for Waynex Travels

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.server.waynextravels.com/api'

// Helper function to handle API responses
async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.error || 'An error occurred')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

// Authentication APIs
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return handleResponse(response)
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    return handleResponse(response)
  },

  sendOtp: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    return handleResponse(response)
  },

  verifyOtp: async ({ email, otp, context, rememberMe }) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, context, rememberMe }),
    })
    return handleResponse(response)
  },

  verifyToken: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    return handleResponse(response)
  },

  logout: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    return handleResponse(response)
  },
}

// User APIs
export const userAPI = {
  getProfile: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`)
    return handleResponse(response)
  },

  updateProfile: async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return handleResponse(response)
  },

  getBookings: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/bookings`)
    return handleResponse(response)
  },
}

// Bookings APIs
export const bookingsAPI = {
  create: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    return handleResponse(response)
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters)
    const response = await fetch(`${API_BASE_URL}/bookings/?${params}`)
    return handleResponse(response)
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`)
    return handleResponse(response)
  },

  getByBookingId: async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/bookings/by-booking-id/${bookingId}`)
    return handleResponse(response)
  },

  update: async (id, updateData) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
    return handleResponse(response)
  },
}

// Session management helper
export const session = {
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('waynex_user', JSON.stringify(user))
    }
  },

  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('waynex_user')
      return user ? JSON.parse(user) : null
    }
    return null
  },

  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('waynex_user')
      localStorage.removeItem('waynex_remember_token')
    }
  },

  isAuthenticated: () => {
    return session.getUser() !== null
  },

  setRememberToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('waynex_remember_token', token)
    }
  },

  getRememberToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('waynex_remember_token')
    }
    return null
  },

  // Try to restore session from remember token
  tryRestoreSession: async () => {
    if (typeof window === 'undefined') return null

    const token = localStorage.getItem('waynex_remember_token')
    if (!token) return null

    try {
      const data = await authAPI.verifyToken(token)
      if (data.user) {
        session.setUser(data.user)
        return data.user
      }
    } catch (e) {
      // Token invalid — clear it
      localStorage.removeItem('waynex_remember_token')
    }
    return null
  },
}

const api = {
  authAPI,
  userAPI,
  bookingsAPI,
  session,
}

export default api
