import mysql.connector
from BE.app.util.database.db_impl import DBImpl, ExecuteError
from BE.app.config.config import settings 

class MongoDB(DBImpl):
    def __init__(self):
        super().__init__()
    
    def __del__(self):
        pass

    def _connect(self):
        pass