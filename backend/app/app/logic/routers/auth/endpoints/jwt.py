from fastapi import APIRouter, Depends
from fastapi.responses import Response

from app.logic.auth import backends
from app.logic import deps


router = APIRouter()


router.include_router(
    backends.fastapi_users.get_auth_router(backends.jwt_authentication),
)

@router.post("/refresh")
async def refresh_jwt(response: Response, user=Depends(deps.get_current_active_user)):
    return await backends.jwt_authentication.get_login_response(user, response)
