'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import { session, userAPI, bookingsAPI, authAPI } from '@/lib/api'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    pendingBookings: 0,
    completedBookings: 0,
  })

  useEffect(() => {
    const currentUser = session.getUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    loadUserData(currentUser)
  }, [])

  const loadUserData = async (currentUser) => {
    try {
      setLoading(true)
      const bookingsData = await userAPI.getBookings(currentUser.id)
      setBookings(bookingsData.bookings || [])

      // Calculate stats
      const totalSpent = bookingsData.bookings?.reduce((sum, b) => sum + (b.final_amount || 0), 0) || 0
      const pending = bookingsData.bookings?.filter(b => b.status === 'Pending').length || 0
      const completed = bookingsData.bookings?.filter(b => b.status === 'Completed').length || 0

      setStats({
        totalBookings: bookingsData.total || 0,
        totalSpent: totalSpent,
        pendingBookings: pending,
        completedBookings: completed,
      })
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout(user.email)
      session.clearUser()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      session.clearUser()
      router.push('/')
    }
  }

  const downloadInvoice = async (bookingId) => {
    alert(`Invoice download for booking #${bookingId} will be implemented soon!`)
    // TODO: Implement PDF generation
  }

  if (loading || !user) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loading">
            <ion-icon name="hourglass-outline" style={{ fontSize: '48px', color: 'var(--bright-navy-blue)' }}></ion-icon>
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        {/* Profile Header */}
        <section className="profile-header">
          <div className="container">
            <div className="profile-hero">
              <div className="profile-avatar">
                <ion-icon name="person-circle"></ion-icon>
              </div>
              <div className="profile-info">
                <h1>{user.first_name} {user.last_name}</h1>
                <p>{user.email}</p>
                {user.phone && <p><ion-icon name="call-outline"></ion-icon> {user.phone}</p>}
              </div>
              <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
                <ion-icon name="log-out-outline"></ion-icon>
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <ion-icon name="calendar-outline"></ion-icon>
                </div>
                <div className="stat-content">
                  <h3>{stats.totalBookings}</h3>
                  <p>Total Bookings</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
                <div className="stat-content">
                  <h3>₹{stats.totalSpent.toLocaleString()}</h3>
                  <p>Total Spent</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <ion-icon name="time-outline"></ion-icon>
                </div>
                <div className="stat-content">
                  <h3>{stats.pendingBookings}</h3>
                  <p>Pending</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                  <ion-icon name="checkmark-done-outline"></ion-icon>
                </div>
                <div className="stat-content">
                  <h3>{stats.completedBookings}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="profile-content">
          <div className="container">
            <div className="tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <ion-icon name="person-outline"></ion-icon>
                  Profile Overview
                </button>
                <button
                  className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <ion-icon name="bag-outline"></ion-icon>
                  My Bookings
                </button>
                <button
                  className={`tab-btn ${activeTab === 'invoices' ? 'active' : ''}`}
                  onClick={() => setActiveTab('invoices')}
                >
                  <ion-icon name="document-text-outline"></ion-icon>
                  Invoices
                </button>
              </div>

              <div className="tabs-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="tab-panel">
                    <h2>Profile Information</h2>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>First Name</label>
                        <p>{user.first_name}</p>
                      </div>
                      <div className="info-item">
                        <label>Last Name</label>
                        <p>{user.last_name}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{user.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <p>{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="info-item full-width">
                        <label>Address</label>
                        <p>
                          {user.address?.street && `${user.address.street}, `}
                          {user.address?.city && `${user.address.city}, `}
                          {user.address?.state && `${user.address.state} `}
                          {user.address?.pincode && `- ${user.address.pincode}`}
                          {!user.address?.street && !user.address?.city && 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                  <div className="tab-panel">
                    <h2>My Bookings</h2>
                    {bookings.length === 0 ? (
                      <div className="empty-state">
                        <ion-icon name="bag-outline"></ion-icon>
                        <h3>No Bookings Yet</h3>
                        <p>Start your adventure by booking a tour!</p>
                        <a href="/tours" className="btn btn-primary">Browse Tours</a>
                      </div>
                    ) : (
                      <div className="bookings-list">
                        {bookings.map((booking) => (
                          <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                              <div>
                                <h3>{booking.package_name}</h3>
                                <p className="booking-id">Booking ID: {booking.booking_id}</p>
                              </div>
                              <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="booking-details">
                              <div className="detail-item">
                                <ion-icon name="calendar-outline"></ion-icon>
                                <span>Travel Date: {new Date(booking.travel_date).toLocaleDateString()}</span>
                              </div>
                              <div className="detail-item">
                                <ion-icon name="people-outline"></ion-icon>
                                <span>{booking.num_adults} Adult(s), {booking.num_children} Child(ren)</span>
                              </div>
                              <div className="detail-item">
                                <ion-icon name="cash-outline"></ion-icon>
                                <span>₹{booking.final_amount.toLocaleString()}</span>
                              </div>
                              <div className="detail-item">
                                <ion-icon name="card-outline"></ion-icon>
                                <span>Payment: {booking.payment_status}</span>
                              </div>
                            </div>
                            {booking.special_requests && (
                              <div className="special-requests">
                                <strong>Special Requests:</strong> {booking.special_requests}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Invoices Tab */}
                {activeTab === 'invoices' && (
                  <div className="tab-panel">
                    <h2>Invoices</h2>
                    {bookings.length === 0 ? (
                      <div className="empty-state">
                        <ion-icon name="document-text-outline"></ion-icon>
                        <h3>No Invoices Available</h3>
                        <p>Your invoices will appear here after booking.</p>
                      </div>
                    ) : (
                      <div className="invoices-list">
                        {bookings.map((booking) => (
                          <div key={booking.id} className="invoice-card">
                            <div className="invoice-header">
                              <div>
                                <h4>Invoice #{booking.booking_id}</h4>
                                <p>{booking.package_name}</p>
                                <p className="invoice-date">
                                  Booked: {new Date(booking.booking_date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="invoice-amount">
                                <p className="amount-label">Total Amount</p>
                                <p className="amount-value">₹{booking.final_amount.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="invoice-footer">
                              <span className={`payment-badge payment-${booking.payment_status.toLowerCase()}`}>
                                {booking.payment_status}
                              </span>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => downloadInvoice(booking.id)}
                              >
                                <ion-icon name="download-outline"></ion-icon>
                                Download PDF
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .profile-header {
          padding: 140px 0 60px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
        }

        .profile-hero {
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .profile-avatar {
          font-size: 100px;
          color: var(--white);
        }

        .profile-info {
          flex: 1;
          color: var(--white);
        }

        .profile-info h1 {
          font-size: var(--fs-1);
          margin-bottom: 8px;
        }

        .profile-info p {
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stats-section {
          padding: 60px 0;
          background: var(--cultured);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: var(--white);
          padding: 30px;
          border-radius: var(--radius-25);
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: var(--transition);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--white);
        }

        .stat-content h3 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 4px;
        }

        .stat-content p {
          color: var(--spanish-gray);
          font-size: var(--fs-5);
        }

        .profile-content {
          padding: 60px 0;
        }

        .tabs-container {
          background: var(--white);
          border-radius: var(--radius-25);
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .tabs-header {
          display: flex;
          border-bottom: 2px solid var(--gainsboro);
          overflow-x: auto;
        }

        .tab-btn {
          flex: 1;
          padding: 20px 30px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: var(--fs-5);
          font-weight: var(--fw-600);
          color: var(--spanish-gray);
          transition: var(--transition);
          white-space: nowrap;
        }

        .tab-btn:hover {
          background: var(--cultured);
        }

        .tab-btn.active {
          color: var(--bright-navy-blue);
          border-bottom: 3px solid var(--bright-navy-blue);
        }

        .tabs-content {
          padding: 40px;
        }

        .tab-panel h2 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 30px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .info-item {
          padding: 20px;
          background: var(--cultured);
          border-radius: var(--radius-15);
        }

        .info-item.full-width {
          grid-column: 1 / -1;
        }

        .info-item label {
          display: block;
          font-size: var(--fs-7);
          color: var(--spanish-gray);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .info-item p {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          font-weight: var(--fw-600);
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-state ion-icon {
          font-size: 80px;
          color: var(--spanish-gray);
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .empty-state p {
          color: var(--spanish-gray);
          margin-bottom: 20px;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .booking-card {
          padding: 25px;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          transition: var(--transition);
        }

        .booking-card:hover {
          border-color: var(--bright-navy-blue);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .booking-header h3 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 5px;
        }

        .booking-id {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
        }

        .status-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: var(--fs-7);
          font-weight: var(--fw-600);
          text-transform: uppercase;
        }

        .status-pending {
          background: #fff3cd;
          color: #856404;
        }

        .status-confirmed {
          background: #d1ecf1;
          color: #0c5460;
        }

        .status-completed {
          background: #d4edda;
          color: #155724;
        }

        .status-cancelled {
          background: #f8d7da;
          color: #721c24;
        }

        .booking-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gunmetal);
          font-size: var(--fs-6);
        }

        .detail-item ion-icon {
          color: var(--bright-navy-blue);
          font-size: 20px;
        }

        .special-requests {
          padding: 15px;
          background: var(--cultured);
          border-radius: var(--radius-15);
          font-size: var(--fs-6);
          color: var(--gunmetal);
        }

        .invoices-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .invoice-card {
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          overflow: hidden;
        }

        .invoice-header {
          padding: 25px;
          background: var(--cultured);
          display: flex;
          justify-content: space-between;
          align-items: start;
          flex-wrap: wrap;
          gap: 20px;
        }

        .invoice-header h4 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 5px;
        }

        .invoice-header p {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
        }

        .invoice-date {
          margin-top: 5px;
          font-size: var(--fs-7);
        }

        .invoice-amount {
          text-align: right;
        }

        .amount-label {
          font-size: var(--fs-7);
          color: var(--spanish-gray);
          text-transform: uppercase;
        }

        .amount-value {
          font-size: var(--fs-2);
          color: var(--bright-navy-blue);
          font-weight: var(--fw-700);
        }

        .invoice-footer {
          padding: 20px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .payment-badge {
          padding: 6px 14px;
          border-radius: 15px;
          font-size: var(--fs-7);
          font-weight: var(--fw-600);
          text-transform: uppercase;
        }

        .payment-unpaid {
          background: #f8d7da;
          color: #721c24;
        }

        .payment-partial {
          background: #fff3cd;
          color: #856404;
        }

        .payment-paid {
          background: #d4edda;
          color: #155724;
        }

        .btn-sm {
          padding: 10px 20px;
          font-size: var(--fs-6);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .profile-hero {
            flex-direction: column;
            text-align: center;
          }

          .logout-btn {
            width: 100%;
            justify-content: center;
          }

          .tabs-header {
            flex-direction: column;
          }

          .tab-btn {
            justify-content: flex-start;
          }

          .tabs-content {
            padding: 20px;
          }

          .booking-header,
          .invoice-header,
          .invoice-footer {
            flex-direction: column;
          }

          .invoice-amount {
            text-align: left;
          }
        }
      `}</style>
    </>
  )
}
