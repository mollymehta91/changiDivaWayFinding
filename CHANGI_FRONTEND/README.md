# Changi DIVA Frontend Setup

Changi DIVA is an application that helps users navigate around Changi Airport with the assistance of voice commands. Users can give “from…to…” instructions, and the app will provide directions based on their needs.

This app utilizes the Expo React Native framework for the frontend and integrates OpenAI, AWS, and Python for the backend.

## Setup Instructions

### Get Started

1. **Install dependencies**


```bash
npm install
```

### Start the app

```bash
npx expo start
```

Before you can start your app, create a `.env` file in the root of the CHANGI_FRONTEND folder with the following necessary environment variables:

- `EXPO_PUBLIC_OPENAI_API_URL`: Open API URL to transcribe the voice over from speech to text and text to speech.

- `EXPO_PUBLIC_OPENAI_API_KEY`: Open API key to transcribe the voice over from speech to text and text to speech.

- `EXPO_PUBLIC_CHANGI_BACKEND_URL`: The url path for your AWS backend in order to get directions from the instructions given by the user via voice over

- `EXPO_PUBLIC_CHANGI_BACKEND_API_KEY`: The key for your AWS backend in order to get directions from the instructions given by the user via voice over
