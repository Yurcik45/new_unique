"""init

Revision ID: f6a9c33b088c
Revises: 
Create Date: 2021-03-02 18:11:51.444337

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import fastapi_users
import sqlalchemy_utils

from app.core.config import DEFAULT_PLANS


# revision identifiers, used by Alembic.
revision = 'f6a9c33b088c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'plan',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('maximum_images_number', sa.Integer(), nullable=False),
        sa.Column('subscription_price', sa.Float(), nullable=False),
        sa.Column('free_takedown_actions_number', sa.Integer(), nullable=False),
        sa.Column('takedown_action_price', sa.Float(), nullable=False),
        sa.Column('visible_detections_limit', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name'),
    )
    
    plan = sa.sql.table(
        'plan',
        sa.sql.column('name', sa.String),
        sa.sql.column('maximum_images_number', sa.Integer),
        sa.sql.column('subscription_price', sa.Float),
        sa.sql.column('free_takedown_actions_number', sa.Integer),
        sa.sql.column('takedown_action_price', sa.Float),
        sa.sql.column('visible_detections_limit', sa.Integer),
    )

    # Popluate DB with default plans
    op.bulk_insert(
        plan,
        DEFAULT_PLANS,
    )

    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('text')
    )
    op.create_table('violator',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('platform', sa.Enum('UNDEFINED', 'SHOPIFY', 'WIX', 'AMAZON', 'BIGCOMMERCE', 'VOLUSION', 'WEEBLY', 'WORDPRESS', 'WISH', name='platforms'), nullable=True),
    sa.Column('isp', sa.Enum('UNDEFINED', 'CLOUDFLARE', 'AWS', 'GOOGLE_CLOUD', 'AKAMAI', name='isps'), nullable=True),
    sa.Column('email', sqlalchemy_utils.types.email.EmailType(length=255), nullable=True),
    sa.Column('domain', sqlalchemy_utils.types.url.URLType(), nullable=True),
    sa.Column('found_date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('domain')
    )
    op.create_table('user',
    sa.Column('id', fastapi_users.db.sqlalchemy.GUID(), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('hashed_password', sa.String(length=72), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=False),
    sa.Column('shopify_myshopify_domain', sa.String(), nullable=True),
    sa.Column('shopify_domain', sa.String(), nullable=True),
    sa.Column('shopify_shop_name', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('phone_number', sqlalchemy_utils.types.phone_number.PhoneNumberType(length=20), nullable=True),
    sa.Column('street_address', sa.String(), nullable=True),
    sa.Column('province', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('zip_code', sa.Integer(), nullable=True),
    sa.Column('country_name', sa.String(), nullable=True),
    sa.Column('weekly_activity_report', sa.Boolean(), nullable=True),
    sa.Column('report_to_platforms', sa.Boolean(), nullable=True),
    sa.Column('send_warning_emails', sa.Boolean(), nullable=True),
    sa.Column('additional_to', sa.ARRAY(sa.String()), server_default='{}', nullable=True),
    sa.Column('additional_cc', sa.ARRAY(sa.String()), server_default='{}', nullable=True),
    sa.Column('additional_bcc', sa.ARRAY(sa.String()), server_default='{}', nullable=True),
    sa.Column('warning_email_body', sa.Text(), nullable=True),
    sa.Column('warning_email_subject', sa.String(), nullable=True),
    sa.Column('warning_email_design', sa.JSON(), nullable=True),
    sa.Column('report_restrictions_active', sa.Boolean(), nullable=True),
    sa.Column('report_restrictions_domains_allowed', sa.ARRAY(sa.String()), server_default='{}', nullable=True),
    sa.Column('report_restrictions_platforms_allowed', sa.ARRAY(sa.String()), server_default='{}', nullable=True),
    sa.Column('whitelist', sa.ARRAY(sa.String()), server_default='{}', nullable=True),
    sa.Column('scans_completed', sa.SmallInteger(), nullable=True),
    sa.Column('plan_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['plan_id'], ['plan.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_table('image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sqlalchemy_utils.types.url.URLType(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('scans_completed', sa.Integer(), nullable=True),
    sa.Column('user_id', fastapi_users.db.sqlalchemy.GUID(), nullable=True),
    sa.Column('sensitivity', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('oauth_account',
    sa.Column('id', fastapi_users.db.sqlalchemy.GUID(), nullable=False),
    sa.Column('oauth_name', sa.String(length=100), nullable=False),
    sa.Column('access_token', sa.String(length=1024), nullable=False),
    sa.Column('expires_at', sa.Integer(), nullable=True),
    sa.Column('refresh_token', sa.String(length=1024), nullable=True),
    sa.Column('account_id', sa.String(length=320), nullable=False),
    sa.Column('account_email', sa.String(length=320), nullable=False),
    sa.Column('user_id', fastapi_users.db.sqlalchemy.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_oauth_account_account_id'), 'oauth_account', ['account_id'], unique=False)
    op.create_index(op.f('ix_oauth_account_oauth_name'), 'oauth_account', ['oauth_name'], unique=False)
    op.create_table('imagetagassociation',
    sa.Column('image_id', sa.Integer(), nullable=True),
    sa.Column('tag_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['image_id'], ['image.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ondelete='cascade')
    )
    op.create_table('match',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('original_image_id', sa.Integer(), nullable=True),
    sa.Column('violator_id', sa.Integer(), nullable=True),
    sa.Column('found_date', sa.DateTime(), nullable=True),
    sa.Column('image_url', sqlalchemy_utils.types.url.URLType(), nullable=False),
    sa.Column('page_url', sqlalchemy_utils.types.url.URLType(), nullable=False),
    sa.Column('reported', sa.Boolean(), nullable=True),
    sa.Column('flagged', sa.Boolean(), nullable=True),
    sa.Column('unseen', sa.Boolean(), nullable=True),
    sa.Column('online', sa.Boolean(), nullable=True),
    sa.Column('sent_warning_email', sa.Boolean(), nullable=True),
    sa.Column('false_positive', sa.Boolean(), nullable=True),
    sa.Column('similarity_pct', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['original_image_id'], ['image.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['violator_id'], ['violator.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('emailwarning',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('match_id', sa.Integer(), nullable=True),
    sa.Column('sent_date', sa.DateTime(), nullable=True),
    sa.Column('text', sa.Text(), nullable=True),
    sa.Column('receiver', sqlalchemy_utils.types.email.EmailType(length=255), nullable=True),
    sa.ForeignKeyConstraint(['match_id'], ['match.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('match_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('type', sa.Enum('DETECTED', 'SENT_WARNING_EMAIL', 'REPORTED', 'WHITELISTED', 'REMOVED', name='eventtypes'), nullable=True),
    sa.ForeignKeyConstraint(['match_id'], ['match.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('takedownnotice',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Enum('ISP', 'PLATFORM', name='takedownnoticetypes'), nullable=True),
    sa.Column('platform', sa.Enum('UNDEFINED', 'SHOPIFY', 'WIX', 'AMAZON', 'BIGCOMMERCE', 'VOLUSION', 'WEEBLY', 'WORDPRESS', 'WISH', name='platforms'), nullable=True),
    sa.Column('isp', sa.Enum('UNDEFINED', 'CLOUDFLARE', 'AWS', 'GOOGLE_CLOUD', 'AKAMAI', name='isps'), nullable=True),
    sa.Column('sent_date', sa.DateTime(), nullable=True),
    sa.Column('match_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['match_id'], ['match.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('takedownnotice')
    op.drop_table('event')
    op.drop_table('emailwarning')
    op.drop_table('match')
    op.drop_table('imagetagassociation')
    op.drop_index(op.f('ix_oauth_account_oauth_name'), table_name='oauth_account')
    op.drop_index(op.f('ix_oauth_account_account_id'), table_name='oauth_account')
    op.drop_table('oauth_account')
    op.drop_table('image')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('violator')
    op.drop_table('tag')
    op.drop_table('plan')
    # ### end Alembic commands ###