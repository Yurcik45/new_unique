from datetime import datetime

import sqlalchemy as sa
from sqlalchemy_utils import EmailType

from app.db.base_class import Base


class EmailWarning(Base):
    id = sa.Column(sa.Integer, primary_key=True)

    match_id = sa.Column(
        sa.Integer, sa.ForeignKey("match.id", ondelete="cascade"),
    )

    sent_date = sa.Column(sa.DateTime, default=datetime.utcnow)
    text = sa.Column(sa.Text)
    receiver = sa.Column(EmailType)
