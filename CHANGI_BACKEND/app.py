from flask import Flask, request, Response, jsonify
import openai
import logging
from config import Config
from middleware import APIKeyMiddleware
from fetch_data import fetch_data
import time
from aws_lambda_wsgi import response as wsgi_response
 
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
 
# Load OpenAI API key
openai.api_key = Config.OPENAI_API_KEY
 
# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
 
# Set up middleware for API key validation
api_key_middleware = APIKeyMiddleware(Config.API_KEY)
 
# Middleware to check API key
@app.before_request
def before_request():
    # Check if the API key provided in the request headers is valid
    error_response = api_key_middleware.check_api_key()
    if error_response:
        logger.warning("Unauthorized access attempt")
        return error_response   # Return error response if API key is invalid
 
# Endpoint to process transcribed text and return navigation instructions
@app.route('/process-transcribed-text', methods=['POST'])
def process_transcribed_text():
    # Parse the JSON data from the incoming request
    data = request.get_json()
    transcribed_text = data.get('transcribed_text') # Get the transcribed text from request
    language = data.get('language', "English")  # Default language to English if not provided
 
    # Check if transcribed text is provided
    if not transcribed_text:
        logger.error("No transcribed text provided")
        return Response("No transcribed text provided", status=400)
 
    logger.info("Processing transcribed text request")
    start_time = time.time()    # Record the start time for performance tracking
 
    # Call the `fetch_data` function to get directions based on transcribed text
    response_content = fetch_data(transcribed_text, Config.ASSISTANT_ID, Config.VECTOR_ID, language)
    end_time = time.time()
    logger.info(f"Response received in {end_time - start_time:.2f} seconds")    # Log time taken to process request
 
    # Return the response as a JSON
    return jsonify(response_content)
 
# AWS Lambda handler
def lambda_handler(event, context):
    # Convert Flask app to be compatible with AWS Lambda using aws-wsgi
    return wsgi_response(app, event, context)


# The code below is used to test it locally
"""
if __name__ == '__main__':
    app.run(debug=True)
"""