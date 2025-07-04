from pydantic import BaseModel
from typing import Optional

class UpdateWorkspaceMemberRequest(BaseModel):
    nickname: Optional[str]
    github: Optional[str]
    blog: Optional[str]
    image: Optional[str]
    #phone: Optional[str]