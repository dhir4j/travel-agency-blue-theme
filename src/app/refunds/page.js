'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function RefundsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1 className="h1 hero-title">Refunds & Cancellation Policy</h1>
            <p className="hero-subtitle">Understanding our cancellation and refund procedures</p>
          </div>
        </section>

        {/* Refunds Content */}
        <section className="refunds-content">
          <div className="container">
            <div className="refunds-wrapper">
              <p className="last-updated">Last Updated: February 2, 2025</p>

              <div className="refunds-section">
                <h2>1. General Cancellation Policy</h2>
                <p>
                  At Waynex Travels & Logistics (OPC) Private Limited, we understand that plans can change. This policy outlines
                  our cancellation and refund procedures to ensure transparency and fairness for all our customers.
                </p>
              </div>

              <div className="refunds-section">
                <h2>2. Tour Package Cancellations</h2>

                <h3>2.1 Domestic Tour Packages</h3>
                <p>Cancellation charges for domestic tours are as follows:</p>
                <div className="charges-table">
                  <div className="charges-row header">
                    <div className="col">Cancellation Period</div>
                    <div className="col">Cancellation Charges</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">30+ days before departure</div>
                    <div className="col">10% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">15-29 days before departure</div>
                    <div className="col">25% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">8-14 days before departure</div>
                    <div className="col">50% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">3-7 days before departure</div>
                    <div className="col">75% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">Less than 3 days or No-show</div>
                    <div className="col">100% of total tour cost (No refund)</div>
                  </div>
                </div>

                <h3>2.2 International Tour Packages</h3>
                <p>Cancellation charges for international tours are as follows:</p>
                <div className="charges-table">
                  <div className="charges-row header">
                    <div className="col">Cancellation Period</div>
                    <div className="col">Cancellation Charges</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">45+ days before departure</div>
                    <div className="col">15% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">30-44 days before departure</div>
                    <div className="col">30% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">15-29 days before departure</div>
                    <div className="col">50% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">8-14 days before departure</div>
                    <div className="col">75% of total tour cost</div>
                  </div>
                  <div className="charges-row">
                    <div className="col">Less than 8 days or No-show</div>
                    <div className="col">100% of total tour cost (No refund)</div>
                  </div>
                </div>
              </div>

              <div className="refunds-section">
                <h2>3. Visa Service Cancellations</h2>
                <ul>
                  <li><strong>Before visa submission:</strong> 50% of visa processing fees will be charged</li>
                  <li><strong>After visa submission:</strong> No refund on visa processing fees</li>
                  <li><strong>Visa rejection:</strong> Processing fees are non-refundable. However, we will assist with reapplication at additional cost</li>
                  <li>Embassy/Consulate fees are non-refundable in all cases</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>4. Refund Processing</h2>
                <ul>
                  <li>All refund requests must be submitted in writing via email to support@waynextravels.com</li>
                  <li>Refunds will be processed within 15-20 business days from the date of cancellation approval</li>
                  <li>Refunds will be credited to the original payment method used for booking</li>
                  <li>Bank processing charges, if any, will be deducted from the refund amount</li>
                  <li>Refund confirmation will be sent via email</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>5. Modification and Date Changes</h2>
                <p>
                  Modifications to bookings (such as date changes, passenger name changes, or itinerary changes) are subject
                  to availability and the following conditions:
                </p>
                <ul>
                  <li>Date change requests made 15+ days before departure: ₹500 per person modification fee</li>
                  <li>Date change requests made less than 15 days: Subject to cancellation charges as per above policy</li>
                  <li>Name changes: ₹1000 per person (subject to airline/hotel policy)</li>
                  <li>Itinerary changes: Charges apply based on the difference in package cost and service provider policies</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>6. Cancellation by Waynex Travels</h2>
                <p>In rare cases where we need to cancel a tour due to insufficient participants or unforeseen circumstances:</p>
                <ul>
                  <li>Full refund of the amount paid will be processed</li>
                  <li>Alternative tour options will be offered</li>
                  <li>We are not liable for any additional expenses incurred by customers (e.g., visa fees, travel to departure point)</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>7. Force Majeure and Extraordinary Circumstances</h2>
                <p>
                  In case of force majeure events (natural disasters, pandemics, war, terrorism, etc.), the following applies:
                </p>
                <ul>
                  <li>Refunds will be subject to the policies of airlines, hotels, and other service providers</li>
                  <li>We will make every effort to secure maximum refund possible from service providers</li>
                  <li>Processing fees and service charges are non-refundable</li>
                  <li>Travel vouchers/credits may be offered as an alternative to cash refunds</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>8. Travel Insurance Claims</h2>
                <p>
                  For bookings with travel insurance, customers may be eligible for refunds through their insurance provider.
                  We recommend contacting your insurance company directly for such claims. Waynex Travels will provide necessary
                  documentation to support insurance claims.
                </p>
              </div>

              <div className="refunds-section">
                <h2>9. Non-Refundable Components</h2>
                <p>The following are non-refundable under all circumstances:</p>
                <ul>
                  <li>Visa fees paid to embassies/consulates</li>
                  <li>Travel insurance premiums</li>
                  <li>Special permits and entry fees</li>
                  <li>Non-refundable airline tickets (as per airline policy)</li>
                  <li>Non-refundable hotel bookings (as per hotel policy)</li>
                  <li>Processing and service charges</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>10. Special Conditions</h2>
                <ul>
                  <li>Peak season bookings (December-January, May-June) may have stricter cancellation policies</li>
                  <li>Group bookings (10+ passengers) are subject to separate cancellation terms</li>
                  <li>Corporate bookings may have customized cancellation policies as per agreement</li>
                  <li>Last-minute or promotional bookings may be non-refundable</li>
                </ul>
              </div>

              <div className="refunds-section">
                <h2>11. How to Cancel Your Booking</h2>
                <p>To cancel your booking, please follow these steps:</p>
                <ol>
                  <li>Send an email to <strong>support@waynextravels.com</strong> with your booking ID and reason for cancellation</li>
                  <li>Our team will confirm receipt and process your cancellation request within 2 business days</li>
                  <li>You will receive a cancellation confirmation with details of applicable charges</li>
                  <li>Refund (if applicable) will be processed as per our refund policy</li>
                </ol>
              </div>

              <div className="refunds-section">
                <h2>12. Disputes and Resolution</h2>
                <p>
                  If you have any concerns about cancellations or refunds, please contact our customer support team at
                  support@waynextravels.com or call +91 6283279859. We are committed to resolving all disputes amicably
                  and fairly.
                </p>
              </div>

              <div className="contact-box">
                <h3>Need Assistance?</h3>
                <p>Our customer support team is here to help you with any questions about cancellations and refunds.</p>
                <div className="contact-info">
                  <div>
                    <ion-icon name="mail-outline"></ion-icon>
                    <span>support@waynextravels.com</span>
                  </div>
                  <div>
                    <ion-icon name="call-outline"></ion-icon>
                    <span>+91 6283279859</span>
                  </div>
                </div>
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

        .refunds-content {
          padding: 80px 0;
        }

        .refunds-wrapper {
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

        .refunds-section {
          margin-bottom: 40px;
        }

        .refunds-section h2 {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--gainsboro);
        }

        .refunds-section h3 {
          font-size: var(--fs-4);
          color: var(--oxford-blue);
          margin: 25px 0 15px;
        }

        .refunds-section p {
          color: var(--gunmetal);
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .refunds-section ul,
        .refunds-section ol {
          list-style-position: outside;
          padding-left: 30px;
          color: var(--gunmetal);
          line-height: 1.8;
        }

        .refunds-section ul {
          list-style: disc;
        }

        .refunds-section ol {
          list-style: decimal;
        }

        .refunds-section ul li,
        .refunds-section ol li {
          margin-bottom: 10px;
        }

        .charges-table {
          margin: 20px 0;
          border: 2px solid var(--gainsboro);
          border-radius: var(--radius-15);
          overflow: hidden;
        }

        .charges-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--gainsboro);
        }

        .charges-row:last-child {
          border-bottom: none;
        }

        .charges-row.header {
          background: var(--bright-navy-blue);
          color: var(--white);
          font-weight: var(--fw-600);
        }

        .charges-row .col {
          padding: 15px 20px;
          border-right: 1px solid var(--gainsboro);
        }

        .charges-row .col:last-child {
          border-right: none;
        }

        .charges-row:not(.header):nth-child(even) {
          background: var(--cultured);
        }

        .contact-box {
          margin-top: 50px;
          padding: 30px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: var(--radius-15);
          border: 2px solid var(--bright-navy-blue);
        }

        .contact-box h3 {
          font-size: var(--fs-3);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .contact-box p {
          color: var(--gunmetal);
          margin-bottom: 20px;
        }

        .contact-info {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .contact-info div {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--bright-navy-blue);
          font-weight: var(--fw-600);
        }

        .contact-info ion-icon {
          font-size: 24px;
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 120px 0 60px;
          }

          .refunds-wrapper {
            padding: 30px 20px;
          }

          .refunds-section h2 {
            font-size: var(--fs-4);
          }

          .charges-row {
            grid-template-columns: 1fr;
          }

          .charges-row .col {
            border-right: none;
            border-bottom: 1px solid var(--gainsboro);
          }

          .charges-row .col:last-child {
            border-bottom: none;
          }

          .contact-info {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </>
  )
}
