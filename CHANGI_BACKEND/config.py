import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    API_KEY = os.getenv("API_KEY")
    ASSISTANT_ID = os.getenv("ASSISTANT_ID") 
    VECTOR_ID = os.getenv("VECTOR_ID")
