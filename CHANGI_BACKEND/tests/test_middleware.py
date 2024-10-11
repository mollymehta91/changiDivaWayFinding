import pytest
from flask import Flask
from middleware import APIKeyMiddleware
from config import Config

@pytest.fixture
def app():
    
    """
    Create a Flask app for testing the middleware.
    Sets up the app in testing mode and returns the app instance.
    """
    app = Flask(__name__)  # Create a new Flask app instance
    app.config['TESTING'] = True  # Enable testing mode for Flask
    return app

# Test case to validate the behavior with a valid API key
def test_valid_api_key(app):
    """
    Test middleware with a valid API key.
    Expects no response (None) indicating a successful validation.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)  # Initialize middleware with the correct API key
    with app.test_request_context(headers={"x-api-key": Config.API_KEY}):
        result = middleware.check_api_key()
        assert result is None  # No response indicates valid API key

# Test case to validate the behavior with an invalid API key
def test_invalid_api_key(app):
    """
    Test middleware with an invalid API key.
    Expects a 401 status code and an appropriate error message.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)  # Initialize middleware with the correct API key
    with app.test_request_context(headers={"x-api-key": "invalid_key"}):
        result = middleware.check_api_key()
        assert isinstance(result, tuple), f"Expected a tuple, got {type(result)}"  # Check if the result is a tuple
        response, status_code = result  # Unpack the response and status code
        assert status_code == 401  # Check that the status code is 401
        assert response.get_json() == {"error": "Unauthorized access, invalid API key"}  # Verify the error message

# Test case to validate the behavior when no API key is provided
def test_missing_api_key(app):
    """
    Test middleware with no API key provided.
    Expects a 401 status code and an appropriate error message.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)  # Initialize middleware with the correct API key
    with app.test_request_context(headers={}):
        result = middleware.check_api_key()
        assert isinstance(result, tuple), f"Expected a tuple, got {type(result)}"  # Check if the result is a tuple
        response, status_code = result  # Unpack the response and status code
        assert status_code == 401  # Check that the status code is 401
        assert response.get_json() == {"error": "Unauthorized access, invalid API key"}  # Verify the error message

# Entry point for running tests using pytest
if __name__ == '__main__':
    pytest.main()  # Execute the tests when running the file directly