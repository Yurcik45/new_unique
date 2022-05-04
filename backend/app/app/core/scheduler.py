from pytz import utc

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

from app.core.config import SQLALCHEMY_DATABASE_URI


jobstores = {
    'default': SQLAlchemyJobStore(url=SQLALCHEMY_DATABASE_URI)
}

scheduler = AsyncIOScheduler(
    jobstores=jobstores,
    timezone=utc,
)
