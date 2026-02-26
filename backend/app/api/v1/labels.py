from fastapi import APIRouter
from app.schemas.labels import LabelExportRequest

router = APIRouter(prefix="/labels")

@router.post("/export")
def export_labels(payload: LabelExportRequest):
    # TODO: 生成 PDF/CSV 并返回下载
    # v0.1 先返回一个占位响应
    return {"ok": True, "format": payload.format, "book_ids": payload.book_ids}