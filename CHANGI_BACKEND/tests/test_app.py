import pytest
from app import app  # Import your Flask app

# Test client setup
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Test 1: Test if the Flask app runs successfully
def test_home_route(client):
    """Test the home route"""
    response = client.get('/')
    assert response.status_code == 200

# Test 2: Test if POST request with transcribed text sends to ChatGPT
def test_process_voice(client, mocker):
    """Test sending transcribed text to ChatGPT"""
    mocker.patch('app.openai.Completion.create', return_value={
        'choices': [{'text': 'This is a test response from ChatGPT'}]
    })
    
    data = {'transcribed_text': 'Hello, how are you?'}
    response = client.post('/process-voice', json=data)
    assert response.status_code == 200
    json_data = response.get_json()
    assert 'response_text' in json_data
    assert 'audio_file' in json_data
    assert json_data['response_text'] == 'This is a test response from ChatGPT'