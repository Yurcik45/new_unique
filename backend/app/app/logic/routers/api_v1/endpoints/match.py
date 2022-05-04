from typing import Any, List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.logic import deps
from app import schemas
from app.models import Match, Image


router = APIRouter()


@router.get("/", response_model=List[schemas.Match])
async def read_matches(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    reported: Optional[bool] = None,
    flagged: Optional[bool] = None,
    unseen: Optional[bool] = None,
    online: Optional[bool] = None,
    sent_warning_email: Optional[bool] = None,
    false_positive: Optional[bool] = None,
    similarity_pct__gte: Optional[float] = None,
    violator_id: Optional[int] = None,
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve matches.
    """
    query = db.query(Match)
    if not current_user.is_superuser:
        query = (
            query.
            join(Image, Match.original_image).
            filter_by(user_id=current_user.id)
        )

    if start_date:
        query = query.filter(Match.found_date >= start_date)
    if end_date:
        query = query.filter(Match.found_date <= end_date)
    if reported is not None:
        query = query.filter(Match.reported == reported)
    if flagged is not None:
        query = query.filter(Match.flagged == flagged)
    if unseen is not None:
        query = query.filter(Match.unseen == unseen)
    if online is not None:
        query = query.filter(Match.online == online)
    if sent_warning_email is not None:
        query = query.filter(Match.sent_warning_email == sent_warning_email)
    if false_positive is not None:
        query = query.filter(Match.false_positive == false_positive)
    if similarity_pct__gte:
        query = query.filter(Match.similarity_pct >= similarity_pct__gte)
    if violator_id:
        query = query.filter(Match.violator_id == violator_id)
    query = query.offset(skip).limit(limit)

    matches = query.all()
    return matches
