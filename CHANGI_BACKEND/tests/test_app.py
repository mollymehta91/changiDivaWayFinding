import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_no_transcribed_text(client):
    response = client.post('/process-navigation', json={})
    json_data = response.get_json()
    assert response.status_code == 400
    assert 'error' in json_data

def test_process_navigation(client, mocker):
    mocker.patch('app.openai.ChatCompletion.create', return_value={
        'choices': [{'message': {'content': 'Follow signs to Gate B12.'}}]
    })

    data = {'transcribed_text': 'Where is Gate B12?'}
    response = client.post('/process-navigation', json=data)
    json_data = response.get_json()
    assert response.status_code == 200
    assert 'response_text' in json_data
    assert json_data['response_text'] == 'Follow signs to Gate B12.'