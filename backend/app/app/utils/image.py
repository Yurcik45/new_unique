import os
import logging

from dramatiq import actor
import cv2
import PIL
import imagehash
from uuid import uuid4
import requests
from furl import furl

from app.models import Match, Image, Violator, Event
from app.models.enums import EventTypes
from app.db.session import db_session
from app.core import config
from app.core.dramatiq import redis_broker
from .db import get_or_create


def _images_equal(image1_path: str, image2_path: str) -> bool:
    """Check if two images are equal
    :param image1_path:
    :param image2_path:
    :return images_are_equal:
    """
    image1 = cv2.imread(image1_path)
    image2 = cv2.imread(image2_path)
    if image1.shape == image2.shape:
        difference = cv2.subtract(image1, image2)
        b, g, r = cv2.split(difference)

        if cv2.countNonZero(b) == 0 and cv2.countNonZero(g) == 0 and cv2.countNonZero(r) == 0:
            return True

    return False


def _images_similar_avg_hash(image1_path: str, image2_path: str, cutoff: int = 3) -> bool:
    """Compare two images (imagehash)
    :param image1_path:
    :param image2_path:
    :param cutoff: int, max differences between hashes
    :return images_are_similar:"""
    hash1 = imagehash.average_hash(PIL.Image.open(image1_path))
    hash2 = imagehash.average_hash(PIL.Image.open(image2_path))
    return (hash1-hash2) < cutoff


def _images_similarity_sift(image1_path: str, image2_path: str) -> float:
    """
    Compare two images (SIFT)
    :param image1_path:
    :param image2_path:
    :return similarity_pct:
    """
    image1 = cv2.imread(image1_path)
    image2 = cv2.imread(image2_path)

    sift = cv2.SIFT.create()
    kp_1, desc_1 = sift.detectAndCompute(image1, None)
    kp_2, desc_2 = sift.detectAndCompute(image2, None)

    # maximum number of good points
    good_points_max = min(len(kp_1), len(kp_2))

    # FLANN params
    FLANN_INDEX_KDTREE = 0
    index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
    search_params = dict()
    flann = cv2.FlannBasedMatcher(index_params, search_params)

    matches = flann.knnMatch(desc_1, desc_2, k=2)

    good_points = []
    ratio = 0.5
    for m, n in matches:
        if m.distance < ratio*n.distance:
            good_points.append(m)

    similarity_pct = len(good_points) / good_points_max
    return similarity_pct


def _write_image(image_content) -> str:
    """Write image to the temporary folder. Return the image path.
    :param image_content: from response
    :return path: str"""
    image_path = os.path.join(config.IMAGES_TMP_FOLDER, uuid4().hex)
    with open(image_path, 'wb') as f:
        f.write(image_content)
    return image_path


def _download_image(image_url: str) -> str:
    """Save image to the IMAGES_TMP_FOLDER and return its path.
    :param image_url:
    :return image_path:
    """
    try:
        response = requests.get(image_url,
                                headers=config.SCRAPPING_HEADERS,
                                timeout=config.IMAGES_DOWNLOAD_TIMEOUT)
        response.raise_for_status()
        path = _write_image(response.content)
        return path
    except requests.RequestException as e:
        logging.error(e)
        return ""


def check_if_image_is_removed(image_url: str) -> bool:
    """
    Return if image was removed.
    :param image_url:
    :return is_removed:
    """
    try:
        resp = requests.get(
            image_url,
            headers=config.SCRAPPING_HEADERS,
            timeout=5,
        )
    except requests.RequestException:
        return True

    return resp.status_code == 404


@actor(broker=redis_broker)
def check_for_plagiat(image_id: int, plagiat_image_url: str, plagiat_page_url: str) -> bool:
    """
    Check if given image is plagiat. If so, create Match record.
    :param image_id:
    :param plagiat_image_url:
    :param plagiat_page_url:
    :return is_plagiat:
    """
    with db_session() as db:
        image = db.query(Image).get(image_id)

    sensitivity = image.sensitivity / 100

    image1_path = _download_image(image.url)
    image2_path = _download_image(plagiat_image_url)

    if not image1_path or not image2_path:
        logging.error(
            "There was an error downloading images. Original image url: {original_image_url}. Copied image url: {plagiat_image_url}")
        return False

    is_plagiat = False
    try:
        images_equal = _images_equal(image1_path, image2_path)
        if images_equal:
            is_plagiat = True
            similarity_pct = 1.0
        else:
            similarity_pct = _images_similarity_sift(image1_path, image2_path)
            is_plagiat = (
                similarity_pct > sensitivity or
                (similarity_pct > 0.15 and _images_similar_avg_hash(image1_path, image2_path)) # noqa
            )
    except Exception as e:
        logging.error(e)
    finally:
        # Removing unnecessary files
        os.remove(image1_path)
        os.remove(image2_path)

    if is_plagiat:
        plagiator_domain = furl(plagiat_page_url).netloc

        # Check if it's in the list of violators, if not, add to.
        with db_session() as db:
            violator, _ = get_or_create(db, Violator, domain=plagiator_domain)
            match, is_new_match = get_or_create(
                db,
                Match,
                violator=violator,
                original_image=image,
                image_url=plagiat_image_url,
                page_url=plagiat_page_url,
                similarity_pct=similarity_pct,
            )
            # If a match is created for the first time, create an event
            if is_new_match:
                db.add(Event(match_id=match.id, type=EventTypes.DETECTED))


        logging.info(
            f"Found copyright violation. Original image url: {image.url}. Copied image url: {plagiat_image_url}")
        return True
    else:
        logging.info(
            f"Not a copyright violation. Original image url: {image.url}. Copied image url: {plagiat_image_url}")
        return False
