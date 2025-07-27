from datetime import datetime
from pydantic import BaseModel

class ChatHistory(BaseModel):
    id: int
    question: str
    answer: str
    timestamp: datetime