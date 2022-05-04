import os
from datetime import timedelta


# Database Configuration
POSTGRES_USER = os.environ["POSTGRES_USER"]
POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]
POSTGRES_HOST = os.environ["POSTGRES_HOST"]
POSTGRES_PORT = os.environ["POSTGRES_PORT"]
POSTGRES_DB = os.environ["POSTGRES_DB"]

SQLALCHEMY_DATABASE_URI = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

# App Configuration
PROJECT_NAME = "Unique - Anti Theft"
API_V1_STR = "/api/v1"
SECRET = os.environ["SECRET"]
DEFAULT_IMAGE_SENSITIVITY = 0.4
ROTATING_PROXIES = {
    "http": "http://eddapps:jqDB1HezivVjHN0u@proxy.packetstream.io:31112",
    "https": "http://eddapps:jqDB1HezivVjHN0u@proxy.packetstream.io:31112",
}
APP_WHITELIST = [
    "www.shapessy.com",
    "shapessy.com",
    "www.bodygy.com",
    "bodygy.com",
    "www.bodygy.fr",
    "bodygy.fr",
    "www.pinterest.ce",
    "www.pinterest.com",
    "www.aliexpress.com",
    "www.pinterest.co.uk",
    "www.pinterest.co.kr",
    "www.pinterest.cl",
    "www.pinterest.com.mx",
    "www.pinterest.es",
    "www.pinterest.it",
    "www.pinterest.com.au",
    "www.pinterest.de",
    "www.pinterest.ph",
    "www.pinterest.ch",
    "www.pinterest.jp",
    "www.pinterest.dk",
    "www.reddit.com",
    "pastebin.com",
    "www.pastebin.com",
]
SCRAPPING_HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                                   'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'}
SCRAPPING_TIMEOUT = 3
IMAGES_DOWNLOAD_TIMEOUT = 1
REPORT_ACTIVITY_TIME_RANGE = timedelta(days=7)
SCAN_USER_IMAGES_INTERVAL_DAYS = 7

