from datetime import datetime
from typing import Optional, List

from pydantic import validator,BaseModel

from fastapi_users import models

from app.core import config


class User(models.BaseUser, models.BaseOAuthAccountMixin):
    shopify_myshopify_domain: Optional[str] = None
    shopify_domain: Optional[str] = None
    shopify_shop_name: Optional[str] = None

    joined_at: Optional[datetime] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    street_address: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[int] = None
    country_name: Optional[str] = None

    weekly_activity_report: Optional[bool] = None
    report_to_platforms: Optional[bool] = None

    additional_to: List[str] = None
    additional_cc: List[str] = None
    additional_bcc: List[str] = None

    warning_email_body: Optional[str] = None
    warning_email_design: Optional[dict] = None
    warning_email_subject: Optional[str] = None

    report_restrictions_active: Optional[bool] = None
    report_restrictions_domains_allowed: List[str] = None
    report_restrictions_platforms_allowed: List[str] = None

    scans_completed: Optional[int] = None
    whitelist: List[str] = None

    plan_id: int = None
    additional_takedown_actions: int = None


class UserCreate(models.BaseUserCreate):
    pass


class UserUpdate(User, models.BaseUserUpdate):
    pass


class UserInDB(User, models.BaseUserDB):
    # TODO: investigate
    additional_to: List[str] = []
    additional_cc: List[str] = []
    additional_bcc: List[str] = []
    whitelist: List[str] = []
    report_restrictions_domains_allowed: List[str] = []
    report_restrictions_platforms_allowed: List[str] = []
    plan_id: int = config.DEFAULT_PLAN_ID
    joined_at: Optional[datetime] = None
    additional_takedown_actions: int = 0

    @validator("joined_at", pre=True, always=True)
    def set_joined_at(cls, v):
        return v or datetime.utcnow()
