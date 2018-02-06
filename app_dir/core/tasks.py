import json
import time

import requests
from celery import task, shared_task
from celery.exceptions import MaxRetriesExceededError

from structlog import get_logger

logger = get_logger(__name__)


def retries_countdown(retries, constant_retries=5):
    """
    calculates the time for retries
    :param retries: number of times that a task has been retried
    :param constant_retries: any task that has reached this constant_retries should
                             have constant number of retries ( 96)
    :return: the countdown
    """

    if retries > constant_retries:
        return 96
    else:
        # multiply by 60 to convert into seconds
        return 60 * (3 * (2 ** retries))


@shared_task(bind=True, name='tasks.longtime_add')
def longtime_add(self, x, y):
    logger.info('long time task begins')
    # sleep 5 seconds
    time.sleep(5)
    logger.info('long time task finished')
    return x + y
