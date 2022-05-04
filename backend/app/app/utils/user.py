"""Utils to interact with User model"""
import logging
from datetime import datetime, timedelta

from fastapi.requests import Request
from dramatiq import actor, group
from pydantic import UUID4

from .klaviyo import subscribe_user_to_klaviyo_list
from .shopify import load_essential_shopify_data
from .dramatiq.helpers import apscheduler_actor_wrapper
from .google import find_copyright_violations_on_image
from .time import random_delay_in_range
from app.core.dramatiq import redis_broker
from app.models import UserTable
from app.schemas import UserInDB
from app.db.session import db_session
from app.core import config
from app.core.scheduler import scheduler


def on_after_register(user_db: UserInDB, request: Request):
    subscribe_user_to_klaviyo_list.send(str(user_db.id))
    scheduler.add_job(
        apscheduler_actor_wrapper,
        "interval",
        days=config.SCAN_USER_IMAGES_INTERVAL_DAYS,
        args=["scan_user_images"],  # actor name
        kwargs={
            "args": [str(user_db.id)], # args passed to actor function
        },
    )


def user_authorized_via_shopify(user_id: UUID4):
    # converting user_id to string so it's JSON serializable
    load_essential_shopify_data.send(str(user_id))


@actor(broker=redis_broker)
def scan_user_images(user_id: str):
    logging.info(f"SCANNING USER #{user_id} IMAGES")

    current_time = datetime.now()
    with db_session() as db:
        user = db.query(UserTable).get(user_id)
        if user.scans_completed == 0:
            group([
                find_copyright_violations_on_image.message(image.id) for image in user.images
            ]).run()
        else:
            for image in user.images:
                delay = random_delay_in_range(
                    current_time,
                    current_time + timedelta(days=config.SCAN_USER_IMAGES_INTERVAL_DAYS),
                ) * 1000
                find_copyright_violations_on_image.send_with_options(
                    args=[image.id],
                    delay=delay,
                )
        user.scans_completed += 1
