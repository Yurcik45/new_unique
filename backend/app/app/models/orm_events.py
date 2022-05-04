from sqlalchemy.event import listen

from app.utils.user import on_after_register
from .user import UserTable


def init_orm_events():
    # TODO: investigate
    listen(UserTable, 'after_insert', lambda m, c, t: on_after_register(t))
