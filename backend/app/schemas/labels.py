from typing import List, Literal, Optional
from pydantic import BaseModel, Field

LabelFormat = Literal["pdf", "csv"]

class LabelExportRequest(BaseModel):
    book_ids: List[int] = Field(..., min_items=1)
    format: LabelFormat = "pdf"

    # 可选：模板参数（v0.1 先少做点）
    include_title: bool = True
    include_authors: bool = False
    include_clc: bool = True
    paper: Literal["A4"] = "A4"
    columns: int = 3