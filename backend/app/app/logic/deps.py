from typing import Generator

from app.db.session import SessionLocal
from .auth.backends import fastapi_users


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


get_current_user = fastapi_users.get_current_user
get_current_active_user = fastapi_users.get_current_active_user
get_current_superuser = fastapi_users.get_current_superuser
