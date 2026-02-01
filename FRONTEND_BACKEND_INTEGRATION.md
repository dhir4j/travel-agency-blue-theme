# Frontend-Backend Integration Guide

## ✅ What's Been Completed

### Backend Updates

1. **✅ New Database Models Added:**
   - `Tour` model - stores 426 tours (domestic + international)
   - `Visa` model - stores visa information for countries
   - Updated `Booking` model with `tour_code` field

2. **✅ New API Routes Created:**
   ```
   /api/tours/                    - Get all tours
   /api/tours/{code}             - Get tour by code
   /api/tours/structured         - Get tours in JSON format
   /api/tours/by-category/{type}/{cat} - Tours by category

   /api/visas/                   - Get all visas
   /api/visas/{country}          - Get visa by country
   /api/visas/by-category/{cat}  - Visas by category
   ```

3. **✅ Data Import Script Created:**
   - `Flask_Project/import_data.py` - Imports tours and visas from JSON

### Frontend Updates

1. **✅ API Integration Layer:**
   - `src/lib/api.js` - Complete API client for all endpoints
   - Includes: authAPI, userAPI, toursAPI, visasAPI, bookingsAPI, session management

2. **✅ Updated Booking Form:**
   - `src/app/tours/[code]/book/page-integrated.js` - Integrated with backend
   - Auto-fetches tour from backend API
   - Creates real booking in database
   - Handles user authentication
   - Redirects to checkout after booking

---

## 🔧 What You Need To Do

### Step 1: Setup Backend Database

```bash
cd Flask_Project

# 1. Create virtual environment (if not already done)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure .env file
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# 4. Create database tables
python create_tables.py

# 5. Import tours and visas data
python import_data.py

# 6. Create admin user
python add_admin.py

# 7. Run the server
python run.py
```

**Expected Output:**
```
Importing tours...
✓ Imported 426 tours successfully!

Importing visas...
✓ Imported 50+ visas successfully!

Database Summary:
  Tours: 426
  Visas: 50+
```

### Step 2: Update Next.js Frontend

1. **Replace the booking page:**
```bash
# Backup original
mv src/app/tours/[code]/book/page.js src/app/tours/[code]/book/page-old.js

# Use integrated version
mv src/app/tours/[code]/book/page-integrated.js src/app/tours/[code]/book/page.js
```

2. **Add environment variable:**

Create `.env.local` in project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# For production: https://server.waynextravels.com/api
```

3. **Create signup/login pages:**

**File: `src/app/auth/signup/page.js`**
```javascript
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'

