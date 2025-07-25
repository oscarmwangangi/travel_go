from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    DB_CONFIG = {
        'host': os.getenv("DB_HOST", "localhost"),
        'database': os.getenv("DB_NAME", "travel_assistant"),
        'user': os.getenv("DB_USER", "root"),
        'password': os.getenv("DB_PASSWORD", ""),
        'port': os.getenv("DB_PORT", 3306)
    }