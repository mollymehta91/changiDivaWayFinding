import unittest
from unittest.mock import patch
from fetch_data import fetch_data

class FetchDataTestCase(unittest.TestCase):
    @patch("fetch_data.openai.Assistant.retrieve")
    @patch("fetch_data.openai.Thread.create")
    @patch("fetch_data.openai.Thread.run.create")
    @patch("fetch_data.openai.Thread.run.retrieve")
    @patch("fetch_data.openai.Thread.message.list")
    def test_fetch_data_success(self, mock_message_list, mock_run_retrieve, mock_run_create, mock_thread_create, mock_assistant_retrieve):
        mock_assistant_retrieve.return_value = {"id": "assistant_id"}
        mock_thread_create.return_value = {"id": "thread_id"}
        mock_run_create.return_value = {"id": "run_id"}
        mock_run_retrieve.return_value = {"status": "completed"}
        mock_message_list.return_value = {"data": [{"role": "assistant", "content": "Hello, world!"}]}

        response = fetch_data("test", "assistant_id", "vector_id", "English")
        self.assertEqual(response, "Hello, world!")

if __name__ == '__main__':
    unittest.main()
