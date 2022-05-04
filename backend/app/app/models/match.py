from datetime import datetime

import sqlalchemy as sa
from sqlalchemy.orm import relationship
from sqlalchemy_utils import URLType

from app.db.base_class import Base
from .takedown_notice import TakedownNotice
from .email_warning import EmailWarning
from .event import Event


class Match(Base):
    id = sa.Column(sa.Integer, primary_key=True)

    original_image_id = sa.Column(
        sa.Integer, sa.ForeignKey("image.id", ondelete="cascade"),
    )
    violator_id = sa.Column(
        sa.Integer, sa.ForeignKey("violator.id", ondelete="cascade"),
    )

    found_date = sa.Column(sa.DateTime, default=datetime.utcnow)
    image_url = sa.Column(URLType, nullable=False)
    page_url = sa.Column(URLType, nullable=False)
    reported = sa.Column(sa.Boolean, default=False)
    flagged = sa.Column(sa.Boolean, default=False)
    unseen = sa.Column(sa.Boolean, default=True)
    online = sa.Column(sa.Boolean, default=True)
    sent_warning_email = sa.Column(sa.Boolean, default=False)
    false_positive = sa.Column(sa.Boolean, default=False)
    similarity_pct = sa.Column(sa.Float, nullable=False)

    events = relationship(Event, backref="match")
    takedown_notices = relationship(TakedownNotice, backref="match")
    email_warnings = relationship(EmailWarning, backref="match")
