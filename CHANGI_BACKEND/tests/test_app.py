import unittest
from unittest.mock import patch
from app import app
from config import Config
import pytest 

# Test fixture to create a test client for the Flask application
@pytest.fixture
def client():

    """
    Create a test client for the Flask app.
    Sets the 'TESTING' configuration to True, and provides the client instance
    to be used in the test cases.
    """

    # Enable testing mode for Flask app
    app.config['TESTING'] = True  
    with app.test_client() as client:
        yield client  # Yield the test client for use in tests

# Test case to check the behavior when no transcribed text is provided in the POST request
def test_process_transcribed_text_no_text(client):

    """
    Test when no transcribed text is provided in the request.
    Expects a 400 status code and an appropriate error message.
    """

    headers = {'x-api-key': Config.API_KEY}  # Use the correct API key from the config
    response = client.post('/process-transcribed-text', json={}, headers=headers)  # Make POST request without transcribed text
    assert response.status_code == 400  # Check that the status code is 400
    assert "No transcribed text provided" in response.get_data(as_text=True)  # Verify the error message is in the response

# Test case to check behavior when an invalid API key is provided in the headers
def test_process_transcribed_text_invalid_key(client):

    """
    Test with an invalid API key.
    Expects a 401 status code and an appropriate unauthorized access message.
    """

    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers={'x-api-key': 'wrong_key'})  # Use an invalid API key
    assert response.status_code == 401  # Check that the status code is 401
    assert "Unauthorized access" in response.get_data(as_text=True)  # Verify the unauthorized access message is in the response

# Test case to check the behavior when transcribed text is successfully processed
@patch('app.fetch_data')  # Patch 'fetch_data' function in 'app' to use a mock instead of the real function
def test_process_transcribed_text_success(mock_fetch_data, client):
    
    """
    Test successful processing of transcribed text.
    Uses mock data to simulate a successful call to the 'fetch_data' function.
    Expects a 200 status code and a response with the mock data.
    """
    headers = {'x-api-key': Config.API_KEY}  # Use the correct API key from the config
    
    # Mock the return value of fetch_data to simulate a successful response
    mock_fetch_data.return_value = {
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    }
    
    # Make a POST request with valid transcribed text and the correct API key
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    
    # Check that the status code is 200 (OK)
    assert response.status_code == 200
    
    # Verify the returned JSON response matches the mock data
    assert response.get_json() == {
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    }

# Entry point for running tests using pytest
if __name__ == '__main__':
    pytest.main()  # Execute the tests when running the file directly
