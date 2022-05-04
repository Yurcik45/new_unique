"""Compatible with fastapi_users and httpx_oauth"""

from typing import Any, Dict, Tuple, cast, Optional, List
from urllib.parse import urlencode

from fastapi import status
from fastapi.requests import Request
from fastapi.exceptions import HTTPException
import httpx
from httpx_oauth.errors import GetIdEmailError
from httpx_oauth.oauth2 import (
    GetAccessTokenError,
    RefreshTokenNotSupportedError,
    RevokeTokenNotSupportedError,
    OAuth2Token,
)

from app.utils.shopify import validate_shopify_request

AUTHORIZE_ENDPOINT = "https://{shop}/admin/oauth/authorize"
ACCESS_TOKEN_ENDPOINT = "https://{shop}/admin/oauth/access_token"
PROFILE_ENDPOINT = "https://{shop}/admin/api/2020-10/shop.json"


class ShopifyOAuth2:
    def __init__(self, client_id: str, client_secret: str, name="shopify"):
        self.client_id = client_id
        self.client_secret = client_secret
        self.name = name

        self.request_headers = {
            "Accept": "application/json",
        }

    async def get_id_email(self, token: str, shop: str) -> Tuple[str, str]:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                PROFILE_ENDPOINT.format(shop=shop),
                headers={
                    **self.request_headers,
                    "X-Shopify-Access-Token": token,
                },
            )

            if response.status_code >= 400:
                raise GetIdEmailError(response.json())

            data = cast(Dict[str, Any], response.json())

            user_id = str(data["shop"]["id"])  # ensure it's a string
            user_email = data["shop"]["email"]

            return user_id, user_email


    async def get_authorization_url(
        self,
        shop: str,
        redirect_uri: str,
        state: str = None,
        scope: Optional[List[str]] = None,
        extras_params: Optional[dict] = None,
    ) -> str:
        params = {
            "client_id": self.client_id,
            "redirect_uri": redirect_uri,
        }

        if state is not None:
            params["state"] = state

        if scope is not None:
            params["scope"] = " ".join(scope)

        if extras_params is not None:
            params = {**params, **extras_params}  # type: ignore

        return AUTHORIZE_ENDPOINT.format(shop=shop) + f"?{urlencode(params)}"

    async def get_access_token(self, code: str, shop: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                ACCESS_TOKEN_ENDPOINT.format(shop=shop),
                data={
                    "code": code,
                    "client_id": self.client_id,
                    "client_secret": self.client_secret,
                },
                headers=self.request_headers,
            )

            data = cast(Dict[str, Any], response.json())

            if response.status_code == 400:
                raise GetAccessTokenError(data)

            return OAuth2Token(data)

    async def refresh_token(self, *args, **kwargs):
        raise RefreshTokenNotSupportedError()

    async def revoke_token(self, *args, **kwargs):
        raise RevokeTokenNotSupportedError()


class ShopifyOAuth2AuthorizeCallback:
    client: ShopifyOAuth2

    def __init__(self, client: ShopifyOAuth2):
        self.client = client

    async def __call__(
        self,
        request: Request,
        shop: str,
        code: str,
        state: str,
        error: str = None,
    ) -> Tuple[OAuth2Token, Optional[str]]:
        if error is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error,
            )

        # Validate hostname
        if not shop.endswith(".myshopify.com"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

        # Validate hmac
        if not validate_shopify_request(dict(request.query_params)):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

        access_token = await self.client.get_access_token(code, shop)
        return access_token, state
