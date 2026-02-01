'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'

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
        router.push('/tours/booking-continue')  // Handle pending booking
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth: '400px', margin: '100px auto', padding: '20px'}}>
      <h1>Create Account</h1>
      {error && <div style={{color: 'red', marginBottom: '20px'}}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          required
          style={{width: '100%', padding: '10px', marginBottom: '10px'}}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          required
          style={{width: '100%', padding: '10px', marginBottom: '10px'}}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          style={{width: '100%', padding: '10px', marginBottom: '10px'}}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          style={{width: '100%', padding: '10px', marginBottom: '10px'}}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
          minLength={6}
          style={{width: '100%', padding: '10px', marginBottom: '20px'}}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p style={{marginTop: '20px', textAlign: 'center'}}>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{maxWidth: '400px', margin: '100px auto', padding: '20px'}}>Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
