from datetime import datetime, timedelta, UTC
import os
from BE.app.util.database.db_factory import DBFactory
from BE.app.repository.auth.mysql_query_repo import QueryRepo
from jose import jwt, ExpiredSignatureError


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1
REFRESH_TOKEN_EXPIRE_MINUTES = 60

db = DBFactory.get_db("MYSQL")
query_repo = QueryRepo()

class AuthService:

    def find_db(data):        
        params = {"user_email": data["user_email"], 
                  "user_provider_id": data["user_provider_id"], 
                  "user_id": data["user_id"]}

        # 일단 email로 먼저 찾아내기.
        sql = query_repo.get_sql("find_user_by_email")
        result = db.execute(sql, {"user_email": data["user_email"]})

        # 만약 email과 일치하는 회원이 없다면 바로 짤.
        if not result:
            print("\n\n email과 일치하는 회원이 없다.")
            return None
        
        # email을 통해 데이터를 찾아오긴 했지만,
        # provider_id 가 존재하지 않는 경우, 즉 처음으로 로그인 했을 때,
        # provider_id와 id 업데이트
        if not result[0][4]:
            print("\n\n 회원의 provider_id가 없다? id 다시 세팅")
            sql = query_repo.get_sql("update_provider_id_and_id")
            db.execute(sql, params)
            sql = query_repo.get_sql("update_user_id_in_workspace_members")
            db.execute(sql, params)

        # 만약 provider_id도 존재하지만, 접근 시도하는 데이터의
        # provider_id와 다른것도 짤.
        elif result[0][4] != params["user_provider_id"]:
            print("\n\n provider_id가 일치하지 않는다.")
            return None
        
        # 위 사항들에 해당되지 않는다면, 다시 provider_id와 email로 제대로 찾아와서 반환
        sql = query_repo.get_sql("find_user_by_provider_id_and_email")
        result = db.execute(sql, params)
        return result

        


    
class TokenSerive:

    # 로그인2(토큰 재발급?? 언제하는거임?)
    # JWT 구조에서는 2개의 토큰을 사용함.
    # 1. access(유효시간 짧음, API 인증용)
    # 2. refresh(유효시간 긺, access 토큰 재발급용)
    # 만약 access 토큰의 유효시간이 끝났는데, refresh는 아니다?
    # -> 그럼 재발급.

    # 토큰 관련(JWT 생성 / 검증)
    # -> 소셜 로그인을 통한 회원과, 직접 회원가입한 회원은 다른 토큰 사용.
    # 만약 직접 회원가입했다? -> 그럼 자체 토큰 사용해야됨.
    # 근데 소셜 로그인이다? -> 그럼 그 소셜에서 발급한 ID 토큰 사용.
    # 그래서 인증 방식이 다르기 때문에 둘을 나눠서 구현.
    # 그렇다고 소셜 토큰으로 모든걸 해결할 수 없음.
    # 소셜 로그인도 자체 토큰이 필요함.
    def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
        to_encode = data.copy()

        expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})

        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    # 그럼 이제 해야되는거? 리프레시 토큰도 발급해서 refresh_token 데이터베이스에 넣어주기
    # 그럼
    def create_refresh_token(data: dict, expires_delta: timedelta | None = None) -> str:
        to_encode = data.copy()

        expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})

        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    # 발급받은 refresh_token을 refresh_token DB에 저장해두기.
    def save_refresh_token_to_db(data: dict):
        sql = query_repo.get_sql("save_refresh_token")
        db.execute(sql, data)

    
    def find_and_get_refresh_token(data: dict) -> str:
        sql = query_repo.get_sql("find_refresh_token_by_refresh_token")
        result = db.execute(sql, data)
        
        return result[0][2]

    # 저장해둔 refresh_token이 유효하지 않다면 db에서 제거하기.
    def delete_refresh_token_from_db(data: dict):
        sql = query_repo.get_sql("remove_refresh_token_by_user_id_and_token")
        params = {"user_id": data["user_id"], "user_refresh_token": data["token"]}
        db.execute(sql, params)


    def verify_access_token(token:str):
        try:
            res = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        except ExpiredSignatureError:
            res = None
        return res