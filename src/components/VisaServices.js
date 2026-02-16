import Link from 'next/link'

export default function VisaServices({ visaData }) {
  // Get featured countries (first 6)
  const featuredVisas = visaData.slice(0, 6)

  const getStartingPrice = (visa) => {
    const options = visa['Visa Pricing Options'] || []
    if (options.length === 0) return 'Contact Us'
    return options[0]['Total Amount'] || options[0]['Pay Now Govt Fee'] || 'Contact Us'
  }

  const getProcessingTime = (visa) => {
    const options = visa['Visa Pricing Options'] || []
    if (options.length === 0) return ''
    return options[0]['Processing Days'] || options[0]['Get on'] || ''
  }

  return (
    <section className="visa-services" id="visa">
      <div className="container">
        <p className="section-subtitle">Visa Services</p>
        <h2 className="h2 section-title">Get Your Visa Easily</h2>
        <p className="section-text">
          Simplify your travel with our comprehensive visa services. We help you get your visa quickly and hassle-free for destinations worldwide
        </p>

        <ul className="visa-list">
          {featuredVisas.map((visa, index) => (
            <li key={index}>
              <Link href={`/visa/${visa.Country.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="visa-card">
                  <figure className="card-img">
                    <img src={visa.ImageURL} alt={visa.Country} loading="lazy" />
                  </figure>

                  <div className="card-content">
                    <h3 className="h3 card-title">{visa.Country}</h3>

                    <ul className="visa-meta">
                      {getProcessingTime(visa) && (
                        <li>
                          <ion-icon name="time-outline"></ion-icon>
                          <span>Get in {getProcessingTime(visa)}</span>
                        </li>
                      )}
                      <li>
                        <ion-icon name="document-text-outline"></ion-icon>
                        <span>{visa['Visa Info']['Visa Type'] || visa['Visa Info']['Type'] || 'Visa'}</span>
                      </li>
                    </ul>

                    <div className="card-footer">
                      <p className="price">{getStartingPrice(visa)}</p>
                      <button className="btn-link">Apply Now →</button>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="view-all-btn-wrapper">
          <Link href="/visa">
            <button className="btn btn-primary">View All Visa Services</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
