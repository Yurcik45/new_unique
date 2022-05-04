from dramatiq import actor
import requests
from requests.exceptions import RequestException
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import logging
import time

from app.models import Match, TakedownNotice, Event
from app.models.violator import ViolatorNotAccessible
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.core import config
from app.core.dramatiq import redis_broker
from app.db.session import SessionLocal


def strip_phone_number(old_phone_number: str) -> str:
    """
    +38 (097) 10-298-74 -> +380971029874
    :param old_phone_number:
    :return new_phone_number:
    """
    return "+" + "".join(c for c in old_phone_number if c.isdigit())


def is_wix(domain: str) -> bool:
    """
    :param domain:
    :return _is_wix:
    """
    request_url = "https://" + domain

    try:
        resp = requests.get(
            request_url,
            headers=config.SCRAPPING_HEADERS,
        )
    except RequestException:
        raise ViolatorNotAccessible

    return "X-Wix-Meta-Site-Id" in resp.text


@actor(broker=redis_broker, max_retries=5)
def send_wix_dmca_report(match_id: int) -> bool:
    """
    Send DMCA report to Wix via their form.

    :param match_id:
    :return success:
    """
    db = SessionLocal()

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    original_image_url = match.original_image.url
    copied_image_url = match.image_url
    plagiat_page_url = match.page_url

    request_url = "https://www.wix.com/about/copyrightform"

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(executable_path=config.CHROMEDRIVER_PATH, options=chrome_options)

    success = False
    try:
        webdriver_wait = WebDriverWait(driver, 10)
        action_chains = ActionChains(driver)

        driver.get(request_url)

        i_am_copyright_owner_checkbox_xpath = '//div[text()="Yes, I am the copyright owner / I am authorized to act on the copyright owner’s behalf."]'
        i_am_copyright_owner_checkbox = webdriver_wait.until(
            EC.presence_of_element_located(
                (By.XPATH, i_am_copyright_owner_checkbox_xpath)),
        )

        # Wait until form loads
        # Also grab buttons with text "Next"
        # Two birds with one stone
        next_buttons = webdriver_wait.until(
            EC.presence_of_all_elements_located((
                By.XPATH,
                '//button[contains(.//span, "Next")]',
            )),
        )

        # Delay for the form to load
        time.sleep(2)

        i_am_copyright_owner_checkbox.click()

        name_of_the_copyright_owner_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Name of the copyright owner (client or organization)")]//following-sibling::div//input',
            )),
        )
        name_of_the_copyright_owner_input.send_keys(user.full_name)

        first_name_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "First name")]//following-sibling::div//input',
            )),
        )
        first_name_input.send_keys(user.first_name)

        last_name_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Last name")]//following-sibling::div//input',
            )),
        )
        last_name_input.send_keys(user.last_name)

        email_address_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Email address")]//following-sibling::div//input',
            )),
        )
        email_address_input.send_keys(user.email)

        confirm_email_address_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Confirm email address")]//following-sibling::div//input',
            )),
        )
        confirm_email_address_input.send_keys(user.email)

        address_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Home/Business Address (street, city, country...)")]//following-sibling::div//input',
            )),
        )
        address_input.send_keys(user.address)

        phone_number_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Phone number")]//following-sibling::div//input',
            )),
        )
        phone_number_input.send_keys(
            strip_phone_number(user.phone_number.international),
        )

        next_buttons[0].click()

        identify_copyrighted_content_textarea = webdriver_wait.until(
            EC.visibility_of_element_located((By.TAG_NAME, "textarea")),
        )
        identify_copyrighted_content_textarea.send_keys("A photograph of a product")
        identify_copyrighted_content_textarea.send_keys(f"\nOriginal: {original_image_url}")
        identify_copyrighted_content_textarea.send_keys(f"\nPlagiat: {copied_image_url}")

        plagiat_page_url_input = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Provide a link (URL) to the specific page of the allegedly infringing content: ")]//following-sibling::div//input',
            )),
        )
        plagiat_page_url_input.send_keys(plagiat_page_url)

        next_buttons[1].click()

        checkboxes = webdriver_wait.until(
            EC.presence_of_all_elements_located((By.XPATH, '//input[@type="checkbox"]')),
        )
        for checkbox in checkboxes:
            driver.execute_script("arguments[0].click();", checkbox)

        signature = webdriver_wait.until(
            EC.visibility_of_element_located((
                By.XPATH,
                '//div[contains(.//span, "Signature:")]//following-sibling::div//input',
            )),
        )
        action_chains.move_to_element(signature)
        action_chains.click(signature)
        action_chains.perform()
        signature.send_keys(user.full_name)

        submit_button = webdriver_wait.until(
            EC.element_to_be_clickable((
                By.XPATH,
                '//button[contains(.//span, "Submit")]',
            )),
        )
        submit_button.click()

        success_message = "We received your report and will respond within three (3) business days. "
        webdriver_wait.until(
            EC.visibility_of_element_located((By.XPATH, f'//span[text()="{success_message}"]')),
        )

        logging.info(
            f"Wix DMCA report successfully sent. Match ID: {match.id}",
        )

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            type=TakedownNoticeTypes.PLATFORM,
            platform=Platforms.WIX,
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
            f"Could not sent Wix DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        driver.quit()
        db.commit()
        db.close()
        return success
