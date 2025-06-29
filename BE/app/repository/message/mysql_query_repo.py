from BE.app.util.database.abstract_query_repo import AbstractQueryRepo

find_all_messages = """
SELECT * FROM messages;
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        super().__init__()
        self.queries["find_all_messages"] = find_all_messages
    