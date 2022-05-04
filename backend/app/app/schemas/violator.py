from typing import Optional
from datetime import datetime

from pydantic import BaseModel, HttpUrl, validator, EmailStr

from app.models.enums import Platforms, ISPs


# Shared properties
class ViolatorBase(BaseModel):
    platform: Optional[Platforms]
    isp: Optional[ISPs]
    email: Optional[EmailStr]
    domain: Optional[HttpUrl]
    found_date: Optional[datetime]

    @validator("domain", pre=True)
    def stringify_furl_object(cls, v):
        return str(v)


# Properties to receive on item creation
class ViolatorCreate(ViolatorBase):
    email: EmailStr
    domain: HttpUrl


# Properties to receive on item update
class ViolatorUpdate(ViolatorBase):
    pass


# Properties shared by models stored in DB
class ViolatorInDBBase(ViolatorBase):
    id: int
    platform: Platforms
    isp: ISPs
    domain: HttpUrl
    found_date: datetime

    class Config:
        orm_mode = True


# Properties to return to client
class Violator(ViolatorInDBBase):
    domain: str  # get rid of the details


# Properties stored in DB
class ViolatorInDB(ViolatorInDBBase):
    pass
