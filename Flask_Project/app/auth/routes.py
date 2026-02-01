from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app.extensions import db
from app.schemas import SignupSchema, LoginSchema

auth_bp = Blueprint('auth', __name__, url_prefix="/api/auth")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Register a new user"""
    data = request.get_json()
    schema = SignupSchema()

    try:
        user_data = schema.load(data)
    except Exception as e:
        return jsonify({"error": e.messages}), 400

    # Check if user already exists
    if User.query.filter_by(email=user_data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    # Hash the password
    hashed_password = generate_password_hash(user_data["password"])

    # Create new user
    new_user = User(
        first_name=user_data["first_name"],
        last_name=user_data["last_name"],
        email=user_data["email"],
        password=hashed_password,
        phone=user_data.get("phone"),
        address_street=user_data.get("address_street"),
        address_city=user_data.get("address_city"),
        address_state=user_data.get("address_state"),
        address_pincode=user_data.get("address_pincode"),
        address_country=user_data.get("address_country"),
        is_admin=False
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": new_user.to_dict()
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    """Login user with email and password"""
    data = request.get_json()
    schema = LoginSchema()

    try:
        credentials = schema.load(data)
    except Exception as e:
        return jsonify({"error": e.messages}), 400

    # Find user by email
    user = User.query.filter_by(email=credentials["email"]).first()

    if not user or not check_password_hash(user.password, credentials["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Return user info
    return jsonify({
        "message": "Login successful",
        "user": user.to_dict()
    }), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    """Logout user (client-side session clearing)"""
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/admin/login", methods=["POST"])
def admin_login():
    """Admin login with email and password"""
    data = request.get_json()
    schema = LoginSchema()

    try:
        credentials = schema.load(data)
    except Exception as e:
        return jsonify({"error": e.messages}), 400

    # Find user by email
    user = User.query.filter_by(email=credentials["email"]).first()

    if not user or not check_password_hash(user.password, credentials["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Check if user is admin
    if not user.is_admin:
        return jsonify({"error": "Access denied. Admin privileges required."}), 403

    # Return admin user info
    return jsonify({
        "message": "Admin login successful",
        "user": user.to_dict()
    }), 200
