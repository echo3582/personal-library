from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class CLCItem(Base):
    __tablename__ = "clc_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str] = mapped_column(String(20), unique=True, index=True)   # 如 "I" "TP"
    name: Mapped[str] = mapped_column(String(100))                           # 如 "文学" "自动化技术"