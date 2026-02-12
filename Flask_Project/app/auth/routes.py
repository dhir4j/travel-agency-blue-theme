from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app.extensions import db
from app.schemas import SignupSchema, LoginSchema
from app.services.email_otp import EmailOTPService
from app.services.jwt_service import JWTService
from datetime import datetime

auth_bp = Blueprint('auth', __name__, url_prefix="/api/auth")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Register a new user and send email OTP for verification"""
    data = request.get_json()
    schema = SignupSchema()

    try:
        user_data = schema.load(data)
    except Exception as e:
        errors = getattr(e, 'messages', None)
        if errors:
            msg = "; ".join(f"{k}: {', '.join(v)}" for k, v in errors.items())
        else:
            msg = str(e)
        return jsonify({"error": msg}), 400

    if User.query.filter_by(email=user_data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = generate_password_hash(user_data["password"])

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
        is_admin=False,
        email_verified=False,
    )

    db.session.add(new_user)
    db.session.commit()

    # Generate and send OTP for email verification
    otp = EmailOTPService.generate_otp()
    new_user.otp_session_id = EmailOTPService.hash_otp(otp)
    new_user.otp_created_at = datetime.utcnow()
    db.session.commit()

    result = EmailOTPService.send_otp_email(new_user.email, otp)

    if not result["success"]:
        return jsonify({
            "error": "Account created but failed to send verification email. Please try resending.",
            "requiresVerification": True,
            "email": new_user.email,
        }), 201

    return jsonify({
        "message": "Account created. Please verify your email.",
        "requiresVerification": True,
        "email": new_user.email,
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    """Login user with email and password"""
    data = request.get_json()
    schema = LoginSchema()

    try:
        credentials = schema.load(data)
    except Exception as e:
        errors = getattr(e, 'messages', None)
        if errors:
            msg = "; ".join(f"{k}: {', '.join(v)}" for k, v in errors.items())
        else:
            msg = str(e)
        return jsonify({"error": msg}), 400

    user = User.query.filter_by(email=credentials["email"]).first()

    if not user or not check_password_hash(user.password, credentials["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Check if email is verified
    if not user.email_verified:
        return jsonify({
            "error": "Email not verified. Please sign up again or verify your email.",
        }), 403

    # Direct login — no OTP required
    response_data = {
        "message": "Login successful",
        "user": user.to_dict(),
    }

    # Handle remember me token
    if data.get("rememberMe"):
        jwt_service = JWTService()
        remember_token, token_expires = jwt_service.generate_remember_token(
            user.id, user.email
        )
        if remember_token:
            user.remember_token = remember_token
            user.remember_token_expires = token_expires
            db.session.commit()
            response_data["rememberToken"] = remember_token
            response_data["tokenExpires"] = token_expires.isoformat()

    return jsonify(response_data), 200


@auth_bp.route("/send-otp", methods=["POST"])
def send_otp():
    """Resend OTP to user's email"""
    data = request.get_json()

    if not data.get("email"):
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"message": "If the email is registered, a code has been sent."}), 200

    otp = EmailOTPService.generate_otp()
    user.otp_session_id = EmailOTPService.hash_otp(otp)
    user.otp_created_at = datetime.utcnow()
    db.session.commit()

    result = EmailOTPService.send_otp_email(user.email, otp)

    if not result["success"]:
        return jsonify({"error": "Failed to send verification email"}), 500

    return jsonify({"message": "Verification code sent to your email"}), 200


@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    """Verify OTP for signup or login"""
    data = request.get_json()

    if not data.get("email") or not data.get("otp"):
        return jsonify({"error": "Email and OTP are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not user.otp_session_id:
        return jsonify({"error": "No verification code found. Please request a new one."}), 400

    if EmailOTPService.is_otp_expired(user.otp_created_at):
        return jsonify({"error": "Verification code has expired. Please request a new one."}), 400

    if not EmailOTPService.verify_otp(user.otp_session_id, data["otp"]):
        return jsonify({"error": "Invalid verification code"}), 401

    # Clear OTP session
    user.otp_session_id = None
    user.otp_created_at = None

    context = data.get("context", "login")

    if context == "signup":
        user.email_verified = True
        db.session.commit()

        return jsonify({
            "message": "Email verified successfully.",
            "verified": True,
            "user": user.to_dict(),
        }), 200

    # Login context — return user session
    remember_token = None
    token_expires = None

    if data.get("rememberMe"):
        jwt_service = JWTService()
        remember_token, token_expires = jwt_service.generate_remember_token(
            user.id, user.email
        )
        if remember_token:
            user.remember_token = remember_token
            user.remember_token_expires = token_expires

    db.session.commit()

    response_data = {
        "message": "Login successful",
        "user": user.to_dict(),
    }

    if remember_token:
        response_data["rememberToken"] = remember_token
        response_data["tokenExpires"] = token_expires.isoformat()

    return jsonify(response_data), 200


@auth_bp.route("/verify-token", methods=["POST"])
def verify_token():
    """Verify remember me token and auto-login"""
    data = request.get_json()

    if not data.get("token"):
        return jsonify({"error": "Token is required"}), 400

    jwt_service = JWTService()
    payload = jwt_service.verify_remember_token(data["token"])

    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user = User.query.filter_by(id=payload["user_id"], email=payload["email"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.remember_token != data["token"]:
        return jsonify({"error": "Token mismatch"}), 401

    if user.remember_token_expires and user.remember_token_expires < datetime.utcnow():
        return jsonify({"error": "Token has expired"}), 401

    return jsonify({
        "message": "Token verified successfully",
        "user": user.to_dict(),
    }), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    """Logout user and invalidate remember me token"""
    data = request.get_json()

    if data and data.get("email"):
        user = User.query.filter_by(email=data["email"]).first()
        if user:
            user.remember_token = None
            user.remember_token_expires = None
            db.session.commit()

    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/admin/login", methods=["POST"])
def admin_login():
    """Admin login with email and password"""
    data = request.get_json()
    schema = LoginSchema()

    try:
        credentials = schema.load(data)
    except Exception as e:
        errors = getattr(e, 'messages', None)
        if errors:
            msg = "; ".join(f"{k}: {', '.join(v)}" for k, v in errors.items())
        else:
            msg = str(e)
        return jsonify({"error": msg}), 400

    user = User.query.filter_by(email=credentials["email"]).first()

    if not user or not check_password_hash(user.password, credentials["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    if not user.is_admin:
        return jsonify({"error": "Access denied. Admin privileges required."}), 403

    return jsonify({
        "message": "Admin login successful",
        "user": user.to_dict()
    }), 200
