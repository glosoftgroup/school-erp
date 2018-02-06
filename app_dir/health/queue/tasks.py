from __future__ import absolute_import

from celery import shared_task


@shared_task(ignore_result=True, rate_limit="10/s")
def add(x, y):
    return x + y
