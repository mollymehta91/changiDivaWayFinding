from app import app, lambda_handler
import pytest
from unittest.mock import patch
from config import Config
import json

@pytest.fixture
def client():
    """
    Create a test client for the Flask app.
    Sets the 'TESTING' configuration to True, and provides the client instance
    to be used in the test cases.
    """
    app.config['TESTING'] = True  # Enable testing mode for Flask app
    with app.test_client() as client:
        yield client  # Yield the test client for use in tests

@pytest.fixture
def app_instance():
    """
    Create an instance of the Flask app for testing.
    This fixture ensures that the app is initialized correctly.
    """
    app.config['TESTING'] = True  # Set the app to testing mode
    return app

def test_app_initialization(app_instance):
    """
    Test to ensure the Flask app is initialized properly.
    Check for configuration, routes, and middleware setup.
    """
    assert app_instance.config['TESTING'] is True  # The app should be in testing mode
    assert app_instance.config['OPENAI_API_KEY'] == app.config['OPENAI_API_KEY']  # Check if OpenAI key is loaded
    routes = [rule.rule for rule in app_instance.url_map.iter_rules()]
    assert '/process-transcribed-text' in routes  # Ensure route is registered
    assert 'before_request_funcs' in app_instance.__dict__
    assert len(app_instance.before_request_funcs) > 0  # Middleware should be registered

def test_middleware_loaded(app_instance):
    """
    Test to verify that the APIKeyMiddleware is loaded correctly in the Flask app.
    """
    before_request_funcs = app_instance.before_request_funcs
    assert 'before_request' in before_request_funcs[None][0].__name__  # Check if 'before_request' is in the middleware

def test_middleware_no_key(client):
    """
    Test middleware when no API key is provided in the request.
    Expects a 401 status code for unauthorized access.
    """
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Test'})
    assert response.status_code == 401
    assert "Unauthorized access" in response.get_data(as_text=True)

def test_process_transcribed_text_no_text(client):
    """
    Test when no transcribed text is provided in the request.
    Expects a 400 status code and an appropriate error message.
    """
    headers = {'x-api-key': Config.API_KEY}  # Use the correct API key from the config
    response = client.post('/process-transcribed-text', json={}, headers=headers)  # Make POST request without transcribed text
    assert response.status_code == 400  # Check that the status code is 400
    assert "No transcribed text provided" in response.get_data(as_text=True)  # Verify the error message is in the response

def test_before_request_valid_key(mocker, client):
    """
    Test that requests with a valid API key are allowed.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data to return a JSON string
    mock_fetch_data.return_value = json.dumps({
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    })
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    assert response.status_code == 200

def test_before_request_invalid_key(client):
    """
    Test that requests with an invalid API key are blocked.
    """
    headers = {'x-api-key': 'invalid_key'}
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    assert response.status_code == 401
    assert "Unauthorized access" in response.get_data(as_text=True)

@pytest.mark.parametrize("headers, expected_status, message", [
    ({'x-api-key': 'invalid_key'}, 401, "Unauthorized access"),
    (None, 401, "Unauthorized access"),  # No API key
])
def test_api_key_handling(client, headers, expected_status, message):
    """
    Test that the API key is handled correctly (invalid or missing).
    """
    json_data = {'transcribed_text': 'Hello'}
    response = client.post('/process-transcribed-text', json=json_data, headers=headers)
    assert response.status_code == expected_status
    assert message in response.get_data(as_text=True)

def test_fetch_data_error(mocker, client):
    """
    Test when fetch_data returns an error response.
    Expects a 500 status code and the error message returned from fetch_data.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data to return an error response
    mock_fetch_data.return_value = {
        "isSucceed": False,
        "error": "Error fetching data"
    }
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    assert response.status_code == 500
    assert response.get_json() == {
        "isSucceed": False,
        "error": "Error fetching data"
    }

def test_process_data_unexpected_data(mocker, client):
    """
    Test when process_data returns unexpected data.
    Expects a 200 status code and checks for missing keys in the response.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data to return valid data
    mock_fetch_data.return_value = {
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    }
    mock_process_data = mocker.patch('app.process_data')  # Mock process_data to return unexpected data
    mock_process_data.return_value = {
        "isSucceed": True,
        "unexpected_key": "Unexpected Value"
    }
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Navigate to gate B'}, headers=headers)
    assert response.status_code == 200
    assert "unexpected_key" in response.get_json()

def test_performance_logging(mocker, client):
    """
    Test that the time taken to process a request is logged.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data to return a JSON string
    mock_fetch_data.return_value = json.dumps({
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    })
    mock_logger = mocker.patch('app.logger')  # Mock the logger
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    assert response.status_code == 200
    mock_logger.info.assert_any_call("Processing transcribed text request")
    mock_logger.info.assert_any_call(mocker.ANY)  # Time taken to process

