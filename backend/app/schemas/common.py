from pydantic import BaseModel, Field

class Page(BaseModel):
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=200)

class Msg(BaseModel):
    msg: str