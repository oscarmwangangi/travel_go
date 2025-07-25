from mysql.connector import Error
import mysql.connector
from config import Config

def get_db_connection():
    try:
        connection = mysql.connector.connect(**Config.DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        raise

def init_db():
    connection = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {Config.DB_CONFIG['database']}")
        cursor.execute(f"USE {Config.DB_CONFIG['database']}")
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        connection.commit()
    except Error as e:
        print(f"Error initializing database: {e}")
        raise
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()