"""Helper functions when working with Klaviyo"""
import klaviyo
from dramatiq import actor

from app.models.user import UserTable
from app.models.image import Image
from app.models.match import Match
from app.db.session import db_session
from app.core import config
from app.core.dramatiq import redis_broker


def serialize_user_for_klaviyo(user: UserTable) -> dict:
    """
    Serializer
    :param user:
    :return user_data:
    """
    with db_session() as db:
        number_of_matches = (db.query(Match).
                             join(Image, Match.original_image).
                             filter(Image.user == user).
                             count())

    return {
        "First name": user.first_name,
        "Last name": user.last_name,
        "email": user.email,
        "Street Address": user.street_address,
        "City": user.city,
        "Province": user.province,
        "Country": user.country_name,
        "ZIP": user.zip_code,
        # by default
        "Installed": 1,
        "Phone number": user.phone_number,
        # "Plan": user.plan,
        "Number of matches": number_of_matches,
    }


@actor(broker=redis_broker)
def send_user_statistics_to_klaviyo(user_id: str):
    """
    :param user_id:
    """
    with db_session() as db:
        user = db.query(UserTable).get(user_id)

    klaviyo_client = klaviyo.Klaviyo(
        public_token=config.KLAVIYO_PUBLIC_TOKEN,
        private_token=config.KLAVIYO_PRIVATE_TOKEN,
    )

    klaviyo_client.Profiles.update_profile(
        user.klaviyo_profile_id,
        properties=serialize_user_for_klaviyo(user),
    )


@actor(broker=redis_broker)
def subscribe_user_to_klaviyo_list(user_id: str):
    """
    Subscribe to Klaviyo main list
    """
    with db_session() as db:
        user = db.query(UserTable).get(user_id)

    klaviyo_client = klaviyo.Klaviyo(
        public_token=config.KLAVIYO_PUBLIC_TOKEN,
        private_token=config.KLAVIYO_PRIVATE_TOKEN,
    )

    klaviyo_client.Lists.add_members_to_list(
        config.KLAVIYO_MAIN_LIST_ID,
        [serialize_user_for_klaviyo(user)],
    )
