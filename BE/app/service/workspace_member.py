from uuid import UUID

from BE.app.domain.workspace_member import WorkspaceMember
from BE.app.repository.workspace_member import QueryRepo as WorkspaceMemberRepo
from BE.app.schema.workspace_members.request import UpdateWorkspaceMemberRequest
from BE.app.schema.workspace_members.response import (
    WorkspaceMemberResponse,
    WorkspaceMemberSchema,
)

class WorkspaceMemberService:
    def __init__(self):
        self.workspace_member_repo = WorkspaceMemberRepo() # Repository 인스턴스 생성, DB 연결

    def get_member_by_user_id(self, user_id: UUID):
        rows = self.workspace_member_repo.find_by_user_id(user_id)
        return rows[0] if rows else None
    
    def get_member_by_email(self, email: str):
        rows = self.workspace_member_repo.find_by_email(email)
        return rows[0] if rows else None

    def get_all_members(self, workspace_id: int):
        return self.workspace_member_repo.find_all(workspace_id)
    

    def update_profile_by_user_id(self, user_id: UUID, update_data: UpdateWorkspaceMemberRequest) -> WorkspaceMemberResponse:
        params = update_data.model_dump(exclude_unset=True)
        self.workspace_member_repo.update_by_user_id(user_id, params)
        rows = self.workspace_member_repo.find_by_user_id(user_id)
        if not rows:
            raise ValueError("Updated member not found")
        workspace_member = WorkspaceMemberSchema.from_row(rows[0])
        return WorkspaceMemberResponse(workspace_member=workspace_member)
    
    def _to_response(self, member: WorkspaceMember) -> WorkspaceMemberResponse:
        from dataclasses import asdict

        data = asdict(member)
        data["id"] = member.id.hex
        data["user_id"] = member.user_id.hex
        return WorkspaceMemberResponse(**data)
