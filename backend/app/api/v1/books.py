from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.book import BookCreate, BookUpdate, BookOut
from app.schemas.common import Page, Msg
from app.crud import book as crud_book

router = APIRouter()

@router.post("", response_model=BookOut)
def create_book(payload: BookCreate, db: Session = Depends(get_db)):
    return crud_book.create_book(db, payload)

@router.get("/{book_id}", response_model=BookOut)
def get_book(book_id: int, db: Session = Depends(get_db)):
    obj = crud_book.get_book(db, book_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Book not found")
    return obj

@router.get("", response_model=list[BookOut])
def list_books(page: int = 1, page_size: int = 20, db: Session = Depends(get_db)):
    return crud_book.list_books(db, page, page_size)

@router.patch("/{book_id}", response_model=BookOut)
def update_book(book_id: int, payload: BookUpdate, db: Session = Depends(get_db)):
    obj = crud_book.update_book(db, book_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Book not found")
    return obj

@router.delete("/{book_id}", response_model=Msg)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    ok = crud_book.delete_book(db, book_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"msg": "deleted"}