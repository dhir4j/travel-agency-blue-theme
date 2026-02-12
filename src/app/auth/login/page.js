'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // OTP state
  const [step, setStep] = useState('credentials') // 'credentials' | 'otp' | 'unverified'
  const [otpEmail, setOtpEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef([])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  // Try auto-login from remember token on mount
  useEffect(() => {
    const tryAutoLogin = async () => {
      const user = session.getUser()
      if (user) {
        router.push('/profile')
        return
      }
      const restored = await session.tryRestoreSession()
      if (restored) {
        router.push('/profile')
      }
    }
    tryAutoLogin()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authAPI.login(formData)

      if (result.requiresOtp) {
        setOtpEmail(result.email)
        setStep('otp')
        setResendCooldown(60)
        setLoading(false)
        return
      }

      // Direct login fallback
      session.setUser(result.user)
      if (result.rememberToken) {
        session.setRememberToken(result.rememberToken)
      }
      router.push('/profile')
    } catch (err) {
      // Check for unverified email (403)
      if (err.status === 403 && err.data?.requiresVerification) {
        setOtpEmail(err.data.email)
        setStep('unverified')
        setResendCooldown(60)
        setLoading(false)
        return
      }
      setError(err.message)
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setOtpError('')
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    const otpString = otp.join('')
    if (otpString.length !== 6) {
      setOtpError('Please enter the complete 6-digit code')
      return
    }

    setIsVerifying(true)
    setOtpError('')

    const context = step === 'unverified' ? 'signup' : 'login'

    try {
      const data = await authAPI.verifyOtp({
        email: otpEmail,
        otp: otpString,
        context,
        rememberMe: context === 'login' ? formData.rememberMe : undefined,
      })

      if (context === 'signup') {
        alert('Email verified! Please sign in with your credentials.')
        setStep('credentials')
        setOtp(['', '', '', '', '', ''])
      } else {
        session.setUser(data.user)
        if (data.rememberToken) {
          session.setRememberToken(data.rememberToken)
        }
        router.push('/profile')
      }
    } catch (err) {
      setOtpError(err.message || 'Invalid verification code')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return
    try {
      await authAPI.sendOtp(otpEmail)
      setResendCooldown(60)
      setOtp(['', '', '', '', '', ''])
      setOtpError('')
      inputRefs.current[0]?.focus()
    } catch (err) {
      setOtpError('Failed to resend code. Please try again.')
    }
  }

  // OTP screen
  if (step === 'otp' || step === 'unverified') {
    const isUnverified = step === 'unverified'
    return (
      <>
        <Header />
        <main>
          <section className="auth-hero">
            <div className="container">
              <div className="auth-center">
                <div className="auth-glass-card auth-glass-card--narrow">
                  <div className="auth-form-section auth-form-section--centered">
                    <div className="auth-icon">
                      <ion-icon name="mail-outline"></ion-icon>
                    </div>

                    <h2>{isUnverified ? 'Verify Your Email' : 'Enter Verification Code'}</h2>
                    <p className="subtitle">
                      {isUnverified
                        ? 'Your email is not verified yet. We\'ve sent a code to'
                        : 'We\'ve sent a 6-digit code to'}
                      {' '}<strong>{otpEmail}</strong>
                    </p>

                    {otpError && (
                      <div className="auth-error">
                        <ion-icon name="alert-circle-outline"></ion-icon>
                        <span>{otpError}</span>
                      </div>
                    )}

                    <div className="otp-container" onPaste={handleOtpPaste}>
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { inputRefs.current[i] = el }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="otp-input"
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={isVerifying || otp.join('').length !== 6}
                      className="btn btn-primary auth-btn"
                    >
                      {isVerifying ? 'Verifying...' : isUnverified ? 'Verify Email' : 'Sign In'}
                    </button>

                    <div className="otp-actions">
                      <p>
                        Didn&apos;t receive the code?{' '}
                        <button
                          onClick={handleResendOtp}
                          disabled={resendCooldown > 0}
                          className="link-btn"
                        >
                          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                        </button>
                      </p>
                      <button
                        onClick={() => {
                          setStep('credentials')
                          setOtp(['', '', '', '', '', ''])
                          setOtpError('')
                        }}
                        className="link-btn"
                      >
                        Back to sign in
                      </button>
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
          ${sharedStyles}
          ${otpStyles}
        `}</style>
      </>
    )
  }

  return (
    <>
      <Header />

      <main>
        <section className="auth-hero">
          <div className="container">
            <div className="auth-center">
              <div className="auth-glass-card">
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

                    <div className="remember-row">
                      <label className="remember-label">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) =>
                            setFormData({ ...formData, rememberMe: e.target.checked })
                          }
                        />
                        <span>Remember me for 30 days</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary auth-btn"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>

                  <div className="auth-footer">
                    Don&apos;t have an account?
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
        ${sharedStyles}
        ${otpStyles}
      `}</style>
    </>
  )
}

const sharedStyles = `
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
    background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35));
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

  .auth-glass-card {
    width: 100%;
    max-width: 1050px;
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 48px;
    align-items: center;
    padding: 52px;
    background: rgba(0,0,0,0.34);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-radius: 28px;
    box-shadow: 0 40px 120px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.14);
  }

  .auth-glass-card--narrow {
    max-width: 520px;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .auth-brand h1 {
    color: #fff;
    font-size: 42px;
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .auth-brand p {
    color: rgba(255,255,255,0.9);
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
    color: rgba(255,255,255,0.92);
    font-size: 15px;
  }

  .auth-brand ion-icon { font-size: 22px; }

  .auth-form-section {
    background: rgba(255,255,255,0.84);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-radius: 22px;
    padding: 38px;
    max-width: 380px;
    width: 100%;
    justify-self: end;
    box-shadow: 0 20px 50px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.35);
  }

  .auth-form-section--centered {
    justify-self: center;
    max-width: 440px;
    text-align: center;
  }

  .auth-icon {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--bright-navy-blue), var(--yale-blue));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-bottom: 12px;
    font-size: 26px;
  }

  .auth-form-section--centered .auth-icon {
    margin: 0 auto 12px;
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
    text-align: left;
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
    text-align: left;
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

  .remember-row {
    display: flex;
    align-items: center;
  }

  .remember-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--gunmetal);
    cursor: pointer;
  }

  .remember-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--bright-navy-blue);
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
`

const otpStyles = `
  .otp-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .otp-input {
    width: 48px;
    height: 56px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    border: 2px solid var(--gainsboro);
    border-radius: 12px;
    background: #fff;
    color: var(--oxford-blue);
    padding: 0;
  }

  .otp-input:focus {
    outline: none;
    border-color: var(--bright-navy-blue);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .otp-actions {
    margin-top: 16px;
    font-size: 13px;
    color: var(--spanish-gray);
  }

  .otp-actions p {
    margin-bottom: 8px;
  }

  .link-btn {
    background: none;
    border: none;
    color: var(--bright-navy-blue);
    font-weight: 600;
    cursor: pointer;
    font-size: 13px;
    padding: 0;
  }

  .link-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
