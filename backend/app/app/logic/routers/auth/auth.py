from fastapi import APIRouter

from .endpoints import shopify, jwt
from app.logic.auth import backends
from app.core import config
from app.utils.user import on_after_register


router = APIRouter()


router.include_router(
    backends.fastapi_users.get_oauth_router(backends.google_oauth_client, config.SECRET),
    prefix="/google",
)
router.include_router(
    jwt.router,
    prefix="/jwt",
)
router.include_router(
    backends.fastapi_users.get_register_router(on_after_register),
)
router.include_router(
    backends.fastapi_users.get_reset_password_router(config.SECRET),
)
router.include_router(
    backends.fastapi_users.get_users_router(),
    prefix="/users",
    tags=["users"],
)
router.include_router(
    shopify.router,
    prefix="/shopify",
)
