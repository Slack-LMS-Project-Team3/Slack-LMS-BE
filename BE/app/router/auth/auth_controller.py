from fastapi import APIRouter, HTTPException, Request, Response, Depends, Header
from typing import Union
from enum import Enum
import os
import httpx
from urllib.parse import urlencode
from fastapi.responses import RedirectResponse
import uuid

from BE.app.service.auth.auth_service import AuthService, TokenSerive
from BE.app.schema.auth.auth import AccessTokenOnly, AccessToken_and_WorkspaceID
from BE.app.core.security import verify_token_and_get_token_data

router = APIRouter(prefix="/auth")

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

GITHUBS_CLIENT_ID = os.getenv("GITHUBS_CLIENT_ID")
GITHUBS_CLIENT_SECRET = os.getenv("GITHUBS_CLIENT_SECRET")
GITHUBS_REDIRECT_URI = os.getenv("GITHUBS_REDIRECT_URI")
GITHUBS_AUTH_URL = "https://github.com/login/oauth/authorize"
GITHUBS_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUBS_USERINFO_URL = "https://api.github.com/user"

class Provider(str, Enum):
    google = "google"
    github = "github"

google_params = {
    "client_id": GOOGLE_CLIENT_ID,
    "redirect_uri": GOOGLE_REDIRECT_URI,
    "response_type": "code",
    "scope": "openid email profile",
    "access_type": "offline",
    "prompt": "consent",
}

GITHUBS_params = {
    "client_id": GITHUBS_CLIENT_ID,
    "redirect_uri": GITHUBS_REDIRECT_URI,
    "scope": "user",
}

#############################################
@router.get("/check")
async def find_user_in_db(request: Request,
                          token_user_id_and_email = Depends(verify_token_and_get_token_data)):
    
    if token_user_id_and_email == None:
        raise HTTPException(status_code=401, detail="EXPIRED TOKEN")

    return
#############################################

# 로그인 유지(access token 만료)
@router.post("/refresh", response_model=AccessTokenOnly)
async def reaccess(request: Request, 
                   ):

    print("step in refresh\n")
    # 그럼 요청에서 refresh_token 찾아서
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        print("NO REFRESH TOKEN IN COOKIES\n")
        raise HTTPException(status_code=401, detail="NO REFRESH TOKEN IN COOKIES")

    refresh_token_user_id_and_email = TokenSerive.verify_access_token(refresh_token)
    data = {"user_refresh_token": refresh_token}
    
    # 그 refresh_token으로 db에서 refresh_token 찾아오기
    db_refresh_token = TokenSerive.find_and_get_refresh_token(data)
    db_token_user_id_and_email = TokenSerive.verify_access_token(db_refresh_token)

    # ㅇㅋ 하면 새로 액세스 토큰 발급
    if refresh_token_user_id_and_email["user_id"] == db_token_user_id_and_email["user_id"]:
        new_access_token = TokenSerive.create_access_token(refresh_token_user_id_and_email)
        return AccessTokenOnly(
            access_token=new_access_token
        )
    else:
        raise HTTPException(status_code=401, detail="NOT CORRECT REFRESH TOKEN")
    

@router.get("/{provider}")
def social_login(provider: Provider):

    if provider.value == "google":
        params = google_params
        url = f"{GOOGLE_AUTH_URL}?{urlencode(params)}"

    elif provider.value == "github":
        params = GITHUBS_params
        url = f"{GITHUBS_AUTH_URL}?{urlencode(params)}"

    return RedirectResponse(url)

