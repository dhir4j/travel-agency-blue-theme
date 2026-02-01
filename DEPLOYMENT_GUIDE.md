# Waynex Travels - Complete Deployment Guide

This guide covers deploying both the Flask backend and Admin Dashboard.

## Overview

- **Backend**: Flask API on PythonAnywhere
- **Admin Dashboard**: Static HTML/CSS/JS (can be hosted anywhere)
- **Database**: PostgreSQL on PythonAnywhere

## Part 1: Backend Deployment (PythonAnywhere)

### Step 1: Create PythonAnywhere Account

1. Go to https://www.pythonanywhere.com/
2. Sign up for a free or paid account
3. Confirm your email

### Step 2: Setup PostgreSQL Database

1. Go to **Databases** tab
2. Click **Create new PostgreSQL database**
3. Note down:
   - Host: `xxx.postgres.pythonanywhere-services.com`
   - Port: `xxxxx`
   - Database name: `waynex_travels` (or your choice)
   - Username: (provided)
   - Password: (provided)

### Step 3: Upload Backend Code

**Option A: Git (Recommended)**
```bash
# In PythonAnywhere Bash console
cd ~
git clone YOUR_REPOSITORY_URL waynex_travels
cd waynex_travels/Flask_Project
```

**Option B: Upload Files**
1. Go to **Files** tab
2. Create directory: `/home/yourusername/waynex_travels/`
3. Upload all Flask_Project files

### Step 4: Setup Virtual Environment

```bash
# In Bash console
cd /home/yourusername/waynex_travels/Flask_Project
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

Create `.env` file:
```bash
nano .env
```

Add:
```env
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=xxx.postgres.pythonanywhere-services.com
DB_PORT=xxxxx
DB_NAME=waynex_travels
SECRET_KEY=generate-a-strong-random-key-here
FLASK_ENV=production
```

Save with `Ctrl+X`, then `Y`, then `Enter`

### Step 6: Initialize Database

```bash
source venv/bin/activate
python create_tables.py
python add_admin.py
# Follow prompts to create admin user
```

### Step 7: Configure Web App

1. Go to **Web** tab
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10**

### Step 8: Configure WSGI File

Click on WSGI configuration file link and replace content with:

```python
import sys
import os

# Add your project directory
project_home = '/home/yourusername/waynex_travels/Flask_Project'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Load environment variables
from dotenv import load_dotenv
load_dotenv(os.path.join(project_home, '.env'))

# Import Flask app
from app import create_app
application = create_app('production')
```

Replace `yourusername` with your actual PythonAnywhere username.

### Step 9: Configure Virtualenv

In Web tab:
1. Find **Virtualenv** section
2. Enter: `/home/yourusername/waynex_travels/Flask_Project/venv`

### Step 10: Reload Web App

Click the big green **Reload** button.

Your API is now live at: `https://yourusername.pythonanywhere.com`

## Part 2: Admin Dashboard Deployment

### Option A: GitHub Pages (Free & Easy)

1. **Create GitHub Repository**
   ```bash
   cd Admin_Dashboard
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Click **Pages** in sidebar
   - Source: Deploy from branch
   - Branch: main / (root)
   - Click **Save**

3. **Update API URL**
   Edit `static/js/admin.js` and `login.html`:
   ```javascript
   const API_BASE_URL = 'https://yourusername.pythonanywhere.com/api';
   ```

4. **Push Changes**
   ```bash
   git add .
   git commit -m "Update API URL"
   git push
   ```

Your dashboard will be live at: `https://yourusername.github.io/repository-name/login.html`

### Option B: Netlify (Alternative)

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   - Go to https://app.netlify.com/
   - Drag and drop Admin_Dashboard folder
   - Or use CLI: `netlify deploy --prod`

3. **Update API URL** (same as above)

### Option C: Same PythonAnywhere Server

