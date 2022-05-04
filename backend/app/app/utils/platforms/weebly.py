from dramatiq import actor
import requests
from requests.exceptions import RequestException
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import logging

from app.models import Match, TakedownNotice, Event
from app.models.violator import ViolatorNotAccessible
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.core import config
from app.core.dramatiq import redis_broker
from app.db.session import SessionLocal


def is_weebly(domain: str) -> bool:
    """
    :param domain:
    :return _is_weebly:
    """
    request_url = "https://" + domain

    try:
        resp = requests.get(
            request_url,
            headers=config.SCRAPPING_HEADERS,
        )
    except RequestException:
        raise ViolatorNotAccessible

    return '_W.configDomain = "www.weebly.com"' in resp.text


@actor(broker=redis_broker, max_retries=5)
def send_weebly_dmca_report(match_id: int) -> bool:
    """
    Send DMCA report to Weebly via their form.

    :param match_id:
    :return success:
    """
    db = SessionLocal()

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    original_image_url = match.original_image.url
    copied_image_url = match.copied_image_url
    plagiat_page_url = match.plagiat_page_url

    request_url = "https://www.weebly.com/dmca"

    unauthorized_statement = """I have a good faith belief that the use of the
described material in the manner complained of is not authorized by the copyright
owner, its agent, or by operation of law."""

    good_faith_statement = """The information in this notice is accurate, and I am either
the copyright owner or I am authorized to act on behalf of the copyright owner.
I declare under the perjury laws of the United States of America that this
notification is true and correct."""

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(executable_path=config.CHROMEDRIVER_PATH, options=chrome_options)

    success = False
    try:
        webdriver_wait = WebDriverWait(driver, 10)
        driver.get(request_url)

        iframe_with_form_xpath_selector = '//iframe[@src="https://www.weebly.com/app/help/intg/contact-pages/dmca"]'
        iframe_with_form = webdriver_wait.until(
            EC.presence_of_element_located((By.XPATH, iframe_with_form_xpath_selector)),
        )
        driver.switch_to.frame(iframe_with_form)

        # First input
        electronic_signature_input = webdriver_wait.until(
            EC.presence_of_element_located((By.TAG_NAME, "input")),
        )

        # Textareas
        textareas = webdriver_wait.until(
            EC.presence_of_all_elements_located((By.TAG_NAME, "textarea")),
        )
        identification_of_original = textareas[0]
        identification_of_plagiat = textareas[1]
        contact_info = textareas[2]
        unauthorized_statement_input = textareas[3]
        good_faith_statement_input = textareas[4]

        # Submit button
        submit_button_xpath_selector = '//button[@type="submit"]'
        submit_button = webdriver_wait.until(
            EC.element_to_be_clickable((By.XPATH, submit_button_xpath_selector)),
        )

        electronic_signature_input.send_keys(user.full_name)
        identification_of_original.send_keys(f"Image: {original_image_url}")
        identification_of_plagiat.send_keys(
            f"Image: {copied_image_url}\nPage: {plagiat_page_url}",
        )
        contact_info.send_keys(
            f"Phone number: {user.phone_number.international}\nAddress: {user.address}\nEmail: {user.email}",
        )
        unauthorized_statement_input.send_keys(unauthorized_statement)
        good_faith_statement_input.send_keys(good_faith_statement)

        # JS click, because ordinary click does not work
        driver.execute_script("arguments[0].click();", submit_button)

        def check_if_request_sent(driver):
            # if, for example, electronic_signature_input became empty
            # that means the request was processed
            return electronic_signature_input.text == ""

        webdriver_wait.until(check_if_request_sent)

        logging.info(
            f"Weebly DMCA report successfully sent. Match ID: {match.id}",
        )

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            type=TakedownNoticeTypes.PLATFORM,
            platform=Platforms.WEEBLY,
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
            f"Could not sent Weebly DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        driver.quit()
        db.commit()
        db.close()
        return success
