import sqlalchemy as sa

from app.db.base_class import Base


class Plan(Base):
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String, nullable=False, unique=True)
    maximum_images_number = sa.Column(sa.Integer, nullable=False)
    subscription_price = sa.Column(sa.Float, nullable=False)
    free_takedown_actions_number = sa.Column(sa.Integer, nullable=False)
    takedown_action_price = sa.Column(sa.Float, nullable=False)
    # Applying to a month. For example, if visible_detections_limit is 20,
    # then we're showing 20 results from each month.
    visible_detections_limit = sa.Column(sa.Integer, nullable=False)
