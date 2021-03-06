"""add joined_at to UserTable

Revision ID: 03e4a10e2a4c
Revises: f6a9c33b088c
Create Date: 2021-03-03 15:13:31.727629

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '03e4a10e2a4c'
down_revision = 'f6a9c33b088c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('image', sa.Column('uploaded_at', sa.DateTime(), nullable=True))
    op.add_column('user', sa.Column('joined_at', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'joined_at')
    op.drop_column('image', 'uploaded_at')
    # ### end Alembic commands ###
