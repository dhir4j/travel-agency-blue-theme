"""
JWT Session Management Service
================================
Handles JWT token generation and validation for "Remember Me" functionality.
Tokens are valid for 30 days by default.
"""

import jwt
from datetime import datetime, timedelta
from flask import current_app


class JWTService:
    """Service class for handling JWT token operations"""

    @staticmethod
    def generate_remember_token(user_id, email):
        """
        Generate a JWT token for remember me functionality.

        Returns:
            tuple: (token, expiry_datetime)
        """
        try:
            expiry = datetime.utcnow() + timedelta(
                days=current_app.config.get('JWT_EXPIRY_DAYS', 30)
            )

            payload = {
                'user_id': user_id,
                'email': email,
                'exp': expiry,
                'iat': datetime.utcnow(),
                'type': 'remember_me'
            }

            token = jwt.encode(
                payload,
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
            )

            return token, expiry

        except Exception as e:
            print(f"[JWT] Error generating token: {str(e)}")
            return None, None

    @staticmethod
    def verify_remember_token(token):
        """
        Verify and decode a remember me token.

        Returns:
            dict: Decoded payload if valid, None otherwise
        """
        try:
            payload = jwt.decode(
                token,
                current_app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )

            if payload.get('type') != 'remember_me':
                return None

            return payload

        except jwt.ExpiredSignatureError:
            print("[JWT] Token has expired")
            return None
        except jwt.InvalidTokenError as e:
            print(f"[JWT] Invalid token: {str(e)}")
            return None
        except Exception as e:
            print(f"[JWT] Error verifying token: {str(e)}")
            return None
