from fastapi import APIRouter, HTTPException
from schemas.chat import Query, ChatResponse
from services.chat_service import get_chat_response

router = APIRouter()

@router.post("/query", response_model=ChatResponse)
async def handle_query(query: Query):
    try:
        return await get_chat_response(query.question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))