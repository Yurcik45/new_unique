from fastapi_users import FastAPIUsers
from fastapi_users.authentication import JWTAuthentication
from httpx_oauth.clients.google import GoogleOAuth2

from app.core import config
from app.models.user import user_db
from app.schemas.user import (
    User,
    UserCreate,
    UserUpdate,
    UserInDB,
)
from .clients.shopify import ShopifyOAuth2


auth_backends = []
jwt_authentication = JWTAuthentication(
    secret=config.SECRET,
    lifetime_seconds=config.JWT_LIFETIME_SECONDS,
    tokenUrl=config.JWT_TOKEN_URL,
)
auth_backends.append(jwt_authentication)

google_oauth_client = GoogleOAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
)
shopify_oauth_client = ShopifyOAuth2(
    config.SHOPIFY_CLIENT_ID,
    config.SHOPIFY_CLIENT_SECRET,
    config.SHOPIFY_OAUTH_NAME,
)

fastapi_users = FastAPIUsers(
    user_db,
    auth_backends,
    User,
    UserCreate,
    UserUpdate,
    UserInDB,
)
