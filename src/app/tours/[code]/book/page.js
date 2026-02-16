'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import toursData from '../../../../../data/waynex_tours_complete.json'
import { extractCodeFromSlug, getTourImage } from '@/utils/tourUtils'
import { session } from '@/lib/api'

function findTourByCode(code) {
  const { domestic, international } = toursData.data

  for (const region in domestic) {
    const tour = domestic[region].find(t => t.code === code)
    if (tour) return { ...tour, type: 'domestic', region }
  }

  for (const region in international) {
    const tour = international[region].find(t => t.code === code)
    if (tour) return { ...tour, type: 'international', region }
  }

  return null
}

export default function TourBookingPage({ params }) {
  const router = useRouter()
  const slug = params.code
  const code = extractCodeFromSlug(slug)
  const tour = findTourByCode(code)

  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Travel Details
    travelDate: '',
    numAdults: 1,
    numChildren: 0,

    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Additional
    specialRequests: '',

    // Terms
    acceptTerms: false
  })

  // Auth guard - redirect to login if not signed in
  useEffect(() => {
    if (!session.isAuthenticated()) {
      const returnUrl = `/tours/${slug}/book`
      router.replace(`/auth/login?redirect=${encodeURIComponent(returnUrl)}`)
      return
    }
    const currentUser = session.getUser()
    if (currentUser) {
      setUser(currentUser)
      setFormData(prev => ({
        ...prev,
        firstName: currentUser.first_name || '',
        lastName: currentUser.last_name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address?.street || '',
        city: currentUser.address?.city || '',
        state: currentUser.address?.state || '',
        pincode: currentUser.address?.pincode || '',
      }))
    }
  }, [router, slug])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const calculateTotal = () => {
    if (!tour || !tour.price) return 0
    const adults = parseInt(formData.numAdults) || 0
    const children = parseInt(formData.numChildren) || 0
    return (adults * tour.price) + (children * (tour.price * 0.7)) // 30% discount for children
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions')
      return
    }

    const bookingData = {
      tour_code: tour.code,
      tour_name: tour.name,
      tour_type: tour.type,
      ...formData,
      totalAmount: calculateTotal()
    }

    // Store booking data in session storage
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData))

    // Redirect to checkout
    router.push('/checkout')
  }

  if (!tour) {
    return (
      <>
        <Header />
        <main style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1>Tour not found</h1>
        </main>
        <Footer />
      </>
    )
  }

  const totalAmount = calculateTotal()

  return (
    <>
      <Header />

      <main>
        <article>
          <section className="application-hero">
            <div className="container">
              <div className="application-hero-content">
                <div className="hero-badge">Book Your Tour</div>
                <h1 className="application-hero-title">{tour.name}</h1>
                <p className="application-hero-text">Complete the form below to book your dream vacation</p>
              </div>
            </div>
          </section>

          <section className="application-form-section">
            <div className="container">
              <div className="form-layout">
                <div className="form-container">
                  <form onSubmit={handleSubmit} className="tour-booking-form">

                    {/* Personal Details */}
                    <div className="form-section">
                      <h3 className="section-heading">Personal Information</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="field-label">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="field-label">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Travel Details */}
                    <div className="form-section">
                      <h3 className="section-heading">Travel Details</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="field-label">Travel Date *</label>
                          <input
                            type="date"
                            name="travelDate"
                            value={formData.travelDate}
                            onChange={handleInputChange}
                            className="field-input"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">Number of Adults *</label>
                          <input
                            type="number"
                            name="numAdults"
                            value={formData.numAdults}
                            onChange={handleInputChange}
                            className="field-input"
                            min="1"
                            max="20"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">Number of Children (0-12 yrs)</label>
                          <input
                            type="number"
                            name="numChildren"
                            value={formData.numChildren}
                            onChange={handleInputChange}
                            className="field-input"
                            min="0"
                            max="20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="form-section">
                      <h3 className="section-heading">Address Information</h3>

                      <div className="form-group">
                        <label className="field-label">Street Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="field-input"
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="field-label">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="field-input"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="form-section">
                      <h3 className="section-heading">Additional Information</h3>

                      <div className="form-group">
                        <label className="field-label">Special Requests (Optional)</label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          className="field-textarea"
                          rows="4"
                          placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                        ></textarea>
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="form-section">
                      <div className="terms-checkbox">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="acceptTerms">
                          I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and <a href="/refunds" target="_blank">Cancellation Policy</a>
                        </label>
                      </div>

                      <button type="submit" className="submit-button">
                        Proceed to Payment - ₹{totalAmount.toLocaleString()}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Booking Summary Sidebar */}
                <div className="booking-summary">
                  <div className="summary-card">
                    <div className="summary-image">
                      <img src={getTourImage(tour)} alt={tour.name} />
                    </div>

                    <div className="summary-content">
                      <h3 className="summary-title">Booking Summary</h3>

                      <div className="summary-item">
                        <span className="summary-label">Tour Name:</span>
                        <span className="summary-value">{tour.name}</span>
                      </div>

                      <div className="summary-item">
                        <span className="summary-label">Duration:</span>
                        <span className="summary-value">{tour.duration}</span>
                      </div>

                      <div className="summary-item">
                        <span className="summary-label">Type:</span>
                        <span className="summary-value">{tour.type === 'domestic' ? 'Domestic' : 'International'}</span>
                      </div>

                      <div className="summary-divider"></div>

                      <div className="summary-item">
                        <span className="summary-label">Adults:</span>
                        <span className="summary-value">{formData.numAdults} × ₹{tour.price?.toLocaleString()}</span>
                      </div>

                      {formData.numChildren > 0 && (
                        <div className="summary-item">
                          <span className="summary-label">Children:</span>
                          <span className="summary-value">{formData.numChildren} × ₹{(tour.price * 0.7).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="summary-divider"></div>

                      <div className="summary-total">
                        <span className="total-label">Total Amount:</span>
                        <span className="total-value">₹{totalAmount.toLocaleString()}</span>
                      </div>

                      <div className="summary-note">
                        <ion-icon name="information-circle-outline"></ion-icon>
                        <p>Final amount may vary based on seasonal pricing and availability</p>
                      </div>
                    </div>
                  </div>

                  <div className="help-card">
                    <h4>Need Assistance?</h4>
                    <p>Our travel experts are here to help</p>
                    <a href="tel:+916283279859" className="help-link">
                      <ion-icon name="call-outline"></ion-icon>
                      +91 6283279859
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <GoTop />

      <style jsx>{`
        .application-hero {
          padding: 160px 0 80px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          position: relative;
          overflow: hidden;
        }

        .application-hero-content {
          text-align: center;
          color: var(--white);
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: var(--fs-7);
          font-weight: var(--fw-600);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .application-hero-title {
          font-size: var(--fs-1);
          font-weight: var(--fw-700);
          margin-bottom: 15px;
          line-height: 1.2;
        }

        .application-hero-text {
          font-size: var(--fs-4);
          opacity: 0.95;
        }

        .application-form-section {
          padding: 80px 0;
          background: var(--cultured);
        }

        .form-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .form-container {
          background: var(--white);
          border-radius: var(--radius-25);
          padding: 50px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
        }

        .tour-booking-form {
          width: 100%;
        }

        .form-section {
          margin-bottom: 40px;
        }

        .section-heading {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid var(--gainsboro);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .field-label {
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          color: var(--gunmetal);
          margin-bottom: 8px;
        }

        .field-input,
        .field-textarea {
          padding: 14px 18px;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          font-size: var(--fs-5);
          font-family: var(--ff-poppins);
          transition: var(--transition);
        }

        .field-input:focus,
        .field-textarea:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
        }

        .field-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .terms-checkbox {
          display: flex;
          align-items: start;
          gap: 12px;
          margin-bottom: 30px;
          padding: 20px;
          background: var(--cultured);
          border-radius: var(--radius-15);
        }

        .terms-checkbox input[type="checkbox"] {
          margin-top: 4px;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .terms-checkbox label {
          font-size: var(--fs-6);
          color: var(--gunmetal);
          line-height: 1.6;
        }

        .terms-checkbox a {
          color: var(--bright-navy-blue);
          text-decoration: underline;
        }

        .submit-button {
          width: 100%;
          padding: 18px 30px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          color: var(--white);
          border: none;
          border-radius: 50px;
          font-size: var(--fs-4);
          font-weight: var(--fw-700);
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 5px 20px rgba(74, 144, 226, 0.4);
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(74, 144, 226, 0.5);
        }

        /* Sidebar */
        .booking-summary {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .summary-card {
          background: var(--white);
          border-radius: var(--radius-25);
          overflow: hidden;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
          margin-bottom: 20px;
        }

        .summary-image {
          height: 200px;
          overflow: hidden;
        }

        .summary-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .summary-content {
          padding: 30px;
        }

        .summary-title {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 25px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
          gap: 10px;
        }

        .summary-label {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
        }

        .summary-value {
          font-size: var(--fs-6);
          color: var(--gunmetal);
          font-weight: var(--fw-600);
          text-align: right;
        }

        .summary-divider {
          height: 1px;
          background: var(--gainsboro);
          margin: 20px 0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: var(--cultured);
          border-radius: var(--radius-15);
          margin-top: 20px;
        }

        .total-label {
          font-size: var(--fs-4);
          font-weight: var(--fw-600);
          color: var(--oxford-blue);
        }

        .total-value {
          font-size: var(--fs-2);
          font-weight: var(--fw-700);
          color: var(--bright-navy-blue);
        }

        .summary-note {
          display: flex;
          gap: 10px;
          align-items: start;
          padding: 15px;
          background: rgba(74, 144, 226, 0.1);
          border-radius: var(--radius-15);
          margin-top: 20px;
        }

        .summary-note ion-icon {
          font-size: 20px;
          color: var(--bright-navy-blue);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .summary-note p {
          font-size: var(--fs-7);
          color: var(--gunmetal);
          line-height: 1.5;
        }

        .help-card {
          background: var(--white);
          padding: 30px;
          border-radius: var(--radius-25);
          text-align: center;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
        }

        .help-card h4 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .help-card p {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
          margin-bottom: 20px;
        }

        .help-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          background: var(--bright-navy-blue);
          color: var(--white);
          border-radius: 50px;
          text-decoration: none;
          font-weight: var(--fw-600);
          transition: var(--transition);
        }

        .help-link:hover {
          background: var(--yale-blue);
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .form-layout {
            grid-template-columns: 1fr;
          }

          .booking-summary {
            position: static;
          }

          .form-container {
            padding: 30px 20px;
          }
        }

        @media (max-width: 768px) {
          .application-hero {
            padding: 120px 0 60px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
