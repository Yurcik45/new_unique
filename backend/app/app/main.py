# from paddle import PaddleClient
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sentry_sdk
from sentry_sdk.integrations.asgi import SentryAsgiMiddleware

import uvicorn


from app.utils.http import close_session
from app.core import config
from app.core.scheduler import scheduler
from app.core.dramatiq import setup_broker
from app.logic.routers import auth, api_v1
from app.db.session import database
from app.models.orm_events import init_orm_events

from .utils.http import close_session
from .core import config
from .core.scheduler import scheduler
from .core.dramatiq import setup_broker
from .logic.routers import auth, api_v1
from .db.session import database
from .models.orm_events import init_orm_events



app = FastAPI(
    title=config.PROJECT_NAME, openapi_url=f"{config.API_V1_STR}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ALLOW_ORIGINS,
    allow_credentials=config.CORS_ALLOW_CREDENTIALS,
    allow_methods=config.CORS_ALLOW_METHODS,
    allow_headers=config.CORS_ALLOW_HEADERS,
)

# TODO: uncomment
# sentry_sdk.init(dsn='https://867edfdedcba4941b10bebba2f0a81ab@o570028.ingest.sentry.io/5716457')


sentry_sdk.init(dsn=config.SENTRY_DSN)



@app.on_event("startup")
async def startup_event():
    init_orm_events()
    # TODO: investigate
    setup_broker()
    await database.connect()
    scheduler.start()


@app.on_event("shutdown")
async def shutdown_event():
    await database.disconnect()
    await close_session()
    scheduler.shutdown()


app.include_router(
    api_v1.api.router,
    prefix=config.API_V1_STR,
    tags=["api"],
)
app.include_router(
    auth.auth.router,
    prefix="/auth",
    tags=["auth"],
)


app = SentryAsgiMiddleware(app)


if __name__ == "__main__":
    uvicorn.run(app)
