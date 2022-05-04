"""Contains some utils to work with time"""
from random import randint
from datetime import datetime


def random_delay_in_range(timestamp1: datetime, timestamp2: datetime) -> int:
    """
    Random delay (seconds) in range.
    :param timestamp1:
    :param timestamp2:
    """
    seconds_max = (timestamp2 - timestamp1).total_seconds()
    seconds_shift = randint(0, int(seconds_max))
    return seconds_shift
