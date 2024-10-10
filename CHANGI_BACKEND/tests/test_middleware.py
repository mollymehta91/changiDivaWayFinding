import unittest
from flask import Flask
from middleware import APIKeyMiddleware

class MiddlewareTestCase(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.middleware = APIKeyMiddleware(valid_api_key="valid_key")

    def test_valid_api_key(self):
        with self.app.test_request_context(headers={"x-api-key": "valid_key"}):
            result = self.middleware.check_api_key()
            self.assertIsNone(result)

    def test_invalid_api_key(self):
        with self.app.test_request_context(headers={"x-api-key": "invalid_key"}):
            result = self.middleware.check_api_key()
            self.assertEqual(result[1], 401)

if __name__ == '__main__':
    unittest.main()
