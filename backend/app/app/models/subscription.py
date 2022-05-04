from datetime import datetime

import sqlalchemy as sa
from fastapi_users.db.sqlalchemy import GUID

from app.db.base_class import Base
from .enums import SubscriptionStatuses


class Subscription(Base):
    id = sa.Column(sa.Integer, primary_key=True)
    user_id = sa.Column(
        GUID, sa.ForeignKey("user.id", ondelete="cascade"),
    )
    plan_id = sa.Column(
        sa.Integer, sa.ForeignKey("plan.id", ondelete="cascade"),
    )

    started_at = sa.Column(sa.DateTime, default=datetime.utcnow)
    ended_at = sa.Column(sa.DateTime)
    status = sa.Column(sa.Enum(SubscriptionStatuses))
