from flask import Flask, jsonify, render_template_string
from .extensions import db, cors
from .auth.routes import auth_bp
from .users.routes import users_bp
from .bookings.routes import bookings_bp
from .admin.routes import admin_bp
from config import config

def create_app(env="development"):
    app = Flask(__name__)
    app.config.from_object(config[env])

    # Initialize extensions
    db.init_app(app)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type"]
    )

    @app.route("/")
    def index():
        return render_template_string("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>Waynex Travels API</title>
            <style>
                body {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    font-family: 'Segoe UI', Arial, sans-serif;
                    overflow: hidden;
                }
                .icon {
                    font-size: 5rem;
                    animation: bounce 2s infinite alternate;
                    margin-bottom: 20px;
                }
                @keyframes bounce {
                    0% { transform: translateY(0);}
                    100% { transform: translateY(-30px);}
                }
                h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.3em;
                    letter-spacing: 2px;
                }
                .desc {
                    font-size: 1.1rem;
                    opacity: 0.85;
                }
                .dot {
                    height: 16px;
                    width: 16px;
                    background-color: #22ff88;
                    border-radius: 50%;
                    display: inline-block;
                    margin-left: 8px;
                    box-shadow: 0 0 12px #22ff88;
                    vertical-align: middle;
                    animation: pulse 1.4s infinite;
                }
                @keyframes pulse {
                    0% { box-shadow: 0 0 8px #22ff88;}
                    50% { box-shadow: 0 0 24px #22ff88;}
                    100% { box-shadow: 0 0 8px #22ff88;}
                }
            </style>
        </head>
        <body>
            <div class="icon">✈️</div>
            <h1>Waynex Travels API <span class="dot"></span></h1>
            <div class="desc">
                Your travel booking backend is <b>up & running!</b><br>
            </div>
        </body>
        </html>
        """)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(admin_bp)

    # Global error handlers
    @app.errorhandler(422)
    @app.errorhandler(400)
    def handle_validation_error(err):
        messages = getattr(err, 'data', {}).get('messages', 'Invalid input.')
        return jsonify({"error": messages}), 400

    @app.errorhandler(500)
    def internal_server_error(err):
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500

    @app.errorhandler(404)
    def not_found(err):
        return jsonify({"error": "Not found"}), 404

    return app
