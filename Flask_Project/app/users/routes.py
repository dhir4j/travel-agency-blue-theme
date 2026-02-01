from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models import User
from app.extensions import db
from app.schemas import UserUpdateSchema

users_bp = Blueprint('users', __name__, url_prefix="/api/users")

@users_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Get user profile by ID"""
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user": user.to_dict()}), 200


@users_bp.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    """Update user profile"""
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    schema = UserUpdateSchema()

    try:
        update_data = schema.load(data)
    except Exception as e:
        return jsonify({"error": e.messages}), 400

    # Update user fields
    if "first_name" in update_data:
        user.first_name = update_data["first_name"]
    if "last_name" in update_data:
        user.last_name = update_data["last_name"]
    if "phone" in update_data:
        user.phone = update_data["phone"]
    if "address_street" in update_data:
        user.address_street = update_data["address_street"]
    if "address_city" in update_data:
        user.address_city = update_data["address_city"]
    if "address_state" in update_data:
        user.address_state = update_data["address_state"]
    if "address_pincode" in update_data:
        user.address_pincode = update_data["address_pincode"]
    if "address_country" in update_data:
        user.address_country = update_data["address_country"]

    db.session.commit()

    return jsonify({
        "message": "User updated successfully",
        "user": user.to_dict()
    }), 200


@users_bp.route("/<int:user_id>/bookings", methods=["GET"])
def get_user_bookings(user_id):
    """Get all bookings for a specific user"""
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    bookings = [booking.to_dict() for booking in user.bookings]

    return jsonify({
        "user_id": user_id,
        "bookings": bookings,
        "total": len(bookings)
    }), 200
