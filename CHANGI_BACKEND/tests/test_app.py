import unittest
from app import app

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_process_transcribed_text_no_text(self):
        response = self.app.post('/process-transcribed-text', json={})
        self.assertEqual(response.status_code, 400)
        self.assertIn("No transcribed text provided", response.get_data(as_text=True))

    def test_process_transcribed_text_invalid_key(self):
        response = self.app.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers={'x-api-key': 'wrong_key'})
        self.assertEqual(response.status_code, 401)
        self.assertIn("Unauthorized access", response.get_data(as_text=True))

    def test_process_transcribed_text_success(self):
        response = self.app.post('/process-transcribed-text', json={'transcribed_text': 'Hello'}, headers={'x-api-key': 'valid_key'})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
