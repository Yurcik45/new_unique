from datetime import datetime

import sqlalchemy as sa
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType, URLType

from app.db.base_class import Base
from .match import Match
from .enums import Platforms, ISPs


class ViolatorNotAccessible(Exception):
    pass


class Violator(Base):
    id = sa.Column(sa.Integer, primary_key=True)
    matches = relationship(Match, backref="violator")
    platform = sa.Column(sa.Enum(Platforms), default=Platforms.UNDEFINED)
    isp = sa.Column(sa.Enum(ISPs), default=ISPs.UNDEFINED)
    email = sa.Column(EmailType)
    domain = sa.Column(URLType, unique=True)
    found_date = sa.Column(sa.DateTime, default=datetime.utcnow)
