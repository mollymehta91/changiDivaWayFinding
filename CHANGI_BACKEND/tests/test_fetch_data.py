import pytest
from unittest.mock import Mock
from fetch_data import fetch_data
from config import Config
import json

def test_fetch_data_invalid_assistant_id(mocker):
    """
    Test fetch_data function when an invalid assistant ID is provided.
    """
    mocker.patch('openai.beta.assistants.retrieve', side_effect=Exception("Invalid Assistant ID"))
    response = fetch_data("Test input", "invalid_id", Config.VECTOR_ID)
    assert response == {"isSucceed": False, "error": "Error fetching assistant data: Invalid Assistant ID"}

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
    assert response == json.dumps({
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
    })

def test_fetch_data_success(mocker):
    """
    Test fetch_data function when the run completes successfully.
    """
    mock_assistant = Mock()
    mock_assistant.id = Config.ASSISTANT_ID
    mocker.patch('openai.beta.assistants.retrieve', return_value=mock_assistant)

    # Mock thread creation
    mock_thread = Mock()
    mock_thread.id = "mock_thread_id"
    mocker.patch('openai.beta.threads.create', return_value=mock_thread)

    # Mock run creation
    mock_run = Mock()
    mock_run.id = "mock_run_id"
    mocker.patch('openai.beta.threads.runs.create', return_value=mock_run)

    # Mock the run retrieval to return a completed status
    mock_run_status = Mock()
    mock_run_status.status = "completed"
    mocker.patch('openai.beta.threads.runs.retrieve', return_value=mock_run_status)

    # Mock the messages list to return a mock message
    mock_message = Mock()
    mock_message.to_dict.return_value = {
        "content": [{"text": {"value": "Test response message"}}]
    }
    mock_messages_list = Mock()
    mock_messages_list.data = [mock_message]
    mocker.patch('openai.beta.threads.messages.list', return_value=mock_messages_list)

    # Call fetch_data and assert the response
    response = fetch_data("Test input", Config.ASSISTANT_ID, Config.VECTOR_ID)
    assert response == "Test response message"

def test_fetch_data_exception(mocker):
    """
    Test fetch_data function when an exception occurs.
    """
    # Mock the assistant retrieval to raise an exception
    mocker.patch('openai.beta.assistants.retrieve', side_effect=Exception("Test exception"))

    # Call fetch_data and assert the error response
    response = fetch_data("Test input", Config.ASSISTANT_ID, Config.VECTOR_ID)
    assert response == {"isSucceed": False, "error": "Error fetching assistant data: Test exception"}

def test_fetch_data_polling_success(mocker):
    """
    Test fetch_data function where polling eventually returns a response.
    """
    mock_assistant = Mock()
    mock_assistant.id = Config.ASSISTANT_ID
    mocker.patch('openai.beta.assistants.retrieve', return_value=mock_assistant)

    # Mock thread and run creation
    mock_thread = Mock()
    mock_thread.id = "mock_thread_id"
    mocker.patch('openai.beta.threads.create', return_value=mock_thread)
    mock_run = Mock()
    mock_run.id = "mock_run_id"
    mocker.patch('openai.beta.threads.runs.create', return_value=mock_run)

    # Simulate "in-progress" status first, then return "completed"
    mock_run_status = Mock()
    mock_run_status.status = "in-progress"
    mocker.patch('openai.beta.threads.runs.retrieve', side_effect=[
        mock_run_status,
        mock_run_status,
        Mock(status="completed")
    ])

    # Mock the messages list to return a mock message on completion
    mock_message = Mock()
    mock_message.to_dict.return_value = {
        "content": [{"text": {"value": "Polling response message"}}]
    }
    mock_messages_list = Mock()
    mock_messages_list.data = [mock_message]
    mocker.patch('openai.beta.threads.messages.list', return_value=mock_messages_list)

    # Call fetch_data and assert the response
    response = fetch_data("Test input", Config.ASSISTANT_ID, Config.VECTOR_ID)
    assert response == "Polling response message"

def test_fetch_data_different_language(mocker):
    """
    Test fetch_data with a different language parameter.
    """
    mock_assistant = Mock()
    mock_assistant.id = Config.ASSISTANT_ID
    mocker.patch('openai.beta.assistants.retrieve', return_value=mock_assistant)

    # Mock thread creation
    mock_thread = Mock()
    mock_thread.id = "mock_thread_id"
    mocker.patch('openai.beta.threads.create', return_value=mock_thread)

    # Mock run creation
    mock_run = Mock()
    mock_run.id = "mock_run_id"
    mocker.patch('openai.beta.threads.runs.create', return_value=mock_run)

    # Mock run completion
    mock_run_status = Mock()
    mock_run_status.status = "completed"
    mocker.patch('openai.beta.threads.runs.retrieve', return_value=mock_run_status)

    # Mock the messages list to return a mock message
    mock_message = Mock()
    mock_message.to_dict.return_value = {
        "content": [{"text": {"value": "Test response in Spanish"}}]
    }
    mock_messages_list = Mock()
    mock_messages_list.data = [mock_message]
    mocker.patch('openai.beta.threads.messages.list', return_value=mock_messages_list)

    # Call fetch_data with language parameter set to "Spanish"
    response = fetch_data("Test input", Config.ASSISTANT_ID, Config.VECTOR_ID, language="Spanish")
    assert response == "Test response in Spanish"

def test_fetch_data_timeout(mocker):
    """
    Test fetch_data function when it times out (simulating a slow response from OpenAI).
    """
    mock_assistant = Mock()
    mock_assistant.id = Config.ASSISTANT_ID
    mocker.patch('openai.beta.assistants.retrieve', return_value=mock_assistant)

    # Mock the thread and run creation
    mock_thread = Mock()
    mock_thread.id = "mock_thread_id"
    mocker.patch('openai.beta.threads.create', return_value=mock_thread)
    
    mock_run = Mock()
    mock_run.id = "mock_run_id"
    mocker.patch('openai.beta.threads.runs.create', return_value=mock_run)

    # Mock run retrieval to simulate non-completion
    mock_run_status = Mock()
    mock_run_status.status = "in-progress"
    mocker.patch('openai.beta.threads.runs.retrieve', return_value=mock_run_status)

    # Call fetch_data and expect timeout
    response = fetch_data("directions from Test Location to Test Destination", Config.ASSISTANT_ID, Config.VECTOR_ID)
    
    # Assert that the response indicates a timeout error
    assert response == {"isSucceed": False, "error": "Timeout: Assistant did not respond within the allowed time."}