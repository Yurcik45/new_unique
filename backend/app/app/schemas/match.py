from typing import Optional
from datetime import datetime

from pydantic import BaseModel, HttpUrl, validator

from .image import Image
from .violator import ViolatorInDB


# Shared properties
class MatchBase(BaseModel):
    image_url: Optional[HttpUrl] = None
    page_url: Optional[HttpUrl] = None
    found_date: Optional[datetime] = None
    reported: Optional[bool] = None
    flagged: Optional[bool] = None
    unseen: Optional[bool] = None
    online: Optional[bool] = None
    sent_warning_email: Optional[bool] = None
    false_positive: Optional[bool] = None
    similarity_pct: Optional[float] = None

    @validator("image_url", "page_url", pre=True)
    def stringify_furl_object(cls, v):
        return str(v)


# Properties to receive on item creation
class MatchCreate(MatchBase):
    image_url: HttpUrl
    page_url: HttpUrl
    similarity_pct: float
    violator_id: int


# Properties to receive on item update
class MatchUpdate(MatchBase):
    pass


# Properties shared by models stored in DB
class MatchInDBBase(MatchBase):
    id: int
    original_image: Image
    violator: ViolatorInDB
    image_url: HttpUrl
    page_url: HttpUrl
    found_date: datetime
    reported: bool
    flagged: bool
    unseen: bool
    online: bool
    sent_warning_email: bool
    false_positive: bool
    similarity_pct: float

    class Config:
        orm_mode = True


# Properties to return to client
class Match(MatchInDBBase):
    # get rid of the details
    image_url: str
    page_url: str


# Properties stored in DB
class MatchInDB(MatchInDBBase):
    pass
