'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import toursData from '../../../../../data/waynex_tours_complete.json'
import { extractCodeFromSlug } from '@/utils/tourUtils'
import styles from './booking.module.css'

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

function BookingFormContent({ code }) {
  const tour = findTourByCode(code)

  if (!tour) {
    notFound()
  }

  const [formData, setFormData] = useState({
    // Travel Details
    tourName: tour.name,
    tourCode: tour.code,
    numberOfTravelers: '1',
    travelDay: '',
    travelMonth: '',
    travelYear: '',

    // Contact Details
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Preferences
    hotelPreference: 'Standard',
    mealPreference: 'Vegetarian',
    specialRequests: '',

    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',

    // Terms
    acceptTerms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    alert('Thank you for your booking! We will contact you shortly.')
  }

  return (
    <>
      <Header />
      <main>
        <section className={styles.applicationHero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>Book Your Tour</div>
              <h1 className={styles.heroTitle}>{tour.name} - Booking Application</h1>
              <p className={styles.heroText}>Fill out the form below to reserve your spot on this amazing journey</p>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className="container">
            <div className={styles.formLayout}>
              <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                  {/* Tour Details */}
                  <div className={styles.formSectionBlock}>
                    <h3 className={styles.sectionHeading}>Tour Details</h3>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Tour Name</label>
                        <input
                          type="text"
                          name="tourName"
                          className={styles.formInput}
                          value={formData.tourName}
                          readOnly
                          style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Tour Code</label>
                        <input
                          type="text"
                          name="tourCode"
                          className={styles.formInput}
                          value={formData.tourCode}
                          readOnly
                          style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Number of Travelers</label>
                        <select
                          name="numberOfTravelers"
                          className={styles.formSelect}
                          value={formData.numberOfTravelers}
                          onChange={handleInputChange}
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroupLabel}>
                      <label className={styles.fieldLabel}>Preferred Travel Date</label>
                      <div className={styles.dateInputs}>
                        <select name="travelDay" className={styles.formSelectDate} value={formData.travelDay} onChange={handleInputChange} required>
                          <option value="">Day</option>
                          {[...Array(31)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                        </select>
                        <select name="travelMonth" className={styles.formSelectDate} value={formData.travelMonth} onChange={handleInputChange} required>
                          <option value="">Month</option>
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) =>
                            <option key={i} value={i + 1}>{m}</option>
                          )}
                        </select>
                        <select name="travelYear" className={styles.formSelectDate} value={formData.travelYear} onChange={handleInputChange} required>
                          <option value="">Year</option>
                          {[2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className={styles.formSectionBlock}>
                    <h3 className={styles.sectionHeading}>Contact Details</h3>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name *"
                          className={styles.formInput}
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          className={styles.formInput}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number *"
                          className={styles.formInput}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="tel"
                          name="alternatePhone"
                          placeholder="Alternate Phone (Optional)"
                          className={styles.formInput}
                          value={formData.alternatePhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address *"
                          className={styles.formInput}
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="city"
                          placeholder="City *"
                          className={styles.formInput}
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="state"
                          placeholder="State *"
                          className={styles.formInput}
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Pincode *"
                          className={styles.formInput}
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className={styles.formSectionBlock}>
                    <h3 className={styles.sectionHeading}>Travel Preferences</h3>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Hotel Preference</label>
                        <select
                          name="hotelPreference"
                          className={styles.formSelect}
                          value={formData.hotelPreference}
                          onChange={handleInputChange}
                        >
                          <option value="Standard">Standard</option>
                          <option value="Deluxe">Deluxe</option>
                          <option value="Premium">Premium</option>
                          <option value="Luxury">Luxury</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Meal Preference</label>
                        <select
                          name="mealPreference"
                          className={styles.formSelect}
                          value={formData.mealPreference}
                          onChange={handleInputChange}
                        >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="Vegan">Vegan</option>
                          <option value="Jain">Jain</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Special Requests (Optional)</label>
                        <textarea
                          name="specialRequests"
                          className={styles.formTextarea}
                          placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className={styles.formSectionBlock}>
                    <h3 className={styles.sectionHeading}>Emergency Contact</h3>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="emergencyName"
                          placeholder="Emergency Contact Name *"
                          className={styles.formInput}
                          value={formData.emergencyName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="tel"
                          name="emergencyPhone"
                          placeholder="Emergency Contact Phone *"
                          className={styles.formInput}
                          value={formData.emergencyPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="emergencyRelation"
                          placeholder="Relationship *"
                          className={styles.formInput}
                          value={formData.emergencyRelation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className={styles.formActions}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <span>I have read and agree with the <a href="/terms" target="_blank">terms and conditions</a></span>
                    </label>

                    <div className={styles.submitButtons}>
                      <button type="submit" className={styles.submitBtn}>
                        <ion-icon name="paper-plane-outline"></ion-icon>
                        Submit Booking
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Sidebar */}
              <div className={styles.applicationSidebar}>
                <div className={styles.sidebarCard}>
                  <div className={styles.sidebarItem}>
                    <h4>Tour Name</h4>
                    <p className={styles.highlight}>{tour.name}</p>
                  </div>
                  <div className={styles.sidebarItem}>
                    <h4>Duration</h4>
                    <p className={styles.highlight}>{tour.duration}</p>
                  </div>
                  <div className={styles.sidebarItem}>
                    <h4>Price</h4>
                    <p className={styles.highlight}>₹{tour.price?.toLocaleString()}</p>
                    <p className={styles.subText}>per person</p>
                  </div>
                  <div className={styles.sidebarItem}>
                    <h4>Tour Type</h4>
                    <p className={styles.highlight}>{tour.type === 'domestic' ? 'Domestic' : 'International'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />
    </>
  )
}

export default function BookingPage({ params }) {
  const code = extractCodeFromSlug(params.code)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFormContent code={code} />
    </Suspense>
  )
}

function Suspense({ children, fallback }) {
  return children
}
