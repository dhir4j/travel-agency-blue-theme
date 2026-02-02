'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1 className="h1 hero-title">Terms & Conditions</h1>
            <p className="hero-subtitle">Please read these terms carefully before using our services</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="terms-content">
          <div className="container">
            <div className="terms-wrapper">
              <p className="last-updated">Last Updated: February 2, 2025</p>

              <div className="terms-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the services of Waynex Travels & Logistics (OPC) Private Limited ("Waynex Travels", "we", "us", or "our"),
                  you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div className="terms-section">
                <h2>2. Services Offered</h2>
                <p>Waynex Travels provides the following services:</p>
                <ul>
                  <li>Domestic and international tour packages</li>
                  <li>Visa application assistance and processing</li>
                  <li>Travel logistics and coordination</li>
                  <li>Hotel bookings and accommodations</li>
                  <li>Transportation arrangements</li>
                  <li>Travel insurance facilitation</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2>3. Booking and Payment</h2>
                <ul>
                  <li>All bookings are subject to availability and confirmation from Waynex Travels.</li>
                  <li>Payment terms will be specified at the time of booking and must be adhered to.</li>
                  <li>Full payment is required before the commencement of travel unless otherwise agreed upon in writing.</li>
                  <li>Prices are subject to change without prior notice until booking is confirmed and payment is received.</li>
                  <li>We accept payment through various methods including online transfers, credit/debit cards, and UPI.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2>4. Cancellation Policy</h2>
                <p>
                  Cancellation charges vary depending on the time of cancellation and the specific tour or service booked.
                  Please refer to our <a href="/refunds">Refunds & Cancellation Policy</a> for detailed information.
                </p>
              </div>

              <div className="terms-section">
                <h2>5. Travel Documents</h2>
                <ul>
                  <li>Passengers are responsible for ensuring they have valid passports, visas, and other required travel documents.</li>
                  <li>While we provide visa assistance, the final decision on visa approval rests with the respective embassy/consulate.</li>
                  <li>We are not responsible for any visa rejections or delays.</li>
                  <li>All travelers must comply with customs and immigration requirements of the countries visited.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2>6. Travel Insurance</h2>
                <p>
                  We strongly recommend that all travelers purchase comprehensive travel insurance covering medical emergencies,
                  trip cancellations, lost baggage, and other unforeseen circumstances. Waynex Travels is not liable for any
                  losses or expenses incurred during travel.
                </p>
              </div>

              <div className="terms-section">
                <h2>7. Health and Safety</h2>
                <ul>
                  <li>Travelers must ensure they are medically fit to travel and have necessary vaccinations.</li>
                  <li>Any pre-existing medical conditions must be disclosed at the time of booking.</li>
                  <li>We reserve the right to refuse services if health conditions pose risks to the traveler or group.</li>
                  <li>Travelers must follow all safety guidelines and instructions provided by our staff and tour guides.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2>8. Changes to Itinerary</h2>
                <p>
                  While we make every effort to adhere to the published itinerary, we reserve the right to make changes due to
                  weather conditions, political situations, safety concerns, or other circumstances beyond our control. Alternative
                  arrangements of similar quality will be provided wherever possible.
                </p>
              </div>

              <div className="terms-section">
                <h2>9. Liability and Disclaimer</h2>
                <ul>
                  <li>Waynex Travels acts only as an agent for hotels, airlines, and other service providers.</li>
                  <li>We are not liable for delays, cancellations, or changes made by third-party service providers.</li>
                  <li>We are not responsible for loss, damage, or theft of personal belongings during travel.</li>
                  <li>Travelers participate in activities at their own risk.</li>
                  <li>Our liability is limited to the amount paid for the specific service booked.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2>10. Privacy and Data Protection</h2>
                <p>
                  We collect and process personal information necessary for providing our services. This information is handled
                  in accordance with applicable data protection laws and our Privacy Policy. We do not share your personal
                  information with third parties except as required to fulfill our services.
                </p>
              </div>

              <div className="terms-section">
                <h2>11. Conduct and Behavior</h2>
                <p>
                  Travelers are expected to conduct themselves in a respectful and appropriate manner. Waynex Travels reserves
                  the right to terminate services for anyone whose behavior is deemed detrimental to the safety, comfort, or
                  enjoyment of others, without any refund.
                </p>
              </div>

              <div className="terms-section">
                <h2>12. Force Majeure</h2>
                <p>
                  Waynex Travels shall not be liable for any failure to perform its obligations due to circumstances beyond its
                  reasonable control, including but not limited to acts of God, war, terrorism, civil unrest, government actions,
                  natural disasters, or pandemics.
                </p>
              </div>

              <div className="terms-section">
                <h2>13. Governing Law</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                  Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in
                  Kapurthala, Punjab.
                </p>
              </div>

              <div className="terms-section">
                <h2>14. Contact Information</h2>
                <p>For any questions or concerns regarding these terms, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong> info@waynextravels.com</li>
                  <li><strong>Phone:</strong> +91 6283279859</li>
                  <li><strong>Address:</strong> Circular Road, Near Prita Lee Lesson School, Ashok Vihar, Kapurthala, Punjab – 144601</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2>15. Amendments</h2>
                <p>
                  Waynex Travels reserves the right to modify these Terms and Conditions at any time. Changes will be effective
                  immediately upon posting on our website. Continued use of our services after such changes constitutes acceptance
                  of the modified terms.
                </p>
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

        .terms-content {
          padding: 80px 0;
        }

        .terms-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: var(--white);
          padding: 50px;
          border-radius: var(--radius-25);
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
        }

        .last-updated {
          color: var(--spanish-gray);
          font-size: var(--fs-6);
          margin-bottom: 40px;
          font-style: italic;
        }

        .terms-section {
          margin-bottom: 40px;
        }

        .terms-section h2 {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--gainsboro);
        }

        .terms-section p {
          color: var(--gunmetal);
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .terms-section ul {
          list-style: disc;
          padding-left: 30px;
          color: var(--gunmetal);
          line-height: 1.8;
        }

        .terms-section ul li {
          margin-bottom: 10px;
        }

        .terms-section a {
          color: var(--bright-navy-blue);
          text-decoration: underline;
        }

        .terms-section a:hover {
          color: var(--yale-blue);
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 120px 0 60px;
          }

          .terms-wrapper {
            padding: 30px 20px;
          }

          .terms-section h2 {
            font-size: var(--fs-4);
          }
        }
      `}</style>
    </>
  )
}
