from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///quizzer.db')
app.config['JWT_SECRET_KEY'] = 'super_key'  # Change this to a random secret

# CORS configuration

CORS(app, resources={r"/app/*": {"origins": "*", "allow_headers":"*", "expose_headers":"*", "supports_credentials": True}})



db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

@app.route('/app/register', methods=['POST'])
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

@app.route('/app/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify(message="Invalid credentials"), 401

    access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(hours=1))
    return jsonify(access_token=access_token)

@app.route('/app/quizzes', methods=['GET'])
@jwt_required()
def get_quizzes():
    questions = Question.query.all()
    return jsonify([{
        'id': q.id,
        'text': q.text,
        'choices': [{'id': c.id, 'text': c.text, 'is_correct': c.is_correct} for c in q.choices]
    } for q in questions])

@app.route('/app/submit', methods=['POST'])
@jwt_required()
def submit_quiz():
    data = request.get_json()
    score = sum(1 for q, choice in zip(data['questions'], data['choices']) if q['correct_choice'] == choice)
    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)