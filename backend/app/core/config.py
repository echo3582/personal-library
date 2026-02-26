from pydantic import BaseModel

class Settings(BaseModel):
    DATABASE_URL: str = "sqlite:///./library.db"  # 生成在 backend/app 同级运行目录下

settings = Settings()