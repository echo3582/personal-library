from fastapi import APIRouter
from .books import router as books_router
from .clc import router as clc_router
from .labels import router as labels_router

router = APIRouter()
router.include_router(books_router, prefix="/books", tags=["books"])
router.include_router(clc_router, prefix="/clc", tags=["clc"])
router.include_router(labels_router, prefix="/labels", tags=["labels"])