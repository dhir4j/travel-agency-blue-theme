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
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authAPI.login(formData)
      session.setUser(result.user)
      router.push('/dashboard')
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
              <div className="auth-card">
                <div className="auth-header">
                  <ion-icon name="log-in-outline"></ion-icon>
                  <h2 className="auth-title">Welcome Back</h2>
                  <p className="auth-subtitle">Login to your account to continue</p>
                </div>

                {error && (
                  <div className="alert alert-error">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
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
                      placeholder="Enter your email"
                      required
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
                      placeholder="Enter your password"
                      required
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
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <>
                        <ion-icon name="log-in-outline"></ion-icon>
                        <span>Login</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-footer">
                  <p>Don't have an account?</p>
                  <Link href="/auth/signup" className="auth-link">
                    Sign Up Now
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </Link>
                </div>
              </div>

              <div className="auth-image">
                <img src="https://i.postimg.cc/QdTLQtDV/travel-illustration.jpg" alt="Travel" />
                <div className="auth-image-overlay">
                  <h3>Start Your Journey</h3>
                  <p>Discover amazing destinations and create unforgettable memories</p>
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
          margin-bottom: 40px;
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
          margin-bottom: 25px;
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
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
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
          margin-top: 30px;
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
          }

          .auth-card {
            padding: 40px 30px;
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