1. **Upload Files**
   ```bash
   # In PythonAnywhere Bash
   cd /home/yourusername/
   mkdir admin_dashboard
   cd admin_dashboard
   # Upload all Admin_Dashboard files here
   ```

2. **Configure Static Files**
   In Web tab, add static file mapping:
   - URL: `/admin/`
   - Directory: `/home/yourusername/admin_dashboard/`

3. **Access Dashboard**
   Visit: `https://yourusername.pythonanywhere.com/admin/login.html`

## Part 3: Testing the Deployment

### Test Backend API

```bash
# Test root endpoint
curl https://yourusername.pythonanywhere.com/

# Test signup
curl -X POST https://yourusername.pythonanywhere.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","first_name":"Test","last_name":"User"}'

# Test admin login
curl -X POST https://yourusername.pythonanywhere.com/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your_admin_password"}'
```

### Test Admin Dashboard

1. Navigate to your dashboard URL
2. Try logging in with admin credentials
3. Check if statistics load
4. Try viewing users and bookings
5. Test downloading reports

## Part 4: Android App Integration

Update your Android app's API base URL to:
```java
private static final String API_BASE_URL = "https://yourusername.pythonanywhere.com/api";
```

### Example API Calls from Android

**User Signup:**
```java
POST /api/auth/signup
{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890"
}
```

**User Login:**
```java
POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Create Booking:**
```java
POST /api/bookings/
{
    "user_id": 1,
    "package_name": "Goa Beach Holiday",
    "package_type": "Domestic",
    "destination": "Goa",
    "travel_date": "2024-12-25",
    "return_date": "2024-12-30",
    "num_adults": 2,
    "num_children": 1,
    "price_per_person": 15000.00
}
```

## Troubleshooting

### Backend Issues

**500 Internal Server Error**
- Check error logs in PythonAnywhere Web tab
- Verify database connection in .env
- Check WSGI file configuration

**Database Connection Failed**
- Verify PostgreSQL credentials
- Check if database is created
- Ensure venv has psycopg2-binary installed

**CORS Errors**
- Check CORS_ORIGINS in config.py
- Ensure Flask-CORS is installed
- Add your frontend domain to allowed origins

### Frontend Issues

**Cannot Login**
- Check browser console for errors
- Verify API_BASE_URL is correct
- Ensure backend is running
- Check if CORS is enabled

**Reports Not Downloading**
- Verify openpyxl is installed on backend
- Check browser's download settings
- Try CSV download first

## Maintenance

### Update Backend Code

```bash
# In PythonAnywhere Bash
cd /home/yourusername/waynex_travels/Flask_Project
git pull  # if using Git
source venv/bin/activate
pip install -r requirements.txt  # if requirements changed
# Go to Web tab and click Reload
```

### Update Frontend Code

If using GitHub Pages:
```bash
git pull
# Make changes
git add .
git commit -m "Update description"
git push
```

### Database Backup

```bash
# In PythonAnywhere Bash
pg_dump -h xxx.postgres.pythonanywhere-services.com \
  -p xxxxx -U username -d waynex_travels > backup.sql
```

### Monitor Logs

- PythonAnywhere: Web tab > Log files
- Check error.log and server.log regularly

## Security Checklist

- [ ] Changed default SECRET_KEY
- [ ] Created strong admin password
- [ ] Enabled HTTPS (automatic on PythonAnywhere)
- [ ] Restricted CORS origins in production
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Monitor error logs
- [ ] Use environment variables for secrets

## Support & Resources

- **PythonAnywhere Help**: https://help.pythonanywhere.com/
- **Flask Documentation**: https://flask.palletsprojects.com/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

## Next Steps

1. Set up domain name (optional)
2. Configure email notifications
3. Add SSL certificate (if custom domain)
4. Set up monitoring/alerts
5. Implement regular backups
6. Add more features as needed

---

**Congratulations! Your Waynex Travels application is now deployed!** 🎉
