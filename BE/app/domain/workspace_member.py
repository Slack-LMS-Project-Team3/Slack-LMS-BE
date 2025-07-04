from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
import uuid

@dataclass
class WorkspaceMember:
    user_id: uuid.UUID
    workspace_id: int
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    nickname: str = ""
    email: str = ""
    image: str = ""
    role_id: int = 0
    group_id: Optional[int] = None
    github: Optional[str] = None
    blog: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
