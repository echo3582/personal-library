from fastapi import FastAPI
from app.api.v1.router import router as v1_router
from app.db.init_db import init_db

app = FastAPI(title="Personal Library API", version="0.1")

@app.on_event("startup")
def on_startup():
    init_db()  # 开发阶段用：自动 create_all

app.include_router(v1_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"msg": "ok"}