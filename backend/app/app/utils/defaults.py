import json

from app.core import config


def get_warning_email_default_template() -> str:
    """
    Get warning email default template.
    :return str:
    """
    with open(config.WARNING_EMAIL_TEMPLATE_PATH) as f:
        return f.read()


def get_warning_email_default_design() -> dict:
    """
    Get warning email default design (for email editor).
    :return dict:
    """
    with open(config.WARNING_EMAIL_DESIGN_PATH) as f:
        design = json.loads(f.read())

    return design


warning_email_default_template = get_warning_email_default_template()
warning_email_default_design = get_warning_email_default_design()
