"""Compatible with fastapi_users and httpx_oauth"""

import httpx
import json
from typing import cast, Tuple, Dict, Any
from starlette.responses import RedirectResponse

from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    status,
)
from fastapi.exceptions import HTTPException

import jwt
from fastapi_users import models
from fastapi_users.router.oauth import (
    generate_state_token,
    decode_state_token,
)
from fastapi_users.router.common import ErrorCode
from fastapi_users.password import generate_password, get_password_hash

from app.logic.auth.backends import (
    fastapi_users,
    shopify_oauth_client,
)

from app.models.user import user_db, oauth_accounts, users

from app.utils.user import user_authorized_via_shopify
from app.schemas.user import UserInDB
from app.logic.auth.clients.shopify import ShopifyOAuth2AuthorizeCallback
from app.core import config

from app.logic.routers.api_v1.endpoints.shopify import *
from app.logic import deps

CALLBACK_ROUTE_NAME = f"{shopify_oauth_client.name}-callback"
shopify_oauth_authorize_callback = ShopifyOAuth2AuthorizeCallback(
    shopify_oauth_client,
)


router = APIRouter()


@router.get("/authorize")
async def authorize(
    request: Request,
    shop: str,
    authentication_backend: str,

):
    # Check that authentication_backend exists
    backend_exists = False
    for backend in fastapi_users.authenticator.backends:
        if backend.name == authentication_backend:
            backend_exists = True
            break
    if not backend_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    # authorize_redirect_url = request.url_for(CALLBACK_ROUTE_NAME)
    authorize_redirect_url = "http://localhost:3000/auth/shopify/callback"

    state_data = {
        "authentication_backend": authentication_backend,
    }
    state = generate_state_token(state_data, config.SECRET)

    authorization_url = await shopify_oauth_client.get_authorization_url(
        shop,
        authorize_redirect_url,
        state=state,
        scope=config.SHOPIFY_SCOPE,
    )

    return {"authorization_url": authorization_url}



@router.get("/callback", name=CALLBACK_ROUTE_NAME)
async def callback(
    shop: str,
    state: str,
    response: Response,
    access_token_state=Depends(shopify_oauth_authorize_callback),
):
    token, state = access_token_state
    account_id, account_email = await shopify_oauth_client.get_id_email(
        token["access_token"],
        shop,
    )

    try:
        state_data = decode_state_token(state, config.SECRET)
    except jwt.DecodeError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    user = await user_db.get_by_oauth_account(
        shopify_oauth_client.name,
        account_id,
    )

    new_oauth_account = models.BaseOAuthAccount(
        oauth_name=shopify_oauth_client.name,
        access_token=token["access_token"],
        account_id=account_id,
        account_email=account_email,
    )

    if not user:
        user = await user_db.get_by_email(account_email)
        if user:
            # Link account
            user.shopify_myshopify_domain = shop
            user.oauth_accounts.append(new_oauth_account)  # type: ignore
            await user_db.update(user)
        else:
            # Create account
            password = generate_password()
            user = UserInDB(
                email=account_email,
                hashed_password=get_password_hash(password),
                oauth_accounts=[new_oauth_account],
                shopify_myshopify_domain=shop,
            )
            user = await user_db.create(user)
        user_authorized_via_shopify(user.id)
    else:
        # Update oauth
        updated_oauth_accounts = []
        for oauth_account in user.oauth_accounts:  # type: ignore
            if oauth_account.account_id == account_id:
                updated_oauth_accounts.append(new_oauth_account)
            else:
                updated_oauth_accounts.append(oauth_account)
        user.shopify_myshopify_domain = shop
        user.oauth_accounts = updated_oauth_accounts  # type: ignore
        await user_db.update(user)

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.LOGIN_BAD_CREDENTIALS,
        )

    # Authenticate
    for backend in fastapi_users.authenticator.backends:
        if backend.name == state_data["authentication_backend"]:
            return await backend.get_login_response(
                cast(models.BaseUserDB, user), response
            )

