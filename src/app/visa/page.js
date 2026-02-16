import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import visaData from '../../../data/new_data.json'

export const metadata = {
  title: 'Visa Services - Waynex Tours and Travels',
  description: 'Get your visa easily with Waynex Tours and Travels. We provide visa services for destinations worldwide.',
}

export default function VisaPage() {
  const getStartingPrice = (visa) => {
    const options = visa['Visa Pricing Options'] || []
    if (options.length === 0) return ''
    return options[0]['Total Amount'] || options[0]['Pay Now Govt Fee'] || ''
  }

  const getProcessingTime = (visa) => {
    const options = visa['Visa Pricing Options'] || []
    if (options.length === 0) return ''
    return options[0]['Processing Days'] || options[0]['Get on'] || ''
  }

  return (
    <>
      <Header />

      <main>
        <article>
          {/* Hero Section with Search */}
          <section className="visa-hero-modern">
            <div className="container">
              <h1 className="h1 hero-title">Your Gateway to the World</h1>
              <div className="search-wrapper">
                <div className="search-box">
                  <ion-icon name="search-outline"></ion-icon>
                  <input type="text" placeholder="Search for a destination..." className="search-input" />
                </div>
              </div>
            </div>
          </section>

          {/* Visa Cards Grid - Modern Card Design */}
          <section className="visa-section-modern">
            <div className="container">
              <div className="visa-cards-grid">
                {visaData.map((visa, index) => {
                  const processingTime = getProcessingTime(visa)
                  return (
                    <Link key={index} href={`/visa/${visa.Country.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="visa-card-modern-grid">
                        <div className="card-image-container">
                          <img src={visa.ImageURL} alt={visa.Country} loading="lazy" />
                        </div>
                        <div className="card-info-container">
                          <h3 className="country-name-grid">{visa.Country}</h3>
                          {processingTime && (
                            <p className="visa-timing">
                              Get on <span className="timing-highlight">{processingTime}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta">
            <div className="container">
              <div className="cta-content">
                <p className="section-subtitle">Need Help?</p>
                <h2 className="h2 section-title">Not sure which visa you need?</h2>
                <p className="section-text">
                  Our visa experts are here to help you choose the right visa for your travel needs
                </p>
              </div>
              <button className="btn btn-secondary">Contact Our Experts</button>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <GoTop />
    </>
  )
}
