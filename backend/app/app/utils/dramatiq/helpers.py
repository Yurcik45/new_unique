from typing import Union, List, Tuple

import dramatiq


def apscheduler_actor_wrapper(
    actor_name: str,
    queue_name: str = "default",
    args: Union[List, Tuple] = [],
    kwargs: dict = {},
    options: dict = {},
):
    dramatiq.get_broker().enqueue(
        dramatiq.Message(
            queue_name=queue_name,
            actor_name=actor_name,
            args=args,
            kwargs=kwargs,
            options=options,
        ),
    )
