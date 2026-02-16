'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/profile'

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // OTP state
  const [step, setStep] = useState('form') // 'form' | 'otp' | 'success'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authAPI.signup(formData)

      if (result.requiresVerification) {
        setOtpEmail(result.email || formData.email)
        setStep('otp')
        setResendCooldown(60)
      }
    } catch (err) {
      // Even on error, if requiresVerification is set, show OTP
      if (err.data?.requiresVerification) {
        setOtpEmail(err.data.email || formData.email)
        setStep('otp')
        setResendCooldown(60)
      } else {
        setError(err?.message || 'Something went wrong')
      }
    } finally {
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

    try {
      const data = await authAPI.verifyOtp({
        email: otpEmail,
        otp: otpString,
        context: 'signup',
      })

      if (data.verified && data.user) {
        session.setUser(data.user)
        router.push(redirectUrl)
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

  // OTP verification screen
  if (step === 'otp') {
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

                    <h2>Verify Your Email</h2>
                    <p className="subtitle">
                      We&apos;ve sent a 6-digit code to{' '}
                      <strong>{otpEmail}</strong>
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
                      className="auth-btn"
                    >
                      {isVerifying ? 'Verifying...' : 'Verify Email'}
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

                <div className="auth-form-section">
                  <h2>Create Account</h2>
                  <p className="subtitle">Takes less than a minute</p>

                  {error && (
                    <div className="auth-error">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      <span>{error}</span>
                    </div>
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
                      {loading ? 'Creating...' : 'Sign Up'}
                    </button>
                  </form>

                  <div className="auth-footer">
                    Already have an account?
                    <Link href={`/auth/login${redirectUrl !== '/profile' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}> Login</Link>
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: 120, textAlign: 'center' }}>Loading...</div>}>
      <SignupForm />
    </Suspense>
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

  .auth-glass-card--narrow {
    max-width: 520px;
    grid-template-columns: 1fr;
    gap: 0;
    min-height: auto;
  }

  .auth-brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
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

  .auth-brand ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .auth-brand ul li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255,255,255,0.85);
  }

  .auth-brand ul li ion-icon {
    font-size: 18px;
    flex-shrink: 0;
    opacity: 0.9;
  }

  .auth-form-section {
    background: rgba(255,255,255,0.9);
    border-radius: 24px;
    padding: 48px;
    max-width: 440px;
    width: 100%;
    justify-self: end;
  }

  .auth-form-section--centered {
    justify-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-bottom: 6px;
  }

  .subtitle {
    font-size: 14px;
    color: #666;
    margin-bottom: 24px;
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
    cursor: pointer;
    width: 100%;
  }

  .auth-btn:disabled {
    opacity: 0.5;
    cursor: default;
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
