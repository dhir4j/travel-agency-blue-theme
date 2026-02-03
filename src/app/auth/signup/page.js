'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await authAPI.signup(formData)

      const loginResult = await authAPI.login({
        email: formData.email,
        password: formData.password
      })

      session.setUser(loginResult.user)

      const redirect = searchParams.get('redirect')
      router.push(redirect === 'booking' ? '/book' : '/profile')
    } catch (err) {
      setError(err?.message || 'Something went wrong')
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

              {/* COMBINED GLASS CARD */}
              <div className="auth-glass-card">

                {/* LEFT BRAND */}
                <div className="auth-brand">
                  <h1>Begin your Waynex experience</h1>
                  <p>
                    Create your account and manage tours, visas, and travel
                    plans effortlessly — all from one secure platform.
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

                {/* RIGHT FORM */}
                <div className="auth-form-section">
                  <h2>Create Account</h2>
                  <p className="subtitle">Takes less than a minute</p>

                  {error && (
                    <div className="auth-error">{error}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="First name"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({ ...formData, first_name: e.target.value })
                        }
                        required
                      />

                      <input
                        type="text"
                        placeholder="Last name"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({ ...formData, last_name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />

                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />

                    <input
                      type="password"
                      placeholder="Password (min 6 characters)"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      minLength={6}
                      required
                    />

                    <button
                      type="submit"
                      className="auth-btn"
                      disabled={loading}
                    >
                      {loading ? 'Creating…' : 'Sign Up'}
                    </button>
                  </form>

                  <div className="auth-footer">
                    Already have an account?
                    <Link href="/auth/login"> Login</Link>
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
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.35)
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

        /* GLASS CARD */
        .auth-glass-card {
          width: 100%;
          max-width: 1180px;
          min-height: 540px;

          display: grid;
          grid-template-columns: 1.5fr 1.1fr;
          gap: 60px;

          padding: 60px;

          background: rgba(0,0,0,0.32);
          backdrop-filter: blur(18px);

          border-radius: 30px;
          box-shadow: 0 40px 120px rgba(0,0,0,0.6);
        }

/* LEFT */
.auth-brand {
  display: flex;
  flex-direction: column;
  justify-content: center;   /* ✅ vertical centering */
  height: 100%;              /* ✅ fill glass card height */
}

.auth-brand h1 {
  font-size: 42px;
  color: #fff;
  margin-bottom: 16px;
}

.auth-brand p {
  font-size: 16px;
  color: rgba(255,255,255,0.9);
  max-width: 480px;
  margin-bottom: 28px;
}


.auth-brand ul li {
  display: flex;              /* ✅ puts icon + text on same line */
  align-items: center;        /* ✅ vertical alignment */
  gap: 10px;
  color: rgba(255,255,255,0.85);                  /* spacing between icon & text */
}

.auth-brand ul li ion-icon {
  font-size: 18px;
  flex-shrink: 0;             /* prevents icon from shrinking */
  opacity: 0.9;
}


        /* RIGHT */
        .auth-form-section {
          background: rgba(255,255,255,0.9);
          border-radius: 24px;
          padding: 48px;
          max-width: 440px;
          width: 100%;
          justify-self: end;
        }

        .auth-form-section h2 {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 24px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        input {
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .auth-btn {
          margin-top: 12px;
          padding: 14px;
          border-radius: 999px;
          background: var(--bright-navy-blue);
          color: #fff;
          font-size: 15px;
          border: none;
        }

        .auth-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: #555;
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
      `}</style>
    </>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: 120, textAlign: 'center' }}>Loading…</div>}>
      <SignupForm />
    </Suspense>
  )
}
