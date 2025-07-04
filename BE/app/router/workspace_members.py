from fastapi import APIRouter, Depends, HTTPException, status
from BE.app.schema.workspace_members.request import UpdateWorkspaceMemberRequest
from BE.app.schema.workspace_members.response import WorkspaceMemberSchema, WorkspaceMemberResponse
from BE.app.service.workspace_member import WorkspaceMemberService
from uuid import UUID

router = APIRouter()
service = WorkspaceMemberService()

# @router.get("/workspace_members/me", response_model=WorkspaceMemberResponse)
# def get_my_profile():
#     # TODO: 나중에 JWT에서 현재 사용자 정보 추출
#     workspace_member_id = bytes.fromhex("9C27B022568A11F097058C554A43DA90")
#     return service.get_member_by_id(workspace_member_id)

@router.get("/workspace_members/{user_id}", response_model=WorkspaceMemberSchema)
def get_workspace_member_profile(user_id: str):
    uuid_obj = UUID(user_id)  # str → UUID 변환
    row = service.get_member_by_user_id(uuid_obj)
    return WorkspaceMemberSchema.from_row(row)


@router.patch("/workspace_members/{user_id}", response_model=WorkspaceMemberSchema)
def update_profile(user_id: str, payload: UpdateWorkspaceMemberRequest):
    response = service.update_profile_by_user_id(UUID(user_id), payload)
    return response.workspace_member





