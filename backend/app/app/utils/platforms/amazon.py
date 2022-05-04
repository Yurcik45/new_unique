from dramatiq import actor
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import logging

from app.models import Match, TakedownNotice, Event
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.core import config
from app.db.session import SessionLocal


def is_amazon(domain: str) -> bool:
    """
    :param domain:
    :return _is_amazon:
    """
    return domain.startswith("www.amazon.")


@actor(max_retries=5)
def send_amazon_dmca_report(match_id: int) -> bool:
    """
    Send DMCA report to Amazon via their form.

    :param match_id:
    :return success:
    """
    db = SessionLocal()

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    original_image_url = match.original_image.url
    copied_image_url = match.copied_image_url
    plagiat_page_url = match.plagiat_page_url

    request_url = "https://www.amazon.com/report/infringement"

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(executable_path=config.CHROMEDRIVER_PATH, options=chrome_options)

    success = False
    try:
        webdriver_wait = WebDriverWait(driver, 10)
        driver.get(request_url)

        logging.info(
            f"Amazon DMCA report successfully sent. Match ID: {match.id}")

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            type=TakedownNoticeTypes.PLATFORM,
            platform=Platforms.AMAZON,
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
        logging.error(
            f"Could not sent Amazon DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        driver.quit()
        db.commit()
        db.close()
        return success
