# 🧳 Travel Assistant

An AI-powered travel assistant web application that helps users get travel recommendations and information through a conversational interface.

---

## 📑 Table of Contents

- [🧠 System Overview](#-system-overview)
- [⚙️ Backend Architecture](#-backend-architecture)
- [🗄️ Database Schema](#-database-schema)
- [📡 API Endpoints](#-api-endpoints)
- [🖥️ Frontend Components](#-frontend-components)
- [🚀 Setup Instructions](#-setup-instructions)
- [📦 Deployment](#-deployment)
- [🐞 Troubleshooting](#-troubleshooting)
- [🛠️ Tech Stack](#-tech-stack)


---

## 🧠 System Overview

Travel Assistant is a full-stack application with the following structure:

- **Frontend**: Built with **Next.js (React)** and styled using **Tailwind CSS**
- **Backend**: Powered by **FastAPI** and **MySQL**
- **AI Integration**: Uses **OpenAI GPT-3.5-turbo** to generate conversational responses

---

## ⚙️ Backend Architecture

### Directory Structure

backend/
- `main.py`: Entry point of the FastAPI application
- `config.py`: Loads environment variables like database credentials and OpenAI API keys
- `database/connection.py`: Sets up the MySQL database engine using SQLAlchemy
- `database/models.py`: Defines the `ChatHistory` model for storing Q&A records
- `database/crud.py`: Contains database operations (insert, retrieve, delete history)
- `schemas/`: Contains Pydantic models used for request/response validation
- `routes/chat.py`: Defines the API endpoints for chat functionality
- `services/chat_service.py`: Contains the logic to interact with OpenAI API and handle business logic



### Key Components

- **`config.py`**: Manages environment variables and OpenAI configuration
- **`database/`**
  - `connection.py`: MySQL connection logic
  - `models.py`: Table structures
  - `crud.py`: Create, read, update, delete operations
- **`routes/`**
  - `chat.py`: Chat submission endpoint
  - `history.py`: Fetch/clear history
- **`services/`**
  - `chat_service.py`: Chat logic using OpenAI API

---

## 🗄️ Database Schema

**MySQL Database**: `travel_assistant`  
**Table**: `chat_history`

| Column     | Type         | Description                     |
|------------|--------------|---------------------------------|
| id         | INT          | Primary key, auto-increment     |
| question   | TEXT         | User's input                    |
| answer     | TEXT         | AI-generated response           |
| timestamp  | DATETIME     | Defaults to `CURRENT_TIMESTAMP` |

### SQL Schema

```sql
CREATE DATABASE IF NOT EXISTS travel_assistant;

USE travel_assistant;

CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

```
### 📡 API Endpoints
Base URL: http://localhost:8000

# 1. Submit Query
POST /query

**Request Body:**
```{
  "question": "Where should I travel in September?"
}
```
**Response:**
```
{
  "response": "You could visit Japan for autumn festivals!",
  "record_id": 1
}
```
# 2. Get History
**GET /history**

Response:
```[
  {
    "id": 1,
    "question": "Where should I travel in September?",
    "answer": "You could visit Japan for autumn festivals!",
    "timestamp": "2025-07-24T12:00:00"
  }
]
```
# 3. Clear History

### 🖥️ Frontend Components
- Structure
```
src/
├── components/
│   ├── ChatBubble.tsx
│   ├── ChatHistory.tsx
│   ├── ChatInput.tsx
│   ├── LoadingIndicator.tsx
│   ├── MobileSidebarToggle.tsx
│   ├── Sidebar.tsx
│   └── WelcomeMessage.tsx
└── pages/
    └── Home.tsx
Key Components
ChatBubble: Displays AI messages

ChatHistory: Sidebar with past queries

ChatInput: User input area

Sidebar: Desktop + mobile sidebar

WelcomeMessage: Greeting screen
```

# 🚀 Setup Instructions
## Backend (FastAPI)

### Install and activate virtual Environment Variable(venv) on windows
```
cd travel-assistant-backend
python -m venv venv
source venv/Scripts/activate
```

### Install dependencies

``` 
pip install -r requirements.txt
```
Create .env file and .env.e

```
OPENAI_API_KEY=your_openai_key
DB_HOST=localhost
DB_NAME=travel_assistant
DB_USER=root
DB_PASSWORD=your_password
DB_PORT=3306
```

## Run the backend server
```
uvicorn main:app --reload
```

## Frontend (Next.js)
### Install dependencies

```
cd travel-assistant-frontend
npm install
```
### Run development server

```
npm run dev
```
Database
Install MySQL

Create database

CREATE DATABASE travel_assistant;
Tables will be auto-created on server start



# 🐞 Troubleshooting
- 1. 404 Errors
Ensure frontend and backend URLs match
Confirm FastAPI route paths (/query, /history)

- 2. Database Issues
Verify MySQL is running
Double check .env values
Confirm database/tables exist

- 3. CORS Errors
Make sure CORS is enabled in FastAPI:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
- 4. OpenAI API Errors
Make sure your API key is valid
Check usage quotas in OpenAI dashboard

## 🛠️ Tech Stack

- Layer	Tech
- Frontend	React (Next.js), Tailwind CSS
- Backend	FastAPI, Python, OpenAI SDK
- Database	MySQL
- Hosting	Vercel (frontend), Render/AWS (backend)
- AI	OpenAI GPT-3.5-turbo
- virtual environment variable (venv)

## 🧪 Testing the App
- Frontend: ```npm run dev```

- Backend: ```uvicorn main:app --reload```

Access Swagger Docs: ```http://localhost:8000/docs```

### 📄 License
MIT

### ✨ Author
Built for the Travel Assistant Technical Assessment
- “I HAVE CLEARLY UNDERSTOOD THE KEY POINTERS FOR THE TECHNICAL ASSESSMENT.”

