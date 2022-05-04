from typing import Optional

from pydantic import BaseModel


# Shared properties
class PlanBase(BaseModel):
    name: Optional[str] = None
    maximum_images_number: Optional[int] = None
    subscription_price: Optional[float] = None
    free_takedown_actions_number: Optional[int] = None
    takedown_action_price: Optional[float] = None
    visible_detections_limit: Optional[int] = None

# Properties to receive on item creation
class PlanCreate(PlanBase):
    name: str
    maximum_images_number: int
    subscription_price: float
    free_takedown_actions_number: int
    takedown_action_price: float
    visible_detections_limit: int


# Properties to receive on item update
class PlanUpdate(PlanBase):
    pass


# Properties shared by models stored in DB
class PlanInDBBase(PlanBase):
    id: int
    name: str
    maximum_images_number: int
    subscription_price: float
    free_takedown_actions_number: int
    takedown_action_price: float
    visible_detections_limit: int

    class Config:
        orm_mode = True


# Properties to return to client
class Plan(PlanInDBBase):
    pass


# Properties stored in DB
class PlanInDB(PlanInDBBase):
    pass
