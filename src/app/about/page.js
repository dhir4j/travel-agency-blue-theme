'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1 className="h1 hero-title">About Waynex Travels</h1>
            <p className="hero-subtitle">Your trusted partner in creating unforgettable travel experiences</p>
          </div>
        </section>

        {/* About Content */}
        <section className="about-content">
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <h2>Who We Are</h2>
                <p>
                  <strong>Waynex Travels & Logistics (OPC) Private Limited</strong> is a premier travel and logistics company
                  dedicated to providing exceptional travel experiences and comprehensive visa services. Based in Kapurthala, Punjab,
                  we have been serving travelers across India and internationally, making dreams of exploration come true.
                </p>
                <p>
                  Our mission is to simplify travel planning while ensuring every journey is memorable, comfortable, and hassle-free.
                  Whether you're planning a domestic getaway or an international adventure, we're here to guide you every step of the way.
                </p>
              </div>

              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" alt="Travel" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="services-section">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="airplane"></ion-icon>
                </div>
                <h3>Tour Packages</h3>
                <p>Curated domestic and international tour packages designed to match your interests and budget.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="document-text"></ion-icon>
                </div>
                <h3>Visa Services</h3>
                <p>Comprehensive visa assistance for destinations worldwide, making the process smooth and stress-free.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="business"></ion-icon>
                </div>
                <h3>Logistics Solutions</h3>
                <p>Reliable logistics services ensuring your travel arrangements are seamless from start to finish.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="people"></ion-icon>
                </div>
                <h3>Group Travel</h3>
                <p>Specialized packages for corporate groups, families, and friends seeking memorable adventures together.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="headset"></ion-icon>
                </div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock customer support to assist you before, during, and after your travels.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="shield-checkmark"></ion-icon>
                </div>
                <h3>Travel Insurance</h3>
                <p>Comprehensive travel insurance options to protect you and your loved ones on every journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="container">
            <h2 className="section-title">Why Choose Waynex Travels?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <div>
                  <h4>Experienced Team</h4>
                  <p>Our travel experts have years of experience in crafting perfect itineraries</p>
                </div>
              </div>

              <div className="feature-item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <div>
                  <h4>Best Prices</h4>
                  <p>Competitive pricing without compromising on quality and service</p>
                </div>
              </div>

              <div className="feature-item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <div>
                  <h4>Personalized Service</h4>
                  <p>Tailored travel solutions designed around your preferences and needs</p>
                </div>
              </div>

              <div className="feature-item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <div>
                  <h4>Safety First</h4>
                  <p>Your safety and security are our top priorities on every journey</p>
                </div>
              </div>

              <div className="feature-item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <div>
                  <h4>Trusted Partners</h4>
                  <p>Collaborations with reputable hotels, airlines, and service providers worldwide</p>
                </div>
              </div>

              <div className="feature-item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <div>
                  <h4>Customer Satisfaction</h4>
                  <p>Thousands of happy travelers who trust us for their journeys</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Let us help you plan your next unforgettable journey</p>
            <div className="cta-buttons">
              <a href="/tours" className="btn btn-primary">Explore Tours</a>
              <a href="/contact" className="btn btn-secondary">Contact Us</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .page-hero {
          padding: 160px 0 80px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          text-align: center;
          color: var(--white);
        }

        .hero-title {
          margin-bottom: 15px;
        }

        .hero-subtitle {
          font-size: var(--fs-4);
          opacity: 0.95;
        }

        .about-content {
          padding: 80px 0;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-text h2 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 25px;
        }

        .about-text p {
          color: var(--spanish-gray);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .services-section {
          padding: 80px 0;
          background: var(--cultured);
        }

        .section-title {
          text-align: center;
          font-size: var(--fs-1);
          color: var(--oxford-blue);
          margin-bottom: 50px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .service-card {
          background: var(--white);
          padding: 40px 30px;
          border-radius: var(--radius-25);
          text-align: center;
          transition: var(--transition);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: var(--white);
        }

        .service-card h3 {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 15px;
        }

        .service-card p {
          color: var(--spanish-gray);
          line-height: 1.6;
        }

        .why-choose-us {
          padding: 80px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .feature-item {
          display: flex;
          gap: 20px;
          padding: 25px;
          background: var(--cultured);
          border-radius: var(--radius-15);
          transition: var(--transition);
        }

        .feature-item:hover {
          background: var(--white);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .feature-item ion-icon {
          font-size: 32px;
          color: var(--bright-navy-blue);
          flex-shrink: 0;
        }

        .feature-item h4 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 8px;
        }

        .feature-item p {
          color: var(--spanish-gray);
          line-height: 1.6;
        }

        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          text-align: center;
          color: var(--white);
        }

        .cta-section h2 {
          font-size: var(--fs-1);
          margin-bottom: 15px;
        }

        .cta-section p {
          font-size: var(--fs-4);
          margin-bottom: 30px;
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
          }

          .about-image {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 120px 0 60px;
          }

          .services-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
