import pytest
from process_data import process_data
import json

def test_process_data_with_valid_directions():
    """
    Test the process_data function with valid directions.
    """
    assistant_message = json.dumps({
        "directions": [
            {
                "from": "Point A",
                "to": "Point B",
                "instructions": [
                    {"text": "Go straight", "direction": "forward", "mins": "5"},
                    {"text": "Turn left", "direction": "left", "mins": "2"}
                ]
            }
        ]
    })

    # Call process_data with the valid message
    result = process_data(assistant_message)

    # Expected formatted response
    expected_response = {
        "isSucceed": True,
        "message": "Successful",
        "directions": [
            {
                "from": "Point A",
                "to": "Point B",
                "instructions": [
                    {"text": "Go straight", "direction": "forward", "mins": "5"},
                    {"text": "Turn left", "direction": "left", "mins": "2"}
                ]
            }
        ]
    }

    # Assert that the result matches the expected response
    assert result == expected_response

def test_process_data_with_no_directions():
    """
    Test process_data function when the message contains no directions.
    """
    assistant_message = json.dumps({
        "isSucceed": False,
        "message": "Error occured. Please try again."
    })

    # Call process_data with no directions
    result = process_data(assistant_message)

    # Expected response
    expected_response = {
        "isSucceed": True,
        "message": "These are not valid points in the map provided. Please select valid points.",
        "directions": None
    }

    # Assert the result matches the expected response for no directions
    assert result == expected_response

def test_process_data_with_invalid_json():
    """
    Test process_data function with invalid JSON data.
    """
    invalid_message = "This is not a JSON string"

    # Call process_data with invalid JSON
    result = process_data(invalid_message)

    # Expected response for JSON decode error
    expected_response = {
        "isSucceed": False,
        "message": "Error occured. Please try again."
    }

    # Assert that the result matches the expected response
    assert result == expected_response
