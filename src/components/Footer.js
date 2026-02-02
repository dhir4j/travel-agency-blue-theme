'use client'

import Link from 'next/link'

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`)
    e.target.reset()
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <Link href="/" className="logo logo-text">
              <span className="logo-waynex-blue">Waynex</span>
            </Link>

            <p className="footer-text">Your passport to adventure awaits with Waynex Travels & Logistics (OPC) Private Limited!</p>
          </div>

          <div className="footer-contact">
            <h4 className="contact-title">Contact Us</h4>
            <p className="contact-text">Feel free to reach out!</p>

            <ul>
              <li className="contact-item">
                <ion-icon name="call-outline"></ion-icon>
                <a href="tel:+916283279859" className="contact-link">+91 6283279859</a>
              </li>

              <li className="contact-item">
                <ion-icon name="mail-outline"></ion-icon>
                <a href="mailto:info@waynextravels.com" className="contact-link">info@waynextravels.com</a>
              </li>

              <li className="contact-item">
                <ion-icon name="briefcase-outline"></ion-icon>
                <a href="mailto:sales@waynextravels.com" className="contact-link">sales@waynextravels.com</a>
              </li>

              <li className="contact-item">
                <ion-icon name="headset-outline"></ion-icon>
                <a href="mailto:support@waynextravels.com" className="contact-link">support@waynextravels.com</a>
              </li>

              <li className="contact-item">
                <ion-icon name="location-outline"></ion-icon>
                <address>Circular Road, Near Prita Lee Lesson School, Ashok Vihar, Kapurthala, Punjab – 144601</address>
              </li>
            </ul>
          </div>

          <div className="footer-form">
            <p className="form-text">Subscribe to our newsletter for updates & news!</p>

            <form onSubmit={handleSubmit} className="form-wrapper">
              <input type="email" name="email" className="input-field" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-secondary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2025 <Link href="/">Waynex Travels & Logistics (OPC) Private Limited</Link>. All rights reserved
          </p>

          <ul className="footer-bottom-list">
            <li><Link href="/about" className="footer-bottom-link">About Us</Link></li>
            <li><Link href="/contact" className="footer-bottom-link">Contact</Link></li>
            <li><Link href="/terms" className="footer-bottom-link">Terms & Conditions</Link></li>
            <li><Link href="/refunds" className="footer-bottom-link">Refunds & Cancellation</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
