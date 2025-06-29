import mysql.connector
from BE.app.util.database.db_impl import DBImpl, ExecuteError
from BE.app.config.config import settings 

class MySQL(DBImpl):
    def __init__(self):
        super().__init__()
        self.cursor = None
        self.bind_value = {}
    
    def __del__(self):
        pass

    def _connect(self):
        connection = mysql.connector.connect(
            host=settings.RDB_HOST,
            port=settings.RDB_PORT,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME,
            connect_timeout=settings.CONNECTION_TIMEOUT
        )
        self.connection = connection

    def execute(self, query, bind_value=None):
        try:
            self.cursor = self.connection.cursor()

            if bind_value is None:
                self.cursor.execute(query, self.bind_value)
            else:
                self.cursor.execute(query, bind_value)

            result = self.cursor.fetchall()
            self.cursor.close()
            return result 
        except Exception as e:
            raise ExecuteError(f"쿼리 실행에 실패했습니다 :: {e}")

    def execute_many(self, query, bind_value, fields=None):
        try:
            self.cursor = self.connection.cursor()
            self.cursor.executeMany(query, bind_value)
            result = self.cursor.fetchall()
            self.cursor.close()
        except Exception as e:
            raise ExecuteError(f"쿼리 실행에 실패했습니다 :: {e}")

    def add_bind(self, key, value):
        self.bind_value[key] = value
    
    def clear_bind(self):
        self.bind_value.clear()
    
    def commit(self):
        self.connection.commit()
    
    def rollback(self):
        self.connection.rollback()
