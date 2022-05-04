import csv
import io
from datetime import datetime
from typing import Optional, List
import logging

import smtplib
import ssl
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email import encoders
from jinja2 import Template

from dramatiq import actor
from app.core.dramatiq import redis_broker

import requests
from requests.exceptions import HTTPError
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin

from app.models import (
    UserTable,
    Image,
    Match,
    Event,
    Violator,
    EmailWarning,
)
from app.db.session import db_session
from app.models.enums import EventTypes
from app.core import config


def strip_tags(html):
    # create a new bs4 object from the html data loaded
    soup = BeautifulSoup(html, "html.parser")
    # remove all javascript and stylesheet code
    for script in soup(["script", "style"]):
        script.extract()
    # get text
    text = soup.get_text()
    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text = '\n'.join(chunk for chunk in chunks if chunk)
    return text


def create_csv_report(matches: List[Match]) -> io.StringIO:
    """
    Create .csv file for reporting.
    :param matches:
    :return attachment_csv_file:
    """
    attachment_csv_file = io.StringIO()
    fieldnames = (
        "Image Title",
        "Image Tags",
        "Detection Time",
        "Plagiator Domain",
        "Plagiator Email",
        "Plagiat Image URL",
        "Plagiat Page URL",
        "Sent Warning Email",
        "Reported",
    )

    writer = csv.DictWriter(attachment_csv_file, fieldnames=fieldnames)
    writer.writeheader()

    for match in matches:
        with db_session() as db:
            # attach the Match object to the current session
            db.add(match)

            image_title = match.original_image.title
            image_tags = ",".join(match.original_image.tags)
            detection_time = list(filter(
                lambda e: e.type == EventTypes.DETECTED,
                match.events,
            ))[0].created_at
            plagiator_domain = match.violator.domain
            plagiator_email = match.violator.email
            plagiat_image_url = match.copied_image_url
            plagiat_page_url = match.plagiat_page_url

            sent_warning_email_events = list(filter(
                lambda e: e.type == EventTypes.SENT_WARNING_EMAIL,
                match.events,
            ))
            if sent_warning_email_events:
                sent_warning_email = sent_warning_email_events[0].created_at
            else:
                sent_warning_email = ""

            reported_events = list(filter(
                lambda e: e.type == EventTypes.REPORTED,
                match.events,
            ))
            if reported_events:
                reported = reported_events[0].created_at
            else:
                reported = ""

        writer.writerow({
            "Image Title": image_title,
            "Image Tags": image_tags,
            "Detection Time": detection_time,
            "Plagiator Domain": plagiator_domain,
            "Plagiator Email": plagiator_email,
            "Plagiat Image URL": plagiat_image_url,
            "Plagiat Page URL": plagiat_page_url,
            "Sent Warning Email": sent_warning_email,
            "Reported": reported,
        })

    return attachment_csv_file


def _fetch_warning_email_data(match_id: int) -> tuple:
    """
    Fetch warning email client_email, plagiator_email, email_context
    :param match_id:
    """
    with db_session() as db:
        match = db.query(Match).get(match_id)
        user = match.original_image.user

        email_template = Template(user.warning_email_body)

        email_context = {
            "PLAGIATOR_DOMAIN": match.violator.domain,
            "CLIENT_NAME": " ".join(
                [
                    user.first_name,
                    user.last_name
                ]
            ),
            "CLIENT_EMAIL": user.email,
            "ORIGINAL_IMAGE_URL": match.original_image.url,
            "COPIED_IMAGE_URL": match.image_url,
        }

        to = ','.join([match.violator.email] + user.additional_to)
        cc = ','.join(user.additional_cc)
        bcc = ','.join([user.email] + user.additional_bcc)

        subject = user.warning_email_subject

    return to, cc, bcc, subject, email_template, email_context


def scrap_email_from_website(url: str) -> Optional[str]:
    """
    Scrap email from given url using regex.
    :param url:
    :return email or None:
    """
    email_pattern = re.compile(
        r"([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)")

    resp = requests.get(url, headers=config.SCRAPPING_HEADERS)
    resp.raise_for_status()

    def filter_match(match: str) -> bool:
        """
        Filter match
        :param match:
        :return bool:
        """
        exclude_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.gif',)
        for ext in exclude_extensions:
            if match.endswith(ext):
                return False
        return True

    matches = list(
        filter(
            filter_match,
            re.findall(email_pattern, resp.text)
        )
    )

    if matches:
        # strip of whitespaces and dots
        found_email = matches[0].strip(" ").strip(".")
        return found_email


@actor(broker=redis_broker)
def find_violator_email(violator_id: int):
    """
    Try to find violator email
    :param violator_id:
    """
    with db_session() as db:
        violator = db.query(Violator).get(violator_id)

        request_url = "http://" + violator.domain  # add url schema

        try:
            email = scrap_email_from_website(
                urljoin(request_url, "/pages/contact-us/")
            )
        except HTTPError:
            pass
        else:
            if email:
                violator.email = email
                return

        try:
            email = scrap_email_from_website(request_url)
        except HTTPError:
            logging.info(
                f"Finding email failed. Deleting violator instance... URL: {request_url}")
            violator.delete()
        else:
            if email:
                violator.email = email


