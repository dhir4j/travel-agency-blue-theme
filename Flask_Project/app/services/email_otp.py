"""
Email OTP Service
=================
Handles OTP generation, email sending via Resend, and verification.
"""

import random
import resend
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app


class EmailOTPService:
    """Service for email-based OTP verification"""

    OTP_EXPIRY_MINUTES = 5

    @staticmethod
    def generate_otp():
        """Generate a random 6-digit OTP"""
        return str(random.randint(100000, 999999))

    @staticmethod
    def hash_otp(otp):
        """Hash OTP for secure storage"""
        return generate_password_hash(otp)

    @staticmethod
    def verify_otp(stored_hash, user_otp):
        """Verify user-provided OTP against stored hash"""
        return check_password_hash(stored_hash, user_otp)

    @staticmethod
    def is_otp_expired(otp_created_at):
        """Check if OTP has expired (5 minutes)"""
        if not otp_created_at:
            return True
        expiry_time = otp_created_at + timedelta(minutes=EmailOTPService.OTP_EXPIRY_MINUTES)
        return datetime.utcnow() > expiry_time

    @staticmethod
    def send_otp_email(email, otp):
        """
        Send OTP verification email via Resend.

        Returns:
            dict: {"success": True/False, "error": str or None}
        """
        resend.api_key = current_app.config.get("RESEND_API_KEY")

        if not resend.api_key:
            return {"success": False, "error": "Resend API key not configured"}

        try:
            params: resend.Emails.SendParams = {
                "from": "Waynex Travels <onboarding@resend.dev>",
                "to": [email],
                "subject": "Your Waynex Travels verification code",
                "html": f"""
                <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:40px 0;">
                  <div style="max-width:520px;margin:auto;background:white;border-radius:10px;padding:30px;">

                    <h2 style="color:#111;margin-bottom:10px;">Verify your email</h2>
                    <p style="color:#444;font-size:15px;">
                      Use the verification code below to complete your request on <b>Waynex Travels</b>:
                    </p>

                    <div style="text-align:center;margin:30px 0;">
                      <span style="
                        display:inline-block;
                        font-size:34px;
                        letter-spacing:6px;
                        font-weight:bold;
                        color:#2563eb;
                        background:#eff6ff;
                        padding:16px 28px;
                        border-radius:8px;">
                        {otp}
                      </span>
                    </div>

                    <p style="color:#555;font-size:14px;">
                      This code will expire in <b>5 minutes</b>.
                    </p>

                    <p style="color:#777;font-size:13px;margin-top:30px;">
                      If you didn't request this code, you can safely ignore this email.
                    </p>

                    <hr style="margin:25px 0;border:none;border-top:1px solid #eee"/>

                    <p style="font-size:12px;color:#999;">
                      &copy; 2026 Waynex Travels. All rights reserved.
                    </p>

                  </div>
                </div>
                """,
            }

            result = resend.Emails.send(params)
            print(f"[EmailOTP] OTP sent to {email}: {result}")
            return {"success": True, "error": None}

        except Exception as e:
            print(f"[EmailOTP] Failed to send OTP to {email}: {str(e)}")
            return {"success": False, "error": str(e)}
