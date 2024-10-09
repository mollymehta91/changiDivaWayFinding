from flask import Flask, request, jsonify

app = Flask(__name__)

# Hardcoded JSON response
hardcoded_response = {
    "directions": [
        {
            "from": "Samsonite",
            "to": "Oakley",
            "instructions": [
                {"text": "Start at Samsonite.", "direction": "straight"},
                {"text": "Walk clockwise along the circular path.", "direction": "straight"},
                {"text": "Pass Tiger Street Lab on your right.", "direction": "right"},
                {"text": "Continue walking until you reach Lobby H near Peach Garden.", "direction": "straight"},
                {"text": "From Lobby H, keep walking clockwise and pass by Koi Thé and LeNu.", "direction": "straight"},
                {"text": "You will then see Jewel Manulife Sky Nets on your left.", "direction": "left"},
                {"text": "Continue towards Lobby E, passing TAG Heuer and TUDOR.", "direction": "straight"},
                {"text": "Keep walking past Adidas and AGATHA until you reach Lobby F.", "direction": "straight"},
                {"text": "From Lobby F, continue walking clockwise, passing Polo Ralph Lauren.", "direction": "straight"},
                {"text": "Finally, you will reach Oakley, which is near Lobby F.", "direction": "straight"}
            ]
        }
    ]
}

@app.route('/process-navigation', methods=['POST'])
def process_navigation():
    # Regardless of input, return the hardcoded response
    return jsonify(hardcoded_response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
