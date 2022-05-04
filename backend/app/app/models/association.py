import sqlalchemy as sa

from app.db.base_class import Base


image_tag_association = sa.Table('imagetagassociation', Base.metadata,
    sa.Column('image_id', sa.Integer, sa.ForeignKey('image.id', ondelete="cascade")),
    sa.Column('tag_id', sa.Integer, sa.ForeignKey('tag.id', ondelete="cascade"))
)
