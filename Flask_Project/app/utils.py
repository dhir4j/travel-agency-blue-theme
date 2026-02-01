import random
import string
from datetime import datetime

def generate_booking_id():
    """Generate a unique booking ID in format: BK-YYYYMMDD-XXXX"""
    date_str = datetime.now().strftime("%Y%m%d")
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"BK-{date_str}-{random_str}"

def generate_invoice_number():
    """Generate a unique invoice number in format: INV-YYYYMMDD-XXXX"""
    date_str = datetime.now().strftime("%Y%m%d")
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"INV-{date_str}-{random_str}"

def calculate_tax(amount, tax_rate=0.18):
    """Calculate tax amount (default 18% GST)"""
    return round(float(amount) * tax_rate, 2)

def calculate_booking_totals(price_per_person, num_adults, num_children=0, discount=0.00, child_rate=0.7):
    """
    Calculate booking totals

    Args:
        price_per_person: Price per adult
        num_adults: Number of adults
        num_children: Number of children
        discount: Discount amount
        child_rate: Child rate multiplier (default 70% of adult price)

    Returns:
        dict with total_amount, tax_amount, final_amount
    """
    adult_total = float(price_per_person) * num_adults
    children_total = float(price_per_person) * child_rate * num_children

    total_amount = adult_total + children_total
    discounted_amount = total_amount - float(discount)
    tax_amount = calculate_tax(discounted_amount)
    final_amount = discounted_amount + tax_amount

    return {
        "total_amount": round(total_amount, 2),
        "tax_amount": round(tax_amount, 2),
        "final_amount": round(final_amount, 2)
    }
