'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import Link from 'next/link'
import toursData from '../../../data/waynex_tours_complete.json'
import { generateTourSlug, getTourImage } from '@/utils/tourUtils'

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get all tours from JSON using useMemo
  const allTours = useMemo(() => {
    const tours = []

    // Add domestic tours
    if (toursData.data?.domestic) {
      Object.entries(toursData.data.domestic).forEach(([state, stateTours]) => {
        stateTours.forEach(tour => {
          if (tour.code && tour.code.trim() !== '') {
            tours.push({ ...tour, type: 'domestic', category: state })
          }
        })
      })
    }

    // Add international tours
    if (toursData.data?.international) {
      Object.entries(toursData.data.international).forEach(([region, regionTours]) => {
        regionTours.forEach(tour => {
          if (tour.code && tour.code.trim() !== '') {
            tours.push({ ...tour, type: 'international', category: region })
          }
        })
      })
    }

    return tours
  }, [])

  // Filter tours
  const filteredTours = useMemo(() => {
    let filtered = allTours

    if (selectedType !== 'all') {
      filtered = filtered.filter(tour => tour.type === selectedType)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tour => tour.category === selectedCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(tour =>
        tour.name?.toLowerCase().includes(q) ||
        tour.destinations?.toLowerCase().includes(q) ||
        tour.category?.toLowerCase().includes(q)
      )
    }

    return filtered
  }, [allTours, selectedType, selectedCategory, searchQuery])

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
        {/* Hero Section with Search - Matching Visa Page */}
        <section className="visa-hero-modern">
          <div className="container">
            <h1 className="h1 hero-title">Discover Amazing Tours</h1>
            <p className="tours-hero-subtitle">Explore {toursData.metadata.total_tours}+ incredible destinations worldwide</p>
            <div className="search-wrapper">
              <div className="search-box">
                <ion-icon name="search-outline"></ion-icon>
                <input
                  type="text"
                  placeholder="Search destinations, tours, or regions..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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
                <Link
                  href={`/tours/${generateTourSlug(tour.name, tour.code)}`}
                  key={tour.code}
                  className="tour-card-premium"
                >
                  <div className="tour-image">
                    <img src={getTourImage(tour)} alt={tour.name} loading="lazy" />
                    <div className="tour-type-badge">
                      {tour.type === 'domestic' ? 'Domestic' : 'International'}
                    </div>
                    {tour.duration && (
                      <div className="tour-duration-badge">
                        <ion-icon name="time-outline"></ion-icon>
                        {tour.duration}
                      </div>
                    )}
                  </div>

                  <div className="tour-info">
                    <div className="tour-location">
                      <ion-icon name="location-outline"></ion-icon>
                      <span>{tour.category}</span>
                    </div>

                    <h3>{tour.name}</h3>

                    {tour.destinations && (
                      <p className="tour-destinations">
                        {tour.destinations.split(',').slice(0, 3).join(' • ')}
                      </p>
                    )}

                    <div className="tour-footer">
                      {tour.price && (
                        <div className="tour-price">
                          <span className="price-label">From</span>
                          <span className="price-value">₹{tour.price.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="tour-cta">
                        View Details
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="no-results">
                <ion-icon name="search-outline"></ion-icon>
                <h3>No Tours Found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .tours-hero-subtitle {
          font-family: var(--ff-poppins);
          font-size: var(--fs-4);
          opacity: 0.95;
          margin-bottom: 40px;
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

        .tour-card-premium {
          background: var(--white);
          border-radius: var(--radius-25);
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: block;
          text-decoration: none;
        }

        .tour-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .tour-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .tour-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .tour-card-premium:hover .tour-image img {
          transform: scale(1.1);
        }

        .tour-type-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.95);
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: var(--fw-600);
          color: var(--oxford-blue);
        }

        .tour-duration-badge {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.7);
          color: var(--white);
          padding: 8px 15px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          backdrop-filter: blur(10px);
        }

        .tour-info {
          padding: 20px;
        }

        .tour-location {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--bright-navy-blue);
          font-size: 14px;
          margin-bottom: 10px;
        }

        .tour-info h3 {
          color: var(--oxford-blue);
          font-size: 18px;
          font-weight: var(--fw-600);
          margin-bottom: 10px;
          line-height: 1.4;
          font-family: var(--ff-montserrat);
        }

        .tour-destinations {
          color: var(--spanish-gray);
          font-size: 14px;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--ff-poppins);
        }

        .tour-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid var(--gainsboro);
        }

        .tour-price {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 12px;
          color: var(--spanish-gray);
        }

        .price-value {
          font-size: 20px;
          font-weight: var(--fw-700);
          color: var(--bright-navy-blue);
        }

        .tour-cta {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--bright-navy-blue);
          font-weight: var(--fw-600);
          font-size: 14px;
        }

        .tour-cta ion-icon {
          transition: var(--transition);
        }

        .tour-card-premium:hover .tour-cta ion-icon {
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
