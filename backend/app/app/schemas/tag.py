from typing import Optional

from pydantic import BaseModel


# Shared properties
class TagBase(BaseModel):
    text: Optional[str] = None


# Properties to receive on item creation
class TagCreate(TagBase):
    text: str


# Properties to receive on item update
class TagUpdate(TagBase):
    pass


# Properties shared by models stored in DB
class TagInDBBase(TagBase):
    id: int
    text: str

    class Config:
        orm_mode = True


# Properties to return to client
class Tag(TagInDBBase):
    pass


# Properties stored in DB
class TagInDB(TagInDBBase):
    pass