@actor(broker=redis_broker)
def send_warning_email(match_id: int):
    """
    :param match_id:
    """
    to, cc, bcc, subject, email_template, email_context = _fetch_warning_email_data(match_id)

    # preparing data for E

    email_html_body = email_template.render(email_context)
    email_plaintext_body = strip_tags(email_html_body)

    with smtplib.SMTP(config.EMAIL_HOST, config.EMAIL_PORT) as email_server:
        if config.EMAIL_USE_TLS:
            email_server.starttls(context=ssl.create_default_context())

        email_server.login(config.EMAIL_HOST_USER, config.EMAIL_HOST_PASSWORD)

        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = config.EMAIL_HOST_USER
        message["To"] = to
        message["Cc"] = cc
        message["Bcc"] = bcc

        message.attach(
            MIMEText(email_plaintext_body, "plain"),
        )
        message.attach(
            MIMEText(email_html_body, "html"),
        )

        email_server.sendmail(config.EMAIL_HOST_USER, to, message.as_string())

    with db_session() as db:
        # Update Match info
        match = db.query(Match).get(match_id)
        match.sent_warning_email = True

        # Create an Event
        event = Event(match=match, type=EventTypes.SENT_WARNING_EMAIL)
        db.add(event)

        # Create an EmailWarning
        email_warning = EmailWarning(
            match=match, text=email_plaintext_body, receiver=to,
        )
        db.add(email_warning)


@actor(broker=redis_broker)
def report_activity_to_user_email(user_id: int):
    """
    Report activity to user email.
    :param user_id:
    """
    end_date = datetime.now()
    start_date = end_date - config.REPORT_ACTIVITY_TIME_RANGE

    with db_session() as db:
        user = db.query(UserTable).get(user_id)
        events = (db.query(Event).
                  join(Match, Event.match).
                  join(Image, Match.original_image).
                  filter(Image.user == user).count())
        detected_events = list(filter(
            lambda e: e.type == EventTypes.DETECTED,
            events,
        ))
        sent_warning_email_events = list(filter(
            lambda e: e.type == EventTypes.SENT_WARNING_EMAIL,
            events,
        ))
        reported_events = list(filter(
            lambda e: e.type == EventTypes.REPORTED,
            events,
        ))
        detected_events_in_timerange = list(filter(
            lambda e: e.created_at >= start_date,
            detected_events,
        ))
        sent_warning_email_events_in_timerange = list(filter(
            lambda e: e.created_at >= start_date,
            sent_warning_email_events,
        ))
        reported_events_in_timerange = list(filter(
            lambda e: e.created_at >= start_date,
            reported_events,
        ))
        matches = (db.query(Match).
                   join(Image, Match.original_image).
                   filter(Image.user, user).all())

        to = user.email
        subject = config.REPORT_ACTIVITY_EMAIL_SUBJECT.format(
            start_date=start_date.date(),
            end_date=end_date.date(),
        )

        email_context = {
            "CLIENT_NAME": user.full_name,
            "DOMAIN": user.domain,
            "START_DATE": str(start_date.date()),
            "END_DATE": str(end_date.date()),
            "DETECTED_COUNT": len(detected_events_in_timerange),
            "REPORTED_COUNT": len(reported_events_in_timerange),
            "EMAIL_WARNINGS_COUNT": len(sent_warning_email_events_in_timerange),
            "DETECTED_COUNT_TOTAL": len(detected_events),
            "REPORTED_COUNT_TOTAL": len(reported_events),
            "EMAIL_WARNINGS_COUNT_TOTAL": len(sent_warning_email_events),
        }

    with open(config.REPORT_ACTIVITY_EMAIL_TEMPLATE_PATH) as email_template_file:
        email_template = Template(email_template_file.read())

    email_html_body = email_template.render(email_context)
    email_plaintext_body = strip_tags(email_html_body)

    csv_report_file = create_csv_report(matches)

    with smtplib.SMTP(config.EMAIL_HOST, config.EMAIL_PORT) as email_server:
        if config.EMAIL_USE_TLS:
            email_server.starttls(context=ssl.create_default_context())

        email_server.login(config.EMAIL_HOST_USER, config.EMAIL_HOST_PASSWORD)

        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = config.EMAIL_HOST_USER
        message["To"] = to

        message.attach(
            MIMEText(email_plaintext_body, "plain"),
        )
        message.attach(
            MIMEText(email_html_body, "html"),
        )

        csv_report_attachment = MIMEBase("application", "octet-stream")
        csv_report_attachment.set_payload(csv_report_file.getvalue())
        encoders.encode_base64(csv_report_attachment)
        csv_report_attachment.add_header(
            "Content-Disposition",
            "attachment",
            filename=f"Report {start_date.date()} - {end_date.date()}.csv",
        )
        message.attach(csv_report_attachment)

        email_server.sendmail(config.EMAIL_HOST_USER, to, message.as_string())
