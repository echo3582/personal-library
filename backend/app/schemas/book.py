from pydantic import BaseModel
from typing import Optional

class BookCreate(BaseModel):
    title: str
    author: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None
    summary: Optional[str] = None
    clc_code: Optional[str] = None

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None
    summary: Optional[str] = None
    clc_code: Optional[str] = None

class BookOut(BaseModel):
    id: int
    title: str
    author: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None
    summary: Optional[str] = None
    clc_code: Optional[str] = None

    class Config:
        from_attributes = True