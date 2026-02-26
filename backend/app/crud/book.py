from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.models.book import Book
from app.schemas.book import BookCreate, BookUpdate

def create_book(db: Session, data: BookCreate) -> Book:
    obj = Book(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_book(db: Session, book_id: int) -> Book | None:
    return db.get(Book, book_id)

def list_books(db: Session, page: int, page_size: int) -> list[Book]:
    stmt = select(Book).offset((page - 1) * page_size).limit(page_size).order_by(Book.id.desc())
    return list(db.execute(stmt).scalars().all())

def update_book(db: Session, book_id: int, data: BookUpdate) -> Book | None:
    obj = db.get(Book, book_id)
    if not obj:
        return None
    patch = data.model_dump(exclude_unset=True)
    for k, v in patch.items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

def delete_book(db: Session, book_id: int) -> bool:
    obj = db.get(Book, book_id)
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True