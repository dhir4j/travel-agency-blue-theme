# Waynex Travels - Complete Project Overview

## 📋 Project Summary

A full-stack travel booking system with:
- **Backend**: Flask + PostgreSQL REST API
- **Admin Dashboard**: Modern web-based admin panel
- **Mobile Ready**: API designed for Android app integration
- **Deployment**: Ready for PythonAnywhere

## 🎯 Features Implemented

### User Features
- ✅ User registration with email/password
- ✅ User login authentication
- ✅ Profile management (name, phone, address)
- ✅ Travel booking creation
- ✅ View booking history
- ✅ Automated invoice generation

### Admin Features
- ✅ Secure admin login
- ✅ Dashboard with real-time statistics
- ✅ User management (view, edit, delete, toggle admin)
- ✅ Booking management (view, update status, payment tracking)
- ✅ Analytics and insights
- ✅ Export reports (CSV and Excel)
- ✅ Invoice management
- ✅ Search and filter capabilities

### Technical Features
- ✅ RESTful API design
- ✅ PostgreSQL database
- ✅ Password hashing (Werkzeug)
- ✅ CORS support for mobile apps
- ✅ Input validation (Marshmallow)
- ✅ Error handling
- ✅ Modular code structure
- ✅ Environment-based configuration

## 📁 Project Structure

```
Waynex Travels/
│
├── Flask_Project/                 # Backend API
│   ├── app/
│   │   ├── __init__.py           # Flask app factory
│   │   ├── models.py             # Database models (User, Booking, Invoice)
│   │   ├── schemas.py            # Input validation schemas
│   │   ├── extensions.py         # Flask extensions (DB, CORS)
│   │   ├── utils.py              # Helper functions
│   │   ├── auth/                 # Authentication routes
│   │   │   └── routes.py         # Signup, login, admin login
│   │   ├── users/                # User management
│   │   │   └── routes.py         # Profile, bookings
│   │   ├── bookings/             # Booking management
│   │   │   └── routes.py         # CRUD operations
│   │   └── admin/                # Admin operations
│   │       └── routes.py         # Users, bookings, stats, reports
│   ├── config.py                 # Configuration (dev/prod)
│   ├── run.py                    # Application entry point
│   ├── create_tables.py          # Database initialization
│   ├── add_admin.py              # Create admin user
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Environment variables template
│   └── README.md                 # Backend documentation
│
├── Admin_Dashboard/              # Admin web interface
│   ├── login.html               # Admin login page
│   ├── dashboard.html           # Main dashboard
│   ├── static/
│   │   ├── css/
│   │   │   ├── login.css       # Login styles
│   │   │   └── dashboard.css   # Dashboard styles (from template)
│   │   └── js/
│   │       ├── admin.js        # Admin functionality
│   │       └── dashboard.js    # Dashboard interactions
│   └── README.md               # Frontend documentation
│
├── DEPLOYMENT_GUIDE.md         # Complete deployment instructions
└── PROJECT_OVERVIEW.md         # This file
```

## 🗄️ Database Schema

### Users Table
- id (Primary Key)
- email (Unique, Indexed)
- password (Hashed)
- first_name, last_name
- phone
- address fields (street, city, state, pincode, country)
- is_admin (Boolean)
- created_at, updated_at

### Bookings Table
- id (Primary Key)
- booking_id_str (Unique, e.g., BK-20240101-ABC1)
- user_id (Foreign Key)
- user_email
- package_name, package_type, destination
- travel_date, return_date
- num_adults, num_children
- price_per_person, total_amount, tax_amount, discount_amount, final_amount
- status (Pending, Confirmed, Cancelled, Completed)
- payment_status (Unpaid, Partial, Paid)
- special_requests, notes
- booking_date, updated_at
- metadata (JSONB)

### Invoices Table
- id (Primary Key)
- invoice_number (Unique, e.g., INV-20240101-XYZ1)
- booking_id (Foreign Key)
- invoice_date, due_date
- subtotal, tax_amount, discount_amount, total_amount
- paid_amount, balance_due
- status (Unpaid, Partial, Paid, Cancelled)
- notes
- created_at, updated_at

## 🔌 API Endpoints

### Authentication (`/api/auth`)
```
POST   /signup              - Register new user
POST   /login               - User login
POST   /admin/login         - Admin login
POST   /logout              - Logout user
```

### Users (`/api/users`)
```
GET    /{id}                - Get user profile
PUT    /{id}                - Update user profile
GET    /{id}/bookings       - Get user's bookings
```

### Bookings (`/api/bookings`)
```
POST   /                    - Create new booking
GET    /                    - List bookings (with filters)
GET    /{id}                - Get booking by ID
PUT    /{id}                - Update booking
DELETE /{id}                - Delete booking
GET    /by-booking-id/{str} - Get booking by booking ID string
```

