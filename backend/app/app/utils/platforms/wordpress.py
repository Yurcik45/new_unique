from dramatiq import actor
import requests
from requests.exceptions import RequestException
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import logging

from app.models import Match, TakedownNotice, Event
from app.models.violator import ViolatorNotAccessible
from app.models.enums import TakedownNoticeTypes, Platforms, EventTypes
from app.core import config
from app.db.session import SessionLocal


def is_wordpress(domain: str) -> bool:
    """
    :param domain:
    :return _is_wordpress:
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
    for meta in soup.select("meta"):
        content = meta.get("content")
        if not content:
            continue
        name = meta.get("name")

        if name == "generator" and "wordpress" in content.lower():
            return True

    return False


@actor(max_retries=5)
def send_wordpress_dmca_report(match_id: int) -> bool:
    """
    Send WordPress dmca report on https://automattic.com/dmca-notice/
    :param match_id:
    :return success:
    """
    pass
