import copy
from mock import Mock, patch
from django.test import TestCase, RequestFactory, override_settings
from django.db import DatabaseError, IntegrityError

from rest_framework.status import HTTP_200_OK, HTTP_503_SERVICE_UNAVAILABLE

from .plugins import plugin_dir
from .views import HealthView


class HealthCheckTest(TestCase):
    connection_error = Mock()
    connection_error.side_effect = DatabaseError
    integrity_error = Mock()
    integrity_error.side_effect = IntegrityError
    general_error = Mock()
    general_error.side_effect = Exception

    def setUp(self):
        self.request = RequestFactory().get('/health')

    def test_happy_case(self):
        """
        verifies the default case of getting a 200 when all services are OK
        """
        response = HealthView.as_view()(self.request)

        for plugin_class, options in plugin_dir._registry:
            plugin = plugin_class(**copy.deepcopy(options))
            self.assertEqual(plugin.run_check(), None)

        self.assertEqual(
            response.status_code, HTTP_200_OK
        )

    @patch("django.db.backends.utils.CursorWrapper", connection_error)
    def test_db_connection_issue(self):
        """
        verifies if a 503 response is received when the DB connection is unsuccessful
        """
        response = HealthView.as_view()(self.request)

        self.assertEqual(
            response.status_code, HTTP_503_SERVICE_UNAVAILABLE
        )

    @patch("django.db.backends.utils.CursorWrapper", integrity_error)
    def test_db_integrity_issue(self):
        """
        verifies if a 503 response is received when the DB schema is invalid
        """
        response = HealthView.as_view()(self.request)

        self.assertEqual(
            response.status_code, HTTP_503_SERVICE_UNAVAILABLE
        )

    @patch("django.db.backends.utils.CursorWrapper", general_error)
    def test_db_general_failure(self):
        """
        verifies if a 503 response is received when the DB has an unexpected exception
        """
        response = HealthView.as_view()(self.request)

        self.assertEqual(
            response.status_code, HTTP_503_SERVICE_UNAVAILABLE
        )

    @override_settings(
        CELERY_EAGER_PROPAGATES_EXCEPTIONS=True, CELERY_ALWAYS_EAGER=True, BROKER_BACKEND='memory')
    @patch("app_dir.health.queue.tasks.add.delay", side_effect=IOError())
    def test_celery_connection_issue(self, add_task):
        """
        verifies if a 503 response is received when the connection to rabbitmq is unsuccessful
        """
        response = HealthView.as_view()(self.request)

        self.assertEqual(
            response.status_code, HTTP_503_SERVICE_UNAVAILABLE
        )
