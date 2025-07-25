from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import init_db
from routes.chat import router as chat_router
from routes.history import router as history_router

app = FastAPI(
    title="Travel Assistant API",
    description="API for a travel assistant chatbot with conversation history",
    version="1.0.0",
)

# Initialize database
init_db()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")