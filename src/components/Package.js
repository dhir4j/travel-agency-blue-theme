import Link from 'next/link'
import toursData from '../../data/waynex_tours_complete.json'

export default function Package() {
  // Get featured tours from the JSON data
  const featuredTours = [
    ...toursData.data.domestic['Andaman and Nicobar Islands'].slice(0, 1),
    ...toursData.data.international['Asia'].slice(0, 1),
    ...toursData.data.international['Europe'].slice(0, 1)
  ]

  return (
    <section className="package" id="package">
      <div className="container">
        <p className="section-subtitle">Popular Packages</p>
        <h2 className="h2 section-title">Checkout Our Packages</h2>
        <p className="section-text">Explore our handpicked collection of unforgettable travel experiences</p>

        <ul className="package-list">
          {featuredTours.map((tour) => (
            <li key={tour.code}>
              <div className="package-card">
                <figure className="card-banner">
                  <img src={tour.card_image || tour.slider_images?.[0]} alt={tour.name} loading="lazy" />
                </figure>

                <div className="card-content">
                  <h3 className="h3 card-title">{tour.name}</h3>
                  <p className="card-text">{tour.destinations?.split(',').slice(0, 3).join(', ')}</p>

                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="time"></ion-icon>
                        <p className="text">{tour.duration}</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="people"></ion-icon>
                        <p className="text">Group Tour</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="location"></ion-icon>
                        <p className="text">{tour.region}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="card-price">
                  <div className="wrapper">
                    <div className="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </div>
                  <p className="price">₹{tour.price?.toLocaleString()} <span>/per person</span></p>
                  <Link href={`/tours/${tour.code}`} className="btn btn-secondary">View Details</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/tours" className="btn btn-primary">View All Packages</Link>
      </div>
    </section>
  )
}
