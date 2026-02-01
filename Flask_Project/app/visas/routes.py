from flask import Blueprint, request, jsonify
from app.models import Visa
from app.extensions import db

visas_bp = Blueprint('visas', __name__, url_prefix="/api/visas")

@visas_bp.route("/", methods=["GET"])
def get_all_visas():
    """Get all active visas with optional filters"""
    category = request.args.get("category")  # 'instant', 'week', 'month'
    search = request.args.get("search", "")
    limit = request.args.get("limit", type=int, default=100)
    offset = request.args.get("offset", type=int, default=0)

    query = Visa.query.filter_by(is_active=True)

    # Apply filters
    if category:
        query = query.filter_by(category=category)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(Visa.country.ilike(search_filter))

    # Order by country name
    query = query.order_by(Visa.country.asc())

    total = query.count()
    visas = query.limit(limit).offset(offset).all()

    return jsonify({
        "visas": [visa.to_dict() for visa in visas],
        "total": total,
        "limit": limit,
        "offset": offset
    }), 200


@visas_bp.route("/<country>", methods=["GET"])
def get_visa_by_country(country):
    """Get visa information for a specific country"""
    visa = Visa.query.filter_by(country=country, is_active=True).first()

    if not visa:
        return jsonify({"error": "Visa information not found for this country"}), 404

    return jsonify({"visa": visa.to_dict()}), 200


@visas_bp.route("/categories", methods=["GET"])
def get_visa_categories():
    """Get all visa categories"""
    categories = db.session.query(Visa.category).filter_by(
        is_active=True
    ).distinct().all()

    return jsonify({
        "categories": [cat[0] for cat in categories if cat[0]]
    }), 200


@visas_bp.route("/by-category/<category>", methods=["GET"])
def get_visas_by_category(category):
    """Get all visas for a specific category"""
    visas = Visa.query.filter_by(
        category=category,
        is_active=True
    ).order_by(Visa.country.asc()).all()

    return jsonify({
        "category": category,
        "visas": [visa.to_dict() for visa in visas],
        "total": len(visas)
    }), 200
