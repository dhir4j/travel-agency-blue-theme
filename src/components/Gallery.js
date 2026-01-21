export default function Gallery() {
  const galleryImages = [
    'https://i.postimg.cc/6qfpc2mw/gallery-1.jpg',
    'https://i.postimg.cc/yY7ddjDN/gallery-2.jpg',
    'https://i.postimg.cc/PrKq8DDQ/gallery-3.jpg',
    'https://i.postimg.cc/13j5vZJg/gallery-4.jpg',
    'https://i.postimg.cc/XvBNhDzs/gallery-5.jpg'
  ]

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <p className="section-subtitle">Photo Gallery</p>
        <h2 className="h2 section-title">Photo&apos;s from travellers</h2>

        <p className="section-text">
          Imagine a world painted with vibrant hues, captured not by professional lenses, but by the eyes of passionate explorers. Browse through the gallery and let your imagination take flight
        </p>

        <ul className="gallery-list">
          {galleryImages.map((image, index) => (
            <li key={index} className="gallery-item">
              <figure className="gallery-image">
                <img src={image} alt="gallery image" />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
