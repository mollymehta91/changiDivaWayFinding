import pytest
from unittest.mock import Mock
from fetch_data import fetch_data
from config import Config
import json

def test_fetch_data_basic(mocker):

    """
    Test the basic functionality of fetch_data with a simple mock response.
    """

    # Mock the assistant retrieval function to return a mock assistant object with an ID
    mock_assistant = Mock()
    mock_assistant.id = Config.ASSISTANT_ID
    mocker.patch('openai.beta.assistants.retrieve', return_value=mock_assistant)

    # Mock the thread creation function to return a mock thread object with an ID
    mock_thread = Mock()
    mock_thread.id = "mock_thread_id"
    mocker.patch('openai.beta.threads.create', return_value=mock_thread)

    # Mock the run creation function to return a mock run object with an ID
    mock_run = Mock()
    mock_run.id = "mock_run_id"
    mocker.patch('openai.beta.threads.runs.create', return_value=mock_run)

    # Mock the run retrieval function to return a completed status
    mock_run_status = Mock()
    mock_run_status.status = "completed"
    mocker.patch('openai.beta.threads.runs.retrieve', return_value=mock_run_status)

    # Mock the messages list function to return a mock response with a `to_dict` method
    mock_message = Mock()
    mock_message.to_dict.return_value = {
        "content": [
            {"text": {"value": json.dumps({
                "directions": [
                    {
                        "from": "Test Location",
                        "to": "Test Destination",
                        "instructions": [
                            {"text": "Walk straight.", "direction": "straight", "mins": "2"},
                            {"text": "Turn left.", "direction": "left", "mins": "1"}
                        ]
                    }
                ],
                "isSucceed": True
            })}}
        ]
    }

    # Mock the messages.list() call to return a mock object with `data` containing `mock_message`
    mock_messages_list = Mock()
    mock_messages_list.data = [mock_message]
    mocker.patch('openai.beta.threads.messages.list', return_value=mock_messages_list)

    # Call the fetch_data function using the mock assistant ID and vector ID
    response = fetch_data("directions from Test Location to Test Destination", Config.ASSISTANT_ID, Config.VECTOR_ID)

    # Assert that the function returns the expected response structure
    assert response == {
        "isSucceed": True,
        "message": "Successful",
        "directions": [
            {
                "from": "Test Location",
                "to": "Test Destination",
                "instructions": [
                    {"text": "Walk straight.", "direction": "straight", "mins": "2"},
                    {"text": "Turn left.", "direction": "left", "mins": "1"}
                ]
            }
        ]
    }

if __name__ == '__main__':
    pytest.main()