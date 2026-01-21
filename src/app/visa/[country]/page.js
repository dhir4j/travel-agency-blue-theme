'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import visaData from '../../../../data/data.json'

export default function CountryVisaPage({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])
  const countrySlug = params.country
  const visaInfo = visaData.find(
    (visa) => visa.Country.toLowerCase().replace(/\s+/g, '-') === countrySlug
  )

  if (!visaInfo) {
    notFound()
  }

  // Calculate guaranteed date based on "Get on" field
  const calculateGuaranteedDate = (getOnText) => {
    const today = new Date()
    // Extract the maximum number of days from the text (e.g., "3-5 days" -> 5)
    const daysMatch = getOnText.match(/(\d+)(?:-(\d+))?\s*(?:day|hour)/i)

    if (daysMatch) {
      const maxDays = daysMatch[2] ? parseInt(daysMatch[2]) : parseInt(daysMatch[1])
      // If it's hours, convert to days (round up)
      const isHours = getOnText.toLowerCase().includes('hour')
      const daysToAdd = isHours ? Math.ceil(maxDays / 24) : maxDays

      const guaranteedDate = new Date(today)
      guaranteedDate.setDate(today.getDate() + daysToAdd)

      // Format date as "DD Month YYYY" (e.g., "25 January 2024")
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      return guaranteedDate.toLocaleDateString('en-US', options)
    }

    return getOnText // Fallback to original text if parsing fails
  }

  const guaranteedDate = calculateGuaranteedDate(visaInfo['Get on'])

  return (
    <>
      <Header />

      <main>
        <article>
          {/* Hero Section with Video/Image - Atlys Style */}
          <section className="country-hero-atlys">
            <div className="container">
              <div className="hero-media-container">
                {visaInfo['Video URL'] ? (
                  <video autoPlay loop muted playsInline className="hero-video-atlys">
                    <source src={visaInfo['Video URL']} type="video/mp4" />
                  </video>
                ) : (
                  <img src={visaInfo.ImageURL} alt={visaInfo.Country} className="hero-image-atlys" />
                )}
                <div className="hero-content-centered">
                  <h1 className="h1 hero-title-atlys">{visaInfo.Country} Visa from India</h1>
                  <div className="visa-guarantee">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <span>Visa Guaranteed in {visaInfo['Get on']}</span>
                  </div>
                  <div className="hero-cta-wrapper">
                    <button className="btn btn-primary btn-hero-cta" onClick={() => setIsModalOpen(true)}>Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visa Information Section - Atlys Style */}
          <section className="visa-info-section-atlys">
            <div className="container">
              <div className="visa-info-layout">
                {/* Left Side - Visa Information */}
                <div className="visa-info-main">
                  {/* Trust Badge */}
                  <div className="trust-badge">
                    <div className="rating-badge">
                      <ion-icon name="trophy-outline"></ion-icon>
                      <span className="rating">4.7</span>
                    </div>
                    <div>
                      <h4 className="trust-title">Loved and Trusted by 1.25L Indians</h4>
                      <p className="trust-subtitle">Rated 5 stars by moms, newlyweds, and last-minute planners</p>
                    </div>
                  </div>

                  {/* Visa Information Cards */}
                  <div className="info-section-header">
                    <h2 className="h2 section-title">{visaInfo.Country} Visa Information</h2>
                  </div>

                  <div className="info-cards-grid-atlys">
                    {visaInfo['Visa Info']['Visa Type'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper blue">
                          <ion-icon name="document-text-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Visa Type:</h4>
                          <p>{visaInfo['Visa Info']['Visa Type']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfo['Visa Info']['Length of Stay'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper cyan">
                          <ion-icon name="calendar-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Length of Stay:</h4>
                          <p>{visaInfo['Visa Info']['Length of Stay']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfo['Visa Info']['Validity'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper green">
                          <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Validity:</h4>
                          <p>{visaInfo['Visa Info']['Validity']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfo['Visa Info']['Entry'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper purple">
                          <ion-icon name="enter-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Entry:</h4>
                          <p>{visaInfo['Visa Info']['Entry']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfo['Visa Info']['Method'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper blue">
                          <ion-icon name="phone-portrait-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Method:</h4>
                          <p>{visaInfo['Visa Info']['Method']}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Guaranteed Visa Section */}
                  <div className="guaranteed-section">
                    <h3 className="h3">Get a Guaranteed Visa on</h3>
                    <div className="guarantee-date-card">
                      <ion-icon name="calendar-outline"></ion-icon>
                      <div>
                        <p className="guarantee-date">{guaranteedDate}</p>
                        <a href="#" className="view-timeline">View Timeline</a>
                      </div>
                    </div>
                  </div>

                  {/* Visa Requirements */}
                  <div className="requirements-section">
                    <h2 className="h2 section-title">{visaInfo.Country} Visa Requirements</h2>
                    {visaInfo['Required Docs'] && visaInfo['Required Docs'].length > 0 ? (
                      <div className="requirements-list">
                        {visaInfo['Required Docs'].map((doc, index) => (
                          <div key={index} className="requirement-item">
                            <ion-icon name="document-outline"></ion-icon>
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="section-text">Minimal documentation required. Contact us for specific requirements.</p>
                    )}
                  </div>

                  {/* How It Works */}
                  <div className="process-section-atlys">
                    <h2 className="h2 section-title">How {visaInfo.Country} Visa Process Works</h2>
                    <div className="process-steps-atlys">
                      <div className="step-atlys">
                        <div className="step-number">1</div>
                        <h4>Fill Application</h4>
                        <p>Complete the online visa application form</p>
                      </div>
                      <div className="step-atlys">
                        <div className="step-number">2</div>
                        <h4>Submit Documents</h4>
                        <p>Upload required documents securely</p>
                      </div>
                      <div className="step-atlys">
                        <div className="step-number">3</div>
                        <h4>Payment</h4>
                        <p>Make secure payment for processing</p>
                      </div>
                      <div className="step-atlys">
                        <div className="step-number">4</div>
                        <h4>Get Visa</h4>
                        <p>Receive your visa on time</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Pricing Sidebar */}
                <div className="pricing-sidebar-atlys">
                  <div className="pricing-card-sticky">
                    <div className="visa-guarantee-sidebar">
                      <ion-icon name="shield-checkmark-outline"></ion-icon>
                      <span>Visa Guaranteed in {visaInfo['Get on']}</span>
                    </div>

                    <div className="price-section">
                      <div className="price-amount">{visaInfo.Price}</div>
                      <p className="price-label">TO BE PAID NOW</p>
                    </div>

                    <button className="btn-start-application" onClick={() => setIsModalOpen(true)}>Start Application</button>

                    <div className="payment-breakdown">
                      <div className="payment-item">
                        <div className="payment-icon">
                          <ion-icon name="card-outline"></ion-icon>
                        </div>
                        <div className="payment-details">
                          <span className="payment-label">Pay Now</span>
                          <span className="payment-sub">Government Fee</span>
                        </div>
                        <span className="payment-amount">{visaInfo.Price}</span>
                      </div>
                    </div>

                    <div className="total-amount">
                      <span>Total Amount</span>
                      <span className="total-price">{visaInfo.Price}</span>
                    </div>

                    <div className="protection-badge">
                      <div className="protection-header">
                        <ion-icon name="shield-outline"></ion-icon>
                        <span>Waynex Protect</span>
                        <span className="included-badge">Included!</span>
                      </div>
                      <p className="protection-text">If Visa Delayed — No Waynex Fee</p>
                      <p className="protection-text">If Rejected — 100% Refund</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <GoTop />

      {/* Application Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Apply for {visaInfo.Country} Visa</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            <div className="modal-body">
              <form className="visa-application-form-popup">
                {/* Personal Information */}
                <div className="form-section-popup">
                  <h3 className="section-heading-popup">Personal Information</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">First Name *</label>
                      <input type="text" className="form-input" placeholder="Enter first name" required />
                    </div>
                    <div className="form-group">
                      <label className="field-label">Last Name *</label>
                      <input type="text" className="form-input" placeholder="Enter last name" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Email Address *</label>
                      <input type="email" className="form-input" placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                      <label className="field-label">Phone Number *</label>
                      <input type="tel" className="form-input" placeholder="Enter phone number" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Date of Birth *</label>
                      <input type="date" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="field-label">Nationality *</label>
                      <input type="text" className="form-input" placeholder="Enter nationality" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Passport Number *</label>
                      <input type="text" className="form-input" placeholder="Enter passport number" required />
                    </div>
                    <div className="form-group">
                      <label className="field-label">Passport Expiry Date *</label>
                      <input type="date" className="form-input" required />
                    </div>
                  </div>
                </div>

                {/* Travel Information */}
                <div className="form-section-popup">
                  <h3 className="section-heading-popup">Travel Information</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Travel Date *</label>
                      <input type="date" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="field-label">Purpose of Visit *</label>
                      <select className="form-select" required>
                        <option value="">Select purpose</option>
                        <option value="tourism">Tourism</option>
                        <option value="business">Business</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="form-section-popup">
                  <h3 className="section-heading-popup">Required Documents</h3>

                  <div className="form-group">
                    <label className="field-label">Passport Copy *</label>
                    <input type="file" className="form-file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>

                  <div className="form-group">
                    <label className="field-label">Photograph *</label>
                    <input type="file" className="form-file" accept=".jpg,.jpeg,.png" />
                  </div>

                  {visaInfo['Required Docs'] && visaInfo['Required Docs'].length > 0 && (
                    <div className="upload-note">
                      <p><strong>Additional Required Documents:</strong></p>
                      <ul>
                        {visaInfo['Required Docs'].slice(0, 3).map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="form-actions-popup">
                  <div className="modal-summary">
                    <div className="summary-item">
                      <span>Destination:</span>
                      <strong>{visaInfo.Country}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Processing Time:</span>
                      <strong>{visaInfo['Get on']}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Total Amount:</span>
                      <strong className="price-highlight">{visaInfo.Price}</strong>
                    </div>
                  </div>

                  <div className="checkbox-label">
                    <input type="checkbox" required />
                    <span>I agree to the <a href="#">terms and conditions</a></span>
                  </div>

                  <div className="submit-buttons">
                    <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" className="submit-btn">Submit Application</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
