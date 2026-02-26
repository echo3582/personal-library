from app.db.session import engine
from app.db.base import Base

# 重要：导入所有 model，让 Base 能“看见”表
from app.db.models.book import Book  # noqa: F401
from app.db.models.clc import CLCItem  # noqa: F401
from app.db.models.label import Label  # noqa: F401

def init_db():
    Base.metadata.create_all(bind=engine)