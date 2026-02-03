'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section with Background Image (Same style as Visa page) */}
        <section className="about-hero-modern">
          <div className="container">
            <br></br>
            <br></br>
            <h1 className="h1 hero-title">About Waynex Travels</h1>
            <p className="hero-subtitle">
              Your trusted partner in creating unforgettable travel experiences
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="about-content">
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <h2 className="section-title">Who We Are</h2>
                <p>
                  <strong>Waynex Travels & Logistics (OPC) Private Limited</strong> is a premier travel and
                  logistics company dedicated to delivering exceptional travel and visa services.
                  Based in Kapurthala, Punjab, we proudly serve travelers across India and globally.
                </p>
                <p>
                  Our mission is to simplify travel planning while ensuring every journey is smooth,
                  memorable, and completely stress-free.
                </p>
              </div>

              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80"
                  alt="Travel Experience"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="services-section">
          <div className="container">
            <h3 className="section-title">Our Services</h3>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="airplane"></ion-icon>
                </div>
                <h3>Tour Packages</h3>
                <p>Domestic and international tours tailored to your interests and budget.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="document-text"></ion-icon>
                </div>
                <h3>Visa Services</h3>
                <p>End-to-end visa assistance for destinations worldwide.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="business"></ion-icon>
                </div>
                <h3>Logistics Solutions</h3>
                <p>Seamless logistics support for personal and business travel needs.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="people"></ion-icon>
                </div>
                <h3>Group Travel</h3>
                <p>Corporate, family, and group travel packages made easy.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="headset"></ion-icon>
                </div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock assistance before, during, and after your journey.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <ion-icon name="shield-checkmark"></ion-icon>
                </div>
                <h3>Travel Insurance</h3>
                <p>Reliable insurance options to protect you throughout your trip.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="container">
            <h3 className="section-title">Why Choose Waynex Travels?</h3>

            <div className="features-grid">
              {[
                'Experienced Team',
                'Best Prices',
                'Personalized Service',
                'Safety First',
                'Trusted Partners',
                'Customer Satisfaction'
              ].map((title, index) => (
                <div key={index} className="feature-item">
                  <ion-icon name="checkmark-circle"></ion-icon>
                  <div>
                    <h4>{title}</h4>
                    <p>We deliver excellence and reliability in every journey.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Let us plan your next unforgettable journey</p>
            <br />
            <div className="cta-buttons">
              <a href="/tours" className="btn btn-primary">Explore Tours</a>
              <a href="/contact" className="btn btn-primary">Contact Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GoTop />

      {/* Styles */}
      <style jsx>{`
        .about-hero-modern {
          position: relative;
          padding: 140px 0 100px;
          text-align: center;
          color: var(--white);
          background-image: url("https://i.postimg.cc/D0c2FLPM/hero-banner.jpg");
          background-size: cover;
          background-position: center;
        }

        .about-hero-modern::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
        }

        .about-hero-modern .container {
          position: relative;
          z-index: 2;
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

        .about-image img {
          width: 100%;
          border-radius: var(--radius-25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .services-section {
          padding: 80px 0;
          background: var(--cultured);
        }

        .section-title {
          text-align: center;
          font-size: var(--fs-2);
          margin-bottom: 50px;
        }

        .services-grid,
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .service-card {
          background: var(--white);
          padding: 40px 30px;
          border-radius: var(--radius-25);
          text-align: center;
          transition: 0.3s;
        }

        .service-card:hover {
          transform: translateY(-10px);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
          color: #fff;
        }

        .why-choose-us {
          padding: 80px 0;
        }

        .feature-item {
          display: flex;
          gap: 20px;
          padding: 25px;
          background: var(--cultured);
          border-radius: var(--radius-15);
        }

        .feature-item ion-icon {
          font-size: 32px;
          color: var(--bright-navy-blue);
        }

        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          color: var(--white);
          text-align: center;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .about-hero-modern {
            padding: 140px 0 80px;
          }
        }
      `}</style>
    </>
  )
}
