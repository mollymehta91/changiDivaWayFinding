import openai
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_data(input_text, assistant_id, vector_id, language="English"):
    """
    Function to fetch data from the OpenAI assistant based on the user's input.

    Parameters:
    - input_text: The text input provided by the user, typically a transcribed voice command.
    - assistant_id: The OpenAI assistant ID to interact with.
    - vector_id: The vector ID for any tool resources used during the assistant's response generation.
    - language: The language to be used in the assistant's response (default is "English").

    Returns:
    - Raw message content from the assistant or an error message.
    """
    try:
        # Retrieve the specified assistant
        assistant = openai.beta.assistants.retrieve(assistant_id=assistant_id)

        # Create a thread with the user input and specified vector ID for resources
        thread = openai.beta.threads.create(
            messages=[{"role": "user", "content": f"{input_text}, respond in {language}"}],
            tool_resources={"file_search": {"vector_store_ids": [vector_id]}},
        )

        # Start a run for the created thread
        run = openai.beta.threads.runs.create(thread_id=thread.id, assistant_id=assistant.id)

        # Helper function to check status and retrieve the final message
        def check_status_and_get_message(thread_id, run_id):
            # Retrieve the current status of the run
            run_status = openai.beta.threads.runs.retrieve(run_id=run.id, thread_id=thread_id)
            if run_status.status == "completed":
                # Retrieve all messages from the thread
                messages = openai.beta.threads.messages.list(thread_id=thread_id)

                # Log the response for debugging
                logger.info(f"Raw messages from OpenAI: {messages}")

                # Convert `SyncCursorPage[Message]` to a serializable format
                message_data = [msg.to_dict() for msg in messages.data]

                # Return the assistant's message content
                assistant_message = message_data[0]['content'][0]['text']['value']
                return assistant_message

            return None

        # Poll for response completion with a timeout
        timeout = 60
        while timeout > 0:
            logger.info("Checking response status...")
            response = check_status_and_get_message(thread.id, run.id)
            if response:
                return response  # Return the response if the run is completed successfully
            time.sleep(5)
            timeout -= 5  # Reduce the timeout by 5 seconds after each iteration

        # Return an error response if the timeout is reached without completion
        logger.error("Timeout: Assistant did not respond within the allowed time.")
        return {"isSucceed": False, "error": "Timeout: Assistant did not respond within the allowed time."}

    except Exception as e:
        # Handle any unexpected exceptions and log the error
        logger.error(f"Error occurred: {e}")
        return {"isSucceed": False, "error": f"Error fetching assistant data: {e}"}
    
"""
Future implementation:-
Will transition from timeout to an asynchronous polling system with exponential backoff for retries. 
This will help to handle multiple requests concurrently and prevent overloading the server.
"""