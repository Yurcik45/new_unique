from dramatiq import actor

from .shopify import (
    is_shopify,
    send_shopify_dmca_report,
)
from .wix import (
    is_wix,
    send_wix_dmca_report,
)
from .bigcommerce import (
    is_bigcommerce,
    send_bigcommerce_dmca_report,
)
from .volusion import (
    is_volusion,
    send_volusion_dmca_report,
)
from .weebly import (
    is_weebly,
    send_weebly_dmca_report,
)
from .amazon import (
    is_amazon,
    # send_amazon_dmca_report,
)
from .wordpress import (
    is_wordpress,
    # send_wordpress_dmca_report,
)
from .wish import (
    is_wish,
    send_wish_dmca_report,
)
from app.models.enums import Platforms
from app.models.violator import Violator, ViolatorNotAccessible
from app.core.dramatiq import redis_broker
from app.db.session import SessionLocal


@actor(broker=redis_broker)
def find_violator_platform(violator_id: int) -> bool:
    """
    :param violator_id:
    :return platform_found:
    """

    db = SessionLocal()
    violator = db.query(Violator).get(violator_id)

    platform_found = True
    try:
        if is_shopify(violator.domain):
            violator.platform = Platforms.SHOPIFY
        elif is_wix(violator.domain):
            violator.platform = Platforms.WIX
        elif is_bigcommerce(violator.domain):
            violator.platform = Platforms.BIGCOMMERCE
        elif is_volusion(violator.domain):
            violator.platform = Platforms.VOLUSION
        elif is_weebly(violator.domain):
            violator.platform = Platforms.WEEBLY
        elif is_amazon(violator.domain):
            violator.platform = Platforms.AMAZON
        elif is_wordpress(violator.domain):
            violator.platform = Platforms.WORDPRESS
        elif is_wish(violator.domain):
            violator.platform = Platforms.WISH
        else:
            platform_found = False
    except ViolatorNotAccessible:
        platform_found = False
        violator.delete()

    db.commit()
    db.close()
    return platform_found


platform_func_mapping = {
    Platforms.SHOPIFY: send_shopify_dmca_report,
    Platforms.BIGCOMMERCE: send_bigcommerce_dmca_report,
    Platforms.VOLUSION: send_volusion_dmca_report,
    Platforms.WEEBLY: send_weebly_dmca_report,
    Platforms.WIX: send_wix_dmca_report,
    Platforms.WISH: send_wish_dmca_report,
    # Platforms.WORDPRESS: send_wordpress_dmca_report,
    # Platforms.AMAZON: send_amazon_dmca_report,
}
