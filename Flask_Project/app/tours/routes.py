from flask import Blueprint, request, jsonify
from app.models import Tour
from app.extensions import db

tours_bp = Blueprint('tours', __name__, url_prefix="/api/tours")

@tours_bp.route("/", methods=["GET"])
def get_all_tours():
    """Get all active tours with optional filters"""
    tour_type = request.args.get("type")  # 'domestic' or 'international'
    category = request.args.get("category")  # Region/State name
    search = request.args.get("search", "")
    limit = request.args.get("limit", type=int, default=100)
    offset = request.args.get("offset", type=int, default=0)

    query = Tour.query.filter_by(is_active=True)

    # Apply filters
    if tour_type:
        query = query.filter_by(tour_type=tour_type)
    if category:
        query = query.filter_by(category=category)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Tour.name.ilike(search_filter)) |
            (Tour.destinations.ilike(search_filter)) |
            (Tour.code.ilike(search_filter))
        )

    # Order by price (ascending)
    query = query.order_by(Tour.price.asc())

    total = query.count()
    tours = query.limit(limit).offset(offset).all()

    return jsonify({
        "tours": [tour.to_dict() for tour in tours],
        "total": total,
        "limit": limit,
        "offset": offset
    }), 200


@tours_bp.route("/<tour_code>", methods=["GET"])
def get_tour_by_code(tour_code):
    """Get a specific tour by code"""
    tour = Tour.query.filter_by(code=tour_code.upper(), is_active=True).first()

    if not tour:
        return jsonify({"error": "Tour not found"}), 404

    return jsonify({"tour": tour.to_dict()}), 200


@tours_bp.route("/categories/<tour_type>", methods=["GET"])
def get_tour_categories(tour_type):
    """Get all categories for a tour type"""
    categories = db.session.query(Tour.category).filter_by(
        tour_type=tour_type,
        is_active=True
    ).distinct().all()

    return jsonify({
        "type": tour_type,
        "categories": [cat[0] for cat in categories]
    }), 200


@tours_bp.route("/by-category/<tour_type>/<category>", methods=["GET"])
def get_tours_by_category(tour_type, category):
    """Get all tours for a specific category"""
    tours = Tour.query.filter_by(
        tour_type=tour_type,
        category=category,
        is_active=True
    ).order_by(Tour.price.asc()).all()

    return jsonify({
        "type": tour_type,
        "category": category,
        "tours": [tour.to_dict() for tour in tours],
        "total": len(tours)
    }), 200


@tours_bp.route("/structured", methods=["GET"])
def get_structured_tours():
    """Get tours in the same structure as JSON (for compatibility)"""
    domestic_tours = {}
    international_tours = {}

    # Get all domestic tours
    domestic_categories = db.session.query(Tour.category).filter_by(
        tour_type='domestic',
        is_active=True
    ).distinct().all()

    for (category,) in domestic_categories:
        tours = Tour.query.filter_by(
            tour_type='domestic',
            category=category,
            is_active=True
        ).all()
        domestic_tours[category] = [tour.to_dict() for tour in tours]

    # Get all international tours
    international_categories = db.session.query(Tour.category).filter_by(
        tour_type='international',
        is_active=True
    ).distinct().all()

    for (category,) in international_categories:
        tours = Tour.query.filter_by(
            tour_type='international',
            category=category,
            is_active=True
        ).all()
        international_tours[category] = [tour.to_dict() for tour in tours]

    return jsonify({
        "data": {
            "domestic": domestic_tours,
            "international": international_tours
        },
        "metadata": {
            "domestic_states": list(domestic_tours.keys()),
            "international_regions": list(international_tours.keys()),
            "total_tours": sum(len(tours) for tours in domestic_tours.values()) +
                           sum(len(tours) for tours in international_tours.values())
        }
    }), 200
