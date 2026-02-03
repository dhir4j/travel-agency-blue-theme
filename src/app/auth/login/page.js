'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authAPI.login(formData)
      session.setUser(result.user)
      router.push('/profile')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <main>
        <section className="auth-hero">
          <div className="container">
            <div className="auth-center">

              {/* SINGLE COMBINED GLASS CARD */}
              <div className="auth-glass-card">

                {/* LEFT BRAND */}
                <div className="auth-brand">
                  <h1>Travel smarter with Waynex</h1>
                  <p>
                    Book tours, apply for visas, and manage your journeys —
                    all in one trusted platform.
                  </p>

                  <ul>
                    <li>
                      <ion-icon name="shield-checkmark-outline"></ion-icon>
                      Secure & verified services
                    </li>
                    <li>
                      <ion-icon name="time-outline"></ion-icon>
                      Fast visa processing
                    </li>
                    <li>
                      <ion-icon name="star-outline"></ion-icon>
                      Rated 4.7 by 15000+ travelers
                    </li>
                  </ul>
                </div>

                {/* RIGHT LOGIN */}
                <div className="auth-form-section">
                  <div className="auth-icon">
                    <ion-icon name="log-in-outline"></ion-icon>
                  </div>

                  <h2>Welcome Back</h2>
                  <p className="subtitle">Login to continue your journey</p>

                  {error && (
                    <div className="auth-error">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary auth-btn"
                      disabled={loading}
                    >
                      {loading ? 'Logging in…' : 'Login'}
                    </button>
                  </form>

                  <div className="auth-footer">
                    Don’t have an account?
                    <Link href="/auth/signup"> Create one</Link>
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
        /* HERO */
        .auth-hero {
          position: relative;
          min-height: 100vh;
          padding: 160px 0 100px;
          background-image: url("https://i.postimg.cc/D0c2FLPM/hero-banner.jpg");
          background-size: cover;
          background-position: center;
        }

        .auth-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.35)
          );
          pointer-events: none;
        }

        .auth-center {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 260px);
          position: relative;
          z-index: 1;
        }

        /* MAIN GLASS CARD */
        .auth-glass-card {
          width: 100%;
          max-width: 1050px;

          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          align-items: center;

          padding: 52px;

          background: rgba(0, 0, 0, 0.34);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border-radius: 28px;
          box-shadow:
            0 40px 120px rgba(0, 0, 0, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.14);
        }

        /* LEFT */
        .auth-brand h1 {
          color: #fff;
          font-size: 42px;
          line-height: 1.2;
          margin-bottom: 14px;
        }

        .auth-brand p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin-bottom: 28px;
        }

        .auth-brand ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-brand li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 15px;
        }

        .auth-brand ion-icon {
          font-size: 22px;
        }

        /* RIGHT FORM */
.auth-form-section {
  background: rgba(255, 255, 255, 0.84); /* 👈 softer white */
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-radius: 22px;
  padding: 38px;
  max-width: 380px;
  width: 100%;
  justify-self: end;

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.35);
}


        .auth-icon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--bright-navy-blue),
            var(--yale-blue)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 12px;
          font-size: 26px;
        }

        .auth-form-section h2 {
          font-size: 22px;
          margin-bottom: 4px;
          color: var(--oxford-blue);
        }

        .subtitle {
          font-size: 14px;
          color: var(--spanish-gray);
          margin-bottom: 22px;
        }

        .auth-error {
          display: flex;
          gap: 8px;
          align-items: center;
          background: #fee;
          color: #c33;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-size: 13px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-size: 13px;
          font-weight: 600;
          color: var(--gunmetal);
        }

        .field input {
          padding: 13px 15px;
          border-radius: 10px;
          border: 2px solid var(--gainsboro);
          font-size: 14px;
        }

        .field input:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
        }

        .auth-btn {
          margin-top: 10px;
          padding: 14px;
          border-radius: 999px;
          font-size: 15px;
        }

        .auth-footer {
          margin-top: 18px;
          text-align: center;
          font-size: 13px;
          color: var(--spanish-gray);
        }

        .auth-footer a {
          color: var(--bright-navy-blue);
          font-weight: 600;
        }

        /* MOBILE */
        @media (max-width: 992px) {
          .auth-glass-card {
            grid-template-columns: 1fr;
            padding: 40px;
            text-align: center;
          }

          .auth-form-section {
            justify-self: center;
          }
        }

        @media (max-width: 768px) {
          .auth-hero {
            padding: 130px 20px 80px;
          }
        }
      `}</style>
    </>
  )
}
