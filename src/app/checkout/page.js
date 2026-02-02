'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { bookingsAPI } from '@/lib/api'
import session from '@/utils/session'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function CheckoutPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('upi')
  const [loading, setLoading] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)

  useEffect(() => {
    // Load user from session
    const currentUser = session.getUser()
    if (!currentUser) {
      alert('Please login to continue')
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    // Load booking data from sessionStorage
    const pendingBooking = sessionStorage.getItem('pendingBooking')
    if (!pendingBooking) {
      alert('No booking data found. Please start from the booking page.')
      router.push('/tours')
      return
    }

    try {
      const data = JSON.parse(pendingBooking)
      setBookingData(data)
    } catch (error) {
      console.error('Error parsing booking data:', error)
      alert('Invalid booking data. Please try again.')
      router.push('/tours')
    }
  }, [router])

  const handlePaymentMethodClick = (method) => {
    if (method === 'card' || method === 'bank') {
      setShowComingSoonModal(true)
      return
    }
    setSelectedPayment(method)
  }

  const handleProceedPayment = async () => {
    if (selectedPayment !== 'upi') {
      setShowComingSoonModal(true)
      return
    }

    // Show coming soon modal for UPI as well since QR is not ready
    setShowComingSoonModal(true)
  }

  const closeModal = () => {
    setShowComingSoonModal(false)
  }

  if (!bookingData || !user) {
    return (
      <>
        <Header />
        <div style={{ padding: '150px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <div className="loading">Loading checkout...</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="checkout-hero">
          <div className="container">
            <h1 className="h1 hero-title">Complete Your Payment</h1>
            <p className="hero-subtitle">Secure checkout - Your booking is almost complete</p>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="checkout-content">
          <div className="container">
            <div className="checkout-grid">
              {/* Left: Order Summary */}
              <div className="order-summary">
                <h2 className="section-title">
                  <ion-icon name="document-text-outline"></ion-icon>
                  Order Summary
                </h2>

                <div className="summary-card">
                  <div className="summary-header">
                    <h3>{bookingData.packageName || bookingData.package_name}</h3>
                    <span className="order-badge">{bookingData.bookingType || bookingData.order_type}</span>
                  </div>

                  <div className="summary-details">
                    <div className="detail-row">
                      <span className="label">Customer Name:</span>
                      <span className="value">{bookingData.firstName} {bookingData.lastName}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span className="value">{bookingData.email}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span className="value">{bookingData.phone}</span>
                    </div>

                    {bookingData.travelDate && (
                      <div className="detail-row">
                        <span className="label">Travel Date:</span>
                        <span className="value">{new Date(bookingData.travelDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    {bookingData.numAdults && (
                      <div className="detail-row">
                        <span className="label">Travelers:</span>
                        <span className="value">
                          {bookingData.numAdults} Adult{bookingData.numAdults > 1 ? 's' : ''}
                          {bookingData.numChildren > 0 && `, ${bookingData.numChildren} Child${bookingData.numChildren > 1 ? 'ren' : ''}`}
                        </span>
                      </div>
                    )}

                    {bookingData.specialRequests && (
                      <div className="detail-row">
                        <span className="label">Special Requests:</span>
                        <span className="value">{bookingData.specialRequests}</span>
                      </div>
                    )}
                  </div>

                  <div className="divider"></div>

                  <div className="pricing">
                    <div className="price-row">
                      <span className="label">Subtotal:</span>
                      <span className="value">₹{bookingData.totalAmount?.toLocaleString()}</span>
                    </div>

                    <div className="price-row total">
                      <span className="label">Total Amount:</span>
                      <span className="value">₹{bookingData.totalAmount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="help-card">
                  <ion-icon name="headset-outline"></ion-icon>
                  <div>
                    <h4>Need Help?</h4>
                    <p>Call us at <a href="tel:+916283279859">+91 6283279859</a></p>
                  </div>
                </div>
              </div>

              {/* Right: Payment Methods */}
              <div className="payment-section">
                <h2 className="section-title">
                  <ion-icon name="card-outline"></ion-icon>
                  Select Payment Method
                </h2>

                <div className="payment-methods">
                  {/* UPI Payment - Active */}
                  <div
                    className={`payment-option ${selectedPayment === 'upi' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('upi')}
                  >
                    <div className="option-header">
                      <div className="option-radio">
                        <div className={`radio-circle ${selectedPayment === 'upi' ? 'checked' : ''}`}>
                          {selectedPayment === 'upi' && <div className="radio-dot"></div>}
                        </div>
                      </div>
                      <div className="option-info">
                        <div className="option-title">
                          <ion-icon name="logo-google"></ion-icon>
                          <h3>UPI Payment</h3>
                        </div>
                        <p>Pay using any UPI app</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Payment - Coming Soon */}
                  <div
                    className="payment-option disabled"
                    onClick={() => handlePaymentMethodClick('card')}
                  >
                    <div className="option-header">
                      <div className="option-radio">
                        <div className="radio-circle"></div>
                      </div>
                      <div className="option-info">
                        <div className="option-title">
                          <ion-icon name="card-outline"></ion-icon>
                          <h3>Credit / Debit Card</h3>
                          <span className="coming-soon-badge">Coming Soon</span>
                        </div>
                        <p>Pay using Credit or Debit Card</p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer - Coming Soon */}
                  <div
                    className="payment-option disabled"
                    onClick={() => handlePaymentMethodClick('bank')}
                  >
                    <div className="option-header">
                      <div className="option-radio">
                        <div className="radio-circle"></div>
                      </div>
                      <div className="option-info">
                        <div className="option-title">
                          <ion-icon name="business-outline"></ion-icon>
                          <h3>Bank Transfer</h3>
                          <span className="coming-soon-badge">Coming Soon</span>
                        </div>
                        <p>Direct bank transfer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UPI Details Section */}
                {selectedPayment === 'upi' && (
                  <div className="payment-details">
                    <div className="qr-section">
                      <h3>Scan QR Code to Pay</h3>
                      <div className="qr-placeholder">
                        <ion-icon name="qr-code-outline"></ion-icon>
                        <div className="coming-soon-text">Coming Soon</div>
                      </div>
                      <p className="qr-instruction">Scan with any UPI app like Google Pay, PhonePe, Paytm</p>
                    </div>

                    <div className="payment-note">
                      <ion-icon name="information-circle-outline"></ion-icon>
                      <p>Payment processing will be activated soon. Your booking details have been saved.</p>
                    </div>

                    <button
                      className="btn btn-primary proceed-btn"
                      onClick={handleProceedPayment}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Modal */}
        {showComingSoonModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <ion-icon name="construct-outline"></ion-icon>
              </div>
              <h2 className="modal-title">Coming Soon!</h2>
              <p className="modal-message">
                Our payment processing system is currently under development.
                We'll notify you once it's ready. Your booking details have been saved.
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
        .checkout-hero {
          padding: 140px 0 80px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          text-align: center;
          color: var(--white);
        }

        .hero-title {
          margin-bottom: 15px;
        }

        .hero-subtitle {
          font-size: var(--fs-4);
          opacity: 0.95;
        }

        .checkout-content {
          padding: 80px 0;
          background: var(--cultured);
          min-height: 70vh;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: var(--fs-3);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 30px;
        }

        .section-title ion-icon {
          font-size: 28px;
          color: var(--bright-navy-blue);
        }

        /* Order Summary */
        .order-summary {
          height: fit-content;
        }

        .summary-card {
          background: var(--white);
          border-radius: var(--radius-25);
          padding: 35px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
          margin-bottom: 25px;
        }

        .summary-header {
          margin-bottom: 25px;
        }

        .summary-header h3 {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .order-badge {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          color: var(--white);
          border-radius: 20px;
          font-size: var(--fs-7);
          text-transform: uppercase;
          font-weight: var(--fw-600);
        }

        .summary-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .detail-row .label {
          color: var(--spanish-gray);
          font-weight: var(--fw-500);
          font-size: var(--fs-6);
        }

        .detail-row .value {
          color: var(--gunmetal);
          font-weight: var(--fw-600);
          font-size: var(--fs-6);
          text-align: right;
          max-width: 60%;
        }

        .divider {
          height: 1px;
          background: var(--gainsboro);
          margin: 25px 0;
        }

        .pricing {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-row .label {
          font-size: var(--fs-5);
          color: var(--spanish-gray);
          font-weight: var(--fw-500);
        }

        .price-row .value {
          font-size: var(--fs-4);
          color: var(--gunmetal);
          font-weight: var(--fw-700);
        }

        .price-row.total {
          padding: 20px;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          border-radius: var(--radius-15);
          margin-top: 10px;
        }

        .price-row.total .label,
        .price-row.total .value {
          color: var(--white);
          font-size: var(--fs-3);
        }

        .help-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          background: var(--white);
          border-radius: var(--radius-15);
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        .help-card ion-icon {
          font-size: 48px;
          color: var(--bright-navy-blue);
          flex-shrink: 0;
        }

        .help-card h4 {
          font-size: var(--fs-5);
          color: var(--oxford-blue);
          margin-bottom: 5px;
        }

        .help-card p {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
        }

        .help-card a {
          color: var(--bright-navy-blue);
          font-weight: var(--fw-600);
          text-decoration: none;
        }

        .help-card a:hover {
          text-decoration: underline;
        }

        /* Payment Section */
        .payment-section {
          background: var(--white);
          border-radius: var(--radius-25);
          padding: 35px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .payment-option {
          padding: 25px;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          cursor: pointer;
          transition: var(--transition);
        }

        .payment-option:hover:not(.disabled) {
          border-color: var(--bright-navy-blue);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.15);
        }

        .payment-option.active {
          border-color: var(--bright-navy-blue);
          background: rgba(102, 126, 234, 0.05);
        }

        .payment-option.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .option-header {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .option-radio {
          flex-shrink: 0;
        }

        .radio-circle {
          width: 24px;
          height: 24px;
          border: 2px solid var(--gainsboro);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .payment-option.active .radio-circle {
          border-color: var(--bright-navy-blue);
        }

        .radio-circle.checked {
          border-color: var(--bright-navy-blue);
        }

        .radio-dot {
          width: 12px;
          height: 12px;
          background: var(--bright-navy-blue);
          border-radius: 50%;
        }

        .option-info {
          flex: 1;
        }

        .option-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 5px;
        }

        .option-title ion-icon {
          font-size: 28px;
          color: var(--bright-navy-blue);
        }

        .option-title h3 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          font-weight: var(--fw-600);
        }

        .coming-soon-badge {
          display: inline-block;
          padding: 4px 12px;
          background: linear-gradient(135deg, #ffa502, #ff6348);
          color: var(--white);
          border-radius: 15px;
          font-size: 11px;
          font-weight: var(--fw-700);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .option-info p {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
        }

        /* Payment Details */
        .payment-details {
          padding: 30px;
          background: var(--cultured);
          border-radius: var(--radius-15);
        }

        .qr-section {
          text-align: center;
          margin-bottom: 30px;
        }

        .qr-section h3 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 25px;
        }

        .qr-placeholder {
          width: 280px;
          height: 280px;
          margin: 0 auto 20px;
          background: var(--white);
          border: 3px dashed var(--gainsboro);
          border-radius: var(--radius-15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          position: relative;
        }

        .qr-placeholder ion-icon {
          font-size: 100px;
          color: var(--spanish-gray);
          opacity: 0.3;
        }

        .coming-soon-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--fs-3);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          background: rgba(255, 255, 255, 0.95);
          padding: 15px 30px;
          border-radius: var(--radius-15);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .qr-instruction {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
          line-height: 1.6;
        }

        .payment-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 20px;
          background: #e3f2fd;
          border-left: 4px solid #2196f3;
          border-radius: var(--radius-10);
          margin-bottom: 25px;
        }

        .payment-note ion-icon {
          font-size: 24px;
          color: #2196f3;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .payment-note p {
          font-size: var(--fs-6);
          color: #1565c0;
          line-height: 1.6;
        }

        .proceed-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px;
          font-size: var(--fs-4);
          font-weight: var(--fw-700);
        }

        .proceed-btn ion-icon {
          font-size: 24px;
        }

        .proceed-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
          max-width: 480px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
          margin: 20px;
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
          font-size: var(--fs-2);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 15px;
        }

        .modal-message {
          font-size: var(--fs-5);
          color: var(--spanish-gray);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .modal-btn {
          min-width: 150px;
          padding: 15px 35px;
        }

        @media (max-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }

          .payment-section {
            order: 2;
          }

          .order-summary {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .checkout-hero {
            padding: 120px 0 60px;
          }

          .checkout-content {
            padding: 60px 0;
          }

          .summary-card,
          .payment-section {
            padding: 25px 20px;
          }

          .payment-option {
            padding: 20px;
          }

          .qr-placeholder {
            width: 220px;
            height: 220px;
          }

          .coming-soon-text {
            font-size: var(--fs-4);
            padding: 12px 24px;
          }

          .modal-content {
            padding: 40px 30px;
          }
        }
      `}</style>
    </>
  )
}
