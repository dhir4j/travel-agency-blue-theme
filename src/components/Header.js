'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const closeNav = () => {
    setIsNavOpen(false)
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'active' : ''}`} data-header>
        <div className={`overlay ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}></div>

        <div className="header-top">
          <div className="container">
            <a href="tel:+11234567890" className="helpline-box">
              <div className="icon-box">
                <ion-icon name="call-outline"></ion-icon>
              </div>

              <div className="wrapper">
                <p className="helpline-title">For Further Inquiries: </p>
                <p className="helpline-number">+1 (123) 456 7890</p>
              </div>
            </a>

            <Link href="/" className="logo logo-text">
              <span className="logo-waynex">Waynex</span>
            </Link>

            <div className="header-btn-group">
              <button className="search-btn" aria-label="Search">
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
                <li><Link href="/#about" className="navbar-link" onClick={closeNav}>About us</Link></li>
                <li><Link href="/visa" className="navbar-link" onClick={closeNav}>Visa Services</Link></li>
                <li><Link href="/#gallery" className="navbar-link" onClick={closeNav}>Gallery</Link></li>
                <li><Link href="/#contact" className="navbar-link" onClick={closeNav}>Contact us</Link></li>
              </ul>
            </nav>

            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </header>
    </>
  )
}
