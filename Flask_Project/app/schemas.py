from marshmallow import Schema, fields, validate, ValidationError, EXCLUDE

class SignupSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    first_name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    last_name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    phone = fields.Str(required=False, allow_none=True)
    address_street = fields.Str(required=False, allow_none=True)
    address_city = fields.Str(required=False, allow_none=True)
    address_state = fields.Str(required=False, allow_none=True)
    address_pincode = fields.Str(required=False, allow_none=True)
    address_country = fields.Str(required=False, allow_none=True)


class LoginSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Email(required=True)
    password = fields.Str(required=True)


class UserUpdateSchema(Schema):
    first_name = fields.Str(required=False, validate=validate.Length(min=1, max=100))
    last_name = fields.Str(required=False, validate=validate.Length(min=1, max=100))
    phone = fields.Str(required=False, allow_none=True)
    address_street = fields.Str(required=False, allow_none=True)
    address_city = fields.Str(required=False, allow_none=True)
    address_state = fields.Str(required=False, allow_none=True)
    address_pincode = fields.Str(required=False, allow_none=True)
    address_country = fields.Str(required=False, allow_none=True)


class BookingCreateSchema(Schema):
    order_type = fields.Str(required=False, missing="tour", validate=validate.OneOf(["tour", "visa"]))
    package_name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    package_type = fields.Str(required=False, allow_none=True)
    destination = fields.Str(required=False, allow_none=True)
    travel_date = fields.Date(required=True)
    return_date = fields.Date(required=False, allow_none=True)
    num_adults = fields.Int(required=True, validate=validate.Range(min=1))
    num_children = fields.Int(required=False, missing=0)
    price_per_person = fields.Decimal(required=True, as_string=True)
    discount_amount = fields.Decimal(required=False, missing=0.00, as_string=True)
    special_requests = fields.Str(required=False, allow_none=True)


class BookingUpdateSchema(Schema):
    package_name = fields.Str(required=False)
    package_type = fields.Str(required=False)
    destination = fields.Str(required=False)
    travel_date = fields.Date(required=False)
    return_date = fields.Date(required=False, allow_none=True)
    num_adults = fields.Int(required=False)
    num_children = fields.Int(required=False)
    price_per_person = fields.Decimal(required=False, as_string=True)
    discount_amount = fields.Decimal(required=False, as_string=True)
    status = fields.Str(required=False)
    payment_status = fields.Str(required=False)
    special_requests = fields.Str(required=False, allow_none=True)
    notes = fields.Str(required=False, allow_none=True)
