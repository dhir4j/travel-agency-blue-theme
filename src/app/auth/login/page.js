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
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GoTop />

      <style jsx>{`
        .auth-section {
          padding: 150px 0 100px;
          background: linear-gradient(135deg, var(--bright-navy-blue) 0%, var(--yale-blue) 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .auth-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .auth-container {
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .auth-card {
          padding: 60px 50px;
          background: var(--white);
          border-radius: var(--radius-25);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.2);
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

        @media (max-width: 768px) {
          .auth-section {
            padding: 120px 20px 80px;
          }

          .auth-card {
            padding: 40px 30px;
          }
        }

        @media (max-width: 576px) {
          .auth-card {
            padding: 35px 25px;
          }

          .auth-title {
            font-size: var(--fs-3);
          }

          .auth-header ion-icon {
            font-size: 50px;
          }
        }
      `}</style>
    </>
  )
}
