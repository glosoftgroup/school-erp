from __future__ import unicode_literals, absolute_import

from structlog import get_logger

from django.utils.six import text_type

from .exceptions import HealthCheckException


logger = get_logger(__name__)


class BaseHealthCheckBackend(object):
    """
    Base class for all checks that will be used to determine system health

    Child classes need to specify a "check" function that has the logic that will run
    to determine if that aspect of system health is OK

    All errors encountered will be returned as a list (self.error)

    name: if defined, this will be used in place of the class name when listing the health checks,
            and this logic of picking the version used is handled by identifier()
    """
    name = None

    def __init__(self):
        self.error = []

    def check(self):
        raise NotImplementedError

    def run_check(self):
        """
        goes through the check function of the health check plugin, which is the core of each
        plugin in terms of reporting back service state for the checks within the plugin
        """
        self.errors = []

        try:
            self.check()
        except HealthCheckException as error:
            self.add_error(error, error)
        except BaseException as e:
            # this is an unhandled exception, best raise it too to give the intended 503 response
            logger.info(
                "health_check_exception", error=str(e)
            )
            raise

    def add_error(self, error, cause=None):
        """
        for any encountered errors, populate the error list with an object representation of the
        specific health check failure
        """
        if isinstance(error, HealthCheckException):
            pass
        elif isinstance(error, text_type):
            error = HealthCheckException(error)
        else:
            error = HealthCheckException("unknown error")

        if isinstance(cause, BaseException):
            logger.exception(text_type(error))
        else:
            logger.error(text_type(error))

        self.errors.append(error)

    def prettify_status(self):
        """
        returns a browser/HTML friendly version of any errors for the plugin
        """
        if self.errors:
            return "\n".join(str(e) for e in self.errors)

        return "working"

    @property
    def status(self):
        return int(not self.errors)

    def identifier(self):
        """
        returns either the class name used to declare a health check
         or if `name` is provided, returns that
         will additionally be used to sort the health checks alphabetically (overkill maybe)?
        """
        return self.__class__.__name__ or self.name
