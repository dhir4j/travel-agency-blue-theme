'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { bookingsAPI } from '@/lib/api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('booking_id')

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [utrCode, setUtrCode] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (bookingId) {
      loadBooking()
    }
  }, [bookingId])

  const loadBooking = async () => {
    try {
      const result = await bookingsAPI.getById(bookingId)
      setBooking(result.booking)
      setLoading(false)
    } catch (err) {
      console.error('Error loading booking:', err)
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate UTR code
    if (utrCode.length !== 12) {
      alert('Please enter a valid 12-digit UTR code')
      return
    }

    // Show coming soon modal
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setUtrCode('')
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{padding: '100px 20px', textAlign: 'center'}}>
          <div className="loading-spinner">Loading...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!booking) {
    return (
      <>
        <Header />
        <div style={{padding: '100px 20px', textAlign: 'center'}}>
          <h2>Booking not found</h2>
          <p>Please check your booking ID and try again.</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <section className="checkout-section">
          <div className="container">
            <div className="checkout-header">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              <h1 className="checkout-title">Complete Your Payment</h1>
              <p className="checkout-subtitle">Booking ID: {booking.booking_id}</p>
            </div>

            <div className="checkout-container">
              {/* Booking Summary */}
              <div className="booking-summary">
                <h2 className="summary-title">
                  <ion-icon name="document-text-outline"></ion-icon>
                  Booking Summary
                </h2>

                <div className="summary-card">
                  <div className="summary-item">
                    <span className="item-label">Package Name:</span>
                    <span className="item-value">{booking.package_name}</span>
                  </div>

                  <div className="summary-item">
                    <span className="item-label">Order Type:</span>
                    <span className="item-value badge">{booking.order_type}</span>
                  </div>

                  {booking.destination && (
                    <div className="summary-item">
                      <span className="item-label">Destination:</span>
                      <span className="item-value">{booking.destination}</span>
                    </div>
                  )}

                  <div className="summary-item">
                    <span className="item-label">Travel Date:</span>
                    <span className="item-value">{new Date(booking.travel_date).toLocaleDateString()}</span>
                  </div>

                  <div className="summary-item">
                    <span className="item-label">Travelers:</span>
                    <span className="item-value">
                      {booking.num_adults} Adult{booking.num_adults > 1 ? 's' : ''}
                      {booking.num_children > 0 && `, ${booking.num_children} Child${booking.num_children > 1 ? 'ren' : ''}`}
                    </span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-item">
                    <span className="item-label">Price per Person:</span>
                    <span className="item-value">₹{parseFloat(booking.price_per_person).toLocaleString()}</span>
                  </div>

                  <div className="summary-item">
                    <span className="item-label">Total Amount:</span>
                    <span className="item-value">₹{parseFloat(booking.total_amount).toLocaleString()}</span>
                  </div>

                  {booking.tax_amount > 0 && (
                    <div className="summary-item">
                      <span className="item-label">Tax:</span>
                      <span className="item-value">₹{parseFloat(booking.tax_amount).toLocaleString()}</span>
                    </div>
                  )}

                  {booking.discount_amount > 0 && (
                    <div className="summary-item discount">
                      <span className="item-label">Discount:</span>
                      <span className="item-value">-₹{parseFloat(booking.discount_amount).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-item final-amount">
                    <span className="item-label">Final Amount:</span>
                    <span className="item-value">₹{parseFloat(booking.final_amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="payment-section">
                <h2 className="payment-title">
                  <ion-icon name="card-outline"></ion-icon>
                  Payment Method
                </h2>

                <div className="payment-card">
                  <div className="payment-method">
                    <div className="method-header">
                      <ion-icon name="logo-google"></ion-icon>
                      <h3>UPI Payment</h3>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="qr-container">
                      <div className="coming-soon-badge">
                        <ion-icon name="time-outline"></ion-icon>
                        COMING SOON
                      </div>
                      <div className="qr-placeholder">
                        <ion-icon name="qr-code-outline"></ion-icon>
                        <p>QR Code will appear here</p>
                      </div>
                      <p className="qr-instruction">Scan QR code to pay via UPI</p>
                    </div>

                    <div className="payment-divider">
                      <span>OR</span>
                    </div>

                    {/* UTR Input */}
                    <form onSubmit={handleSubmit} className="utr-form">
                      <div className="form-group">
                        <label className="form-label">
                          <ion-icon name="receipt-outline"></ion-icon>
                          Enter 12-Digit UTR Code
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          value={utrCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                            setUtrCode(value)
                          }}
                          placeholder="Enter UTR number"
                          maxLength={12}
                        />
                        <p className="form-helper">
                          Enter the 12-digit UTR/Reference number from your bank transfer
                        </p>
                      </div>

                      <button type="submit" className="btn btn-primary payment-btn">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        Submit Payment Details
                      </button>
                    </form>
                  </div>
                </div>

                <div className="payment-note">
                  <ion-icon name="information-circle-outline"></ion-icon>
                  <p>Your booking is confirmed. Payment processing will be activated soon.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <ion-icon name="construct-outline"></ion-icon>
              </div>
              <h2 className="modal-title">Coming Soon!</h2>
              <p className="modal-message">
                Our payment processing system is currently under development.
                We'll notify you once it's ready.
              </p>
              <button className="btn btn-primary modal-btn" onClick={closeModal}>
                Got it!
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .checkout-section {
          padding: 100px 0 80px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .checkout-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .checkout-header ion-icon {
          font-size: 70px;
          color: #4caf50;
          margin-bottom: 20px;
        }

        .checkout-title {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-1);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .checkout-subtitle {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--spanish-gray);
        }

        .checkout-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .booking-summary,
        .payment-section {
          background: var(--white);
          border-radius: var(--radius-15);
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .summary-title,
        .payment-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--ff-montserrat);
          font-size: var(--fs-3);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 25px;
        }

        .summary-title ion-icon,
        .payment-title ion-icon {
          font-size: 28px;
          color: var(--bright-navy-blue);
        }

        .summary-card {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
        }

        .item-label {
          color: var(--spanish-gray);
          font-weight: var(--fw-500);
        }

        .item-value {
          color: var(--gunmetal);
          font-weight: var(--fw-600);
          text-align: right;
        }

        .item-value.badge {
          background: var(--bright-navy-blue);
          color: var(--white);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: var(--fs-7);
          text-transform: uppercase;
        }

        .summary-divider {
          height: 1px;
          background: var(--gainsboro);
          margin: 10px 0;
        }

        .summary-item.discount .item-value {
          color: #4caf50;
        }

        .summary-item.final-amount {
          padding: 15px;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          border-radius: 10px;
          color: var(--white);
        }

        .summary-item.final-amount .item-label,
        .summary-item.final-amount .item-value {
          color: var(--white);
          font-size: var(--fs-4);
          font-weight: var(--fw-700);
        }

        .payment-card {
          margin-bottom: 20px;
        }

        .payment-method {
          padding: 20px;
          border: 2px solid var(--gainsboro);
          border-radius: 10px;
        }

        .method-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
        }

        .method-header ion-icon {
          font-size: 32px;
          color: var(--bright-navy-blue);
        }

        .method-header h3 {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-4);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
        }

        .qr-container {
          position: relative;
          text-align: center;
          margin-bottom: 25px;
        }

        .coming-soon-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #ffa502, #ff6348);
          color: var(--white);
          padding: 10px 20px;
          border-radius: 25px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-7);
          font-weight: var(--fw-700);
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(255, 165, 2, 0.3);
        }

        .coming-soon-badge ion-icon {
          font-size: 20px;
        }

        .qr-placeholder {
          width: 250px;
          height: 250px;
          margin: 0 auto 15px;
          background: var(--cultured);
          border: 3px dashed var(--gainsboro);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .qr-placeholder ion-icon {
          font-size: 80px;
          color: var(--spanish-gray);
        }

        .qr-placeholder p {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--spanish-gray);
          font-weight: var(--fw-600);
        }

        .qr-instruction {
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          color: var(--spanish-gray);
        }

        .payment-divider {
          position: relative;
          text-align: center;
          margin: 30px 0;
        }

        .payment-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gainsboro);
          z-index: 1;
        }

        .payment-divider span {
          position: relative;
          display: inline-block;
          background: var(--white);
          padding: 0 20px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          color: var(--spanish-gray);
          z-index: 2;
        }

        .utr-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          color: var(--gunmetal);
        }

        .form-label ion-icon {
          font-size: 20px;
          color: var(--bright-navy-blue);
        }

        .form-input {
          padding: 15px 20px;
          border: 2px solid var(--gainsboro);
          border-radius: 10px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-4);
          color: var(--gunmetal);
          font-weight: var(--fw-600);
          letter-spacing: 2px;
          transition: var(--transition);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
          box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.1);
        }

        .form-input::placeholder {
          color: var(--spanish-gray);
          letter-spacing: normal;
        }

        .form-helper {
          font-family: var(--ff-poppins);
          font-size: var(--fs-7);
          color: var(--spanish-gray);
          margin-top: -5px;
        }

        .payment-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px;
          font-size: var(--fs-5);
          font-weight: var(--fw-700);
        }

        .payment-btn ion-icon {
          font-size: 24px;
        }

        .payment-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 15px;
          background: #e3f2fd;
          border: 1px solid #90caf9;
          border-radius: 10px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          color: #1976d2;
        }

        .payment-note ion-icon {
          font-size: 24px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: var(--white);
          padding: 50px 40px;
          border-radius: var(--radius-25);
          max-width: 450px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-icon {
          margin: 0 auto 25px;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ffa502, #ff6348);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-icon ion-icon {
          font-size: 50px;
          color: var(--white);
        }

        .modal-title {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-2);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 15px;
        }

        .modal-message {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--spanish-gray);
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .modal-btn {
          min-width: 150px;
          padding: 15px 30px;
        }

        @media (max-width: 992px) {
          .checkout-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .checkout-section {
            padding: 80px 20px 60px;
          }

          .booking-summary,
          .payment-section {
            padding: 20px;
          }

          .qr-placeholder {
            width: 200px;
            height: 200px;
          }

          .modal-content {
            margin: 20px;
            padding: 40px 30px;
          }
        }
      `}</style>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{padding: '100px 20px', textAlign: 'center'}}>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
