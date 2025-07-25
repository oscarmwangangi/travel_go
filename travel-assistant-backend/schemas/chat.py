from pydantic import BaseModel

class Query(BaseModel):
    question: str

class ChatCreate(BaseModel):
    question: str
    answer: str

class ChatResponse(BaseModel):
    response: str
    record_id: int