from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BookCreate(BaseModel):
    title: str
    author: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None
    summary: Optional[str] = None
    clc_code: Optional[str] = None
    # 新增字段
    status: Optional[str] = None
    # 逗号分隔的标签字符串，例如 "日本文学,小说"
    tags: Optional[str] = None


class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None
    summary: Optional[str] = None
    clc_code: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[str] = None


class BookOut(BaseModel):
    id: int
    title: str
    author: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None
    summary: Optional[str] = None
    clc_code: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True