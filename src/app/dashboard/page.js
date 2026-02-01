'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userAPI, session, authAPI } from '@/lib/api'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = session.getUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }

    loadUserData(currentUser)
  }, [router])

  const loadUserData = async (currentUser) => {
    try {
      const bookingsData = await userAPI.getBookings(currentUser.id)
      setUser(currentUser)
      setBookings(bookingsData.bookings)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout(user.email)
      session.clearUser()
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{maxWidth: '1200px', margin: '50px auto', padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <h1>My Dashboard</h1>
        <button onClick={handleLogout} style={{padding: '10px 20px'}}>
          Logout
        </button>
      </div>

      <div style={{marginBottom: '30px'}}>
        <h2>Welcome, {user?.first_name}!</h2>
        <p>Email: {user?.email}</p>
      </div>

      <h2>My Bookings ({bookings.length})</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #ddd'}}>
              <th style={{padding: '10px', textAlign: 'left'}}>Booking ID</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Package</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Date</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Status</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '10px'}}>{booking.booking_id}</td>
                <td style={{padding: '10px'}}>{booking.package_name}</td>
                <td style={{padding: '10px'}}>{booking.travel_date}</td>
                <td style={{padding: '10px'}}>{booking.status}</td>
                <td style={{padding: '10px'}}>₹{booking.final_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
