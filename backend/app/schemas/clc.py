from pydantic import BaseModel

class ClcMajorOut(BaseModel):
    code: str      # "I" / "TP"
    name: str      # "文学" / "自动化技术、计算技术"
    count: int

class ClcMajorStatsOut(BaseModel):
    code: str
    total: int