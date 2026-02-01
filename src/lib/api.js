// API Integration Layer for Waynex Travels

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server.waynextravels.com/api'

// Helper function to handle API responses
async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred')
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

// Note: Tours and Visas APIs removed - bookings now store order details directly

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
    const response = await fetch(`${API_BASE_URL}/bookings?${params}`)
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
    }
  },

  isAuthenticated: () => {
    return session.getUser() !== null
  },
}

export default {
  authAPI,
  userAPI,
  bookingsAPI,
  session,
}
