export default function Popular() {
  const destinations = [
    {
      image: 'https://i.postimg.cc/fRNkQ8MC/popular-1.jpg',
      location: 'Italy',
      title: 'San Miguel',
      description: 'Embark in one of the islands in the Venetian Lagoon, known as a place of peace and remembrance'
    },
    {
      image: 'https://i.postimg.cc/Nj9DZffm/popular-2.jpg',
      location: 'Dubai',
      title: 'Burj Khalifa',
      description: 'Discover the iconic skyscraper in Dubai, that holds the title of the world\'s tallest building'
    },
    {
      image: 'https://i.postimg.cc/Hkwcrf6F/popular-3.jpg',
      location: 'Japan',
      title: 'Kyoto Temple',
      description: 'Discover the unique histories and characteristics of stunning temples around Kyoto'
    }
  ]

  return (
    <section className="popular" id="destination">
      <div className="container">
        <p className="section-subtitle">Uncover Place</p>

        <h2 className="h2 section-title">Popular Destination</h2>

        <p className="section-text">
          The world is a tapestry of breathtaking landscapes, vibrant cultures, and untold stories. Step outside your comfort zone, challenge your perspectives, and embrace the unknown
        </p>

        <ul className="popular-list">
          {destinations.map((dest, index) => (
            <li key={index}>
              <div className="popular-card">
                <figure className="card-img">
                  <img src={dest.image} alt={dest.title} loading="lazy" />
                </figure>

                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>

                  <p className="card-subtitle"><a href="#">{dest.location}</a></p>
                  <h3 className="h3 card-title"><a href="#">{dest.title}</a></h3>
                  <p className="card-text">{dest.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button className="btn btn-primary">More Destination</button>
      </div>
    </section>
  )
}
