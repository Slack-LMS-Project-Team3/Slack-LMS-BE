from BE.app.util.database.abstract_query_repo import AbstractQueryRepo
from BE.app.util.database.db_factory import DBFactory

find_all_user = """
SELECT * FROM users;
"""

find_user_by_email = """
SELECT * FROM users WHERE email = %(user_email)s;
"""

find_user_by_provider_id_and_email = """
SELECT * FROM users WHERE provider_id = %(user_provider_id)s
                     AND email = %(user_email)s;
"""

update_provider_id_and_id = """
UPDATE users SET provider_id = %(user_provider_id)s,
                id = %(user_id)s
            WHERE email = %(user_email)s;
"""

update_user_id_in_workspace_members = """
UPDATE workspace_members SET user_id = %(user_id)s
                    WHERE email = %(user_email)s;
"""

save_refresh_token = """
INSERT INTO refresh_tokens (id, user_id, token, updated_at, deleted_at)
                      VALUE(%(id)s, %(user_id)s, %(user_refresh_token)s, NULL, NULL);
"""

find_refresh_token_by_refresh_token = """
SELECT * FROM refresh_tokens WHERE token = %(user_refresh_token)s;
"""

remove_refresh_token_by_user_id_and_token = """
DELETE FROM refresh_tokens WHERE user_id = %(user_id)s AND token = %(user_refresh_token)s;
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)
        self.queries["find_all_user"] = find_all_user
        self.queries["find_user_by_email"] = find_user_by_email
        self.queries["find_user_by_provider_id_and_email"] = find_user_by_provider_id_and_email
        self.queries["update_provider_id_and_id"] = update_provider_id_and_id
        self.queries["save_refresh_token"] = save_refresh_token
        self.queries["find_refresh_token_by_refresh_token"] = find_refresh_token_by_refresh_token
        self.queries["remove_refresh_token_by_user_id_and_token"] = remove_refresh_token_by_user_id_and_token
        self.queries["update_user_id_in_workspace_members"] = update_user_id_in_workspace_members