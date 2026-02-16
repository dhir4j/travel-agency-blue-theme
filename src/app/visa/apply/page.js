'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import visaData from '../../../../data/new_data.json'

function VisaApplicationForm() {
  const searchParams = useSearchParams()
  const country = searchParams.get('country')

  const visaInfo = visaData.find(visa => visa.Country === country)

  const [formData, setFormData] = useState({
    // Travel Details
    travellingTo: country || '',
    travellingFrom: 'India',

    // General Details
    address: '',
    city: '',
    state: '',
    zipcode: '',
    purposeOfVisit: '',
    isoCode: '',
    email: '',
    contact: '',
    travelDay: '',
    travelMonth: '',
    travelYear: '',

    // Personal Details
    firstName: '',
    lastName: '',
    nationality: 'India',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    passportNo: '',
    expiryDay: '',
    expiryMonth: '',
    expiryYear: '',

    // Documents
    passportCopy: null,
    photograph: null,

    // Terms
    acceptTerms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  if (!visaInfo) {
    return <div>Country not found</div>
  }

  return (
    <>
      <Header />

      <main>
        <article>
          <section className="application-hero">
            <div className="container">
              <div className="application-hero-content">
                <div className="hero-badge">Apply for Visa</div>
                <h1 className="application-hero-title">{country} Visa Application</h1>
                <p className="application-hero-text">Fill out the form below to start your visa application process</p>
              </div>
            </div>
          </section>

          <section className="application-form-section">
            <div className="container">
              <div className="form-layout">
                <div className="form-container">
                  <form onSubmit={handleSubmit} className="visa-application-form">
                    {/* Travel Details */}
                    <div className="form-section">
                      <h3 className="section-heading">Travel Details</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="field-label">Travelling To</label>
                          <input
                            type="text"
                            name="travellingTo"
                            className="form-input"
                            value={formData.travellingTo}
                            readOnly
                            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                          />
                        </div>
                        <div className="form-group">
                          <label className="field-label">Travelling From</label>
                          <select
                            name="travellingFrom"
                            className="form-select"
                            value={formData.travellingFrom}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="India">India</option>
                            {visaData.map((visa, index) => (
                              visa.Country !== country && (
                                <option key={index} value={visa.Country}>
                                  {visa.Country}
                                </option>
                              )
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group-label">
                        <label className="field-label">Travel Date</label>
                        <div className="date-inputs">
                          <select name="travelDay" className="form-select-date" value={formData.travelDay} onChange={handleInputChange} required>
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                          </select>
                          <select name="travelMonth" className="form-select-date" value={formData.travelMonth} onChange={handleInputChange} required>
                            <option value="">Month</option>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) =>
                              <option key={i} value={i + 1}>{m}</option>
                            )}
                          </select>
                          <select name="travelYear" className="form-select-date" value={formData.travelYear} onChange={handleInputChange} required>
                            <option value="">Year</option>
                            {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* General Details */}
                    <div className="form-section">
                      <h3 className="section-heading">General Details</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            name="address"
                            placeholder="Your current address"
                            className="form-input"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="form-input"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="state"
                            placeholder="State / Province"
                            className="form-input"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            name="zipcode"
                            placeholder="Zipcode / Pincode / Postal Code"
                            className="form-input"
                            value={formData.zipcode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="purposeOfVisit"
                            placeholder="Purpose of Visit"
                            className="form-input"
                            value={formData.purposeOfVisit}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Type your email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <select
                            name="isoCode"
                            className="form-select"
                            value={formData.isoCode}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">ISD Code</option>
                            <option value="+91">India (+91)</option>
                            <option value="+1">USA (+1)</option>
                            <option value="+44">UK (+44)</option>
                            <option value="+213">Algeria (+213)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input
                            type="tel"
                            name="contact"
                            placeholder="Contact No."
                            className="form-input"
                            value={formData.contact}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="form-section">
                      <h3 className="section-heading">Personal Details</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="form-input"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-input"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <select
                            name="nationality"
                            className="form-select"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group-label">
                        <label className="field-label">Date of Birth</label>
                        <div className="date-inputs">
                          <select name="birthDay" className="form-select-date" value={formData.birthDay} onChange={handleInputChange} required>
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                          </select>
                          <select name="birthMonth" className="form-select-date" value={formData.birthMonth} onChange={handleInputChange} required>
                            <option value="">Month</option>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) =>
                              <option key={i} value={i + 1}>{m}</option>
                            )}
                          </select>
                          <select name="birthYear" className="form-select-date" value={formData.birthYear} onChange={handleInputChange} required>
                            <option value="">Year</option>
                            {[...Array(80)].map((_, i) => {
                              const year = 2024 - i;
                              return <option key={year} value={year}>{year}</option>
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <select
                            name="gender"
                            className="form-select"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="passportNo"
                            placeholder="Passport No."
                            className="form-input"
                            value={formData.passportNo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group-label">
                        <label className="field-label">Passport Expiry Date</label>
                        <div className="date-inputs">
                          <select name="expiryDay" className="form-select-date" value={formData.expiryDay} onChange={handleInputChange} required>
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                          </select>
                          <select name="expiryMonth" className="form-select-date" value={formData.expiryMonth} onChange={handleInputChange} required>
                            <option value="">Month</option>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) =>
                              <option key={i} value={i + 1}>{m}</option>
                            )}
                          </select>
                          <select name="expiryYear" className="form-select-date" value={formData.expiryYear} onChange={handleInputChange} required>
                            <option value="">Year</option>
                            {[...Array(20)].map((_, i) => {
                              const year = 2024 + i;
                              return <option key={year} value={year}>{year}</option>
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Upload Documents */}
                    <div className="form-section">
                      <h3 className="section-heading">Upload Documents</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="upload-label">Colored Passport Copy</label>
                          <input
                            type="file"
                            name="passportCopy"
                            className="form-file"
                            onChange={handleInputChange}
                            accept="image/*,.pdf"
                          />
                        </div>
                        <div className="form-group">
                          <label className="upload-label">Colored Photograph</label>
                          <input
                            type="file"
                            name="photograph"
                            className="form-file"
                            onChange={handleInputChange}
                            accept="image/*"
                          />
                        </div>
                      </div>

                      <div className="upload-note">
                        <p><strong>Note:</strong> Upload of passport and photograph are not mandatory to complete the visa application form. You can provide us these documents later also on email: contact@waynextravels.com or on WhatsApp +97159518129</p>
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="form-actions">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          required
                        />
                        <span>I have read and agree with the <a href="/terms" target="_blank">terms and conditions</a></span>
                      </label>

                      <div className="submit-buttons">
                        <button type="submit" className="submit-btn">
                          <ion-icon name="paper-plane-outline"></ion-icon>
                          Submit Application
                        </button>
                        <button type="button" className="add-applicant-btn">
                          <ion-icon name="add-circle-outline"></ion-icon>
                          Add More Applicant
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Sidebar */}
                <div className="application-sidebar">
                  <div className="sidebar-card">
                    <div className="sidebar-item">
                      <h4>Travelling to</h4>
                      <p className="highlight">{formData.travellingTo || country}</p>
                    </div>
                    <div className="sidebar-item">
                      <h4>Travelling From</h4>
                      <p className="highlight">{formData.travellingFrom}</p>
                    </div>
                    <div className="sidebar-item">
                      <h4>Applied Visa</h4>
                      <p className="highlight">{visaInfo['Visa Info']['Visa Type'] || visaInfo['Visa Info']['Type'] || 'E-Visa'}</p>
                      <p className="sub-text">({visaInfo['Visa Info']['Entry'] || 'Single Entry'})</p>
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

export default function VisaApplicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VisaApplicationForm />
    </Suspense>
  )
}
