from fastapi import FastAPI
# CORSMiddleware : CORS 정책 허용을 위한 미들 웨어 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], # 개발용 
    allow_origins=["http://43.201.21.169:3000"], # 배포용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
async def pong():
    return {"message": "pong from backend"}



# 채팅방 생성

# 내 채팅방 목록 조회

# 채팅방 상세 조회(채팅방 띄우기)

# 메시지 목록 조회

# 메시지 전송