import sqlalchemy as sa

from app.db.base_class import Base


class Tag(Base):
    id = sa.Column(sa.Integer, primary_key=True)
    text = sa.Column(sa.String, nullable=False, unique=True)

    def __str__(self):
        return f"Tag: {self.text}"
