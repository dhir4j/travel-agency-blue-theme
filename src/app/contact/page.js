'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="contact-hero-modern">
          <div className="container">
            <h1 className="h1 hero-title">Get in Touch</h1>
            <p className="hero-subtitle">
              We’re here to help you plan your perfect journey
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="contact-content">
          <div className="container">
            <div className="contact-layout">

              {/* LEFT: INFO */}
              <div className="contact-info">
                <div className="info-box">
                  <div className="info-title">
                    <ion-icon name="call-outline"></ion-icon>
                    <h3>Phone</h3>
                  </div>
                  <a href="tel:+916283279859">+91 6283279859</a>
                  <p>Mon – Sat · 9:00 AM – 6:00 PM</p>
                </div>

                <div className="info-box">
                  <div className="info-title">
                    <ion-icon name="mail-outline"></ion-icon>
                    <h3>Email</h3>
                  </div>
                  <a href="mailto:info@waynextravels.com">info@waynextravels.com</a>
                  <a href="mailto:sales@waynextravels.com">sales@waynextravels.com</a>
                </div>

                <div className="info-box">
                  <div className="info-title">
                    <ion-icon name="location-outline"></ion-icon>
                    <h3>Office Address</h3>
                  </div>
                  <p>
                    Circular Road, Near Prita Lee Lesson School<br />
                    Ashok Vihar, Kapurthala<br />
                    Punjab – 144601, India
                  </p>
                </div>
              </div>

              {/* RIGHT: FORM */}
              <div className="contact-form-box">
                <h2>Send us a Message</h2>
                <p className="form-desc">
                  Fill out the form and we’ll respond within 24 hours
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="tour">Tour Inquiry</option>
                    <option value="visa">Visa Services</option>
                    <option value="booking">Booking Assistance</option>
                    <option value="other">Other</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Tell us about your travel plans..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GoTop />

      {/* STYLES */}
      <style jsx>{`
        /* HERO */
        .contact-hero-modern {
          position: relative;
          padding: 180px 0 100px;
          background-image: url("https://i.postimg.cc/D0c2FLPM/hero-banner.jpg");
          background-size: cover;
          background-position: center;
          text-align: center;
          color: #fff;
        }

        .contact-hero-modern::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
        }

        .contact-hero-modern .container {
          position: relative;
          z-index: 2;
        }
        


        .hero-subtitle {
          margin-top: 12px;
          opacity: 0.95;
        }

        /* CONTENT */
        .contact-content {
          padding: 90px 0;
          background: var(--cultured);
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 50px;
          align-items: start;
        }

        /* INFO */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .info-box {
          background: #fff;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .info-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .info-title ion-icon {
          font-size: 26px;
          color: var(--bright-navy-blue);
        }

        .info-title h3 {
          margin: 0;
          color: var(--oxford-blue);
        }

        .info-box a {
          display: block;
          color: var(--bright-navy-blue);
          margin-bottom: 6px;
          font-weight: 600;
          text-decoration: none;
        }

        .info-box p {
          color: var(--spanish-gray);
          line-height: 1.6;
        }

        /* FORM */
        .contact-form-box {
          background: #fff;
          padding: 45px;
          border-radius: 24px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }

        .contact-form-box h2 {
          margin-bottom: 10px;
          color: var(--oxford-blue);
        }

        .form-desc {
          margin-bottom: 30px;
          color: var(--spanish-gray);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          padding: 14px 18px;
          border-radius: 10px;
          border: 2px solid var(--gainsboro);
          font-size: 14px;
        }

        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
          border-color: var(--bright-navy-blue);
          outline: none;
        }

        .contact-form button {
          margin-top: 10px;
        }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .contact-hero-modern {
            padding: 140px 0 80px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form-box {
            padding: 30px;
          }
        }
      `}</style>
    </>
  )
}
