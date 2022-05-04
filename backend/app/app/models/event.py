from datetime import datetime

import sqlalchemy as sa

from app.db.base_class import Base
from .enums import EventTypes


class Event(Base):
    id = sa.Column(sa.Integer, primary_key=True)
    match_id = sa.Column(
        sa.Integer, sa.ForeignKey("match.id", ondelete="cascade"),
    )
    created_at = sa.Column(sa.DateTime, default=datetime.utcnow)
    type = sa.Column(sa.Enum(EventTypes))
