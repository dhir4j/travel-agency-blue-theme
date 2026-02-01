'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { bookingsAPI, session } from '@/lib/api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'

export default function BookingPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    order_type: 'tour',  // 'tour' or 'visa'
    package_name: '',
    package_type: '',
    destination: '',
    travel_date: '',
    num_adults: 1,
    num_children: 0,
    price_per_person: '',
    special_requests: ''
  })

  useEffect(() => {
    const currentUser = session.getUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Check if user is logged in
      if (!user) {
        router.push('/auth/signup?redirect=booking')
        return
      }

      // Prepare booking data
      const bookingData = {
        user_id: user.id,
        order_type: formData.order_type,
        package_name: formData.package_name,
        package_type: formData.package_type || null,
        destination: formData.destination || null,
        travel_date: formData.travel_date,
        num_adults: parseInt(formData.num_adults),
        num_children: parseInt(formData.num_children),
        price_per_person: parseFloat(formData.price_per_person),
        special_requests: formData.special_requests
      }

      // Create booking
      const result = await bookingsAPI.create(bookingData)

      // Redirect to checkout
      router.push(`/checkout?booking_id=${result.booking.id}`)

    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main style={{padding: '50px 20px', maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{marginBottom: '10px'}}>Create New Booking</h1>
        <p style={{marginBottom: '30px', color: '#666'}}>
          Fill out the form below to create a tour or visa booking
        </p>

        {!user && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            ⚠️ You need to be logged in to create a booking. You'll be redirected to signup after submitting.
          </div>
        )}

        {error && (
          <div style={{
            background: '#f8d7da',
            border: '1px solid #f5c6cb',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            color: '#721c24'
          }}>
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
          {/* Order Type */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Order Type *
            </label>
            <select
              name="order_type"
              value={formData.order_type}
              onChange={handleInputChange}
              required
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            >
              <option value="tour">Tour / Travel Package</option>
              <option value="visa">Visa Service</option>
            </select>
          </div>

          {/* Package Name */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Package/Service Name *
            </label>
            <input
              type="text"
              name="package_name"
              value={formData.package_name}
              onChange={handleInputChange}
              placeholder="e.g., Andaman Tour Package or USA Tourist Visa"
              required
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            />
          </div>

          {/* Package Type */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Type (Optional)
            </label>
            <input
              type="text"
              name="package_type"
              value={formData.package_type}
              onChange={handleInputChange}
              placeholder="e.g., Domestic, International, Business Visa, etc."
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            />
          </div>

          {/* Destination */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Destination (Optional)
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="e.g., Port Blair, USA, Dubai"
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            />
          </div>

          {/* Travel Date */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Travel Date *
            </label>
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleInputChange}
              required
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            />
          </div>

          {/* Number of Travelers */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
                Adults *
              </label>
              <input
                type="number"
                name="num_adults"
                value={formData.num_adults}
                onChange={handleInputChange}
                min="1"
                required
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
                Children
              </label>
              <input
                type="number"
                name="num_children"
                value={formData.num_children}
                onChange={handleInputChange}
                min="0"
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
              />
            </div>
          </div>

          {/* Price */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Price Per Person (₹) *
            </label>
            <input
              type="number"
              name="price_per_person"
              value={formData.price_per_person}
              onChange={handleInputChange}
              placeholder="12999"
              required
              min="0"
              step="0.01"
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            />
          </div>

          {/* Special Requests */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>
              Special Requests (Optional)
            </label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleInputChange}
              placeholder="Any special requirements..."
              rows="4"
              style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Booking...' : (user ? 'Create Booking & Proceed to Payment' : 'Sign Up & Create Booking')}
          </button>
        </form>
      </main>
      <Footer />
      <GoTop />
    </>
  )
}
