from flask import Flask, request, Response, jsonify
import openai
import logging
from config import Config
from middleware import APIKeyMiddleware
from fetch_data import fetch_data
import time

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load OpenAI API key
openai.api_key = Config.OPENAI_API_KEY

# Initialize Flask app and API key middleware
app = Flask(__name__)
app.config.from_object(Config)
api_key_middleware = APIKeyMiddleware(Config.API_KEY)

# Middleware to check API key
@app.before_request
def before_request():
    error_response = api_key_middleware.check_api_key()
    if error_response:
        logger.warning("Unauthorized access attempt")
        return error_response

# Endpoint to process transcribed text
@app.route('/process-transcribed-text', methods=['POST'])
def process_transcribed_text():
    data = request.get_json()
    transcribed_text = data.get('transcribed_text')
    language = data.get('language', "English")

    if not transcribed_text:
        logger.error("No transcribed text provided")
        return Response("No transcribed text provided", status=400)

    logger.info("Processing transcribed text request")
    start_time = time.time()

    # Call the fetch_data function to get the formatted response
    response_content = fetch_data(transcribed_text, Config.ASSISTANT_ID, Config.VECTOR_ID, language)
    end_time = time.time()
    logger.info(f"Response received in {end_time - start_time:.2f} seconds")

    # Return the response as a JSON
    return jsonify(response_content)

if __name__ == '__main__':
    app.run(debug=True)
