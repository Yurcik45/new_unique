import logging

from dramatiq import actor
import requests
from requests.exceptions import RequestException
from furl import furl

from app.models import (
    Match,
    Event,
    TakedownNotice,
)
from app.models.violator import ViolatorNotAccessible
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.db.session import SessionLocal
from app.core.dramatiq import redis_broker
from app.core import config


def is_shopify(domain: str) -> bool:
    """
    :param domain:
    :return _is_shopify:
    """
    request_url = "https://" + domain + \
        "/admin"  # trying to access Shopify admin panel

    try:
        resp = requests.get(
            request_url,
            headers=config.SCRAPPING_HEADERS,
        )
    except RequestException:
        raise ViolatorNotAccessible

    # if it's shopify store, we should've been redirected
    resp_domain = furl(resp.url).netloc

    return "myshopify.com" in resp_domain


@actor(broker=redis_broker)
def send_shopify_dmca_report(match_id: int) -> bool:
    """
    Send Shopify DMCA report on https://www.shopify.com/legal/dmca.
    Using requests. That's just a simple POST method with certain params.

    Auto-generated params:
    infringement[infringement_requester]
    infringement[first_name]
    infringement[last_name]
    infringement[requester_company]
    infringement[requester_address]
    infringement[requester_phone]
    infringement[email]
    infringement[copyright_original_urls]
    infringement[infringing_urls]
    infringement[copyright_original_description]
    infringement[infringing_description]
    infringement[authorize]
    infringement[accuracy]
    infringement[verify]
    infringement[requester_signature]
    infringement[copyright_type]

    :param copyright_violation_id:
    :return success:
    """
    db = SessionLocal()

    request_url = "https://www.shopify.com/support/reports/infringement"

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    params = {
        "infringement[infringement_requester]": "copyright_owner",
        "infringement[first_name]": user.first_name,
        "infringement[last_name]": user.last_name,
        "infringement[requester_company]": user.company,
        "infringement[requester_address]": user.address,
        "infringement[requester_phone]": user.phone_number.international,
        "infringement[email]": user.email,
        "infringement[copyright_original_urls][]": match.original_image.url,
        "infringement[infringing_urls][]": match.image_url,
        "infringement[copyright_original_description]": config.SHOPIFY_DMCA_ORIGINAL_DESCRIPTION,
        "infringement[infringing_description]": config.SHOPIFY_DMCA_INFRINGING_DESCRIPTION,
        "infringement[authorize]": config.SHOPIFY_DMCA_AUTHORIZE,
        "infringement[verify]": config.SHOPIFY_DMCA_VERIFY,
        "infringement[accuracy]": config.SHOPIFY_DMCA_ACCURACY,
        "infringement[requester_signature]": user.full_name,
        "infringement[infringement_type]": "Copyright",
    }

    success = False
    try:
        resp = requests.post(request_url, params=params)
        resp.raise_for_status()

        logging.info(f"Shopify DMCA report successfully sent. Match ID: {match.id}")

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            type=TakedownNoticeTypes.PLATFORM,
            platform=Platforms.SHOPIFY,
            match=match,
        )
        db.add(takedown_notice)

        # Mark Match object as reported
        match.reported = True

        # Create an Event
        event = Event(type=EventTypes.REPORTED, match=match)
        db.add(event)

        success = True
    except Exception as e:
        logging.error(f"Could not sent Shopify DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        db.commit()
        db.close()
        return success
