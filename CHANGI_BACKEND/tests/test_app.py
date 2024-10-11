# import unittest
# from app import app

# class AppTestCase(unittest.TestCase):
#     def setUp(self):
#         self.app = app.test_client()
#         self.app.testing = True

#     def test_process_transcribed_text_no_text(self):
#         response = self.app.post('/process-transcribed-text', json={})
#         self.assertEqual(response.status_code, 400)
#         self.assertIn("No transcribed text provided", response.get_data(as_text=True))

#     def test_process_transcribed_text_invalid_key(self):
#         response = self.app.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers={'x-api-key': 'wrong_key'})
#         self.assertEqual(response.status_code, 401)
#         self.assertIn("Unauthorized access", response.get_data(as_text=True))

#     def test_process_transcribed_text_success(self):
#         response = self.app.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers={'x-api-key': 'valid_key'})
#         self.assertEqual(response.status_code, 200)

# if __name__ == '__main__':
#     unittest.main()
import json
import pytest
from CHANGI_BACKEND.app import lambda_handler  # Import the lambda function to be tested

def test_lambda_handler_with_message():
    # Mock API Gateway event with a message
    event = {
        'body': json.dumps({'message': 'Hello, Lambda!'})
    }

    # Call the Lambda function
    result = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(result['body'])

    # Assertions
    assert result['statusCode'] == 200
    assert response_body['message'] == 'You sent: Hello, Lambda!'

def test_lambda_handler_no_message():
    # Mock API Gateway event with no message
    event = {
        'body': json.dumps({})
    }

    # Call the Lambda function
    result = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(result['body'])

    # Assertions
    assert result['statusCode'] == 200
    assert response_body['message'] == 'You sent: No message provided'