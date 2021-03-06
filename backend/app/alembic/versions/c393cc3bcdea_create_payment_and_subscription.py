"""create Payment and Subscription

Revision ID: c393cc3bcdea
Revises: 29708b56cd27
Create Date: 2021-03-03 20:41:31.649726

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import fastapi_users

# revision identifiers, used by Alembic.
revision = 'c393cc3bcdea'
down_revision = '29708b56cd27'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('payment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', fastapi_users.db.sqlalchemy.GUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('subscription',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', fastapi_users.db.sqlalchemy.GUID(), nullable=True),
    sa.Column('plan_id', sa.Integer(), nullable=True),
    sa.Column('started_at', sa.DateTime(), nullable=True),
    sa.Column('ended_at', sa.DateTime(), nullable=True),
    sa.Column('status', sa.Enum('ACTIVE', 'INACTIVE', name='subscriptionstatuses'), nullable=True),
    sa.ForeignKeyConstraint(['plan_id'], ['plan.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('subscription')
    op.drop_table('payment')
    # ### end Alembic commands ###
