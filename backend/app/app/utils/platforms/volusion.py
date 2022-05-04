import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from datetime import datetime

from jinja2 import Template
from dramatiq import actor
import requests
from requests.exceptions import RequestException
from bs4 import BeautifulSoup

from app.models import Match, TakedownNotice, Event
from app.models.violator import ViolatorNotAccessible
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.core import config
from app.core.dramatiq import redis_broker
from app.db.session import SessionLocal
from ..email import strip_tags


def is_volusion(domain: str) -> bool:
    """
    :param domain:
    :return _is_volusion:
    """
    request_url = "https://" + domain

    try:
        resp = requests.get(
            request_url,
            headers=config.SCRAPPING_HEADERS,
        )
    except RequestException:
        raise ViolatorNotAccessible

    soup = BeautifulSoup(resp.text, "html.parser")
    for link in soup.select("link"):
        if "vspfiles/templates" in link.get("href"):
            return True

    return False


@actor(broker=redis_broker)
def send_volusion_dmca_report(match_id: int) -> bool:
    """
    Send DMCA report to Volusion via email.

    :param match_id:
    :return success:
    """
    db = SessionLocal()

    volusion_dmca_email = "legal@volusion.com"

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    current_date = str(datetime.now().date())

    email_context = {
        "CLIENT_NAME": user.full_name,
        "CLIENT_ADDRESS": user.address,
        "CLIENT_PHONE_NUMBER": user.phone_number.international,
        "CLIENT_EMAIL": user.email,
        "CURRENT_DATE": current_date,
        "INFRINGING_NAME": "Photograph",
        "ORIGINAL_IMAGE_URL": match.original_image.url,
        "COPIED_IMAGE_URL": match.copied_image_url,
        "PLAGIAT_PAGE_URL": match.plagiat_page_url,

    }

    with open(config.UNIVERSAL_DMCA_EMAIL_TEMPLATE_PATH) as email_template_file:
        email_template = Template(email_template_file.read())

    email_html_body = email_template.render(email_context)
    email_plaintext_body = strip_tags(email_html_body)

    success = False
    try:
        with smtplib.SMTP(config.EMAIL_HOST, config.EMAIL_PORT) as email_server:
            if config.EMAIL_USE_TLS:
                email_server.starttls(context=ssl.create_default_context())

            email_server.login(config.EMAIL_HOST_USER, config.EMAIL_HOST_PASSWORD)

            message = MIMEMultipart("alternative")
            message["Subject"] = config.DMCA_REPORT_EMAIL_SUBJECT
            message["From"] = config.EMAIL_HOST_USER
            message["To"] = volusion_dmca_email
            message["Cc"] = user.email

            message.attach(
                MIMEText(email_plaintext_body, "plain"),
            )
            message.attach(
                MIMEText(email_html_body, "html"),
            )

            email_server.sendmail(
                config.EMAIL_HOST_USER,
                volusion_dmca_email,
                message.as_string(),
            )

        logging.info(
            f"Volusion DMCA report successfully sent. Match ID: {match.id}")

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            type=TakedownNoticeTypes.PLATFORM,
            platform=Platforms.VOLUSION,
        )
        db.add(takedown_notice)

        # Mark Match object as reported
        match.reported = True

        # Create an Event
        event = Event(type=EventTypes.REPORTED, match=match)
        db.add(event)

        success = True
    except Exception as e:
        logging.error(
            f"Could not sent Volusion DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        db.commit()
        db.close()
        return success
