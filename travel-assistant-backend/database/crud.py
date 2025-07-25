from .connection import get_db_connection
from schemas.chat import ChatCreate

def create_chat(chat: ChatCreate):
    connection = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO chat_history (question, answer) VALUES (%s, %s)",
            (chat.question, chat.answer)
        )
        connection.commit()
        cursor.execute("SELECT LAST_INSERT_ID()")
        return cursor.fetchone()[0]
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

def get_all_chats():
    connection = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM chat_history ORDER BY timestamp DESC")
        return cursor.fetchall()
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

def clear_chat_history():
    connection = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("TRUNCATE TABLE chat_history")
        connection.commit()
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()