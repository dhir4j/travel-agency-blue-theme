'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import toursData from '../../../data/waynex_tours_complete.json'

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const allTours = useMemo(() => {
    const tours = []
    if (toursData.data?.domestic) {
      Object.entries(toursData.data.domestic).forEach(([state, stateTours]) => {
        stateTours.forEach(tour => tours.push({ ...tour, type: 'domestic', region: state }))
      })
    }
    if (toursData.data?.international) {
      Object.entries(toursData.data.international).forEach(([region, regionTours]) => {
        regionTours.forEach(tour => tours.push({ ...tour, type: 'international', region }))
      })
    }
    return tours
  }, [])

  const regions = useMemo(() => {
    if (selectedType === 'domestic') return toursData.metadata.domestic_states || []
    if (selectedType === 'international') return toursData.metadata.international_regions || []
    return []
  }, [selectedType])

  const filteredTours = useMemo(() => {
    let filtered = allTours

    if (selectedType !== 'all') filtered = filtered.filter(t => t.type === selectedType)
    if (selectedRegion !== 'all') filtered = filtered.filter(t => t.region === selectedRegion)
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.name?.toLowerCase().includes(q) ||
        t.destinations?.toLowerCase().includes(q) ||
        t.region?.toLowerCase().includes(q)
      )
    }

    if (priceRange !== 'all') {
      filtered = filtered.filter(t => {
        const p = t.price
        if (priceRange === 'budget') return p < 20000
        if (priceRange === 'mid') return p >= 20000 && p < 50000
        if (priceRange === 'premium') return p >= 50000 && p < 100000
        if (priceRange === 'luxury') return p >= 100000
        return true
      })
    }

    filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'duration') {
        const aDays = parseInt(a.duration?.match(/\d+/)?.[0] || 0)
        const bDays = parseInt(b.duration?.match(/\d+/)?.[0] || 0)
        return aDays - bDays
      }
      return 0
    })

    return filtered
  }, [allTours, searchQuery, selectedType, selectedRegion, priceRange, sortBy])

  return (
    <>
      <Header />
      <main>
        <section className="tours-hero-modern">
          <div className="container">
            <span className="section-subtitle">Explore The World</span>
            <h1 className="h1">Discover Amazing Tours</h1>
            <p className="hero-text">
              {toursData.metadata.total_tours} handpicked tours • {toursData.metadata.domestic_tours} domestic • {toursData.metadata.international_tours} international
            </p>
            <div className="search-bar-modern">
              <ion-icon name="search-outline"></ion-icon>
              <input
                type="text"
                placeholder="Search destinations, tours, or regions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="tours-main">
          <div className="container">
            <div className="filters-bar">
              <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setSelectedRegion('all') }}>
                <option value="all">All Tours</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>

              {selectedType !== 'all' && (
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                  <option value="all">All Regions</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              )}

              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="budget">Budget (&lt; ₹20k)</option>
                <option value="mid">Mid Range (₹20k - ₹50k)</option>
                <option value="premium">Premium (₹50k - ₹1L)</option>
                <option value="luxury">Luxury (₹1L+)</option>
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>

              <div className="results-count">{filteredTours.length} Tours</div>
            </div>

            <div className="tours-grid-modern">
              {filteredTours.length === 0 ? (
                <div className="no-results">
                  <ion-icon name="search-outline"></ion-icon>
                  <h3>No tours found</h3>
                  <p>Try adjusting your filters</p>
                </div>
              ) : (
                filteredTours.map((tour) => (
                  <Link href={`/tours/${tour.code}`} key={tour.code} className="tour-card-premium">
                    <div className="tour-image">
                      <img src={tour.card_image || tour.slider_images?.[0]} alt={tour.name} />
                      <div className="tour-type-badge">{tour.type === 'domestic' ? 'Domestic' : 'International'}</div>
                      <div className="tour-duration-badge">
                        <ion-icon name="time-outline"></ion-icon>
                        {tour.duration}
                      </div>
                    </div>
                    <div className="tour-info">
                      <div className="tour-location">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>{tour.region}</span>
                      </div>
                      <h3>{tour.name}</h3>
                      <p className="tour-destinations">{tour.destinations?.split(',').slice(0, 3).join(' • ')}</p>
                      <div className="tour-footer">
                        <div className="tour-price">
                          <span className="price-label">From</span>
                          <span className="price-value">₹{tour.price?.toLocaleString()}</span>
                        </div>
                        <div className="tour-cta">
                          View Details
                          <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .tours-hero-modern {
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          padding: 120px 0 80px;
          text-align: center;
          color: var(--white);
        }

        .tours-hero-modern .section-subtitle {
          color: var(--white);
          opacity: 0.9;
        }

        .tours-hero-modern .h1 {
          color: var(--white);
          margin: 15px 0;
        }

        .hero-text {
          color: var(--white);
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .search-bar-modern {
          max-width: 600px;
          margin: 0 auto;
          background: var(--white);
          border-radius: 50px;
          padding: 8px 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }

        .search-bar-modern ion-icon {
          font-size: 24px;
          color: var(--bright-navy-blue);
        }

        .search-bar-modern input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          padding: 12px 0;
        }

        .tours-main {
          padding: 60px 0;
        }

        .filters-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filters-bar select {
          padding: 12px 20px;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          font-size: 15px;
          cursor: pointer;
          transition: var(--transition);
          background: var(--white);
        }

        .filters-bar select:hover {
          border-color: var(--bright-navy-blue);
        }

        .results-count {
          margin-left: auto;
          font-weight: var(--fw-600);
          color: var(--oxford-blue);
        }

        .tours-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .tour-card-premium {
          background: var(--white);
          border-radius: var(--radius-25);
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          display: block;
          text-decoration: none;
        }

        .tour-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
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
          background: rgba(255,255,255,0.95);
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
          background: rgba(0,0,0,0.7);
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
        }

        .tour-destinations {
          color: var(--spanish-gray);
          font-size: 14px;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
        }

        .no-results ion-icon {
          font-size: 64px;
          color: var(--gainsboro);
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .tours-hero-modern {
            padding: 100px 0 60px;
          }

          .filters-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-bar select {
            width: 100%;
          }

          .results-count {
            margin-left: 0;
            text-align: center;
          }

          .tours-grid-modern {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
