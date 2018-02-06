from __future__ import absolute_import

from ..backends import BaseHealthCheckBackend
from ..exceptions import ServiceUnavailable

from .tasks import add


class QueueHealthCheck(BaseHealthCheckBackend):
    """
    Tries to post a task to the queue and raises an error if unsuccessful
    """
    def check(self):

        try:
            # try to queue a task
            add.delay(4, 4)
        except IOError as error:
            # this usually happens when celery can't talk to rabbitmq
            self.add_error(ServiceUnavailable(str(error)))
        except BaseException as error:
            # any other error not caused by a broker connection issue
            self.add_error(ServiceUnavailable(str(error)))
