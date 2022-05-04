from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel, HttpUrl, validator, UUID4

from .tag import TagBase, Tag, TagCreate, TagUpdate


# Shared properties
class ImageBase(BaseModel):
    url: Optional[HttpUrl] = None
    uploaded_at: Optional[datetime] = None
    title: Optional[str] = None
    sensitivity: Optional[float] = None
    scans_completed: Optional[int] = None
    tags: List[TagBase] = None

    @validator("url", pre=True)
    def stringify_furl_object(cls, v):
        return str(v)


# Properties to receive on item creation
class ImageCreate(ImageBase):
    title: str
    url: HttpUrl
    tags: List[TagCreate] = None


# Properties to receive on item update
class ImageUpdate(ImageBase):
    tags: List[TagUpdate] = None


# Properties shared by models stored in DB
class ImageInDBBase(ImageBase):
    id: int
    title: str
    uploaded_at: datetime
    url: HttpUrl
    scans_completed: int
    user_id: UUID4
    tags: List[Tag]

    class Config:
        orm_mode = True


# Properties to return to client
class Image(ImageInDBBase):
    url: str  # get rid of the details


# Properties stored in DB
class ImageInDB(ImageInDBBase):
    pass
