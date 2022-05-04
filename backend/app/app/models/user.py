from datetime import datetime

import shopify
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from fastapi_users.db.sqlalchemy import SQLAlchemyBaseOAuthAccountTable
from sqlalchemy import (
    ARRAY,
    Boolean,
    Column,
    JSON,
    Integer,
    SmallInteger,
    String,
    Text,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from sqlalchemy_utils import PhoneNumberType

from app.core import config
from app.db.base_class import Base
from app.db.session import database
from app.schemas.user import UserInDB
from app.utils.defaults import (
    warning_email_default_template,
    warning_email_default_design,
)
from .image import Image
from .plan import Plan


class UserTable(SQLAlchemyBaseUserTable, Base):
    # Shopify
    shopify_myshopify_domain = Column(String)
    shopify_domain = Column(String)
    shopify_shop_name = Column(String)

    joined_at = Column(DateTime, default=datetime.utcnow)
    first_name = Column(String)
    last_name = Column(String)
    phone_number = Column(PhoneNumberType())
    street_address = Column(String)
    province = Column(String)
    city = Column(String)
    zip_code = Column(Integer)
    country_name = Column(String)

    weekly_activity_report = Column(Boolean, default=True)
    report_to_platforms = Column(Boolean, default=True)

    # Email Warnings
    send_warning_emails = Column(Boolean, default=True)

    additional_to = Column(ARRAY(String), server_default="{}")
    additional_cc = Column(ARRAY(String), server_default="{}")
    additional_bcc = Column(ARRAY(String), server_default="{}")

    warning_email_body = Column(
        Text, default=warning_email_default_template,
    )
    warning_email_subject = Column(
        String, default=config.WARNING_EMAIL_SUBJECT,
    )
    warning_email_design = Column(
        JSON, default=warning_email_default_design,
    )

    # Report Restrictions
    report_restrictions_active = Column(Boolean, default=False)
    report_restrictions_domains_allowed = Column(ARRAY(String), server_default="{}")
    report_restrictions_platforms_allowed = Column(ARRAY(String), server_default="{}")

    # Images
    images = relationship(Image, backref="user")

    # Plagiat Detection
    whitelist = Column(ARRAY(String), server_default="{}")

    # Other
    scans_completed = Column(SmallInteger, default=0)

    oauth_accounts = relationship("OAuthAccount", back_populates="user")

    # Billing
    plan_id = Column(
        Integer, ForeignKey("plan.id", ondelete="cascade"), default=config.DEFAULT_PLAN_ID,
    )
    plan = relationship(
        Plan, backref="users",
    )
    additional_takedown_actions = Column(Integer, default=0)

    @property
    def shopify_session(self):
        for oauth_account in self.oauth_accounts:
            if oauth_account.oauth_name == config.SHOPIFY_OAUTH_NAME:
                return shopify.Session.temp(
                    self.shopify_myshopify_domain,
                    config.SHOPIFY_API_VERSION,
                    oauth_account.access_token,
                )
        else:
            raise Exception("User is not connected to Shopify")

    @property
    def full_name(self):
        return self.first_name + " " + self.last_name

    @property
    def address(self):
        return f"{self.street_address}, {self.city} {self.zip_code}, " \
            f"{self.province}, {self.country_name}"


class OAuthAccount(SQLAlchemyBaseOAuthAccountTable, Base):
    user = relationship("UserTable", back_populates="oauth_accounts")


users = UserTable.__table__
oauth_accounts = OAuthAccount.__table__
user_db = SQLAlchemyUserDatabase(UserInDB, database, users, oauth_accounts)
