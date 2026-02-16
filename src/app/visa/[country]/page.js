'use client'

import { useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import visaData from '../../../../data/new_data.json'

const US_CATEGORIES = ['Tourism', 'Business', 'Dropbox']

export default function CountryVisaPage({ params }) {
  const countrySlug = params.country
  const visaInfo = visaData.find(
    (visa) => visa.Country.toLowerCase().replace(/\s+/g, '-') === countrySlug
  )

  if (!visaInfo) {
    notFound()
  }

  const isUSA = visaInfo.Country === 'United States'
  const pricingOptions = visaInfo['Visa Pricing Options'] || []

  // For USA: separate student option from regular options
  const studentOption = isUSA ? pricingOptions.find(o => o.Type === 'Student') : null
  const regularOptions = isUSA
    ? pricingOptions.filter(o => o.Type !== 'Student')
    : pricingOptions

  const hasMultipleTabs = regularOptions.length > 1

  const [activeTab, setActiveTab] = useState(0)
  const [travellers, setTravellers] = useState(1)
  const [usaCategory, setUsaCategory] = useState('Tourism')
  const [showStudentPricing, setShowStudentPricing] = useState(false)

  // Get current pricing option based on selections
  const currentOption = useMemo(() => {
    if (isUSA && showStudentPricing && studentOption) {
      return studentOption
    }
    return regularOptions[activeTab] || regularOptions[0]
  }, [activeTab, isUSA, showStudentPricing, studentOption, regularOptions])

  // Parse price string to number
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0
    return parseInt(priceStr.replace(/[^\d]/g, ''))
  }

  // Format number to Indian currency
  const formatPrice = (num) => {
    if (num <= 0) return '₹0'
    return '₹' + num.toLocaleString('en-IN')
  }

  // Calculate guaranteed date
  const calculateGuaranteedDate = (processingText) => {
    if (!processingText) return null
    const today = new Date()
    const daysMatch = processingText.match(/(\d+)/)
    if (daysMatch) {
      const days = parseInt(daysMatch[1])
      const guaranteedDate = new Date(today)
      guaranteedDate.setDate(today.getDate() + days)
      return guaranteedDate
    }
    return null
  }

  const formatDateShort = (date) => {
    if (!date) return ''
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    return `${day} ${month}`
  }

  const formatDateLong = (date) => {
    if (!date) return ''
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'
    const displayHour = hours % 12 || 12
    return `${day}${getOrdinal(day)} ${month}, ${displayHour}:${minutes} ${ampm}`
  }

  const getOrdinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }

  // Processing days for current option
  const processingDaysText = currentOption['Processing Days'] || currentOption['Get on'] || null
  const guaranteedDate = calculateGuaranteedDate(processingDaysText)

  // Pricing calculations
  const govtFee = parsePrice(currentOption['Pay Now Govt Fee'])
  const waynexFee = parsePrice(currentOption['Waynex Fee'] || currentOption['Pay Later Waynex Fee'] || '₹0')
  const totalPerPerson = govtFee + waynexFee

  const totalGovtFee = govtFee * travellers
  const totalWaynexFee = waynexFee * travellers
  const grandTotal = totalPerPerson * travellers

  // Check if Waynex fee is pay later
  const isPayLater = !!currentOption['Pay Later Waynex Fee']

  // Visa info fields
  const visaInfoData = visaInfo['Visa Info'] || {}

  return (
    <>
      <Header />

      <main>
        <article>
          {/* Hero Section with Video/Image */}
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
                    <span>Visa Guaranteed {processingDaysText ? `in ${processingDaysText}` : ''}</span>
                  </div>
                  <div className="hero-cta-wrapper">
                    <Link href={`/visa/apply?country=${visaInfo.Country}`} className="btn btn-primary btn-hero-cta">Apply Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visa Information Section */}
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
                    {(visaInfoData['Visa Type'] || visaInfoData['Type']) && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper blue">
                          <ion-icon name="document-text-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Visa Type:</h4>
                          <p>{visaInfoData['Visa Type'] || visaInfoData['Type']}</p>
                        </div>
                      </div>
                    )}

                    {(visaInfoData['Length of Stay'] || visaInfoData['Max Stay']) && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper cyan">
                          <ion-icon name="calendar-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Length of Stay:</h4>
                          <p>{visaInfoData['Length of Stay'] || visaInfoData['Max Stay']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfoData['Validity'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper green">
                          <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Validity:</h4>
                          <p>{visaInfoData['Validity']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfoData['Entry'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper purple">
                          <ion-icon name="enter-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Entry:</h4>
                          <p>{visaInfoData['Entry']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfoData['Method'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper blue">
                          <ion-icon name="phone-portrait-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Method:</h4>
                          <p>{visaInfoData['Method']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfoData['Visa Accepted At'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper cyan">
                          <ion-icon name="airplane-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>Accepted At:</h4>
                          <p>{visaInfoData['Visa Accepted At']}</p>
                        </div>
                      </div>
                    )}

                    {visaInfoData['One-Click Application'] && (
                      <div className="info-card-atlys">
                        <div className="icon-wrapper green">
                          <ion-icon name="flash-outline"></ion-icon>
                        </div>
                        <div>
                          <h4>One-Click:</h4>
                          <p>{visaInfoData['One-Click Application']}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Guaranteed Visa Section */}
                  {guaranteedDate && (
                    <div className="guaranteed-section">
                      <h3 className="h3">Get a Guaranteed Visa on</h3>
                      <div className="guarantee-date-card">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <div>
                          <p className="guarantee-date">{guaranteedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          <a href="#" className="view-timeline">View Timeline</a>
                        </div>
                      </div>
                    </div>
                  )}

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

                    {/* USA Category Selector */}
                    {isUSA && (
                      <div className="usa-category-selector">
                        <label className="category-label">Visa Category</label>
                        <div className="category-tabs">
                          {US_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              className={`category-tab ${usaCategory === cat && !showStudentPricing ? 'active' : ''}`}
                              onClick={() => { setUsaCategory(cat); setShowStudentPricing(false); setActiveTab(0) }}
                            >
                              {cat}
                            </button>
                          ))}
                          {studentOption && (
                            <button
                              className={`category-tab ${showStudentPricing ? 'active' : ''}`}
                              onClick={() => setShowStudentPricing(true)}
                            >
                              Student
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Processing Speed Tabs */}
                    {hasMultipleTabs && !(isUSA && showStudentPricing) && (
                      <div className="processing-tabs">
                        {regularOptions.map((opt, idx) => {
                          const optProcessing = opt['Processing Days'] || opt['Get on'] || ''
                          const optDate = calculateGuaranteedDate(optProcessing)
                          const isStandard = (opt.Type || opt['Processing Time'] || '').toLowerCase() === 'standard'
                          const isFaster = !isStandard

                          return (
                            <button
                              key={idx}
                              className={`processing-tab ${activeTab === idx ? 'active' : ''}`}
                              onClick={() => setActiveTab(idx)}
                            >
                              {isStandard ? (
                                <>
                                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                                  <span>Guaranteed by {optDate ? formatDateLong(optDate) : optProcessing}</span>
                                </>
                              ) : (
                                <>
                                  <ion-icon name="flash-outline"></ion-icon>
                                  <span>{optProcessing} faster</span>
                                </>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Single option - show guaranteed date */}
                    {!hasMultipleTabs && guaranteedDate && (
                      <div className="visa-guarantee-sidebar">
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                        <span>Guaranteed by {formatDateLong(guaranteedDate)}</span>
                      </div>
                    )}

                    {/* Student pricing header */}
                    {isUSA && showStudentPricing && (
                      <div className="visa-guarantee-sidebar student-tab">
                        <ion-icon name="school-outline"></ion-icon>
                        <span>Student Visa - {studentOption?.['Processing Days'] || ''}</span>
                      </div>
                    )}

                    {/* Travellers Counter */}
                    <div className="travellers-section">
                      <div className="travellers-row">
                        <div className="travellers-label">
                          <ion-icon name="person-outline"></ion-icon>
                          <span>Travellers</span>
                        </div>
                        <div className="travellers-counter">
                          <button
                            className="counter-btn"
                            onClick={() => setTravellers(Math.max(1, travellers - 1))}
                            disabled={travellers <= 1}
                          >
                            <ion-icon name="remove-circle-outline"></ion-icon>
                          </button>
                          <span className="counter-value">{travellers}</span>
                          <button
                            className="counter-btn"
                            onClick={() => setTravellers(Math.min(10, travellers + 1))}
                          >
                            <ion-icon name="add-circle-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="price-section">
                      <div className="price-amount">{formatPrice(totalGovtFee)}</div>
                      <p className="price-label">TO BE PAID NOW</p>
                    </div>

                    {/* Start Application Button */}
                    <Link
                      href={`/visa/apply?country=${visaInfo.Country}${isUSA ? `&category=${showStudentPricing ? 'Student' : usaCategory}` : ''}&processing=${(currentOption.Type || currentOption['Processing Time'] || 'Standard')}&travellers=${travellers}`}
                      className="btn-start-application"
                    >
                      Start Application
                    </Link>

                    {/* Payment Breakdown */}
                    <div className="payment-breakdown">
                      {/* Pay Now - Government Fee */}
                      <div className="payment-item">
                        <div className="payment-icon">
                          <ion-icon name="business-outline"></ion-icon>
                        </div>
                        <div className="payment-details">
                          <span className="payment-label">Pay Now</span>
                          <span className="payment-sub">Government fee</span>
                        </div>
                        <span className="payment-amount">{formatPrice(totalGovtFee)}</span>
                      </div>

                      {/* Waynex Fee */}
                      {waynexFee > 0 && (
                        <div className="payment-item">
                          <div className="payment-icon">
                            <ion-icon name="time-outline"></ion-icon>
                          </div>
                          <div className="payment-details">
                            <span className="payment-label">{isPayLater ? 'Pay Later' : `Pay on ${guaranteedDate ? formatDateShort(guaranteedDate) : 'delivery'}`}</span>
                            <span className="payment-sub">Waynex Fees</span>
                          </div>
                          <div className="payment-amount-wrap">
                            <span className="payment-amount">{formatPrice(totalWaynexFee)}</span>
                            <span className="payment-amount-old">{formatPrice(totalWaynexFee + (500 * travellers))}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total Amount */}
                    <div className="total-amount">
                      <div className="total-label-wrap">
                        <ion-icon name="receipt-outline"></ion-icon>
                        <span>Total Amount</span>
                      </div>
                      <span className="total-price">{formatPrice(grandTotal)}</span>
                    </div>

                    {/* Protection Badge */}
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
    </>
  )
}
