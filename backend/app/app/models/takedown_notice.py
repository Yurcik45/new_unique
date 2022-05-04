from datetime import datetime

import sqlalchemy as sa

from app.db.base_class import Base
from .enums import TakedownNoticeTypes, Platforms, ISPs


class TakedownNotice(Base):
    id = sa.Column(sa.Integer, primary_key=True)

    type = sa.Column(sa.Enum(TakedownNoticeTypes))
    platform = sa.Column(sa.Enum(Platforms))
    isp = sa.Column(sa.Enum(ISPs))
    sent_date = sa.Column(sa.DateTime, default=datetime.utcnow)

    match_id = sa.Column(
        sa.Integer, sa.ForeignKey("match.id", ondelete="cascade"),
    )
