from fastapi import APIRouter, HTTPException
from database.crud import get_all_chats, clear_chat_history
from database.models import ChatHistory

router = APIRouter()

@router.get("/history", response_model=list[ChatHistory])
async def get_history():
    try:
        return get_all_chats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/history")
async def clear_history():
    try:
        clear_chat_history()
        return {"message": "History cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))