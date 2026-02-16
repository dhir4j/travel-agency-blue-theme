'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import visaData from '../../../data/new_data.json'

export default function VisaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef(null)

  const getStartingPrice = (visa) => {
    const options = visa['Visa Pricing Options'] || []
    if (options.length === 0) return ''
    return options[0]['Total Amount'] || options[0]['Pay Now Govt Fee'] || ''
  }

  const getProcessingTime = (visa) => {
    const options = visa['Visa Pricing Options'] || []
    if (options.length === 0) return ''
    return options[0]['Processing Days'] || options[0]['Get on'] || ''
  }

  const getVisaType = (visa) => {
    const info = visa['Visa Info'] || {}
    return info['Visa Type'] || info['Type'] || 'Visa'
  }

  // Filter visas based on search
  const filteredVisas = useMemo(() => {
    if (!searchQuery.trim()) return visaData
    const q = searchQuery.toLowerCase()
    return visaData.filter(visa => visa.Country.toLowerCase().includes(q))
  }, [searchQuery])

  // Search results for dropdown (limit to 6)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return visaData
      .filter(visa => visa.Country.toLowerCase().includes(q))
      .slice(0, 6)
  }, [searchQuery])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <Header />

      <main>
        <article>
          {/* Hero Section with Smart Search */}
          <section className="visa-hero-modern">
            <div className="container">
              <h1 className="h1 hero-title">Your Gateway to the World</h1>
              <div className="search-wrapper" ref={searchRef}>
                <div className="search-box">
                  <ion-icon name="search-outline"></ion-icon>
                  <input
                    type="text"
                    placeholder="Search for a destination..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true) }}
                    onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                  />
                  {searchQuery && (
                    <button className="search-clear-btn" onClick={() => { setSearchQuery(''); setShowDropdown(false) }}>
                      <ion-icon name="close-circle"></ion-icon>
                    </button>
                  )}
                </div>

                {/* Smart Search Dropdown */}
                {showDropdown && searchQuery.trim() && (
                  <div className="search-dropdown">
                    {searchResults.length > 0 ? (
                      searchResults.map((visa, idx) => {
                        const processing = getProcessingTime(visa)
                        const price = getStartingPrice(visa)
                        return (
                          <Link
                            key={idx}
                            href={`/visa/${visa.Country.toLowerCase().replace(/\s+/g, '-')}`}
                            className="search-result-item"
                            onClick={() => setShowDropdown(false)}
                          >
                            <div className="search-result-img">
                              <img src={visa.ImageURL} alt={visa.Country} />
                            </div>
                            <div className="search-result-info">
                              <span className="search-result-country">{visa.Country}</span>
                              <div className="search-result-meta">
                                {processing && (
                                  <span className="search-result-time">
                                    <ion-icon name="time-outline"></ion-icon>
                                    {processing}
                                  </span>
                                )}
                                <span className="search-result-type">
                                  <ion-icon name="document-outline"></ion-icon>
                                  {getVisaType(visa)}
                                </span>
                              </div>
                            </div>
                            {price && <span className="search-result-price">{price}</span>}
                          </Link>
                        )
                      })
                    ) : (
                      <div className="search-no-results">
                        <ion-icon name="globe-outline"></ion-icon>
                        <p>No visas found for &quot;{searchQuery}&quot;</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Visa Cards Grid */}
          <section className="visa-section-modern">
            <div className="container">
              {filteredVisas.length > 0 ? (
                <div className="visa-cards-grid">
                  {filteredVisas.map((visa, index) => {
                    const processingTime = getProcessingTime(visa)
                    return (
                      <Link key={index} href={`/visa/${visa.Country.toLowerCase().replace(/\s+/g, '-')}`}>
                        <div className="visa-card-modern-grid">
                          <div className="card-image-container">
                            <img src={visa.ImageURL} alt={visa.Country} loading="lazy" />
                          </div>
                          <div className="card-info-container">
                            <h3 className="country-name-grid">{visa.Country}</h3>
                            {processingTime && (
                              <p className="visa-timing">
                                Get on <span className="timing-highlight">{processingTime}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="no-results-grid">
                  <ion-icon name="search-outline"></ion-icon>
                  <h3>No destinations found</h3>
                  <p>Try searching with a different keyword</p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta">
            <div className="container">
              <div className="cta-content">
                <p className="section-subtitle">Need Help?</p>
                <h2 className="h2 section-title">Not sure which visa you need?</h2>
                <p className="section-text">
                  Our visa experts are here to help you choose the right visa for your travel needs
                </p>
              </div>
              <button className="btn btn-secondary">Contact Our Experts</button>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <GoTop />
    </>
  )
}
