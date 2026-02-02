'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1 className="h1 hero-title">Contact Us</h1>
            <p className="hero-subtitle">We're here to help you plan your perfect journey</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information */}
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <p className="contact-desc">
                  Have questions about our tours or visa services? We'd love to hear from you.
                  Send us a message and we'll respond as soon as possible.
                </p>

                <div className="info-cards">
                  <div className="info-card">
                    <div className="info-icon">
                      <ion-icon name="call"></ion-icon>
                    </div>
                    <div className="info-content">
                      <h3>Phone</h3>
                      <a href="tel:+916283279859">+91 6283279859</a>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <ion-icon name="mail"></ion-icon>
                    </div>
                    <div className="info-content">
                      <h3>General Inquiries</h3>
                      <a href="mailto:info@waynextravels.com">info@waynextravels.com</a>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <ion-icon name="briefcase"></ion-icon>
                    </div>
                    <div className="info-content">
                      <h3>Tour Bookings & Sales</h3>
                      <a href="mailto:sales@waynextravels.com">sales@waynextravels.com</a>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <ion-icon name="headset"></ion-icon>
                    </div>
                    <div className="info-content">
                      <h3>Customer Support & Visa Help</h3>
                      <a href="mailto:support@waynextravels.com">support@waynextravels.com</a>
                    </div>
                  </div>

                  <div className="info-card full-width">
                    <div className="info-icon">
                      <ion-icon name="location"></ion-icon>
                    </div>
                    <div className="info-content">
                      <h3>Office Address</h3>
                      <address>
                        Waynex Travels & Logistics (OPC) Private Limited<br />
                        Circular Road, Near Prita Lee Lesson School<br />
                        Ashok Vihar, Kapurthala<br />
                        Punjab – 144601, India
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <div className="contact-form-card">
                  <h2>Send Us a Message</h2>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input type="text" id="name" name="name" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input type="email" id="email" name="email" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" id="subject" name="subject" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      <ion-icon name="send-outline"></ion-icon>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="business-hours">
          <div className="container">
            <h2>Business Hours</h2>
            <div className="hours-grid">
              <div className="hours-item">
                <h4>Monday - Friday</h4>
                <p>9:00 AM - 6:00 PM</p>
              </div>
              <div className="hours-item">
                <h4>Saturday</h4>
                <p>10:00 AM - 4:00 PM</p>
              </div>
              <div className="hours-item">
                <h4>Sunday</h4>
                <p>Closed</p>
              </div>
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

        .contact-section {
          padding: 80px 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .contact-info h2 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 20px;
        }

        .contact-desc {
          color: var(--spanish-gray);
          margin-bottom: 40px;
          line-height: 1.8;
        }

        .info-cards {
          display: grid;
          gap: 20px;
        }

        .info-card {
          display: flex;
          gap: 20px;
          padding: 25px;
          background: var(--cultured);
          border-radius: var(--radius-15);
          transition: var(--transition);
        }

        .info-card:hover {
          background: var(--white);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .info-card.full-width {
          grid-column: 1 / -1;
        }

        .info-icon {
          width: 50px;
          height: 50px;
          background: var(--bright-navy-blue);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .info-content h3 {
          font-size: var(--fs-5);
          color: var(--oxford-blue);
          margin-bottom: 8px;
        }

        .info-content a,
        .info-content address {
          color: var(--spanish-gray);
          font-style: normal;
          line-height: 1.6;
        }

        .info-content a:hover {
          color: var(--bright-navy-blue);
        }

        .contact-form-card {
          background: var(--white);
          padding: 40px;
          border-radius: var(--radius-25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .contact-form-card h2 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          color: var(--gunmetal);
          margin-bottom: 10px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          font-size: var(--fs-5);
          font-family: var(--ff-poppins);
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
        }

        .form-group textarea {
          resize: vertical;
        }

        .contact-form button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          font-size: var(--fs-5);
        }

        .business-hours {
          padding: 60px 0;
          background: var(--cultured);
        }

        .business-hours h2 {
          text-align: center;
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 40px;
        }

        .hours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 900px;
          margin: 0 auto;
        }

        .hours-item {
          text-align: center;
          padding: 30px;
          background: var(--white);
          border-radius: var(--radius-15);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .hours-item h4 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .hours-item p {
          color: var(--spanish-gray);
          font-size: var(--fs-5);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 120px 0 60px;
          }

          .contact-form-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  )
}
