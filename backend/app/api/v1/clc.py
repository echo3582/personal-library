from fastapi import APIRouter
from typing import List
from app.schemas.clc import ClcMajorOut, ClcMajorStatsOut

router = APIRouter(prefix="/clc")

@router.get("/majors", response_model=List[ClcMajorOut])
def list_clc_majors():
    # TODO: 聚合统计（group by clc_major）
    ...

@router.get("/majors/{major}/stats", response_model=ClcMajorStatsOut)
def get_major_stats(major: str):
    ...