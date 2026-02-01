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
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authAPI.signup(formData)

      // Auto-login after signup
      const loginResult = await authAPI.login({
        email: formData.email,
        password: formData.password
      })

      session.setUser(loginResult.user)

      // Redirect based on context
      const redirect = searchParams.get('redirect')
      if (redirect === 'booking') {
        router.push('/book')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="auth-section">
          <div className="container">
            <div className="auth-container">
              <div className="auth-image">
                <img src="https://i.postimg.cc/QdTLQtDV/travel-illustration.jpg" alt="Travel" />
                <div className="auth-image-overlay">
                  <h3>Join Waynex Travels</h3>
                  <p>Create your account and unlock exclusive travel experiences</p>
                </div>
              </div>

              <div className="auth-card">
                <div className="auth-header">
                  <ion-icon name="person-add-outline"></ion-icon>
                  <h2 className="auth-title">Create Account</h2>
                  <p className="auth-subtitle">Join us to start booking amazing trips</p>
                </div>

                {error && (
                  <div className="alert alert-error">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <ion-icon name="person-outline"></ion-icon>
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        placeholder="John"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <ion-icon name="person-outline"></ion-icon>
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <ion-icon name="mail-outline"></ion-icon>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <ion-icon name="call-outline"></ion-icon>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-input"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Minimum 6 characters"
                      required
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary auth-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ion-icon name="hourglass-outline"></ion-icon>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <ion-icon name="person-add-outline"></ion-icon>
                        <span>Sign Up</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-footer">
                  <p>Already have an account?</p>
                  <Link href="/auth/login" className="auth-link">
                    Login Now
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .auth-section {
          padding: 100px 0 80px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .auth-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          background: var(--white);
          border-radius: var(--radius-25);
          overflow: hidden;
          box-shadow: 0 10px 60px rgba(0, 0, 0, 0.15);
        }

        .auth-card {
          padding: 60px 50px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .auth-header ion-icon {
          font-size: 60px;
          color: var(--bright-navy-blue);
          margin: 0 auto 20px;
        }

        .auth-title {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-2);
          font-weight: var(--fw-700);
          color: var(--oxford-blue);
          margin-bottom: 10px;
        }

        .auth-subtitle {
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--spanish-gray);
        }

        .alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
        }

        .alert-error {
          background: #fee;
          color: #c33;
          border: 1px solid #fcc;
        }

        .alert ion-icon {
          font-size: 24px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-6);
          font-weight: var(--fw-600);
          color: var(--gunmetal);
        }

        .form-label ion-icon {
          font-size: 18px;
          color: var(--bright-navy-blue);
        }

        .form-input {
          padding: 15px 20px;
          border: 2px solid var(--gainsboro);
          border-radius: 10px;
          font-family: var(--ff-poppins);
          font-size: var(--fs-5);
          color: var(--gunmetal);
          transition: var(--transition);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--bright-navy-blue);
          box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.1);
        }

        .form-input::placeholder {
          color: var(--spanish-gray);
        }

        .auth-btn {
          margin-top: 10px;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: var(--fs-5);
          font-weight: var(--fw-600);
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-btn ion-icon {
          font-size: 22px;
        }

        .auth-footer {
          margin-top: 25px;
          text-align: center;
          font-family: var(--ff-poppins);
        }

        .auth-footer p {
          font-size: var(--fs-6);
          color: var(--spanish-gray);
          margin-bottom: 10px;
        }

        .auth-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--bright-navy-blue);
          font-size: var(--fs-5);
          font-weight: var(--fw-600);
          transition: var(--transition);
        }

        .auth-link:hover {
          color: var(--yale-blue);
          gap: 12px;
        }

        .auth-link ion-icon {
          font-size: 18px;
        }

        .auth-image {
          position: relative;
          background: var(--bright-navy-blue);
          overflow: hidden;
        }

        .auth-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .auth-image-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: var(--white);
          padding: 40px;
          z-index: 2;
        }

        .auth-image-overlay h3 {
          font-family: var(--ff-montserrat);
          font-size: var(--fs-1);
          font-weight: var(--fw-700);
          margin-bottom: 15px;
        }

        .auth-image-overlay p {
          font-family: var(--ff-poppins);
          font-size: var(--fs-4);
          opacity: 0.9;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .auth-container {
            grid-template-columns: 1fr;
          }

          .auth-image {
            min-height: 300px;
            order: 2;
          }

          .auth-card {
            padding: 40px 30px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .auth-section {
            padding: 80px 20px 60px;
          }

          .auth-card {
            padding: 30px 20px;
          }

          .auth-title {
            font-size: 24px;
          }

          .auth-header ion-icon {
            font-size: 50px;
          }
        }
      `}</style>
    </>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{maxWidth: '400px', margin: '100px auto', padding: '20px'}}>Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
