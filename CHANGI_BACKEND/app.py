from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set up OpenAI API key (replace with your actual OpenAI API key)
openai.api_key = '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'

# Route to process the transcribed text and send it to ChatGPT
@app.route('/process-voice', methods=['POST'])
def process_voice():
    # Get the transcribed text from the frontend
    data = request.get_json()  # Get the JSON data sent by the frontend
    transcribed_text = data.get('transcribed_text')  # Extract the transcribed text

    # Check if transcribed_text is provided
    if not transcribed_text:
        return jsonify({'error': 'No transcribed text provided'}), 400

    # Send the transcribed text to ChatGPT for a response
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # You can also use GPT-4 or other models
            prompt=transcribed_text,
            max_tokens=150,  # Adjust the token limit based on your needs
            n=1,  # Number of completions to generate
            stop=None,  # No stop sequence required
            temperature=0.7  # Adjust for creativity (lower is less creative, higher is more creative)
        )

        # Extract the response from ChatGPT
        gpt_response = response.choices[0].text.strip()

        # Return the response to the frontend
        return jsonify({
            'response_text': gpt_response  # Send ChatGPT's response back to the frontend
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
