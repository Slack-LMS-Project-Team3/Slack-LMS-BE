# import os
# import httpx

# from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from urllib.parse import urlencode
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from BE.app.router.message import websocket_controller as message

load_dotenv()

app = FastAPI()

# GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
# GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
# GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
# GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
# GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
# GITHUB_REDIRECT_URI = os.getenv("GITHUB_REDIRECT_URI")
# GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
# GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
# GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], # 개발용 
    allow_origins=["http://43.201.21.169:3000"], # 배포용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=message.router)

@app.get("/ping")
async def pong():
    return {"message": "pong from backend"}


# @app.get("/auth/google")
# def login_with_google():
#     params = {
#         "client_id": GOOGLE_CLIENT_ID,
#         "redirect_uri": GOOGLE_REDIRECT_URI,
#         "response_type": "code",
#         "scope": "openid email profile",
#         "access_type": "offline",
#         "prompt": "consent",
#     }
#     url = f"{GOOGLE_AUTH_URL}?{urlencode(params)}"
#     return RedirectResponse(url)

# @app.get("/auth/github")
# def github_login():
#     params = {
#         "client_id": GITHUB_CLIENT_ID,
#         "redirect_uri": GITHUB_REDIRECT_URI,
#         "scope": "user",
#     }
#     github_auth_url = f"https://github.com/login/oauth/authorize?{urlencode(params)}"
#     return RedirectResponse(github_auth_url)


# @app.get("/auth/callback")
# async def auth_callback(code: str):
#     async with httpx.AsyncClient() as client:
#         # Step 1: 토큰 요청
#         token_res = await client.post(GOOGLE_TOKEN_URL, data={
#             "code": code,
#             "client_id": GOOGLE_CLIENT_ID,
#             "client_secret": GOOGLE_CLIENT_SECRET,
#             "redirect_uri": GOOGLE_REDIRECT_URI,
#             "grant_type": "authorization_code"
#         })

#         token_data = token_res.json()
#         access_token = token_data.get("access_token")

#         # Step 2: 유저 정보 요청
#         userinfo_res = await client.get(
#             GOOGLE_USERINFO_URL,
#             headers={"Authorization": f"Bearer {access_token}"}
#         )

#         user = userinfo_res.json()
#         # 👇 유저 처리 로직 (로그인 or 회원가입)
#         return {"user": user}


# @app.get("/auth/github/callback")
# async def github_callback(code: str):
#     async with httpx.AsyncClient() as client:
#         # Step 1: access_token 요청
#         token_res = await client.post(
#             "https://github.com/login/oauth/access_token",
#             headers={"Accept": "application/json"},
#             data={
#                 "client_id": GITHUB_CLIENT_ID,
#                 "client_secret": GITHUB_CLIENT_SECRET,
#                 "code": code,
#                 "redirect_uri": GITHUB_REDIRECT_URI,
#             },
#         )
#         token_json = token_res.json()
#         access_token = token_json.get("access_token")

#         if not access_token:
#             return {"error": "Access token not received"}

#         # Step 2: 유저 정보 요청
#         user_res = await client.get(
#             "https://api.github.com/user",
#             headers={"Authorization": f"Bearer {access_token}"}
#         )

#         user_data = user_res.json()

#         return {
#             "github_id": user_data["id"],
#             "username": user_data["login"],
#             "avatar": user_data["avatar_url"],
#             "profile": user_data["html_url"],
#         }
