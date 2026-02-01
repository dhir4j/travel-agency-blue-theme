from app import create_app
from app.extensions import db
from app.models import User
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    email = input("Enter admin email: ")
    password = input("Enter admin password: ")
    first_name = input("Enter first name: ")
    last_name = input("Enter last name: ")

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        print(f"User with email {email} already exists!")
        make_admin = input("Make this user an admin? (y/n): ")
        if make_admin.lower() == 'y':
            existing_user.is_admin = True
            db.session.commit()
            print(f"✓ User {email} is now an admin!")
    else:
        # Create new admin user
        hashed_password = generate_password_hash(password)
        admin_user = User(
            email=email,
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            is_admin=True
        )
        db.session.add(admin_user)
        db.session.commit()
        print(f"✓ Admin user {email} created successfully!")
