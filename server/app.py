from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from config import Config
from models import db, User

# Initialize the Flask application
app = Flask(__name__)
app.config.from_object(Config)

# Initialize the database, migrations, and JWT manager
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Create the database and tables
with app.app_context():
    db.create_all()

# Route to create a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify(message="Email and password are required"), 400

    if User.query.filter_by(email=email).first():
        return jsonify(message="Email already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

# Route to login and generate JWT token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify(message="Invalid credentials"), 401

    access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(hours=1))
    return jsonify(access_token=access_token)

# A protected route that requires JWT authentication
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(message=f"Hello {user.email}, you have access to this route."), 200

if __name__ == '__main__':
    app.run(debug=True)