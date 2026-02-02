'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import toursData from '../../../../data/waynex_tours_complete.json'
import { extractCodeFromSlug, getTourImage } from '@/utils/tourUtils'
import styles from './tour-detail.module.css'

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

  const slug = params.code
  const code = extractCodeFromSlug(slug)
  const tour = findTourByCode(code)

  if (!tour) {
    notFound()
  }

  const validImages = tour.slider_images?.filter(img =>
    img && !img.includes('kesari-logo') && !img.startsWith('../')
  ) || []

  const images = validImages.length > 0 ? validImages : [getTourImage(tour)]

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [images.length])

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Matching Visa Page Style */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroMediaContainer}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={tour.name}
                  className={`${styles.heroImage} ${index === currentImageIndex ? styles.active : ''}`}
                />
              ))}

              {images.length > 1 && (
                <>
                  <button onClick={prevSlide} className={`${styles.sliderButton} ${styles.prev}`}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                  </button>
                  <button onClick={nextSlide} className={`${styles.sliderButton} ${styles.next}`}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </button>
                </>
              )}

              <div className={styles.heroContentCentered}>
                <h1 className={styles.tourTitle}>{tour.name}</h1>
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <ion-icon name="location-outline"></ion-icon>
                    <span>{tour.region}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <ion-icon name="time-outline"></ion-icon>
                    <span>{tour.duration}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <ion-icon name="pricetag-outline"></ion-icon>
                    <span>₹{tour.price?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className={styles.contentLayout}>
            <div className={styles.contentMain}>
              {/* Tour Overview */}
              <div className={styles.detailCard}>
                <h2 className={styles.cardTitle}>Tour Overview</h2>
                <div className={styles.overviewGrid}>
                  <div className={styles.overviewItem}>
                    <ion-icon name="navigate-outline" className={styles.overviewIcon}></ion-icon>
                    <div className={styles.overviewContent}>
                      <strong className={styles.overviewLabel}>Destinations</strong>
                      <p className={styles.overviewValue}>{tour.destinations}</p>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <ion-icon name="calendar-outline" className={styles.overviewIcon}></ion-icon>
                    <div className={styles.overviewContent}>
                      <strong className={styles.overviewLabel}>Duration</strong>
                      <p className={styles.overviewValue}>{tour.duration}</p>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <ion-icon name="code-outline" className={styles.overviewIcon}></ion-icon>
                    <div className={styles.overviewContent}>
                      <strong className={styles.overviewLabel}>Tour Code</strong>
                      <p className={styles.overviewValue}>{tour.code}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Tour With Waynex */}
              {tour.why_tour_with_waynex?.length > 0 && (
                <div className={styles.detailCard}>
                  <h2 className={styles.cardTitle}>Why Tour With Waynex?</h2>
                  <div className={styles.featureList}>
                    {tour.why_tour_with_waynex.slice(0, 8).map((item, index) => (
                      <div key={index} className={styles.featureItem}>
                        <ion-icon name="checkmark-circle" className={styles.featureIcon}></ion-icon>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {tour.highlights?.length > 0 && (
                <div className={styles.detailCard}>
                  <h2 className={styles.cardTitle}>Tour Highlights</h2>
                  <div className={styles.featureList}>
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className={styles.featureItem}>
                        <ion-icon name="star" className={styles.featureIcon}></ion-icon>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hotels */}
              {tour.hotels?.length > 0 && (
                <div className={styles.detailCard}>
                  <h2 className={styles.cardTitle}>Accommodation</h2>
                  <div className={styles.hotelsList}>
                    {tour.hotels.map((hotel, index) => (
                      <div key={index} className={styles.hotelItem}>
                        <ion-icon name="bed-outline" className={styles.hotelIcon}></ion-icon>
                        <div className={styles.hotelInfo}>
                          <div className={styles.hotelPlace}>{hotel.place}</div>
                          <div className={styles.hotelName}>{hotel.hotel}</div>
                          <span className={styles.nightsBadge}>{hotel.nights} Night(s)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions/Exclusions */}
              {(tour.inclusions?.length > 0 || tour.exclusions?.length > 0) && (
                <div className={styles.detailCard}>
                  <h2 className={styles.cardTitle}>What&apos;s Included</h2>
                  {tour.inclusions?.length > 0 && (
                    <div style={{ marginBottom: tour.exclusions?.length > 0 ? '24px' : '0' }}>
                      <h3 style={{ color: 'hsl(208, 97%, 12%)', fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ion-icon name="checkmark-circle" style={{ color: 'hsl(214, 57%, 51%)', fontSize: '24px' }}></ion-icon>
                        Inclusions
                      </h3>
                      <div className={styles.featureList}>
                        {tour.inclusions.map((item, index) => (
                          <div key={index} className={styles.featureItem}>
                            <ion-icon name="checkmark" className={styles.featureIcon}></ion-icon>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {tour.exclusions?.length > 0 && (
                    <div>
                      <h3 style={{ color: 'hsl(208, 97%, 12%)', fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ion-icon name="close-circle" style={{ color: '#e74c3c', fontSize: '24px' }}></ion-icon>
                        Exclusions
                      </h3>
                      <div className={styles.featureList}>
                        {tour.exclusions.map((item, index) => (
                          <div key={index} className={styles.featureItem}>
                            <ion-icon name="close" style={{ color: '#e74c3c' }} className={styles.featureIcon}></ion-icon>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.priceCard}>
                <div className={styles.priceDisplay}>
                  <span className={styles.priceLabel}>Starting from</span>
                  <span className={styles.priceAmount}>₹{tour.price?.toLocaleString()}</span>
                  <span className={styles.priceSubtext}>per person</span>
                </div>
                <Link href={`/tours/${slug}/book`} className={`${styles.ctaButton} ${styles.primaryButton}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Book Now
                </Link>
                <button className={`${styles.ctaButton} ${styles.secondaryButton}`}>Send Enquiry</button>

                <div className={styles.quickInfo}>
                  <div className={styles.infoRow}>
                    <ion-icon name="time-outline" className={styles.infoIcon}></ion-icon>
                    <span>{tour.duration}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <ion-icon name="people-outline" className={styles.infoIcon}></ion-icon>
                    <span>Group Tour</span>
                  </div>
                  <div className={styles.infoRow}>
                    <ion-icon name="globe-outline" className={styles.infoIcon}></ion-icon>
                    <span>{tour.type === 'domestic' ? 'Domestic' : 'International'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.helpCard}>
                <h3 className={styles.helpTitle}>Need Help?</h3>
                <p className={styles.helpText}>Our travel experts are here to assist you</p>
                <a href="tel:+11234567890" className={styles.helpLink}>
                  <ion-icon name="call-outline"></ion-icon>
                  +1 (123) 456 7890
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />
    </>
  )
}
