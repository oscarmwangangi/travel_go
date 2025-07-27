from openai import OpenAI
from config import Config
from database.crud import create_chat
from schemas.chat import ChatCreate, ChatResponse

client = OpenAI(api_key=Config.OPENAI_API_KEY)

async def get_chat_response(query: str) -> ChatResponse:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful travel assistant."},
                {"role": "user", "content": query},
            ],
            max_tokens=500
        )

        answer = response.choices[0].message.content
        record_id = create_chat(ChatCreate(question=query, answer=answer))
        
        return ChatResponse(response=answer, record_id=record_id)
    except Exception as e:
        raise e