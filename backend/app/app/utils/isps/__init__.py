from dramatiq import actor
import requests
from requests.exceptions import RequestException
from bs4 import BeautifulSoup

from app.models.enums import ISPs
from app.models.violator import Violator
from .cloudflare import send_cloudflare_dmca_report
from .aws import send_aws_dmca_report
from app.core.dramatiq import redis_broker
from app.db.session import db_session

import logging


@actor(broker=redis_broker)
def find_violator_isp(violator_id: int) -> bool:
    """
    :param violator_id:
    :return platform_found:
    """
    with db_session() as db:
        violator = db.query(Violator).get(violator_id)
        request_url = f"https://check-host.net/ip-info?host=https://{violator.domain}"

        try:
            resp = requests.get(request_url)
            resp.raise_for_status()
        except RequestException:
            logging.info(
                f"Finding violator's ISP failed. Domain: {violator.domain}")
            return False

        soup = BeautifulSoup(resp.text, "html.parser")

        ip_info_dbip = soup.select_one("#ip_info_inside-dbip")
        if not ip_info_dbip:
            logging.info(f"Finding violator's ISP failed. Domain: {violator.domain}")
            return False

        hostinfo = ip_info_dbip.select_one(".hostinfo")

        # --- SCRAPPING ISP [BEGINNING] ---
        isp = None
        for tr in hostinfo.select("tr"):
            tds = tr.select("td")

            # if for some reason, there are more than 2 columns
            if len(tds) != 2:
                continue

            label, value = tds[0].text, tds[1].text
            if label.strip().lower() == "isp":
                isp = value.strip()
                break
        # ------ SCRAPPING ISP [END] ------

        # if isp was not found
        if not isp:
            return False

        # iterate over isp_choices, choose the correct one
        for isp_choice in ISPs:
            # isp_choice.value is a must contain word
            if isp_choice.value in isp.lower():
                violator.isp = isp_choice
                logging.info(f"Found violator's ISP: {isp}. Violator: {violator.domain}")
                return True
        else:
            logging.info(f"Unknown ISP: {isp}. Violator: {violator.domain}")
            return False


isp_func_mapping = {
    ISPs.CLOUDFLARE: send_cloudflare_dmca_report,
    ISPs.AWS: send_aws_dmca_report,
}
