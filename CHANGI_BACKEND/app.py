from flask import Flask, request, jsonify
import openai
import json

app = Flask(__name__)

# Load API configurations
with open('config.json') as config_file:
    config = json.load(config_file)

openai.api_key = config["api_key"]

@app.route('/process-navigation', methods=['POST'])
def process_navigation():
    # Receive transcribed text from the request
    data = request.get_json()
    transcribed_text = data.get('transcribed_text')
    
    if not transcribed_text:
        return jsonify({'error': 'No transcribed text provided'}), 400

    # Send transcribed text to ChatGPT for a response
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": transcribed_text}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        # Extract response content
        content = response['choices'][0]['message']['content']

        # Send response back to frontend
        return jsonify({
            'response_text': content
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)