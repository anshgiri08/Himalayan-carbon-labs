from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__)

@health_bp.route('/health')
def health():
    return jsonify({
        "status": "ok",
        "project": "Himalaya Carbon Labs",
        "version": "0.1.0"
    })