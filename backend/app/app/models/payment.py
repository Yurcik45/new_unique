from datetime import datetime

import sqlalchemy as sa
from fastapi_users.db.sqlalchemy import GUID

from app.db.base_class import Base


class Payment(Base):
    id = sa.Column(sa.Integer, primary_key=True)
    user_id = sa.Column(
        GUID, sa.ForeignKey("user.id", ondelete="cascade"),
    )

    created_at = sa.Column(sa.DateTime, default=datetime.utcnow)
    amount = sa.Column(sa.Integer, nullable=False)
