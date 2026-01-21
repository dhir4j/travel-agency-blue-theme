'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import toursData from '../../../../data/waynex_tours_complete.json'

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

export default function TourDetail({ params }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const tour = findTourByCode(params.code)
  
  if (!tour) notFound()

  const images = tour.slider_images || [tour.card_image] || []

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [images.length])

  return (
    <>
      <Header />
      <main>
        <div className="tour-detail-hero">
          <div className="hero-slider-detail">
            {images.map((image, index) => (
              <img key={index} src={image} alt={tour.name} className={index === currentImageIndex ? 'active' : ''} />
            ))}
            {images.length > 1 && (
              <>
                <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)} className="slider-btn-detail prev">
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)} className="slider-btn-detail next">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
              </>
            )}
          </div>
          <div className="hero-overlay">
            <div className="container">
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/tours">Tours</Link>
                <span>/</span>
                <span>{tour.name}</span>
              </div>
              <h1>{tour.name}</h1>
              <div className="hero-meta">
                <div className="meta-item">
                  <ion-icon name="location-outline"></ion-icon>
                  <span>{tour.region}</span>
                </div>
                <div className="meta-item">
                  <ion-icon name="time-outline"></ion-icon>
                  <span>{tour.duration}</span>
                </div>
                <div className="meta-item">
                  <ion-icon name="pricetag-outline"></ion-icon>
                  <span>₹{tour.price?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="tour-detail-content">
          <div className="container">
            <div className="detail-layout">
              <div className="detail-main">
                <div className="detail-card">
                  <h2>Tour Overview</h2>
                  <div className="overview-grid">
                    <div className="overview-item">
                      <ion-icon name="navigate-outline"></ion-icon>
                      <div>
                        <strong>Destinations</strong>
                        <p>{tour.destinations}</p>
                      </div>
                    </div>
                    <div className="overview-item">
                      <ion-icon name="calendar-outline"></ion-icon>
                      <div>
                        <strong>Duration</strong>
                        <p>{tour.duration}</p>
                      </div>
                    </div>
                    <div className="overview-item">
                      <ion-icon name="code-outline"></ion-icon>
                      <div>
                        <strong>Tour Code</strong>
                        <p>{tour.code}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {tour.why_tour_with_waynex?.length > 0 && (
                  <div className="detail-card">
                    <h2>Why Tour With Waynex?</h2>
                    <ul className="feature-list">
                      {tour.why_tour_with_waynex.slice(0, 8).map((item, index) => (
                        <li key={index}>
                          <ion-icon name="checkmark-circle"></ion-icon>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.highlights?.length > 0 && (
                  <div className="detail-card">
                    <h2>Tour Highlights</h2>
                    <ul className="highlight-list">
                      {tour.highlights.map((highlight, index) => (
                        <li key={index}>
                          <ion-icon name="star"></ion-icon>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.itinerary?.length > 0 && (
                  <div className="detail-card">
                    <h2>Itinerary</h2>
                    <div className="itinerary-timeline">
                      {tour.itinerary.map((day, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-marker">Day {index + 1}</div>
                          <div className="timeline-content">{day}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tour.hotels?.length > 0 && (
                  <div className="detail-card">
                    <h2>Accommodation</h2>
                    <div className="hotels-list">
                      {tour.hotels.map((hotel, index) => (
                        <div key={index} className="hotel-item">
                          <ion-icon name="bed-outline"></ion-icon>
                          <div>
                            <strong>{hotel.place}</strong>
                            <p>{hotel.hotel}</p>
                            <span className="nights-badge">{hotel.nights} Night(s)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(tour.inclusions?.length > 0 || tour.exclusions?.length > 0) && (
                  <div className="detail-card">
                    <h2>What's Included</h2>
                    <div className="inc-exc-grid">
                      {tour.inclusions?.length > 0 && (
                        <div className="inc-section">
                          <h3><ion-icon name="checkmark-circle"></ion-icon> Inclusions</h3>
                          <ul>
                            {tour.inclusions.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tour.exclusions?.length > 0 && (
                        <div className="exc-section">
                          <h3><ion-icon name="close-circle"></ion-icon> Exclusions</h3>
                          <ul>
                            {tour.exclusions.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <aside className="detail-sidebar">
                <div className="booking-widget">
                  <div className="price-display">
                    <span className="from-text">Starting from</span>
                    <span className="price-amount">₹{tour.price?.toLocaleString()}</span>
                    <span className="per-person">per person</span>
                  </div>
                  <button className="btn btn-primary btn-block">Book Now</button>
                  <button className="btn btn-secondary btn-block">Send Enquiry</button>
                  
                  <div className="quick-info">
                    <div className="info-row">
                      <ion-icon name="time-outline"></ion-icon>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="info-row">
                      <ion-icon name="people-outline"></ion-icon>
                      <span>Group Tour</span>
                    </div>
                    <div className="info-row">
                      <ion-icon name="globe-outline"></ion-icon>
                      <span>{tour.type === 'domestic' ? 'Domestic' : 'International'}</span>
                    </div>
                  </div>
                </div>

                <div className="help-widget">
                  <h3>Need Help?</h3>
                  <p>Our travel experts are here to assist you</p>
                  <a href="tel:+11234567890" className="help-link">
                    <ion-icon name="call-outline"></ion-icon>
                    +1 (123) 456 7890
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />
    </>
  )
}
