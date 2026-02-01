# Waynex Travels - Flask Backend API

A comprehensive travel booking backend built with Flask, PostgreSQL, and designed for deployment on PythonAnywhere.

## Features

- ✅ User Registration & Authentication
- ✅ Travel Booking Management
- ✅ Invoice Generation
- ✅ Admin Dashboard API
- ✅ Reports Export (CSV/Excel)
- ✅ RESTful API Design
- ✅ PostgreSQL Database
- ✅ CORS Support for Mobile Apps

## Tech Stack

- **Backend**: Flask 3.0
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Marshmallow
- **Authentication**: Werkzeug Security
- **Reports**: openpyxl (Excel), CSV

## Project Structure

```
Flask_Project/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── models.py            # Database models
│   ├── schemas.py           # Validation schemas
│   ├── extensions.py        # Flask extensions
│   ├── utils.py             # Utility functions
│   ├── auth/                # Authentication routes
│   │   └── routes.py
│   ├── users/               # User management routes
│   │   └── routes.py
│   ├── bookings/            # Booking routes
│   │   └── routes.py
│   └── admin/               # Admin routes
│       └── routes.py
├── config.py                # Configuration
├── run.py                   # Application entry point
├── create_tables.py         # Database initialization
├── add_admin.py             # Create admin user
├── requirements.txt         # Dependencies
└── .env.example             # Environment variables template
```

## Installation & Setup

### Local Development

1. **Clone and Navigate**
   ```bash
   cd Flask_Project
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Create Database Tables**
   ```bash
   python create_tables.py
   ```

6. **Create Admin User**
   ```bash
   python add_admin.py
   ```

7. **Run the Application**
   ```bash
   python run.py
   ```

   The API will be available at `http://localhost:5000`

## PythonAnywhere Deployment

### 1. Upload Files

Upload all project files to your PythonAnywhere account:
- Use Git clone or upload via Files tab
- Recommended path: `/home/yourusername/waynex_travels/`

### 2. Setup PostgreSQL Database

1. Go to PythonAnywhere Databases tab
2. Create a new PostgreSQL database
3. Note the connection details:
   - Host: `xxx.postgres.pythonanywhere-services.com`
   - Port: `xxxxx`
   - Database name
   - Username
   - Password

### 3. Configure Environment

Create `.env` file with your PostgreSQL credentials:
```bash
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=xxx.postgres.pythonanywhere-services.com
DB_PORT=xxxxx
DB_NAME=waynex_travels
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
```

### 4. Setup Virtual Environment

In PythonAnywhere Bash console:
```bash
cd /home/yourusername/waynex_travels/Flask_Project
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 5. Initialize Database

```bash
python create_tables.py
python add_admin.py
```

### 6. Configure WSGI File

In PythonAnywhere Web tab, edit your WSGI configuration file:

```python
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/yourusername/waynex_travels/Flask_Project'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Load environment variables
from dotenv import load_dotenv
project_folder = os.path.expanduser(project_home)
load_dotenv(os.path.join(project_folder, '.env'))

# Import Flask app
from app import create_app
application = create_app('production')
```

### 7. Configure Static Files (Optional)

In Web tab:
- URL: `/static/`
- Directory: `/home/yourusername/waynex_travels/Flask_Project/app/static/`

### 8. Reload Web App

Click "Reload" button in PythonAnywhere Web tab.

Your API will be available at: `https://yourusername.pythonanywhere.com`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/{id}/bookings` - Get user bookings

### Bookings
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/` - List bookings (with filters)
- `GET /api/bookings/{id}` - Get booking details
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking

### Admin
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/{id}` - Delete user
- `PUT /api/admin/users/{id}/toggle-admin` - Toggle admin status
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/{id}/status` - Update booking status
- `GET /api/admin/stats/dashboard` - Dashboard statistics
- `GET /api/admin/stats/analytics` - Analytics data
- `GET /api/admin/reports/bookings/csv` - Download CSV report
- `GET /api/admin/reports/bookings/excel` - Download Excel report
- `GET /api/admin/invoices` - List invoices
- `GET /api/admin/invoices/{id}` - Get invoice details

## Database Models

### User
- Email, password (hashed)
- First name, last name
- Phone, address fields
- Admin flag
- Timestamps

### Booking
- Booking ID (auto-generated)
- Package details (name, type, destination)
- Travel dates, number of travelers
- Pricing (subtotal, tax, discount, final amount)
- Status (Pending, Confirmed, Cancelled, Completed)
- Payment status (Unpaid, Partial, Paid)

### Invoice
- Invoice number (auto-generated)
- Associated booking
- Amounts (subtotal, tax, discount, total)
- Payment tracking
- Status

## Security Notes

- Passwords are hashed using Werkzeug security
- Use strong SECRET_KEY in production
- Enable HTTPS in production
- Restrict CORS origins in production
- Regular database backups recommended

## Support

For issues or questions, please refer to the documentation or contact the development team.

## License

Copyright © 2024 Waynex Travels. All rights reserved.
