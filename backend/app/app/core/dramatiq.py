import dramatiq
from dramatiq.brokers.redis import RedisBroker

from app.core.config import REDIS_HOST


redis_broker = RedisBroker(host=REDIS_HOST)

def setup_broker():
    if dramatiq.get_broker() is not redis_broker:
        dramatiq.set_broker(redis_broker)
