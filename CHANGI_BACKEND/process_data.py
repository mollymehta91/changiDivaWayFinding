import json
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def process_data(assistant_message):
    """
    Function to process the raw response from the OpenAI assistant.

    This function expects a JSON-formatted string as input, which contains navigation 
    or direction-related information. It will parse the input, extract relevant data 
    (such as instructions for navigation), and return a formatted response in JSON.

    Parameters:
    - assistant_message: The raw message content from OpenAI (expected to be a JSON string).

    Returns:
    - A dictionary representing the processed and formatted response, which includes 
      the directions and instructions if available, or an error message if not.
    """
    try:
        # Parse the assistant's message from a JSON string to a Python dictionary
        directions_data = json.loads(assistant_message)
        
        # Check if the response contains directions information
        if "directions" in directions_data and directions_data["directions"]:
            direction_info = directions_data["directions"][0]   # Extract the first set of direction details

            # Check if the direction contains "instructions" and is not empty
            if "instructions" in direction_info and direction_info["instructions"]:
                # Format the instructions into a list of dictionaries, making it easier to read and process
                formatted_instructions = [
                    {
                        "text": instruction.get("text", ""),
                        "direction": instruction.get("direction", ""),
                        "mins": instruction.get("mins", "0"),
                    }
                    for instruction in direction_info["instructions"]
                ]
            else:
                # If there are no directions, log a warning and return an error response
                logger.warning("No instructions found in directions data.")
                return {
                    "isSucceed": True,
                    "message": "These are not valid points in the map provided. Please select valid points.",
                    "directions": None,
                }

            # Create the final response format
            formatted_response = {
                "isSucceed": True,
                "message": "Successful",
                "directions": [
                    {
                        "from": direction_info.get("from", "Unknown"),
                        "to": direction_info.get("to", "Unknown"),
                        "instructions": formatted_instructions,
                    }
                ],
            }

            # Return the formatted JSON data
            return formatted_response
        
        else:
            # If the response does not have directions, log and return an error message
            logger.warning("Response does not contain directions. Returning raw message as error.")
            return {
                "isSucceed": True,
                "message": "These are not valid points in the map provided. Please select valid points.",
                "directions": None,
            }

    except json.JSONDecodeError:
        # Handle JSON decoding errors and return the error response
        logger.error(f"Failed to decode JSON response. Returning raw message as error: {assistant_message}")
        return {"isSucceed": False, "message": "Error occured. Please try again."}