# Email
EMAIL_HOST = os.environ["EMAIL_HOST"]
EMAIL_PORT = os.environ["EMAIL_PORT"]
EMAIL_HOST_USER = os.environ["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = os.environ["EMAIL_HOST_PASSWORD"]
EMAIL_USE_TLS = int(os.environ["EMAIL_USE_TLS"])

# Shopify
SHOPIFY_CLIENT_ID = os.environ["SHOPIFY_CLIENT_ID"]
SHOPIFY_CLIENT_SECRET = os.environ["SHOPIFY_CLIENT_SECRET"]
SHOPIFY_SCOPE = [
    "read_products, read_shopify_payments_payouts",
]

SHOPIFY_API_VERSION = "2020-10"
SHOPIFY_OAUTH_NAME = "shopify"
SHOPIFY_DMCA_ORIGINAL_DESCRIPTION = "ORIGINAL"
SHOPIFY_DMCA_INFRINGING_DESCRIPTION = "INFRINGING"
SHOPIFY_DMCA_VERIFY = "I acknowledge that a copy of this infringement notice, including any contact information provided above, may be provided to the person that posted the content being reported."
SHOPIFY_DMCA_AUTHORIZE = "I have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law."
SHOPIFY_DMCA_ACCURACY = "I swear, under penalty of perjury, that the information in the notification is accurate, and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed."

CORS_ALLOW_ORIGINS = os.environ["CORS_ALLOW_ORIGINS"].split()

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ["*"]
CORS_ALLOW_HEADERS = ["*"]

# JWT
JWT_LIFETIME_SECONDS = int(os.environ["JWT_LIFETIME_SECONDS"])
JWT_TOKEN_URL = "/auth/jwt/login"

# Google
GOOGLE_CLIENT_ID = os.environ["GOOGLE_CLIENT_ID"]
GOOGLE_CLIENT_SECRET = os.environ["GOOGLE_CLIENT_SECRET"]

# Defaults
WARNING_EMAIL_SUBJECT = "INFRINGEMENT OF COPYRIGHTED MATERIAL"
REPORT_ACTIVITY_EMAIL_SUBJECT = "Weekly status report for Unique Anti-Theft application {start_date} - {end_date}"
DMCA_REPORT_EMAIL_SUBJECT = "DMCA Compliant"

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
EMAIL_TEMPLATES_DIR = os.path.join(DATA_DIR, "email_templates")
WARNING_EMAIL_TEMPLATE_PATH = os.path.join(EMAIL_TEMPLATES_DIR, "warning_email.html")
WARNING_EMAIL_DESIGN_PATH = os.path.join(EMAIL_TEMPLATES_DIR, "warning_email.json")
REPORT_ACTIVITY_EMAIL_TEMPLATE_PATH = os.path.join(
    EMAIL_TEMPLATES_DIR, "report_activity_email.html")
UNIVERSAL_DMCA_EMAIL_TEMPLATE_PATH = os.path.join(EMAIL_TEMPLATES_DIR, "universal_dmca_email.html")
CHROMEDRIVER_PATH = "/usr/bin/chromedriver"

IMAGES_TMP_FOLDER = os.path.join(DATA_DIR, "tmp")
# Create temporary folder, if it doesn't exist
if not os.path.exists(IMAGES_TMP_FOLDER):
    os.mkdir(IMAGES_TMP_FOLDER)

# RabbitMQ
REDIS_HOST = os.environ["REDIS_HOST"]

# Klaviyo
KLAVIYO_PUBLIC_TOKEN = os.environ["KLAVIYO_PUBLIC_TOKEN"]
KLAVIYO_PRIVATE_TOKEN = os.environ["KLAVIYO_PRIVATE_TOKEN"]
KLAVIYO_MAIN_LIST_ID = os.environ["KLAVIYO_MAIN_LIST_ID"]


# TODO: uncomment
# Sentry
# SENTRY_DSN = os.environ["SENTRY_DSN"]

# AWS
# AWS_CREDS = {
#     "aws_access_key_id": os.environ["AWS_ACCESS_KEY"],
#     "aws_secret_access_key": os.environ["AWS_SECRET_KEY"],
# }
# AWS_BUCKET_NAME = os.environ["AWS_BUCKET_NAME"]
# AWS_CLOUDFRONT_URL = os.environ["AWS_CLOUDFRONT_URL"]
# Sentry
SENTRY_DSN = os.environ["SENTRY_DSN"]

# AWS
AWS_CREDS = {
    "aws_access_key_id": os.environ["AWS_ACCESS_KEY"],
    "aws_secret_access_key": os.environ["AWS_SECRET_KEY"],
}
AWS_BUCKET_NAME = os.environ["AWS_BUCKET_NAME"]
AWS_CLOUDFRONT_URL = os.environ["AWS_CLOUDFRONT_URL"]


# Billing
DEFAULT_PLANS = [
    {
        "name": "Free",
        "subscription_price": 0,
        "maximum_images_number": 10,
        "visible_detections_limit": 20,
        "free_takedown_actions_number": 0,
        "takedown_action_price": 0.95,
    },
    {
        "name": "Basic",
        "subscription_price": 9.99,
        "maximum_images_number": 100,
        "visible_detections_limit": 150,
        "free_takedown_actions_number": 20,
        "takedown_action_price": 0.95,
    },
    {
        "name": "Advanced",
        "subscription_price": 29.99,
        "maximum_images_number": 350,
        "visible_detections_limit": 0,
        "free_takedown_actions_number": 100,
        "takedown_action_price": 0.8,
    },
    {
        "name": "Professional",
        "subscription_price": 69.99,
        "maximum_images_number": 1000,
        "visible_detections_limit": 0,
        "free_takedown_actions_number": 250,
        "takedown_action_price": 0.8,
    },
    {
        "name": "Business",
        "subscription_price": 149.99,
        "maximum_images_number": 3500,
        "visible_detections_limit": 0,
        "free_takedown_actions_number": 600,
        "takedown_action_price": 0.6,
    },
]
# Default Free plan will have an id of 1
DEFAULT_PLAN_ID = 1


# Test config
