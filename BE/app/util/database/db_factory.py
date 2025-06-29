from BE.app.util.database.mysql import MySQL
from BE.app.util.database.mongodb import MongoDB

class DBFactory():
    @staticmethod
    def get_db(db_type):
        worker = None
        if db_type.upper() == "MYSQL":
            worker = MySQL()
        elif db_type.upper() == "MONGODB":
            worker = MongoDB()
        else:
            pass
        return worker
