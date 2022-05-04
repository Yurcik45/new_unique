from datetime import datetime

import sqlalchemy as sa
from sqlalchemy.orm import relationship
from sqlalchemy_utils import URLType
from fastapi_users.db.sqlalchemy import GUID

from app.db.base_class import Base
from app.core import config
from .tag import Tag
from .association import image_tag_association
from .match import Match


class Image(Base):
    # Basic fields
    id = sa.Column(sa.Integer, primary_key=True)
    url = sa.Column(URLType, nullable=False)
    title = sa.Column(sa.String, nullable=False)
    scans_completed = sa.Column(sa.Integer, default=0)
    uploaded_at = sa.Column(sa.DateTime, default=datetime.utcnow)

    user_id = sa.Column(
        GUID, sa.ForeignKey("user.id", ondelete="cascade"),
    )

    # Search params
    sensitivity = sa.Column(
        sa.Float, nullable=False, default=config.DEFAULT_IMAGE_SENSITIVITY,
    )

    # Tags
    tags = relationship(
        Tag, secondary=image_tag_association, backref="images",
    )

    # Matches
    matches = relationship(Match, backref="original_image")
    def __str__(self):
        return f"Image #{self.id}"
