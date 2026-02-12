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
  }

  if (loading || !user) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
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
        {/* Profile Hero Banner */}
        <section className="profile-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-user">
                <div className="hero-avatar">
                  {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                </div>
                <div className="hero-info">
                  <h1>{user.first_name} {user.last_name}</h1>
                  <div className="hero-meta">
                    <span><ion-icon name="mail-outline"></ion-icon> {user.email}</span>
                    {user.phone && <span><ion-icon name="call-outline"></ion-icon> {user.phone}</span>}
                  </div>
                </div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <ion-icon name="log-out-outline"></ion-icon>
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <ion-icon name="calendar-outline"></ion-icon>
                </div>
                <div>
                  <h3>{stats.totalBookings}</h3>
                  <p>Total Bookings</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
                <div>
                  <h3>₹{stats.totalSpent.toLocaleString()}</h3>
                  <p>Total Spent</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <ion-icon name="time-outline"></ion-icon>
                </div>
                <div>
                  <h3>{stats.pendingBookings}</h3>
                  <p>Pending</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <ion-icon name="checkmark-done-outline"></ion-icon>
                </div>
                <div>
                  <h3>{stats.completedBookings}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="profile-content">
          <div className="container">
            <div className="tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <ion-icon name="person-outline"></ion-icon>
                  Profile
                </button>
                <button
                  className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <ion-icon name="bag-outline"></ion-icon>
                  Bookings
                </button>
                <button
                  className={`tab-btn ${activeTab === 'invoices' ? 'active' : ''}`}
                  onClick={() => setActiveTab('invoices')}
                >
                  <ion-icon name="document-text-outline"></ion-icon>
                  Invoices
                </button>
              </div>

              <div className="tabs-body">
                {/* Overview */}
                {activeTab === 'overview' && (
                  <div className="tab-panel">
                    <h2>Profile Information</h2>
                    <div className="info-grid">
                      <div className="info-card">
                        <label>First Name</label>
                        <p>{user.first_name}</p>
                      </div>
                      <div className="info-card">
                        <label>Last Name</label>
                        <p>{user.last_name}</p>
                      </div>
                      <div className="info-card">
                        <label>Email</label>
                        <p>{user.email}</p>
                      </div>
                      <div className="info-card">
                        <label>Phone</label>
                        <p>{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="info-card full-width">
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

                {/* Bookings */}
                {activeTab === 'bookings' && (
                  <div className="tab-panel">
                    <h2>My Bookings</h2>
                    {bookings.length === 0 ? (
                      <div className="empty-state">
                        <ion-icon name="airplane-outline"></ion-icon>
                        <h3>No Bookings Yet</h3>
                        <p>Start your adventure by booking a tour!</p>
                        <a href="/tours" className="btn btn-primary">Browse Tours</a>
                      </div>
                    ) : (
                      <div className="bookings-list">
                        {bookings.map((booking) => (
                          <div key={booking.id} className="booking-card">
                            <div className="booking-top">
                              <div>
                                <h3>{booking.package_name}</h3>
                                <span className="booking-id">#{booking.booking_id}</span>
                              </div>
                              <span className={`badge badge-${booking.status.toLowerCase()}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="booking-grid">
                              <div className="booking-detail">
                                <ion-icon name="calendar-outline"></ion-icon>
                                <div>
                                  <small>Travel Date</small>
                                  <span>{new Date(booking.travel_date).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="booking-detail">
                                <ion-icon name="people-outline"></ion-icon>
                                <div>
                                  <small>Guests</small>
                                  <span>{booking.num_adults} Adult(s), {booking.num_children} Child(ren)</span>
                                </div>
                              </div>
                              <div className="booking-detail">
                                <ion-icon name="cash-outline"></ion-icon>
                                <div>
                                  <small>Amount</small>
                                  <span>₹{booking.final_amount?.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="booking-detail">
                                <ion-icon name="card-outline"></ion-icon>
                                <div>
                                  <small>Payment</small>
                                  <span>{booking.payment_status}</span>
                                </div>
                              </div>
                            </div>
                            {booking.special_requests && (
                              <div className="special-note">
                                <strong>Note:</strong> {booking.special_requests}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Invoices */}
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
                          <div key={booking.id} className="invoice-row">
                            <div className="invoice-left">
                              <h4>#{booking.booking_id}</h4>
                              <p className="invoice-pkg">{booking.package_name}</p>
                              <p className="invoice-date">
                                {new Date(booking.booking_date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="invoice-right">
                              <span className={`badge badge-${booking.payment_status.toLowerCase()}`}>
                                {booking.payment_status}
                              </span>
                              <p className="invoice-amount">₹{booking.final_amount?.toLocaleString()}</p>
                              <button
                                className="download-btn"
                                onClick={() => downloadInvoice(booking.id)}
                              >
                                <ion-icon name="download-outline"></ion-icon>
                                PDF
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
        /* ── Hero Banner ── */
        .profile-hero {
          background-image: url("https://i.postimg.cc/D0c2FLPM/hero-banner.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-color: hsla(0, 0%, 0%, 0.7);
          background-blend-mode: overlay;
          padding: 180px 0 80px;
          color: var(--white);
        }

        .hero-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .hero-user {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .hero-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--white);
          flex-shrink: 0;
        }

        .hero-info h1 {
          font-size: clamp(24px, 3vw, 36px);
          margin-bottom: 8px;
          font-weight: 700;
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .hero-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          opacity: 0.85;
        }

        .hero-meta ion-icon {
          font-size: 16px;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 100px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          color: var(--white);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--white);
        }

        /* ── Stats ── */
        .stats-section {
          padding: 50px 0;
          background: var(--cultured);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          background: var(--white);
          padding: 28px 24px;
          border-radius: var(--radius-25);
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: var(--transition);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: var(--white);
          flex-shrink: 0;
        }

        .stat-card h3 {
          font-size: 22px;
          color: var(--oxford-blue);
          margin-bottom: 2px;
        }

        .stat-card p {
          font-size: 13px;
          color: var(--spanish-gray);
        }

        /* ── Tabs ── */
        .profile-content {
          padding: 0 0 80px;
          background: var(--cultured);
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
        }

        .tab-btn {
          flex: 1;
          padding: 18px 24px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: var(--fs-5);
          font-weight: 600;
          color: var(--spanish-gray);
          transition: var(--transition);
          white-space: nowrap;
          position: relative;
        }

        .tab-btn:hover {
          color: var(--bright-navy-blue);
          background: rgba(74, 144, 226, 0.04);
        }

        .tab-btn.active {
          color: var(--bright-navy-blue);
        }

        .tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--bright-navy-blue);
          border-radius: 3px 3px 0 0;
        }

        .tabs-body {
          padding: 36px;
        }

        .tab-panel h2 {
          font-size: 20px;
          color: var(--oxford-blue);
          margin-bottom: 24px;
        }

        /* ── Info Grid ── */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .info-card {
          padding: 20px;
          background: var(--cultured);
          border-radius: var(--radius-15);
        }

        .info-card.full-width {
          grid-column: 1 / -1;
        }

        .info-card label {
          display: block;
          font-size: 11px;
          color: var(--spanish-gray);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .info-card p {
          font-size: 15px;
          color: var(--oxford-blue);
          font-weight: 600;
        }

        /* ── Empty State ── */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-state ion-icon {
          font-size: 64px;
          color: var(--gainsboro);
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 18px;
          color: var(--oxford-blue);
          margin-bottom: 8px;
        }

        .empty-state p {
          color: var(--spanish-gray);
          margin-bottom: 20px;
          font-size: 14px;
        }

        /* ── Badges ── */
        .badge {
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-pending { background: #fef3cd; color: #856404; }
        .badge-confirmed { background: #d1ecf1; color: #0c5460; }
        .badge-completed { background: #d4edda; color: #155724; }
        .badge-cancelled { background: #f8d7da; color: #721c24; }
        .badge-unpaid { background: #f8d7da; color: #721c24; }
        .badge-partial { background: #fef3cd; color: #856404; }
        .badge-paid { background: #d4edda; color: #155724; }

        /* ── Bookings ── */
        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .booking-card {
          padding: 24px;
          border: 1px solid var(--gainsboro);
          border-radius: var(--radius-15);
          transition: var(--transition);
        }

        .booking-card:hover {
          border-color: var(--bright-navy-blue);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .booking-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .booking-top h3 {
          font-size: 16px;
          color: var(--oxford-blue);
          margin-bottom: 4px;
        }

        .booking-id {
          font-size: 12px;
          color: var(--spanish-gray);
        }

        .booking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .booking-detail {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .booking-detail ion-icon {
          font-size: 20px;
          color: var(--bright-navy-blue);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .booking-detail small {
          display: block;
          font-size: 11px;
          color: var(--spanish-gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .booking-detail span {
          font-size: 14px;
          color: var(--gunmetal);
          font-weight: 500;
        }

        .special-note {
          margin-top: 16px;
          padding: 12px 16px;
          background: var(--cultured);
          border-radius: 10px;
          font-size: 13px;
          color: var(--gunmetal);
        }

        /* ── Invoices ── */
        .invoices-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .invoice-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border: 1px solid var(--gainsboro);
          border-radius: var(--radius-15);
          transition: var(--transition);
          flex-wrap: wrap;
          gap: 16px;
        }

        .invoice-row:hover {
          border-color: var(--bright-navy-blue);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .invoice-left h4 {
          font-size: 15px;
          color: var(--oxford-blue);
          margin-bottom: 4px;
        }

        .invoice-pkg {
          font-size: 13px;
          color: var(--gunmetal);
          margin-bottom: 2px;
        }

        .invoice-date {
          font-size: 12px;
          color: var(--spanish-gray);
        }

        .invoice-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .invoice-amount {
          font-size: 18px;
          font-weight: 700;
          color: var(--bright-navy-blue);
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 100px;
          border: 2px solid var(--bright-navy-blue);
          background: transparent;
          color: var(--bright-navy-blue);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .download-btn:hover {
          background: var(--bright-navy-blue);
          color: var(--white);
        }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .profile-hero {
            padding: 140px 0 60px;
          }

          .hero-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-user {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .hero-meta {
            flex-direction: column;
            gap: 8px;
          }

          .logout-btn {
            width: 100%;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .tabs-header {
            flex-direction: column;
          }

          .tab-btn {
            justify-content: flex-start;
            padding: 14px 20px;
          }

          .tab-btn.active::after {
            display: none;
          }

          .tab-btn.active {
            background: rgba(74, 144, 226, 0.08);
          }

          .tabs-body {
            padding: 20px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .invoice-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .invoice-right {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