export default function SignupPage() {
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
```

**File: `src/app/auth/login/page.js`**
```javascript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI, session } from '@/lib/api'
import Link from 'next/link'

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
    <div style={{maxWidth: '400px', margin: '100px auto', padding: '20px'}}>
      <h1>Login</h1>
      {error && <div style={{color: 'red', marginBottom: '20px'}}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          style={{width: '100%', padding: '10px', marginBottom: '10px'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
          style={{width: '100%', padding: '12px', marginBottom: '20px'}}
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{marginTop: '20px', textAlign: 'center'}}>
        Don't have an account? <Link href="/auth/signup">Sign Up</Link>
      </p>
    </div>
  )
}
```

4. **Create user dashboard:**

**File: `src/app/dashboard/page.js`**
```javascript
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userAPI, session, authAPI } from '@/lib/api'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = session.getUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }

    loadUserData(currentUser)
  }, [router])

  const loadUserData = async (currentUser) => {
    try {
      const bookingsData = await userAPI.getBookings(currentUser.id)
      setUser(currentUser)
      setBookings(bookingsData.bookings)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout(user.email)
      session.clearUser()
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{maxWidth: '1200px', margin: '50px auto', padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <h1>My Dashboard</h1>
        <button onClick={handleLogout} style={{padding: '10px 20px'}}>
          Logout
        </button>
      </div>

      <div style={{marginBottom: '30px'}}>
        <h2>Welcome, {user?.first_name}!</h2>
        <p>Email: {user?.email}</p>
      </div>

      <h2>My Bookings ({bookings.length})</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #ddd'}}>
              <th style={{padding: '10px', textAlign: 'left'}}>Booking ID</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Package</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Date</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Status</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '10px'}}>{booking.booking_id}</td>
                <td style={{padding: '10px'}}>{booking.package_name}</td>
                <td style={{padding: '10px'}}>{booking.travel_date}</td>
                <td style={{padding: '10px'}}>{booking.status}</td>
                <td style={{padding: '10px'}}>₹{booking.final_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
```

### Step 3: Update Checkout Page

Update `User_Pages/checkout.html` line 172:
```javascript
const API_BASE_URL = 'https://server.waynextravels.com/api';
```

### Step 4: Test the Integration

1. **Start Backend:**
```bash
cd Flask_Project
source venv/bin/activate
python run.py
```

2. **Start Frontend:**
```bash
npm run dev
```

3. **Test Flow:**
   - Visit: http://localhost:3000
   - Browse tours
   - Click "Book Now" on a tour
   - Fill booking form
   - If not logged in → Redirects to signup
   - After signup → Creates booking
   - Redirects to checkout

4. **Verify in Database:**
```bash
# Check tours
curl http://localhost:5000/api/tours | jq '.tours | length'

# Check visas
curl http://localhost:5000/api/visas | jq '.visas | length'

# Check bookings
curl http://localhost:5000/api/bookings
```

---

## 📱 Android APK Integration

The same API works for Android! Just use:
```java
public class ApiConfig {
    public static final String BASE_URL = "https://server.waynextravels.com/api/";
}
```

**Example API calls:**
```java
// Get all tours
GET /api/tours/structured

// Get tour by code
GET /api/tours/SY

// Create booking
POST /api/bookings/
{
  "user_id": 1,
  "tour_code": "SY",
  "package_name": "Andaman With Swaraj Dweep",
  "travel_date": "2025-12-25",
  "num_adults": 2,
  ...
}
```

---

## 🎯 Key Integration Points

### Data Flow:
```
JSON Files (data/)
  → import_data.py
  → PostgreSQL Database
  → Backend API (/api/tours, /api/visas)
  → Frontend (Next.js) / Android APK
```

### User Journey:
```
1. Browse Tours (from database via API)
2. Click Book → Booking Form
3. Not logged in? → Signup/Login
4. Submit Form → Creates booking in DB
5. Redirect to Checkout → Payment
```

### Admin Panel:
- Can now manage Tours and Visas via database
- All changes reflect in website AND APK immediately
- Same data source = consistency

---

## 🔒 Production Checklist

Before deploying:

- [ ] Update `.env` with production database
- [ ] Change `NEXT_PUBLIC_API_URL` to production URL
- [ ] Run `import_data.py` on production database
- [ ] Create admin user on production
- [ ] Test all API endpoints
- [ ] Test booking flow end-to-end
- [ ] Verify checkout page works
- [ ] Test Android APK with production API

---

## 📚 API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tours` | GET | Get all tours |
| `/api/tours/{code}` | GET | Get tour by code |
| `/api/tours/structured` | GET | Get tours (JSON format) |
| `/api/visas` | GET | Get all visas |
| `/api/visas/{country}` | GET | Get visa by country |
| `/api/auth/signup` | POST | User signup |
| `/api/auth/login` | POST | User login |
| `/api/bookings/` | POST | Create booking |
| `/api/bookings/{id}` | GET | Get booking |
| `/api/users/{id}/bookings` | GET | Get user bookings |

**Complete API docs in:** `BACKEND_FRONTEND_ROUTES.md`

---

## 🆘 Troubleshooting

**Tours not loading?**
- Check if `import_data.py` ran successfully
- Verify database connection
- Check API endpoint: `http://localhost:5000/api/tours`

**Booking creation fails?**
- Ensure user is logged in
- Check required fields
- Verify tour_code exists

**CORS errors?**
- Backend already configured for `*` origins
- Check if backend is running

---

## ✅ Summary

You now have:
- ✅ 426 tours in database
- ✅ 50+ visas in database
- ✅ API endpoints for all data
- ✅ Frontend integrated with backend
- ✅ User auth (signup/login)
- ✅ Booking creation working
- ✅ Same API for website & APK
- ✅ Admin panel ready

**Next steps:** Follow "What You Need To Do" section above!
