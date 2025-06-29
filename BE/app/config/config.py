import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(os.path.dirname(BASE_DIR), ".env")
load_dotenv(ENV_PATH)


class Settings(BaseSettings):
    ENVIRONMENT: str = os.environ.get("ENV", "DEV")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 14
    SECRET_KEY: str
    SECRET_KEY_AUTH: str
    CONNECTION_TIMEOUT: int
    RDB_HOST: str
    RDB_PORT: int
    NOSQL_HOST: str
    NOSQL_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    RDB_URL: str = f""
    NOSQL_URL: str = f""

settings = Settings()