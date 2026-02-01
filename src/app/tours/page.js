'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import Link from 'next/link'
import toursData from '../../../data/waynex_tours_complete.json'

export default function ToursPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get all tours from JSON
  const domesticTours = toursData.data.domestic
  const internationalTours = toursData.data.international

  // Flatten all tours
  const allTours = []

  // Add domestic tours
  Object.entries(domesticTours).forEach(([state, tours]) => {
    tours.forEach(tour => {
      allTours.push({ ...tour, type: 'domestic', category: state })
    })
  })

  // Add international tours
  Object.entries(internationalTours).forEach(([region, tours]) => {
    tours.forEach(tour => {
      allTours.push({ ...tour, type: 'international', category: region })
    })
  })

  // Filter tours
  const filteredTours = allTours.filter(tour => {
    if (selectedType !== 'all' && tour.type !== selectedType) return false
    if (selectedCategory !== 'all' && tour.category !== selectedCategory) return false
    return true
  })

  // Get categories based on type
  const categories = selectedType === 'domestic'
    ? toursData.metadata.domestic_states
    : selectedType === 'international'
    ? toursData.metadata.international_regions
    : [...toursData.metadata.domestic_states, ...toursData.metadata.international_regions]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="tours-hero">
          <div className="container">
            <h1 className="tours-hero-title">Explore Our Tours</h1>
            <p className="tours-hero-subtitle">Discover {toursData.metadata.total_tours}+ amazing destinations worldwide</p>
          </div>
        </section>

        {/* Filters */}
        <section className="tours-filters">
          <div className="container">
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Tour Type:</label>
                <select
                  className="filter-select"
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value)
                    setSelectedCategory('all')
                  }}
                >
                  <option value="all">All Tours</option>
                  <option value="domestic">Domestic ({toursData.metadata.domestic_tours})</option>
                  <option value="international">International ({toursData.metadata.international_tours})</option>
                </select>
              </div>

              {selectedType !== 'all' && (
                <div className="filter-group">
                  <label className="filter-label">Category:</label>
                  <select
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="filter-results">
                <span className="results-count">{filteredTours.length} Tours Found</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="tours-grid-section">
          <div className="container">
            <div className="tours-grid">
              {filteredTours.map((tour) => (
                <div key={tour.code} className="tour-card">
                  <div className="tour-card-image">
                    <img src={tour.card_image} alt={tour.name} />
                    <div className="tour-card-badge">
                      {tour.type === 'domestic' ? 'Domestic' : 'International'}
                    </div>
                  </div>

                  <div className="tour-card-content">
                    <div className="tour-card-category">
                      <ion-icon name="location-outline"></ion-icon>
                      <span>{tour.category}</span>
                    </div>

                    <h3 className="tour-card-title">{tour.name}</h3>

                    {tour.destinations && (
                      <p className="tour-card-destinations">{tour.destinations}</p>
                    )}

                    <div className="tour-card-info">
                      {tour.duration && (
                        <div className="info-item">
                          <ion-icon name="time-outline"></ion-icon>
                          <span>{tour.duration}</span>
                        </div>
                      )}
                      {tour.price && (
                        <div className="info-item price">
                          <ion-icon name="cash-outline"></ion-icon>
                          <span>₹{tour.price.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <Link href={`/tours/${tour.code}`} className="btn btn-secondary tour-card-btn">
                      View Details
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="no-results">
                <ion-icon name="search-outline"></ion-icon>
                <h3>No Tours Found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .tours-hero {
          padding: 120px 0 60px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          text-align: center;
          color: var(--white);
        }

        .tours-hero-title {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-1);
          font-weight: var(--fw-700);
          margin-bottom: 15px;
        }

        .tours-hero-subtitle {
          font-family: var(--ff-poppins);
          font-size: var(--fs-4);
          opacity: 0.9;
        }

        .tours-filters {
          padding: 40px 0;
          background: var(--cultured);
          border-bottom: 2px solid var(--gainsboro);
        }

        .filters-container {
          display: flex;
          align-items: center;
          gap: 25px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-label {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          font-weight: var(--fw-600);
          color: var(--gunmetal);
        }

        .filter-select {
          padding: 12px 20px;
          border: 2px solid var(--gainsboro);
          border-radius: 10px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--gunmetal);
          background: var(--white);
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
        }

        .filter-results {
          margin-left: auto;
        }

        .results-count {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          font-weight: var(--fw-600);
          color: var(--bright-navy-blue);
          background: var(--white);
          padding: 12px 24px;
          border-radius: 10px;
          border: 2px solid var(--bright-navy-blue);
        }

        .tours-grid-section {
          padding: 60px 0;
        }

        .tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .tour-card {
          background: var(--white);
          border-radius: var(--radius-15);
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
        }

        .tour-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .tour-card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .tour-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .tour-card:hover .tour-card-image img {
          transform: scale(1.1);
        }

        .tour-card-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--bright-navy-blue);
          color: var(--white);
          padding: 8px 16px;
          border-radius: 20px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-7);
          font-weight: var(--fw-600);
        }

        .tour-card-content {
          padding: 25px;
        }

        .tour-card-category {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--spanish-gray);
          font-family: var(--ff-poppins);
          font-size: var(--fs-7);
          margin-bottom: 12px;
        }

        .tour-card-category ion-icon {
          font-size: 16px;
        }

        .tour-card-title {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-4);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 12px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tour-card-destinations {
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          color: var(--spanish-gray);
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tour-card-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 0;
          border-top: 1px solid var(--gainsboro);
          border-bottom: 1px solid var(--gainsboro);
          margin-bottom: 20px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          color: var(--gunmetal);
        }

        .info-item ion-icon {
          font-size: 18px;
          color: var(--bright-navy-blue);
        }

        .info-item.price {
          color: var(--bright-navy-blue);
          font-weight: var(--fw-700);
        }

        .tour-card-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
        }

        .tour-card-btn ion-icon {
          font-size: 18px;
          transition: var(--transition);
        }

        .tour-card-btn:hover ion-icon {
          transform: translateX(5px);
        }

        .no-results {
          text-align: center;
          padding: 80px 20px;
        }

        .no-results ion-icon {
          font-size: 80px;
          color: var(--spanish-gray);
          margin-bottom: 20px;
        }

        .no-results h3 {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .no-results p {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--spanish-gray);
        }

        @media (max-width: 768px) {
          .tours-hero {
            padding: 100px 0 40px;
          }

          .filters-container {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-select {
            width: 100%;
          }

          .filter-results {
            margin-left: 0;
          }

          .results-count {
            display: block;
            text-align: center;
          }

          .tours-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
