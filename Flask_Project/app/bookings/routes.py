from flask import Blueprint, request, jsonify
from app.models import User, Booking, Invoice
from app.extensions import db
from app.schemas import BookingCreateSchema, BookingUpdateSchema
from app.utils import generate_booking_id, generate_invoice_number, calculate_booking_totals
from datetime import datetime, timedelta

bookings_bp = Blueprint('bookings', __name__, url_prefix="/api/bookings")

@bookings_bp.route("/", methods=["POST"])
def create_booking():
    """Create a new booking"""
    data = request.get_json()
    schema = BookingCreateSchema()

    try:
        booking_data = schema.load(data)
    except Exception as e:
        return jsonify({"error": e.messages}), 400

    user_id = booking_data["user_id"]

    # Verify user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Calculate totals
    totals = calculate_booking_totals(
        booking_data["price_per_person"],
        booking_data["num_adults"],
        booking_data.get("num_children", 0),
        booking_data.get("discount_amount", 0.00)
    )

    # Generate unique booking ID
    booking_id_str = generate_booking_id()

    # Create booking
    new_booking = Booking(
        booking_id_str=booking_id_str,
        user_id=user_id,
        user_email=user.email,
        order_type=booking_data.get("order_type", "tour"),  # 'tour' or 'visa'
        package_name=booking_data["package_name"],
        package_type=booking_data.get("package_type"),
        destination=booking_data.get("destination"),
        travel_date=booking_data["travel_date"],
        return_date=booking_data.get("return_date"),
        num_adults=booking_data["num_adults"],
        num_children=booking_data.get("num_children", 0),
        price_per_person=booking_data["price_per_person"],
        total_amount=totals["total_amount"],
        tax_amount=totals["tax_amount"],
        discount_amount=booking_data.get("discount_amount", 0.00),
        final_amount=totals["final_amount"],
        status="Pending",
        payment_status="Unpaid",
        special_requests=booking_data.get("special_requests")
    )

    db.session.add(new_booking)
    db.session.flush()  # Get the booking ID

    # Create invoice
    invoice_number = generate_invoice_number()
    new_invoice = Invoice(
        invoice_number=invoice_number,
        booking_id=new_booking.id,
        invoice_date=datetime.utcnow(),
        due_date=datetime.utcnow() + timedelta(days=7),  # 7 days to pay
        subtotal=totals["total_amount"] - booking_data.get("discount_amount", 0.00),
        tax_amount=totals["tax_amount"],
        discount_amount=booking_data.get("discount_amount", 0.00),
        total_amount=totals["final_amount"],
        paid_amount=0.00,
        balance_due=totals["final_amount"],
        status="Unpaid"
    )

    db.session.add(new_invoice)
    db.session.commit()

    return jsonify({
        "message": "Booking created successfully",
        "booking": new_booking.to_dict(),
        "invoice": new_invoice.to_dict()
    }), 201


@bookings_bp.route("/", methods=["GET"])
def get_all_bookings():
    """Get all bookings (with optional filters)"""
    # Get query parameters
    user_id = request.args.get("user_id", type=int)
    status = request.args.get("status")
    limit = request.args.get("limit", type=int, default=100)
    offset = request.args.get("offset", type=int, default=0)

    query = Booking.query

    # Apply filters
    if user_id:
        query = query.filter_by(user_id=user_id)
    if status:
        query = query.filter_by(status=status)

    # Order by most recent first
    query = query.order_by(Booking.booking_date.desc())

    # Pagination
    total = query.count()
    bookings = query.limit(limit).offset(offset).all()

    return jsonify({
        "bookings": [booking.to_dict() for booking in bookings],
        "total": total,
        "limit": limit,
        "offset": offset
    }), 200


@bookings_bp.route("/<int:booking_id>", methods=["GET"])
def get_booking(booking_id):
    """Get a specific booking by ID"""
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    # Include invoice if exists
    invoice_data = booking.invoice.to_dict() if booking.invoice else None

    return jsonify({
        "booking": booking.to_dict(),
        "invoice": invoice_data
    }), 200


@bookings_bp.route("/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):
    """Update a booking (typically for admin)"""
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    data = request.get_json()
    schema = BookingUpdateSchema()

    try:
        update_data = schema.load(data)
    except Exception as e:
        return jsonify({"error": e.messages}), 400

    # Update booking fields
    for field in ["package_name", "package_type", "destination", "travel_date",
                  "return_date", "num_adults", "num_children", "special_requests",
                  "notes", "status", "payment_status"]:
        if field in update_data:
            setattr(booking, field, update_data[field])

    # If price changed, recalculate totals
    if "price_per_person" in update_data or "discount_amount" in update_data:
        price = update_data.get("price_per_person", booking.price_per_person)
        discount = update_data.get("discount_amount", booking.discount_amount)

        totals = calculate_booking_totals(
            price,
            booking.num_adults,
            booking.num_children,
            discount
        )

        booking.price_per_person = price
        booking.discount_amount = discount
        booking.total_amount = totals["total_amount"]
        booking.tax_amount = totals["tax_amount"]
        booking.final_amount = totals["final_amount"]

        # Update invoice if exists
        if booking.invoice:
            booking.invoice.subtotal = totals["total_amount"] - float(discount)
            booking.invoice.tax_amount = totals["tax_amount"]
            booking.invoice.discount_amount = discount
            booking.invoice.total_amount = totals["final_amount"]
            booking.invoice.balance_due = totals["final_amount"] - booking.invoice.paid_amount

    db.session.commit()

    return jsonify({
        "message": "Booking updated successfully",
        "booking": booking.to_dict()
    }), 200


@bookings_bp.route("/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):
    """Delete a booking (admin only)"""
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    db.session.delete(booking)
    db.session.commit()

    return jsonify({"message": "Booking deleted successfully"}), 200


@bookings_bp.route("/by-booking-id/<booking_id_str>", methods=["GET"])
def get_booking_by_str_id(booking_id_str):
    """Get booking by booking_id string (e.g., BK-20240101-ABC1)"""
    booking = Booking.query.filter_by(booking_id_str=booking_id_str).first()

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    invoice_data = booking.invoice.to_dict() if booking.invoice else None

    return jsonify({
        "booking": booking.to_dict(),
        "invoice": invoice_data
    }), 200
