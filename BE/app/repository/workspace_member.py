from datetime import datetime
from typing import List
from uuid import UUID

from BE.app.util.database.abstract_query_repo import AbstractQueryRepo
from BE.app.util.database.db_factory import DBFactory
from BE.app.domain.workspace_member import WorkspaceMember

insert_workspace_member = """
INSERT INTO workspace_members (

) 
VALUES (

);
"""

update_workspace_member = """
UPDATE workspace_members
SET
    nickname = COALESCE(%(nickname)s, nickname),
    github  = COALESCE(%(github)s, github),
    blog    = COALESCE(%(blog)s, blog),
    image   = COALESCE(%(image)s, image),
    phone   = COALESCE(%(phone)s, phone)
WHERE id = %(user_id)s
  AND deleted_at IS NULL;
"""

find_member_by_id = """
SELECT * 
FROM workspace_members 
WHERE id = %(user_id)s
AND deleted_at IS NULL;
"""

find_member_by_email = """
SELECT *
FROM workspace_members
WHERE email = %(email)s;
"""

find_member_by_user_id = """
SELECT *
FROM workspace_members
WHERE user_id = %(user_id)s
AND deleted_at IS NULL;
"""

update_workspace_member_by_user_id = """
UPDATE workspace_members
SET
    nickname = COALESCE(%(nickname)s, nickname),
    github  = COALESCE(%(github)s, github),
    blog    = COALESCE(%(blog)s, blog)    
WHERE user_id = %(user_id)s
  AND deleted_at IS NULL;
"""

find_all_workspace_members = """
SELECT * FROM workspace_members
WHERE workspace_id = %(workspace_id)s
AND deleted_at IS NULL;
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)

    def find_by_id(self, id: UUID) -> WorkspaceMember:
        param = {
            "id": UUID(id).bytes
        }
        return self.db.execute(find_member_by_id, param)

    def find_by_email(self, email: str) -> WorkspaceMember:
        param = {
            "email": email
        }
        return self.db.execute(find_member_by_email, param)
    
    def find_all(self, workspace_id: int) -> List[WorkspaceMember]:
        param = {
            "workspace_id": workspace_id
        }
        return self.db.execute(find_all_workspace_members, param)

    def update(self, id: UUID, update_data: dict) -> WorkspaceMember:
        """Update a workspace member's profile fields."""
        params = {**update_data}
        params["id"] = UUID(id).bytes
        return self.db.execute(update_workspace_member, params)

    def find_by_user_id(self, user_id: UUID) -> WorkspaceMember:
        param = {
            "user_id": user_id.bytes
        }
        return self.db.execute(find_member_by_user_id, param)

    def update_by_user_id(self, user_id: UUID, update_data: dict) -> WorkspaceMember:
        params = {**update_data}
        params["user_id"] = user_id.bytes
        return self.db.execute(update_workspace_member_by_user_id, params)