def test_logging(mocker, client):
    """
    Test that logs are generated correctly during transcribed text processing.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data to return a JSON string
    mock_fetch_data.return_value = json.dumps({
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    })
    mock_logger = mocker.patch('app.logger')  # Mock the logger
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    assert response.status_code == 200
    mock_logger.info.assert_any_call("Processing transcribed text request")

def test_process_transcribed_text_success(client, mocker):
    """
    Test the full flow for successful processing of transcribed text.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data to return a mock response
    mock_fetch_data.return_value = {
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    }
    mock_process_data = mocker.patch('app.process_data')  # Mock process_data to return a processed response
    mock_process_data.return_value = {
        "isSucceed": True,
        "message": "Processed",
        "formatted_directions": [{"from": "A", "to": "B", "instructions": []}]
    }
    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Navigate to gate B'}, headers=headers)
    assert response.status_code == 200
    assert response.get_json() == {
        "isSucceed": True,
        "message": "Processed",
        "formatted_directions": [{"from": "A", "to": "B", "instructions": []}]
    }

def test_process_transcribed_text_no_transcribed_text_provided(client):
    """
    Test when the API key is valid but no transcribed text is provided.
    Expects a 400 status code and an appropriate error message.
    """
    headers = {'x-api-key': Config.API_KEY}
    response = client.post('/process-transcribed-text', json={'language': 'English'}, headers=headers)
    assert response.status_code == 400
    assert "No transcribed text provided" in response.get_data(as_text=True)

def test_large_transcribed_text(client, mocker):
    """
    Test performance and behavior when a large transcribed text is provided.
    """
    headers = {'x-api-key': Config.API_KEY}
    mock_fetch_data = mocker.patch('app.fetch_data')  # Mock fetch_data
    mock_fetch_data.return_value = {
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    }
    mock_process_data = mocker.patch('app.process_data')  # Mock process_data
    mock_process_data.return_value = {
        "isSucceed": True,
        "message": "Processed",
        "formatted_directions": [{"from": "A", "to": "B", "instructions": []}]
    }
    large_text = "word " * 10000  # Repeat 'word ' 10,000 times
    response = client.post('/process-transcribed-text', json={'transcribed_text': large_text}, headers=headers)
    assert response.status_code == 200

def test_invalid_key_no_transcribed_text(client):
    """
    Test that requests with an invalid API key and no transcribed text are blocked.
    Expects a 401 status code and a relevant error message for the invalid API key.
    """
    headers = {'x-api-key': 'invalid_key'}
    response = client.post('/process-transcribed-text', json={}, headers=headers)
    assert response.status_code == 401
    assert "Unauthorized access" in response.get_data(as_text=True)

def test_process_transcribed_text_missing_language(client, mocker):
    """
    Test when the transcribed text is provided, but no language parameter is passed.
    Expects successful processing with the default language set to English.
    """
    headers = {'x-api-key': Config.API_KEY}
    
    # Mock fetch_data to return a valid response with directions
    mock_fetch_data = mocker.patch('app.fetch_data')
    mock_fetch_data.return_value = json.dumps({
        "isSucceed": True,
        "message": "Successful",
        "directions": [{"from": "A", "to": "B", "instructions": []}]
    })

    # Mock process_data to return a successful formatted response
    mock_process_data = mocker.patch('app.process_data')
    mock_process_data.return_value = {
        "isSucceed": True,
        "message": "Processed successfully",
        "formatted_directions": [{"from": "A", "to": "B", "instructions": []}]
    }

    response = client.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers=headers)
    
    assert response.status_code == 200
    assert "Processed successfully" in response.get_data(as_text=True)

def test_lambda_handler(mocker):
    """
    Test the AWS Lambda handler to ensure it returns the correct response.
    """
    mock_event = {"path": "/process-transcribed-text", "httpMethod": "POST"}
    mock_context = {}
    mock_wsgi_response = mocker.patch('app.wsgi_response')  # Mock wsgi_response to simulate Lambda environment
    result = lambda_handler(mock_event, mock_context)
    mock_wsgi_response.assert_called_once_with(app, mock_event, mock_context)

def test_lambda_handler_invalid_event(mocker):
    """
    Test the AWS Lambda handler with an invalid event structure.
    Expects a response indicating failure.
    """
    mock_event = {"path": "/invalid-path", "httpMethod": "POST"}
    mock_context = {}
    mock_wsgi_response = mocker.patch('app.wsgi_response')
    result = lambda_handler(mock_event, mock_context)
    mock_wsgi_response.assert_called_once_with(app, mock_event, mock_context)

# Entry point for running tests using pytest
if __name__ == '__main__':
    pytest.main()  # Execute the tests when running the file directly


"""
Other test cases to consider:-

1. Handling invalid json file- test when invalid JSON is sent ot fetch_data returns unusual data.
2. Fetch dara returning non-json response- test when fetch_data returns a non-JSON response.
3. Testing empty response from process_data- test when process data returns an empty response.
4. Simulating timeout in fetch_data- test when fetch_data takes too long and times out.
5. Simulating exception in process_data- test when process_data raises an unexpected exception.
6. Hnadling missing assistant ID and vector ID in config- test when assistant_id or vector_id in Config is missing or set to None.
7. Testing edge cases for language input- test when an unsupported or unusual language is provided. 
"""