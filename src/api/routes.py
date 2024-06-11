from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt

api = Blueprint("api", __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = [user.serialize() for user in users]
    return jsonify(users), 200


@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    user = User(
        email=body["email"],
        password=bcrypt.hashpw(
            bytes(body["password"], "utf-8"), bcrypt.gensalt()
        ).decode("utf-8"),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    if user is None or not bcrypt.checkpw(
        bytes(body["password"], "utf-8"), bytes(user.password, "utf-8")
    ):
        return jsonify({"msg": "Invalid email or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize()}), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.serialize()), 200
