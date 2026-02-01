"""
Import tours and visas data from JSON files into the database
Run this after create_tables.py
"""

from app import create_app
from app.extensions import db
from app.models import Tour, Visa
import json
import re

app = create_app()

def parse_price(price_str):
    """Extract numeric value from price string like '₹6,250'"""
    if not price_str:
        return None
    # Remove currency symbols and commas
    numeric = re.sub(r'[^\d.]', '', price_str)
    try:
        return float(numeric)
    except:
        return None

def import_tours():
    """Import tours from JSON file"""
    print("Importing tours...")

    with open('data/waynex_tours_complete.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    tours_data = data.get('data', {})
    count = 0

    # Import domestic tours
    for state, tours in tours_data.get('domestic', {}).items():
        for tour in tours:
            # Check if tour already exists
            existing = Tour.query.filter_by(code=tour['code']).first()
            if existing:
                print(f"Tour {tour['code']} already exists, skipping...")
                continue

            new_tour = Tour(
                code=tour['code'],
                name=tour['name'],
                tour_type='domestic',
                category=state,
                duration=tour.get('duration'),
                price=tour.get('price', 0),
                destinations=tour.get('destinations'),
                card_image=tour.get('card_image'),
                slider_images=tour.get('slider_images', []),
                highlights=tour.get('highlights', []),
                itinerary=tour.get('itinerary', []),
                hotels=tour.get('hotels', []),
                inclusions=tour.get('inclusions', []),
                exclusions=tour.get('exclusions', []),
                why_tour_with_waynex=tour.get('why_tour_with_waynex', []),
                is_active=True
            )
            db.session.add(new_tour)
            count += 1

    # Import international tours
    for region, tours in tours_data.get('international', {}).items():
        for tour in tours:
            # Check if tour already exists
            existing = Tour.query.filter_by(code=tour['code']).first()
            if existing:
                print(f"Tour {tour['code']} already exists, skipping...")
                continue

            new_tour = Tour(
                code=tour['code'],
                name=tour['name'],
                tour_type='international',
                category=region,
                duration=tour.get('duration'),
                price=tour.get('price', 0),
                destinations=tour.get('destinations'),
                card_image=tour.get('card_image'),
                slider_images=tour.get('slider_images', []),
                highlights=tour.get('highlights', []),
                itinerary=tour.get('itinerary', []),
                hotels=tour.get('hotels', []),
                inclusions=tour.get('inclusions', []),
                exclusions=tour.get('exclusions', []),
                why_tour_with_waynex=tour.get('why_tour_with_waynex', []),
                is_active=True
            )
            db.session.add(new_tour)
            count += 1

    db.session.commit()
    print(f"✓ Imported {count} tours successfully!")


def import_visas():
    """Import visas from JSON file"""
    print("Importing visas...")

    with open('data/data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    count = 0

    for visa in data:
        # Check if visa already exists
        existing = Visa.query.filter_by(country=visa['Country']).first()
        if existing:
            print(f"Visa for {visa['Country']} already exists, skipping...")
            continue

        new_visa = Visa(
            country=visa['Country'],
            country_code=visa.get('Country')[:2].upper() if visa.get('Country') else None,
            price=visa.get('Price'),
            price_numeric=parse_price(visa.get('Price')),
            processing_time=visa.get('Get on'),
            category=visa.get('category'),
            image_url=visa.get('ImageURL'),
            video_url=visa.get('Video URL'),
            required_docs=visa.get('Required Docs', []),
            visa_info=visa.get('Visa Info', {}),
            is_active=True
        )
        db.session.add(new_visa)
        count += 1

    db.session.commit()
    print(f"✓ Imported {count} visas successfully!")


if __name__ == "__main__":
    with app.app_context():
        print("=" * 60)
        print("Waynex Travels - Data Import")
        print("=" * 60)

        try:
            import_tours()
            import_visas()

            print("\n" + "=" * 60)
            print("✓ All data imported successfully!")
            print("=" * 60)

            # Print summary
            total_tours = Tour.query.count()
            total_visas = Visa.query.count()

            print(f"\nDatabase Summary:")
            print(f"  Tours: {total_tours}")
            print(f"  Visas: {total_visas}")

        except Exception as e:
            print(f"\n✗ Error importing data: {str(e)}")
            import traceback
            traceback.print_exc()
            db.session.rollback()
