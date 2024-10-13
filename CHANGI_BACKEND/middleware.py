from flask import request, jsonify
import logging
 
# Set up logging
logger = logging.getLogger(__name__)
 
class APIKeyMiddleware:
 
    """
    Middleware class for checking the validity of API keys in incoming requests.
 
    Attributes:
    - valid_api_key: The valid API key that the incoming request should match.
    """
 
    def __init__(self, valid_api_key):
        # Initialize the APIKeyMiddleware with the valid API key.
        self.valid_api_key = valid_api_key
 
    def check_api_key(self):
 
        """
        Check the API key from the request headers.
 
        Returns:
        - None if the API key is valid.
        - A JSON error response with status code 401 if the API key is invalid.
        """
 
        # Retrieve the API key from the request headers
        api_key = request.headers.get('x-api-key')
        if api_key != self.valid_api_key:
            logger.warning("Invalid API key")
            return jsonify({"error": "Unauthorized access, invalid API key"}), 401      # Return 401 error if invalid
        return None     # Return None if the API key is valid