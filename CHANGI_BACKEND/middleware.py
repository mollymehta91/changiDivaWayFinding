from flask import request, jsonify
import logging

logger = logging.getLogger(__name__)

class APIKeyMiddleware:
    def __init__(self, valid_api_key):
        self.valid_api_key = valid_api_key

    def check_api_key(self):
        api_key = request.headers.get('x-api-key')
        if api_key != self.valid_api_key:
            logger.warning("Invalid API key")
            return jsonify({"error": "Unauthorized access, invalid API key"}), 401
        return None
