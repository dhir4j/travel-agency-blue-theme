# 🚀 Waynex Travels - Simple Setup Guide

## What This System Does

A simple booking system where:
- Users create orders (tours or visas)
- Each order stores: type (tour/visa), package name, destination, dates, price
- Admin can view all orders in admin panel
- Same backend serves website AND Android APK

**NO data import needed** - users create their own bookings!

---

## 📦 System Components

### 1. Backend (Flask + PostgreSQL)
- User authentication (signup/login)
- Booking management (create, view, update)
- Admin panel APIs
- Invoice generation

### 2. Frontend (Next.js)
- Simple booking form at `/book`
- User signup/login pages
- User dashboard showing bookings
- Checkout page

### 3. Admin Panel
- View all bookings
- Manage users
- Update booking status
- Download reports

---

## 🛠️ Quick Setup

### Step 1: Backend Setup

```bash
cd Flask_Project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure .env file
# Edit Flask_Project/.env with your PostgreSQL credentials

# Create database tables
python create_tables.py

# Create admin user
python add_admin.py

# Run server
python run.py
```

**Backend will run at:** http://localhost:5000

### Step 2: Frontend Setup

```bash
# In project root
npm install

# Run development server
npm run dev
```

**Frontend will run at:** http://localhost:3000

---

## 🎯 How It Works

### User Creates Booking:

1. **Visit:** http://localhost:3000/book
2. **Fill Form:**
   - Select type: Tour or Visa
   - Enter package name (e.g., "Andaman Tour Package" or "USA Tourist Visa")
   - Enter destination (optional)
   - Select travel date
   - Enter number of people
   - Enter price per person
   - Add any special requests

3. **Submit:**
   - If not logged in → Redirects to signup
   - Creates account
   - Booking created in database
   - Redirects to checkout page

### Admin Views Bookings:

1. **Visit:** http://localhost:3000/dashboard (if admin logged in via frontend)
   OR
   **Visit:** Admin panel at your admin URL

2. **See all bookings** with:
   - Booking ID
   - User details
   - Order type (tour/visa)
   - Package name
   - Destination
   - Date
   - Number of people
   - Price
   - Status

---

## 📊 Database Schema

### Bookings Table

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| booking_id_str | String | Unique booking ID (e.g., "BK-20250201-ABCD") |
| user_id | Integer | User who created booking |
| user_email | String | User's email |
| **order_type** | String | **'tour' or 'visa'** |
| package_name | String | Name of package/service |
| package_type | String | Optional (e.g., "Domestic", "International") |
| destination | String | Optional destination |
| travel_date | Date | Travel/service date |
| num_adults | Integer | Number of adults |
| num_children | Integer | Number of children |
| price_per_person | Decimal | Price per person |
| total_amount | Decimal | Calculated total |
| final_amount | Decimal | After tax/discounts |
| status | String | Pending, Confirmed, Cancelled |
| payment_status | String | Unpaid, Paid |
| special_requests | Text | User notes |

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create user account
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Bookings
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/{id}` - Get booking by ID
- `GET /api/users/{user_id}/bookings` - Get user's bookings
- `GET /api/admin/bookings` - Get all bookings (admin)

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/admin/users` - Get all users (admin)

---

## 💻 Sample API Calls

### Create Booking

```javascript
POST /api/bookings/

{
  "user_id": 1,
  "order_type": "tour",
  "package_name": "Andaman Island Tour",
  "package_type": "Domestic",
  "destination": "Port Blair",
  "travel_date": "2025-12-25",
  "num_adults": 2,
  "num_children": 1,
  "price_per_person": 12999,
  "special_requests": "Need wheelchair accessible room"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": 1,
    "booking_id": "BK-20250201-ABCD",
    "order_type": "tour",
    "package_name": "Andaman Island Tour",
    "status": "Pending",
    "final_amount": 38997.00
  }
}
```

### Create Visa Booking

