"""Utils for interacting with Shopify"""
import urllib
import hmac
import hashlib

from dramatiq import actor
import shopify

from app.models.user import UserTable
from app.core.config import SHOPIFY_CLIENT_SECRET
from app.core.dramatiq import redis_broker
from app.db.session import db_session


def validate_shopify_request(query_params: dict) -> bool:
    """Validate hmac param"""
    cleaned_params = []
    hmac_value = query_params['hmac']

    # Sort params
    for (k, v) in sorted(query_params.items()):
        if k in ['hmac', 'signature']:
            continue

        cleaned_params.append((k, v))

    new_qs = urllib.parse.urlencode(cleaned_params, safe=":/")
    secret = SHOPIFY_CLIENT_SECRET.encode("utf8")
    h = hmac.new(secret, msg=new_qs.encode("utf8"), digestmod=hashlib.sha256)

    # Compare digests
    return hmac.compare_digest(h.hexdigest(), hmac_value)


@actor(broker=redis_broker)
def load_essential_shopify_data(user_id: str):
    """
    Load user data from Shopify API
    :param user:
    """
    with db_session() as session:
        user = session.query(UserTable).get(user_id)

        with user.shopify_session:
            current_shop_data = shopify.Shop.current().attributes

            shop_name = current_shop_data.get("name")
            domain = current_shop_data.get("domain")

            owner_full_name = current_shop_data.get("shop_owner")
            owner_first_name = owner_full_name.split()[0]  # first word
            # everything except for the first word
            owner_last_name = " ".join(owner_full_name.split()[1:])

            address1 = current_shop_data.get("address1")
            address2 = current_shop_data.get("address2")
            # composing street address
            street_address = " ".join(
                [address1, address2]) if address2 else address1

            city = current_shop_data.get("city")
            province = current_shop_data.get("province")
            zip_code = current_shop_data.get("zip")
            country_name = current_shop_data.get("country_name")

            user.shopify_shop_name = shop_name
            user.shopify_domain = domain
            user.first_name = owner_first_name
            user.last_name = owner_last_name
            user.street_address = street_address
            user.city = city
            user.provice = province
            user.zip_code = zip_code
            user.country_name = country_name
