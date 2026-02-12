import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "waynex-travels-secret-key-change-in-production")
    DEBUG_MODE = True

    # Database connection details
    db_user = os.getenv("DB_USER", "your_db_user")
    db_password = os.getenv("DB_PASSWORD", "your_db_password")
    db_host = os.getenv("DB_HOST", "your-db-host.postgres.pythonanywhere-services.com")
    db_port = os.getenv("DB_PORT", "10000")
    db_name = os.getenv("DB_NAME", "waynex_travels")

    # SQLAlchemy Configuration
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{db_user}:{db_password}"
        f"@{db_host}:{db_port}/{db_name}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS Configuration
    CORS_ORIGINS = [
        "https://admin.waynextravels.com",
        "https://www.waynextravels.com",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:9002",
        "*"  # For development - restrict in production
    ]

    # Resend Email OTP Configuration
    RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")

    # JWT Configuration for Remember Me
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
    JWT_EXPIRY_DAYS = 30

    # Upload folder for invoices/documents
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    # Override with production settings


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
