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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <h1 className="h1 hero-title">Get in Touch</h1>
            <p className="hero-subtitle">We're here to help you plan your perfect journey</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-content">
          <div className="container">
            {/* Contact Info Cards */}
            <div className="contact-info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <ion-icon name="call"></ion-icon>
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <a href="tel:+916283279859">+91 6283279859</a>
                  <p>Mon-Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <ion-icon name="mail"></ion-icon>
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <a href="mailto:info@waynextravels.com">info@waynextravels.com</a>
                  <a href="mailto:sales@waynextravels.com">sales@waynextravels.com</a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <ion-icon name="location"></ion-icon>
                </div>
                <div className="info-content">
                  <h3>Office Address</h3>
                  <p>Circular Road, Near Prita Lee Lesson School</p>
                  <p>Ashok Vihar, Kapurthala</p>
                  <p>Punjab – 144601, India</p>
                </div>
              </div>
            </div>

            {/* Contact Form & Support Section */}
            <div className="contact-main-grid">
              {/* Contact Form */}
              <div className="form-section">
                <div className="form-header">
                  <h2>Send us a Message</h2>
                  <p>Fill out the form below and we'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="tour-inquiry">Tour Inquiry</option>
                      <option value="visa-inquiry">Visa Services</option>
                      <option value="booking">Booking Assistance</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your travel plans..."
                      rows="6"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <span>Send Message</span>
                    <ion-icon name="send-outline"></ion-icon>
                  </button>
                </form>
              </div>

              {/* Support Info Sidebar */}
              <aside className="support-sidebar">
                <div className="support-card">
                  <div className="support-icon">
                    <ion-icon name="time-outline"></ion-icon>
                  </div>
                  <h3>Business Hours</h3>
                  <div className="hours-list">
                    <div className="hours-row">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div className="support-card">
                  <div className="support-icon">
                    <ion-icon name="headset-outline"></ion-icon>
                  </div>
                  <h3>Quick Support</h3>
                  <p>Need immediate assistance? Our team is ready to help!</p>
                  <div className="support-links">
                    <a href="tel:+916283279859" className="support-btn">
                      <ion-icon name="call-outline"></ion-icon>
                      Call Now
                    </a>
                    <a href="mailto:support@waynextravels.com" className="support-btn">
                      <ion-icon name="mail-outline"></ion-icon>
                      Email Support
                    </a>
                  </div>
                </div>

                <div className="support-card">
                  <div className="support-icon">
                    <ion-icon name="information-circle-outline"></ion-icon>
                  </div>
                  <h3>Have Questions?</h3>
                  <p>Check out our frequently asked questions or contact our support team for personalized assistance.</p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .contact-hero {
          padding: 140px 0 80px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          text-align: center;
          color: var(--white);
          position: relative;
          overflow: hidden;
        }

        .contact-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-title {
          position: relative;
          z-index: 1;
          margin-bottom: 15px;
          font-size: var(--fs-1);
        }

        .hero-subtitle {
          position: relative;
          z-index: 1;
          font-size: var(--fs-4);
          opacity: 0.95;
        }

        .contact-content {
          padding: 80px 0;
          background: var(--cultured);
        }

        /* Contact Info Cards */
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .info-card {
          background: var(--white);
          padding: 40px 30px;
          border-radius: var(--radius-25);
          text-align: center;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
          transition: var(--transition);
        }

        .info-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .info-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 25px;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-icon ion-icon {
          font-size: 40px;
          color: var(--white);
        }

        .info-content h3 {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 15px;
          font-weight: var(--fw-700);
        }

        .info-content a {
          display: block;
          color: var(--bright-navy-blue);
          font-size: var(--fs-5);
          font-weight: var(--fw-600);
          text-decoration: none;
          margin-bottom: 8px;
          transition: var(--transition);
        }

        .info-content a:hover {
          color: var(--yale-blue);
        }

        .info-content p {
          color: var(--spanish-gray);
          font-size: var(--fs-6);
          line-height: 1.6;
        }

        /* Main Grid */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Form Section */
        .form-section {
          background: var(--white);
          padding: 50px;
          border-radius: var(--radius-25);
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-header h2 {
          font-size: var(--fs-2);
          color: var(--oxford-blue);
          margin-bottom: 10px;
          font-weight: var(--fw-700);
        }

        .form-header p {
          color: var(--spanish-gray);
          font-size: var(--fs-5);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group label {
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          color: var(--gunmetal);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 15px 20px;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-10);
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          color: var(--gunmetal);
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 40px;
          font-size: var(--fs-5);
          font-weight: var(--fw-700);
          margin-top: 10px;
        }

        .submit-btn ion-icon {
          font-size: 22px;
        }

        /* Support Sidebar */
        .support-sidebar {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .support-card {
          background: var(--white);
          padding: 35px;
          border-radius: var(--radius-25);
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        .support-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 20px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .support-icon ion-icon {
          font-size: 32px;
          color: var(--bright-navy-blue);
        }

        .support-card h3 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin-bottom: 15px;
          font-weight: var(--fw-700);
        }

        .support-card p {
          color: var(--spanish-gray);
          font-size: var(--fs-6);
          line-height: 1.7;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--gainsboro);
          font-size: var(--fs-6);
        }

        .hours-row:last-child {
          border-bottom: none;
        }

        .hours-row span:first-child {
          color: var(--gunmetal);
          font-weight: var(--fw-500);
        }

        .hours-row span:last-child {
          color: var(--spanish-gray);
          font-weight: var(--fw-600);
        }

        .support-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .support-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
          color: var(--white);
          border-radius: var(--radius-10);
          text-decoration: none;
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          transition: var(--transition);
        }

        .support-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .support-btn ion-icon {
          font-size: 20px;
        }

        @media (max-width: 1024px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            order: 1;
          }

          .support-sidebar {
            order: 2;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            padding: 120px 0 60px;
          }

          .contact-content {
            padding: 60px 0;
          }

          .contact-info-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 35px 25px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .support-sidebar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
