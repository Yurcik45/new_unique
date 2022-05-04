"""The module contains functions for scrapping Google Images Search"""
import re
import logging
from typing import List

from dramatiq import actor, group
import requests
from bs4 import BeautifulSoup
from furl import furl

from app.models import Image
from app.core import config
from app.core.dramatiq import redis_broker, setup_broker
from app.db.session import db_session, SessionLocal
from .proxy import get_proxies
from .image import check_for_plagiat


google_host = 'https://www.google.com'
google_images_url_template = 'https://www.google.com/searchbyimage?hl=en-US&image_url={image_url}'


def check_if_link_is_whitelisted(page_url: str, image_url: str, whitelist: List[str]) -> bool:
    """
    Just a help tool.
    :param page_url:
    :param image_url:
    :param whitelist:
    :return is_whitelisted:
    """
    link_domain = furl(page_url).netloc

    if link_domain in config.APP_WHITELIST:
        return True

    if image_url in whitelist:
        return True

    # contain word on page url
    for whitelisted in whitelist:
        if whitelisted in page_url:
            return True

    return False


def extract_pages_urls(soup: BeautifulSoup) -> list:
    """Extract pages urls for pages 2-10 from the first page
    :param soup:
    :return pages_urls:"""
    try:
        pages_urls = list()
        for page in soup.find_all('a', attrs={'aria-label': re.compile(r'Page \d')}):
            page_url = google_host + page.get("href")
            pages_urls.append(page_url)
        return pages_urls
    except Exception as e:
        logging.error(
            f"There was an error extracting pages urls. Error message: {e}")
        return list()  # en empty list if something went wrong


def extract_links(soup: BeautifulSoup, is_first_page=False) -> list:
    """Extract search results links
    :param soup:
    :param is_first_page: skip first two search results if True
    :return links:"""
    links = list()
    search_results = soup.find_all('div', class_='g')
    if not search_results:
        logging.error(
            'No search results found.',
        )
        return list()  # en empty list if something went wrong

    try:
        # Skip first two search results if it's the first page (they are not relevant)
        search_results = search_results[2:] if is_first_page else search_results

        for rc in search_results:
            page_url = rc.find('a').get('href')

            for a in rc.select("a"):
                href = a.get("href")

                if "imgurl" in href:
                    image_url = furl(href).args.get("imgurl")
                    links.append(
                        {
                            "page_url": page_url,
                            "image_url": image_url,
                        }
                    )
                    # stop the loop after we've found right urls
                    break

        return links
    except Exception as e:
        logging.error(f"There was an error extracting links: {e}")
        return list()  # en empty list if something went wrong


def extract_titles(soup: BeautifulSoup, is_first_page=False) -> list:
    """Extract search results titles
    :param soup:
    :param is_first_page: skip first two search results if True
    :return titles:"""
    try:
        titles = list()
        for h3 in soup.find_all('h3'):  # all h3 are titles
            title = h3.get_text(strip=True)
            titles.append(title)
        return titles if not is_first_page else titles[2:]
    except Exception as e:
        logging.error(
            f"There was an error extracting titles. Error message: {e}")
        return list()  # en empty list if something went wrong


def extract_descriptions(soup: BeautifulSoup) -> list:
    """Extract search results descriptions (below titles)
    :param soup:
    :return descriptions:"""
    try:
        descriptions = list()

        for desc_span in soup.find_all('span', class_='aCOpRe'):
            meta_info_span = desc_span.find('span', class_='f')
            meta_info = meta_info_span.get_text() if meta_info_span else ''
            desc = desc_span.get_text().strip(meta_info)
            descriptions.append(desc)

        return descriptions
    except Exception as e:
        logging.error(
            f"There was an error extracting descriptions. Error message: {e}")
        return list()  # en empty list if something went wrong


def scrap_pages_urls(image_url: str) -> list:
    """
    Scrap pages urls. It's a trade-off for good system structure.
    :param image_url:
    :return pages_urls:
    """
    request_url = google_images_url_template.format(
        image_url=image_url,
    )

    proxy = get_proxies()
    resp = requests.get(
        request_url,
        headers=config.SCRAPPING_HEADERS,
        proxies=proxy,
        timeout=config.SCRAPPING_TIMEOUT,
    )
    resp.raise_for_status()  # e.g. we've hit TooManyRequests[429]

    # First page
    pages_urls = [request_url]
    # Another pages
    pages_urls.extend(
        extract_pages_urls(
            BeautifulSoup(resp.content, 'html.parser')
        )
    )
    return pages_urls


def scrap_search_page(page_url, proxy=None, is_first_page=False) -> dict:
    """Extract data from the search page
    :param page_url:
    :param proxy:
    :param is_first_page: best_guess is present only on the first page
    :return results:"""
    resp = requests.get(
        page_url,
        headers=config.SCRAPPING_HEADERS,
        proxies=proxy,
        timeout=config.SCRAPPING_TIMEOUT,
    )
    resp.raise_for_status()  # e.g. we've hit TooManyRequests[429]

    soup = BeautifulSoup(resp.text, 'html.parser')

    links = extract_links(soup, is_first_page=is_first_page)
    descriptions = extract_descriptions(soup)
    titles = extract_titles(soup, is_first_page=is_first_page)

    results = {
        'links': links,
        'descriptions': descriptions,
        'titles': titles,
    }

    return results


@actor(broker=redis_broker, max_retries=5)
def check_search_page_for_plagiats(page_url: str, image_id: int, is_first_page: bool = False):
    """
    Scraps data on search page and creates tasks to check on copyright.
    :param page_url:
    :param image_id:
    :param is_first_page:
    """
    scrapped_data = scrap_search_page(
        page_url,
        proxy=get_proxies(),
        is_first_page=is_first_page,
    )

    db = SessionLocal()

    image = db.query(Image).get(image_id)

    links = scrapped_data.get("links")
    messages = list()

    for link in links:
        page_url = link.get("page_url")
        image_url = link.get("image_url")

        if not check_if_link_is_whitelisted(page_url, image_url, image.user.whitelist):
            messages.append(
                check_for_plagiat.message(
                    image_id,
                    link.get("image_url"),
                    link.get("page_url"),
                )
            )

    db.close()

    # TODO: that's a temporary work-around
    setup_broker()
    group(messages).run()


@actor(broker=redis_broker, max_retries=5)
def find_copyright_violations_on_image(image_id: int):
    with db_session() as db:
        image = db.query(Image).get(image_id)
        image.scans_completed += 1

    pages_urls = scrap_pages_urls(image.url)

    messages = [
        check_search_page_for_plagiats.message(
            page_url,
            image_id,
        )
        for page_url in pages_urls
    ]
    messages[0].kwargs.update({
        "is_first_page": True,
    })  # first page

    # TODO: that's a temporary work-around
    setup_broker()
    group(messages).run()
