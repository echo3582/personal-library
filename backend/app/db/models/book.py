from sqlalchemy import String, Integer, DateTime, func, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base
from datetime import datetime

class Book(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    author: Mapped[str | None] = mapped_column(String(100), nullable=True)
    publisher: Mapped[str | None] = mapped_column(String(120), nullable=True)
    isbn: Mapped[str | None] = mapped_column(String(32), nullable=True, index=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)

    clc_code: Mapped[str | None] = mapped_column(String(20), nullable=True, index=True)

    # 阅读状态（如 unread / reading / read / paused / want-to-read）
    status: Mapped[str | None] = mapped_column(String(32), nullable=True, index=True)

    # 标签，使用逗号分隔存储（例如 "日本文学,小说"）
    tags: Mapped[str | None] = mapped_column(String(255), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())