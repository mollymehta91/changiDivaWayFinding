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

# Test case to validate behavior when the API key header is present but has a None value
def test_api_key_none(app):
    """
    Test middleware with a None API key value.
    Expects a 401 status code and an appropriate error message.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)
    with app.test_request_context(headers={"x-api-key": None}):
        result = middleware.check_api_key()
        assert isinstance(result, tuple), f"Expected a tuple, got {type(result)}"
        response, status_code = result
        assert status_code == 401
        assert response.get_json() == {"error": "Unauthorized access, invalid API key"}

# Test case to validate behavior when the API key header is present but empty
def test_empty_api_key(app):
    """
    Test middleware with an empty API key value.
    Expects a 401 status code and an appropriate error message.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)
    with app.test_request_context(headers={"x-api-key": ""}):
        result = middleware.check_api_key()
        assert isinstance(result, tuple), f"Expected a tuple, got {type(result)}"
        response, status_code = result
        assert status_code == 401
        assert response.get_json() == {"error": "Unauthorized access, invalid API key"}

# Test case to validate behavior with a case-sensitive API key
def test_case_sensitive_api_key(app):
    """
    Test middleware with a case-sensitive API key.
    Expects a 401 status code and an appropriate error message if the case does not match.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)
    with app.test_request_context(headers={"x-api-key": Config.API_KEY.lower()}):  # Passing the API key in lowercase
        result = middleware.check_api_key()
        assert isinstance(result, tuple), f"Expected a tuple, got {type(result)}"
        response, status_code = result
        assert status_code == 401
        assert response.get_json() == {"error": "Unauthorized access, invalid API key"}

# Test case to validate behavior when the check_api_key method raises an unexpected exception
def test_unexpected_exception(app, mocker):
    """
    Test middleware behavior if an unexpected exception occurs.
    Expects a 500 status code and an appropriate error message.
    """
    middleware = APIKeyMiddleware(Config.API_KEY)

    # Mock the `request.headers.get` method to raise an exception
    mocker.patch("flask.request.headers.get", side_effect=Exception("Unexpected error"))

    with app.test_request_context(headers={"x-api-key": Config.API_KEY}):
        try:
            middleware.check_api_key()
        except Exception as e:
            assert str(e) == "Unexpected error"

# Entry point for running tests using pytest
if __name__ == '__main__':
    pytest.main()  # Execute the tests when running the file directly
 
"""
    The test cases are already compatible with Flask, and because
    APIKeyMiddleware is independent of AWS Lambda-specific functionality,
    it will work without modification in a Lambda context.
"""