from .extensions import db
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=True)

    # Address fields
    address_street = db.Column(db.String(255), nullable=True)
    address_city = db.Column(db.String(100), nullable=True)
    address_state = db.Column(db.String(100), nullable=True)
    address_pincode = db.Column(db.String(10), nullable=True)
    address_country = db.Column(db.String(100), nullable=True)

    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bookings = db.relationship('Booking', backref='user', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
            "address": {
                "street": self.address_street,
                "city": self.address_city,
                "state": self.address_state,
                "pincode": self.address_pincode,
                "country": self.address_country
            },
            "is_admin": self.is_admin,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    booking_id_str = db.Column(db.String(20), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    user_email = db.Column(db.String(255), nullable=False, index=True)

    # Order Details
    order_type = db.Column(db.String(50), nullable=False)  # 'tour' or 'visa'
    package_name = db.Column(db.String(255), nullable=False)
    package_type = db.Column(db.String(100), nullable=True)  # e.g., 'Domestic', 'International', etc.
    destination = db.Column(db.String(255), nullable=True)
    travel_date = db.Column(db.Date, nullable=False)
    return_date = db.Column(db.Date, nullable=True)
    num_adults = db.Column(db.Integer, nullable=False, default=1)
    num_children = db.Column(db.Integer, nullable=False, default=0)

    # Pricing
    price_per_person = db.Column(db.Numeric(10, 2), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    tax_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    discount_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    final_amount = db.Column(db.Numeric(10, 2), nullable=False)

    # Booking Status
    status = db.Column(db.String(50), nullable=False, default="Pending")  # Pending, Confirmed, Cancelled, Completed
    payment_status = db.Column(db.String(50), nullable=False, default="Unpaid")  # Unpaid, Partial, Paid

    # Additional Details
    special_requests = db.Column(db.Text, nullable=True)
    notes = db.Column(db.Text, nullable=True)  # Admin notes

    # Timestamps
    booking_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Additional data (flexible storage)
    metadata = db.Column(JSONB, default=dict)

    # Relationships
    invoice = db.relationship('Invoice', backref='booking', uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id_str,
            "user_id": self.user_id,
            "user_email": self.user_email,
            "order_type": self.order_type,
            "package_name": self.package_name,
            "package_type": self.package_type,
            "destination": self.destination,
            "travel_date": self.travel_date.isoformat() if self.travel_date else None,
            "return_date": self.return_date.isoformat() if self.return_date else None,
            "num_adults": self.num_adults,
            "num_children": self.num_children,
            "price_per_person": float(self.price_per_person),
            "total_amount": float(self.total_amount),
            "tax_amount": float(self.tax_amount),
            "discount_amount": float(self.discount_amount),
            "final_amount": float(self.final_amount),
            "status": self.status,
            "payment_status": self.payment_status,
            "special_requests": self.special_requests,
            "notes": self.notes,
            "booking_date": self.booking_date.isoformat() if self.booking_date else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "metadata": self.metadata
        }


class Invoice(db.Model):
    __tablename__ = "invoices"

    id = db.Column(db.Integer, primary_key=True)
    invoice_number = db.Column(db.String(50), unique=True, nullable=False, index=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id', ondelete='CASCADE'), nullable=False)

    # Invoice Details
    invoice_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)

    # Amounts
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    tax_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    discount_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)

    # Payment tracking
    paid_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    balance_due = db.Column(db.Numeric(10, 2), nullable=False)

    status = db.Column(db.String(50), nullable=False, default="Unpaid")  # Unpaid, Partial, Paid, Cancelled

    # Additional details
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "invoice_number": self.invoice_number,
            "booking_id": self.booking_id,
            "invoice_date": self.invoice_date.isoformat() if self.invoice_date else None,
            "due_date": self.due_date.isoformat() if self.due_date else None,
            "subtotal": float(self.subtotal),
            "tax_amount": float(self.tax_amount),
            "discount_amount": float(self.discount_amount),
            "total_amount": float(self.total_amount),
            "paid_amount": float(self.paid_amount),
            "balance_due": float(self.balance_due),
            "status": self.status,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


# Note: Tour and Visa models removed - bookings store order details directly
