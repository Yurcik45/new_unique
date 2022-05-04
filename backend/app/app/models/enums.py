from enum import Enum


class TakedownNoticeTypes(str, Enum):
    ISP = "ISP"
    PLATFORM = "PLATFORM"


class Platforms(str, Enum):
    UNDEFINED = "UNDEFINED"
    SHOPIFY = "SHOPIFY"
    WIX = "WIX"
    AMAZON = "AMAZON"
    BIGCOMMERCE = "BIGCOMMERCE"
    VOLUSION = "VOLUSION"
    WEEBLY = "WEEBLY"
    WORDPRESS = "WORDPRESS"
    WISH = "WISH"


class ISPs(str, Enum):
    UNDEFINED = "UNDEFINED"
    CLOUDFLARE = "CLOUDFLARE"
    AWS = "AMAZON"
    GOOGLE_CLOUD = "GOOGLE"
    AKAMAI = "AKAMAI"


class EventTypes(str, Enum):
    DETECTED = "DETECTED"
    SENT_WARNING_EMAIL = "SENT_WARNING_EMAIL"
    REPORTED = "REPORTED"
    WHITELISTED = "WHITELISTED"
    REMOVED = "REMOVED"


class SubscriptionStatuses(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