### Admin (`/api/admin`)
```
GET    /users                        - List all users
DELETE /users/{id}                   - Delete user
PUT    /users/{id}/toggle-admin      - Toggle admin status
GET    /bookings                     - List all bookings
PUT    /bookings/{id}/status         - Update booking status
GET    /stats/dashboard              - Dashboard statistics
GET    /stats/analytics              - Analytics data
GET    /reports/bookings/csv         - Download CSV report
GET    /reports/bookings/excel       - Download Excel report
GET    /invoices                     - List all invoices
GET    /invoices/{id}                - Get invoice details
```

## 🚀 Quick Start Guide

### 1. Setup Backend

```bash
cd Flask_Project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
python create_tables.py

# Create admin user
python add_admin.py

# Run the server
python run.py
```

Backend will be running at: http://localhost:5000

### 2. Setup Admin Dashboard

```bash
cd Admin_Dashboard

# Update API URL in static/js/admin.js
# Change API_BASE_URL to your backend URL

# Open in browser
open login.html  # or use any web server
```

### 3. Test the System

1. Login to admin dashboard with created admin credentials
2. View dashboard statistics
3. Create test users via API or signup endpoint
4. Create test bookings
5. Test report downloads

## 🔐 Default Credentials

After running `add_admin.py`, use the credentials you created:
- Email: [as entered]
- Password: [as entered]

## 📱 Android App Integration

The API is ready for Android integration:

1. Set base URL: `http://your-server.com/api`
2. Use standard HTTP libraries (Retrofit, Volley, etc.)
3. Send JSON requests with appropriate headers
4. Handle responses and errors

Example Android retrofit setup:
```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://yourusername.pythonanywhere.com/api/")
    .addConverterFactory(GsonConverterFactory.create())
    .build();
```

## 🌐 Deployment Options

### Backend (PythonAnywhere)
- Free tier available
- Built-in PostgreSQL support
- Easy WSGI configuration
- See: DEPLOYMENT_GUIDE.md

### Admin Dashboard
1. **GitHub Pages** (Free)
2. **Netlify** (Free)
3. **Vercel** (Free)
4. **Same server as backend**
5. **Any static hosting**

## 📊 Admin Dashboard Screens

### 1. Login
- Email/password authentication
- Error handling
- Auto-redirect if logged in

### 2. Dashboard
- Total users count
- Total bookings count
- Revenue statistics (total, paid, pending)
- Monthly stats
- Recent bookings preview

### 3. Users Management
- Search users by email/name
- View user details
- Toggle admin privileges
- Delete users
- Pagination support

### 4. Bookings Management
- Search bookings
- Filter by status
- View booking details
- Update booking status
- Update payment status
- Pagination support

### 5. Reports
- Filter by date range
- Filter by status
- Download CSV reports
- Download Excel reports
- Bulk operations

## 🔧 Technology Stack

### Backend
- **Framework**: Flask 3.0
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Marshmallow
- **Security**: Werkzeug (password hashing)
- **CORS**: Flask-CORS
- **Reports**: openpyxl (Excel), CSV

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript** - Vanilla JS (no frameworks)
- **Icons**: Font Awesome 6
- **Design**: Responsive, mobile-first

### DevOps
- **Version Control**: Git
- **Deployment**: PythonAnywhere (backend)
- **Hosting**: GitHub Pages / Netlify (frontend)
- **Environment**: python-dotenv

## 📝 API Request Examples

### Create User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890"
  }'
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "package_name": "Goa Beach Paradise",
    "package_type": "Domestic",
    "destination": "Goa",
    "travel_date": "2024-12-25",
    "return_date": "2024-12-30",
    "num_adults": 2,
    "num_children": 1,
    "price_per_person": 15000.00,
    "special_requests": "Sea view room preferred"
  }'
```

### Get Dashboard Stats (Admin)
```bash
curl http://localhost:5000/api/admin/stats/dashboard
```

## 🐛 Troubleshooting

### Backend Issues
- Check `.env` file configuration
- Verify PostgreSQL is running
- Check database connection credentials
- Review error logs

### Frontend Issues
- Verify API_BASE_URL is correct
- Check browser console for errors
- Ensure CORS is enabled on backend
- Check network tab for failed requests

### Database Issues
- Verify PostgreSQL service is running
- Check database exists
- Ensure tables are created (`python create_tables.py`)
- Verify user permissions

## 📈 Future Enhancements

Potential features for future development:
- Email notifications (booking confirmations, reminders)
- Payment gateway integration
- SMS notifications
- Multi-language support
- Advanced analytics and charts
- Customer reviews and ratings
- Package management system
- Dynamic pricing
- Loyalty program
- Real-time chat support
- Mobile app (iOS/Android)
- Social media integration
- Referral system

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Copyright © 2024 Waynex Travels. All rights reserved.

## 📞 Support

For support or questions:
- Check README files in each folder
- Review DEPLOYMENT_GUIDE.md
- Check API endpoint documentation
- Review error logs

---

**Project Status**: ✅ Complete and Ready for Deployment

**Last Updated**: 2024

**Version**: 1.0.0
