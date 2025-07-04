from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

class WorkspaceMemberSchema(BaseModel):
    id: str
    user_id: str
    workspace_id: Optional[int] = None
    nickname: str
    email: EmailStr
    image: Optional[str] = None
    role_id: Optional[int] = None
    group_id: Optional[int] = None
    github: Optional[str] = None
    blog: Optional[str] = None
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
    #phone: Optional[str] = None

    @classmethod 
    def from_row(cls, row: tuple) -> "WorkspaceMemberSchema":
        return cls(
            id=row[0].hex() if isinstance(row[0], bytes) else row[0],
            user_id=row[1].hex() if isinstance(row[1], bytes) else row[1],
            workspace_id=row[2],
            nickname=row[3],
            email=row[4],
            image=row[5],
            role_id=row[6],
            group_id=row[7],
            github=row[8],
            blog=row[9],
            created_at=row[10],
            updated_at=row[11],
            deleted_at=row[12],
            #phone=row[13]
        )


class WorkspaceMemberResponse(BaseModel):
    workspace_member: WorkspaceMemberSchema
