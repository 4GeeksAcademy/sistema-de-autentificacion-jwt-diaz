"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
import bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user = User()
    user.email = body['email']
    password_in_bytes = bytes(body['password'], 'utf-8')
    hashed_password = bcrypt.hashpw(password_in_bytes, bcrypt.gensalt())
    user.password = hashed_password.decode('utf-8')
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    if user is None:
        return jsonify({"msg": "Invalid email"}), 401
    password_in_bytes = bytes(body['password'], 'utf-8')
    hashed_password = bytes(user.password, 'utf-8')
    if bcrypt.checkpw(password_in_bytes, hashed_password):
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user": user.serialize() }), 200
    return jsonify({"msg": "Invalid password"}), 401

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.serialize()), 200