@router.get("/{provider}/callback", response_model=AccessToken_and_WorkspaceID)
async def auth_callback(provider: Provider, code: str, response:Response):
    
    user = None
    if provider.value == "google":
        async with httpx.AsyncClient() as client:
            # Step 1: 토큰 요청
            token_res = await client.post(GOOGLE_TOKEN_URL, data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code"
            })

            token_data = token_res.json()
            access_token = token_data.get("access_token")

            if not access_token:
                return {"error": "Access token not received"}
            
            # Step 2: 유저 정보 요청
            userinfo_res = await client.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {access_token}"}
            )

            user = userinfo_res.json()

            # UUID 객체 생성. 객체명은 바로 바꿀거라 중요하지 않음.
            uuid_obj1 = uuid.uuid4()
            uuid_obj2 = uuid.uuid4()
            # 16바이트 바이너리로 변환
            user_uuid = uuid_obj1.bytes
            refresh_token_uuid = uuid_obj2.bytes

            data = {"user_email": user["email"], "user_provider_id": user["id"], "user_id": user_uuid}

            # 유저 처리 로직 넣기 (DB에 존재하는 유저인가?) #
            user_INdb = AuthService.find_db(data)

            ########################################
            # 이건 개선 해야 하는 곳.
            # 회원 목록에 없다면, 관리자 문의 페이지로 이동시켜야 함.
            if not user_INdb:
                print("Failed")
                raise HTTPException(status_code=400, detail="User is not in DB")
            ########################################
            
            else:
                # 토큰 발급
                user_data = {"user_id": uuid.UUID(bytes=user_INdb[0][0]).hex , "email": user_INdb[0][2]}
                jwt_access_token = TokenSerive.create_access_token(user_data)

                jwt_refresh_token = TokenSerive.create_refresh_token(user_data)
                res_data={"id": refresh_token_uuid,
                      "user_id": user_INdb[0][0], 
                      "user_refresh_token": jwt_refresh_token, 
                      }
                
                TokenSerive.save_refresh_token_to_db(res_data)

                response.set_cookie(
                    key="refresh_token",
                    value=jwt_refresh_token,
                    httponly=True,
                    secure=True,
                    samesite="lax",
                    max_age= 5*60
                )

                result = AccessToken_and_WorkspaceID(access_token=jwt_access_token, workspace_id=user_INdb[0][5])
                
                return result    # github 구현 부분. 미완.

    # elif provider.value == "github":
    #     async with httpx.AsyncClient() as client:
    #         # Step 1: access_token 요청
    #         token_res = await client.post(
    #             GITHUBS_TOKEN_URL,
    #             headers={"Accept": "application/json"},
    #             data={
    #                 "code": code,
    #                 "client_id": GITHUBS_CLIENT_ID,
    #                 "client_secret": GITHUBS_CLIENT_SECRET,
    #                 "redirect_uri": GITHUBS_REDIRECT_URI,
    #             },
    #         )
    #         token_json = token_res.json()
    #         access_token = token_json.get("access_token")

    #         if not access_token:
    #             return {"error": "Access token not received"}

    #         # Step 2: 유저 정보 요청
    #         user_res = await client.get(
    #             GITHUBS_USERINFO_URL,
    #             headers={"Authorization": f"Bearer {access_token}"}
    #         )

    #         user = user_res.json()

    #         ########################################
    #         # 유저 처리 로직 넣기 (DB에 존재하는 유저인가?) #
    #         ########################################

    #         return {"user": user}
        


# 로그아웃도 하기
@router.delete("/logout")
async def logout(request:Request, 
                 response:Response, 
                 token_user_id_and_email=Depends(verify_token_and_get_token_data),
                 ):
    
    # 로그아웃할 때도 refresh token 넣어서 보내줌.
    refresh_token = request.cookies.get("refresh_token")
    data = {"user_refresh_token": refresh_token}

    data.update({"user_id": token_user_id_and_email["user_id"], "email": token_user_id_and_email["email"]})

    # 그럼 그거 받아서 db에 있는 refresh_token 찾아서 삭제해주고
    # (삭제하려면 user_id 있어야됨. 한번 받아오기.)
    TokenSerive.delete_refresh_token_from_db(data)

    # 클라이언트에서 쿠키에 저장해놨냐?
    # 아님 스토리지에 저장해놨냐에 따라 다르게
    response.delete_cookie("refresh_token")

    return