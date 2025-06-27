from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from BE.app.domain.messenger.router import websocket_controller as messeger

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], # 개발용 
    allow_origins=["http://43.201.21.169:3000"], # 배포용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=messeger.router)

@app.get("/ping")
async def pong():
    return {"message": "pong from backend"}
