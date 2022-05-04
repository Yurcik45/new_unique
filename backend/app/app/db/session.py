from contextlib import contextmanager

import databases
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core import config


database = databases.Database(config.SQLALCHEMY_DATABASE_URI)

engine = create_engine(
    config.SQLALCHEMY_DATABASE_URI,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, expire_on_commit=False,
)


@contextmanager
def db_session(autocommit=True):
    session = SessionLocal()
    try:
        yield session
        if autocommit:
            session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
