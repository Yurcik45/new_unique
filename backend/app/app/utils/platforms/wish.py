from dramatiq import actor
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import logging

from app.models import Match, TakedownNotice, Event
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.core import config
from app.core.dramatiq import redis_broker
from app.db.session import SessionLocal


def is_wish(domain: str) -> bool:
    """
    :param domain:
    :return _is_wish:
    """
    return domain in ["www.wish.com", "wish.com"]


@actor(broker=redis_broker, max_retries=5)
def send_wish_dmca_report(match_id: int) -> bool:
    """
    Send DMCA report to Wish via their form.

    :param match_id:
    :return success:
    """
    db = SessionLocal()

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    original_image_url = match.original_image.url
    copied_image_url = match.copied_image_url
    plagiat_page_url = match.plagiat_page_url

    request_url = "https://merchant.wish.com/brand-protection/brand-violation-report"  # noqa

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(executable_path=config.CHROMEDRIVER_PATH, options=chrome_options)  # noqa

    success = False
    try:
        webdriver_wait = WebDriverWait(driver, 10)
        action_chains = ActionChains(driver)

        driver.get(request_url)

        first_name_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'first-name-input',
            )),
        )
        first_name_input.send_keys(user.first_name)

        last_name_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'last-name-input',
            )),
        )
        last_name_input.send_keys(user.last_name)

        name_of_copyright_owner_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'violation-type-owner-name-input',
            )),
        )
        name_of_copyright_owner_input.send_keys(user.shop_name)

        address_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'address-input',
            )),
        )
        address_input.send_keys(user.address)

        phone_number_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'phone-input',
            )),
        )
        phone_number_input.send_keys(user.phone_number.international)

        email_address_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'email-input',
            )),
        )
        email_address_input.send_keys(user.email)

        description_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'description-input',
            )),
        )
        description_input.send_keys("It's the photograph I took for my product")

        countries_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'countries-input',
            )),
        )
        countries_input.send_keys(user.country_name)

        original_works_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'original-works-input',
            )),
        )
        original_works_input.send_keys(f"{original_image_url}\n")

        products_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'products-input',
            )),
        )
        products_input.send_keys(f"{copied_image_url}\n{plagiat_page_url}")

        signature_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.ID, 'signature-input',
            )),
        )
        signature_input.send_keys(user.full_name)

        submit_button = webdriver_wait.until(
            EC.element_to_be_clickable((
                By.ID,
                'submit-form',
            )),
        )
        action_chains.move_to_element(submit_button)
        action_chains.perform()
        submit_button.click()

        confirm_button = webdriver_wait.until(
            EC.element_to_be_clickable((
                By.CLASS_NAME,
                'confirm-btn',
            )),
        )
        confirm_button.click()

        webdriver_wait.until(
            EC.visibility_of_element_located((
                By.CLASS_NAME,
                "alert-success",
            )),
        )

        logging.info(
            f"Wish DMCA report successfully sent. Match ID: {match.id}",
        )

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            type=TakedownNoticeTypes.PLATFORM,
            platform=Platforms.WISH,
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
            f"Could not sent Wish DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        driver.quit()
        db.commit()
        db.close()
        return success
