# Changi DIVA Frontend Setup 

Welcome to the Changi DIVA application! This innovative tool helps users navigate Changi Airport using voice commands. Simply provide “from…to…” instructions, and the app will guide you with precise directions tailored to your needs.

## Tech Stack 
 
- **Frontend** : Expo React Native
 
- **Backend** : Integrates with OpenAI, AWS, and Python

## Setup Instructions 

### Prerequisites 
Before you begin, you need to have **Node.js**  and **npm**  installed on your machine. Follow the steps below to install them:
#### Installing Node.js and npm 
 
1. **Download Node.js** : 
  - Go to the [Node.js official website](https://nodejs.org/) .

  - Download the latest LTS (Long Term Support) version for your operating system.
 
2. **Install Node.js** :
  - Run the installer and follow the prompts. This will install both Node.js and npm (Node Package Manager).
 
3. **Verify Installation** :
  - Open your terminal (Command Prompt, PowerShell, or Terminal).

  - Run the following commands to verify that Node.js and npm are installed correctly:


```bash
node -v
npm -v
```

You should see version numbers for both commands if the installation was successful.

### Get Started 
 
1. **Install Dependencies** After installing Node.js and npm, navigate to the `CHANGI_FRONTEND` directory and run:

```bash
npm install
```

### Start the App 

To launch the application, use the following command:


```bash
npx expo start
```

### Configure Environment Variables 
Before starting the app, you need to create a `.env` file in the root of the `CHANGI_FRONTEND` folder. This file should include the following environment variables: 
- `EXPO_PUBLIC_OPENAI_API_URL`: The OpenAI API URL for transcribing voice input from speech to text and converting text back to speech.
 
- `EXPO_PUBLIC_OPENAI_API_KEY`: Your OpenAI API key for handling voice transcription.
 
- `EXPO_PUBLIC_CHANGI_BACKEND_URL`: The URL for your AWS backend, used to retrieve directions based on user voice instructions.
 
- `EXPO_PUBLIC_CHANGI_BACKEND_API_KEY`: The API key for your AWS backend, required for accessing direction services.