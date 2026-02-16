'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { session } from '@/lib/api'
import visaData from '../../data/new_data.json'
import toursData from '../../data/waynex_tours_complete.json'
import { generateTourSlug, getTourImage } from '@/utils/tourUtils'

// Build flat tours list once
const allTours = (() => {
  const tours = []
  const data = toursData.data || {}
  if (data.domestic) {
    Object.entries(data.domestic).forEach(([region, regionTours]) => {
      regionTours.forEach(t => tours.push({ ...t, region, type: 'Domestic' }))
    })
  }
  if (data.international) {
    Object.entries(data.international).forEach(([region, regionTours]) => {
      regionTours.forEach(t => tours.push({ ...t, region, type: 'International' }))
    })
  }
  return tours
})()

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchMode, setSearchMode] = useState('visa') // 'visa' or 'tours'
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const currentUser = session.getUser()
    setUser(currentUser)
  }, [])

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100)
    }
  }, [searchOpen, searchMode])

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    if (searchOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [searchOpen])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const closeNav = () => {
    setIsNavOpen(false)
  }

  const openSearch = () => {
    setSearchQuery('')
    setSearchOpen(true)
  }

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()

    if (searchMode === 'visa') {
      return visaData
        .filter(v => v.Country.toLowerCase().includes(q))
        .slice(0, 8)
        .map(visa => {
          const options = visa['Visa Pricing Options'] || []
          const processing = options[0]?.['Processing Days'] || options[0]?.['Get on'] || ''
          const price = options[0]?.['Total Amount'] || options[0]?.['Pay Now Govt Fee'] || ''
          const visaType = visa['Visa Info']?.['Visa Type'] || visa['Visa Info']?.['Type'] || 'Visa'
          return {
            type: 'visa',
            title: visa.Country,
            subtitle: visaType,
            processing,
            price,
            image: visa.ImageURL,
            href: `/visa/${visa.Country.toLowerCase().replace(/\s+/g, '-')}`
          }
        })
    } else {
      return allTours
        .filter(t => {
          const name = (t.name || '').toLowerCase()
          const dest = (t.destinations || '').toLowerCase()
          const region = (t.region || '').toLowerCase()
          return name.includes(q) || dest.includes(q) || region.includes(q)
        })
        .slice(0, 8)
        .map(tour => ({
          type: 'tour',
          title: tour.name,
          subtitle: `${tour.type} - ${tour.region}`,
          processing: tour.duration || '',
          price: tour.price ? `₹${tour.price.toLocaleString('en-IN')}` : '',
          image: getTourImage(tour),
          href: `/tours/${generateTourSlug(tour.name, tour.code)}`
        }))
    }
  }, [searchQuery, searchMode])

  return (
    <>
      <header className={`header ${isScrolled ? 'active' : ''}`} data-header>
        <div className={`overlay ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}></div>

        <div className="header-top">
          <div className="container">
            <a href="tel:+916283279859" className="helpline-box">
              <div className="icon-box">
                <ion-icon name="call-outline"></ion-icon>
              </div>

              <div className="wrapper">
                <p className="helpline-title">For Further Inquiries: </p>
                <p className="helpline-number">+91 6283279859</p>
              </div>
            </a>

            <Link href="/" className="logo logo-text">
              <span className="logo-waynex">Waynex</span>
            </Link>

            <div className="header-btn-group">
              <button className="search-btn" aria-label="Search" onClick={openSearch}>
                <ion-icon name="search"></ion-icon>
              </button>

              <button className="nav-open-btn" aria-label="Open Menu" onClick={toggleNav}>
                <ion-icon name="menu-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-youtube"></ion-icon>
                </a>
              </li>
            </ul>

            <nav className={`navbar ${isNavOpen ? 'active' : ''}`}>
              <div className="navbar-top">
                <Link href="/" className="logo logo-text">
                  <span className="logo-waynex-blue">Waynex</span>
                </Link>

                <button className="nav-close-btn" aria-label="Close Menu" onClick={toggleNav}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

              <ul className="navbar-list">
                <li><Link href="/" className="navbar-link" onClick={closeNav}>Home</Link></li>
                <li><Link href="/tours" className="navbar-link" onClick={closeNav}>Tours</Link></li>
                <li><Link href="/visa" className="navbar-link" onClick={closeNav}>Visa Services</Link></li>
                <li><Link href="/about" className="navbar-link" onClick={closeNav}>About Us</Link></li>
                <li><Link href="/contact" className="navbar-link" onClick={closeNav}>Contact Us</Link></li>
              </ul>
            </nav>

            {user ? (
              <Link href="/profile" className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <ion-icon name="person-circle-outline"></ion-icon>
                <span>{user.first_name}</span>
              </Link>
            ) : (
              <Link href="/auth/login" className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <ion-icon name="log-in-outline"></ion-icon>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="global-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="global-search-modal" onClick={(e) => e.stopPropagation()}>
            {/* Mode Toggle */}
            <div className="global-search-header">
              <div className="search-mode-toggle">
                <button
                  className={`mode-btn ${searchMode === 'visa' ? 'active' : ''}`}
                  onClick={() => { setSearchMode('visa'); setSearchQuery('') }}
                >
                  <ion-icon name="document-text-outline"></ion-icon>
                  Visa
                </button>
                <button
                  className={`mode-btn ${searchMode === 'tours' ? 'active' : ''}`}
                  onClick={() => { setSearchMode('tours'); setSearchQuery('') }}
                >
                  <ion-icon name="airplane-outline"></ion-icon>
                  Tours
                </button>
              </div>
              <button className="global-search-close" onClick={() => setSearchOpen(false)}>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            {/* Search Input */}
            <div className="global-search-input-wrap">
              <ion-icon name="search-outline"></ion-icon>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={searchMode === 'visa' ? 'Search country for visa...' : 'Search tours, destinations...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="global-search-input"
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                  <ion-icon name="close-circle"></ion-icon>
                </button>
              )}
            </div>

            {/* Results */}
            <div className="global-search-results">
              {!searchQuery.trim() ? (
                <div className="global-search-hint">
                  <ion-icon name={searchMode === 'visa' ? 'globe-outline' : 'map-outline'}></ion-icon>
                  <p>{searchMode === 'visa' ? 'Type a country name to find visa info' : 'Search for tour packages by name or destination'}</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result, idx) => (
                  <Link
                    key={idx}
                    href={result.href}
                    className="global-search-result-item"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="gs-result-img">
                      <img src={result.image} alt={result.title} />
                    </div>
                    <div className="gs-result-info">
                      <span className="gs-result-title">{result.title}</span>
                      <span className="gs-result-subtitle">{result.subtitle}</span>
                      {result.processing && (
                        <span className="gs-result-processing">
                          <ion-icon name="time-outline"></ion-icon>
                          {result.processing}
                        </span>
                      )}
                    </div>
                    {result.price && <span className="gs-result-price">{result.price}</span>}
                  </Link>
                ))
              ) : (
                <div className="global-search-hint">
                  <ion-icon name="alert-circle-outline"></ion-icon>
                  <p>No {searchMode === 'visa' ? 'visas' : 'tours'} found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