```javascript
POST /api/bookings/

{
  "user_id": 1,
  "order_type": "visa",
  "package_name": "USA Tourist Visa",
  "destination": "USA",
  "travel_date": "2025-06-01",
  "num_adults": 1,
  "price_per_person": 15000
}
```

---

## 📱 Android APK Integration

Use the same backend API:

```java
public class ApiConfig {
    public static final String BASE_URL = "https://server.waynextravels.com/api/";
}

// Create booking
JSONObject bookingData = new JSONObject();
bookingData.put("user_id", userId);
bookingData.put("order_type", "tour"); // or "visa"
bookingData.put("package_name", "Andaman Tour");
bookingData.put("destination", "Port Blair");
bookingData.put("travel_date", "2025-12-25");
bookingData.put("num_adults", 2);
bookingData.put("price_per_person", 12999);

// POST to /api/bookings/
```

---

## 🎨 Booking Form Fields

**Required:**
- Order Type (dropdown: Tour or Visa)
- Package/Service Name
- Travel Date
- Number of Adults
- Price Per Person

**Optional:**
- Package Type (e.g., Domestic, International)
- Destination
- Number of Children
- Special Requests

---

## 👨‍💼 Admin Panel Features

The admin can:
- ✅ View all bookings (tours and visas)
- ✅ Filter by order type
- ✅ See user details for each booking
- ✅ Update booking status (Pending → Confirmed → Completed)
- ✅ Update payment status (Unpaid → Paid)
- ✅ Add notes to bookings
- ✅ Download reports (CSV/Excel)
- ✅ Manage users

---

## 🔒 Production Deployment

### Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://server.waynextravels.com/api
```

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SECRET_KEY=your-secret-key
FLASK_ENV=production
```

### Deploy Steps

1. Deploy Flask backend to https://server.waynextravels.com
2. Run `python create_tables.py` on production
3. Run `python add_admin.py` to create admin user
4. Deploy Next.js frontend to https://www.waynextravels.com
5. Deploy admin panel to https://admin.waynextravels.com
6. Update Android APK with production URL

---

## 🧪 Testing

### Test Booking Flow

1. Go to http://localhost:3000/book
2. Fill form:
   - Type: Tour
   - Name: "Test Tour Package"
   - Destination: "Delhi"
   - Date: Tomorrow
   - Adults: 2
   - Price: 10000
3. Submit → Creates account if not logged in
4. Booking created → Redirects to checkout

### Verify in Database

```bash
# Check bookings
curl http://localhost:5000/api/bookings | jq

# Check specific booking
curl http://localhost:5000/api/bookings/1 | jq
```

---

## 📋 Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Booking Form | `/book` | Create new booking |
| Signup | `/auth/signup` | Create account |
| Login | `/auth/login` | User login |
| Dashboard | `/dashboard` | View user's bookings |
| Checkout | `/checkout?booking_id=X` | Payment page |

---

## ✅ What's Different from Before

**BEFORE:**
- Had Tour and Visa models in database
- Needed to import 426 tours + 50 visas from JSON
- Booking linked to pre-existing tours

**NOW:**
- Simple Booking model only
- No data import needed
- Users enter their own order details
- Just stores: order_type, package_name, details
- Admin sees all orders in one place

---

## 🆘 Troubleshooting

**Booking creation fails:**
- Check if user is logged in
- Verify all required fields filled
- Check browser console for errors

**Admin can't see bookings:**
- Verify admin logged in
- Check API endpoint: `GET /api/admin/bookings`
- Ensure backend running

**CORS errors:**
- Backend already configured for all origins
- Check if backend is running on correct port

---

## 🎉 Summary

You now have a simple, clean booking system:

- ✅ Users create tour/visa bookings
- ✅ No data import needed
- ✅ Backend stores all details
- ✅ Admin can view and manage all bookings
- ✅ Same API for website + Android APK
- ✅ Simple and straightforward

**Start using:** Just run backend + frontend and visit `/book`!
