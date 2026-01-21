'use client'

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo logo-text">
              <span className="logo-waynex-blue">Waynex</span>
            </a>

            <p className="footer-text">Your passport to adventure awaits with Waynex Tours and Travels!</p>
          </div>

          <div className="footer-contact">
            <h4 className="contact-title">Contact Us</h4>
            <p className="contact-text">Feel free to contact us!</p>

            <ul>
              <li className="contact-item">
                <ion-icon name="call-outline"></ion-icon>
                <a href="tel:+01123456790" className="contact-link">+01 (123) 456 7890</a>
              </li>

              <li className="contact-item">
                <ion-icon name="mail-outline"></ion-icon>
                <a href="mailto:info@waynextravels.com" className="contact-link">info@waynextravels.com</a>
              </li>

              <li className="contact-item">
                <ion-icon name="location-outline"></ion-icon>
                <address>3145 Koontz, California</address>
              </li>
            </ul>
          </div>

          <div className="footer-form">
            <p className="form-text">Subscribe to our newsletter for more update & news!!</p>

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
            &copy; 2025 <a href="#" target="_blank">Waynex Tours and Travels</a>. All rights reserved
          </p>

          <ul className="footer-bottom-list">
            <li><a href="#" className="footer-bottom-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-bottom-link">Terms & Conditions</a></li>
            <li><a href="#" className="footer-bottom-link">FAQ</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
