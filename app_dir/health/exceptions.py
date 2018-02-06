from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class HealthCheckException(Exception):
    message_type = "unknown error"

    def __init__(self, message):
        self.message = message

    def __str__(self):
        return "{message_type}: {message}".format(
            message_type=self.message_type, message=self.message
        )


class ServiceUnavailable(HealthCheckException):
    message_type = "unavailable"


class UnexpectedResult(HealthCheckException):
    message_type = "unexpected result"
