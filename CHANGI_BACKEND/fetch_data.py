import openai
import json
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_data(input_text, assistant_id, vector_id, language="English"):
    try:
        # Retrieve the specified assistant
        assistant = openai.beta.assistants.retrieve(assistant_id=assistant_id)

        # Create a thread with the user input and specified vector ID for resources
        thread = openai.beta.threads.create(
            messages=[{"role": "user", "content": f"{input_text}, respond in {language}"}],
            tool_resources={"file_search": {"vector_store_ids": [vector_id]}}
        )

        # Start a run for the created thread
        run = openai.beta.threads.runs.create(thread_id=thread.id, assistant_id=assistant.id)

        # Helper function to check status and retrieve the final message
        def check_status_and_get_message(thread_id, run_id):
            run_status = openai.beta.threads.runs.retrieve(run_id=run.id, thread_id=thread_id)
            if run_status.status == "completed":
                # Get all messages from the thread
                messages = openai.beta.threads.messages.list(thread_id=thread_id)
                
                # Log the response for debugging
                logger.info(f"Raw messages from OpenAI: {messages}")

                # Convert `SyncCursorPage[Message]` to a serializable format
                message_data = [msg.to_dict() for msg in messages.data]

                # Extract the value from the assistant's message content
                assistant_message = message_data[0]['content'][0]['text']['value']

                # Deserialize the JSON string into a Python dictionary
                try:
                    directions_data = json.loads(assistant_message)

                    # Check if the response contains directions information
                    if "directions" in directions_data:
                        formatted_instructions = [
                            {
                                "text": instruction.get("text", ""),
                                "direction": instruction.get("direction", ""),
                                "mins": instruction.get("mins", "0")
                            }
                            for instruction in directions_data["directions"][0]["instructions"]
                        ]

                        # Create the final response format
                        # `isSucceed` is for the frontend processing
                        formatted_response = {
                            "isSucceed": True,
                            "directions": [
                                {
                                    "from": directions_data["directions"][0]["from"],
                                    "to": directions_data["directions"][0]["to"],
                                    "instructions": formatted_instructions
                                }
                            ]
                        }

                        # Return the formatted JSON data
                        return formatted_response
                    else:
                        # If the response does not have directions, log and return raw response as an error message
                        logger.error("Response does not contain directions. Returning raw message as error.")
                        return {"isSucceed": False, "error": assistant_message}

                except json.JSONDecodeError:
                    # Handle JSON decoding errors and return the raw message as an error response
                    logger.error(f"Failed to decode JSON response. Returning raw message as error: {assistant_message}")
                    return {"isSucceed": False, "error": assistant_message}

            return None

        # Poll for response completion with a timeout
        timeout = 60
        while timeout > 0:
            logger.info("Checking response status...")
            response = check_status_and_get_message(thread.id, run.id)
            if response:
                return response
            time.sleep(5)
            timeout -= 5

        return {"isSucceed": False, "error": "Timeout: Assistant did not respond within the allowed time."}

    except Exception as e:
        logger.error(f"Error occurred: {e}")
        return {"isSucceed": False, "error": f"Error fetching assistant data: {e}"}
