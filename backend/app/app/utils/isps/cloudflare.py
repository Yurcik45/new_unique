from dramatiq import actor
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import logging

from app.models import Match, TakedownNotice, Event
from app.models.enums import TakedownNoticeTypes, ISPs, EventTypes
from app.core.dramatiq import redis_broker
from app.core import config
from app.db.session import SessionLocal


@actor(broker=redis_broker)
def send_cloudflare_dmca_report(match_id: int) -> bool:
    """
    Send DMCA report to CloudFlare via their form.

    :param match_id:
    :return success:
    """
    db = SessionLocal()

    match = db.query(Match).get(match_id)
    user = match.original_image.user

    original_image_url = match.original_image.url
    plagiat_page_url = match.page_url

    request_url = "https://www.cloudflare.com/abuse/form"

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(
        executable_path=config.CHROMEDRIVER_PATH,
        options=chrome_options,
    )

    success = False
    try:
        webdriver_wait = WebDriverWait(driver, 10)
        driver.get(request_url)

        choose_an_abuse_type_combobox = webdriver_wait.until(
            EC.presence_of_element_located(
                (By.XPATH, "//div[text()='Choose an abuse type']"),
            ),
        )
        choose_an_abuse_type_combobox.click()

        correct_abuse_type_span = choose_an_abuse_type_combobox.find_element_by_xpath(
            "//span[text()='Copyright Infringement & DMCA Violations']",
        )
        correct_abuse_type_span.click()

        full_name_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='Name']")
            ),
        )
        full_name_input.click()
        full_name_input.send_keys(user.full_name)

        holder_name_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='HolderName']")
            ),
        )
        holder_name_input.click()
        holder_name_input.send_keys(user.full_name)

        email_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='Email']")
            ),
        )
        email_input.click()
        email_input.send_keys(user.email)

        confirm_email_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='EmailConfirm']")
            ),
        )
        confirm_email_input.click()
        confirm_email_input.send_keys(user.email)

        address_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='Address']")
            ),
        )
        address_input.click()
        address_input.send_keys(user.street_address)

        city_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='City']")
            ),
        )
        city_input.click()
        city_input.send_keys(user.city)

        state_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='State']")
            ),
        )
        state_input.click()
        state_input.send_keys(user.province)

        select_a_country_combobox = webdriver_wait.until(
            EC.presence_of_element_located(
                (By.XPATH, "//div[text()='Select a country']"),
            ),
        )
        select_a_country_combobox.click()

        correct_country_span = select_a_country_combobox.find_element_by_xpath(
            f"//span[text()='{user.country_name}']",
        )
        correct_country_span.click()

        infringing_urls_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//textarea[@id='URLs']")
            ),
        )
        infringing_urls_input.click()
        infringing_urls_input.send_keys(plagiat_page_url)

        original_work_description = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//textarea[@id='OriginalWork']")
            ),
        )
        original_work_description.click()
        original_work_description.send_keys(
            f"It's a photograph I took for my product.\nLink for the image itself: {original_image_url}")

        agree_checkbox = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//label[@for='Agree']")
            ),
        )
        agree_checkbox.click()

        signature_input = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='Signature']")
            ),
        )
        signature_input.click()
        signature_input.send_keys(user.full_name)

        host_wtn_checkbox = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//label[@for='host-wtn']")
            ),
        )
        host_wtn_checkbox.click()

        owner_wtn_checkbox = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//label[@for='owner-wtn']")
            ),
        )
        owner_wtn_checkbox.click()

        submit_btn = webdriver_wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//input[@id='abuse-submit']")
            ),
        )
        submit_btn.click()

        logging.info(
            f"CloudFlare DMCA report successfully sent. Match ID: {match.id}")

        # Create a TakedownNotice
        takedown_notice = TakedownNotice(
            match=match, type=TakedownNoticeTypes.ISP, isp=ISPs.CLOUDFLARE,
        )
        db.add(takedown_notice)

        # Mark Match object as reported
        match.reported = True

        # Create an Event
        event = Event(match=match, type=EventTypes.REPORTED)
        db.add(event)

        success = True
    except Exception as e:
        logging.error(
            f"Could not sent CloudFlare DMCA Report. Match ID: {match.id}. Error message: {e}.")
    finally:
        driver.quit()
        db.commit()
        db.close()
        return success
