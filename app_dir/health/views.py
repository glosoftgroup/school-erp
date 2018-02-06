from __future__ import absolute_import
import copy

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView

from rest_framework.status import HTTP_200_OK, HTTP_503_SERVICE_UNAVAILABLE
from structlog import get_logger

from .plugins import plugin_dir

logger = get_logger(__name__).bind(action="basecode_health_check")


class HealthView(TemplateView):
    template_name = 'health/status.html'

    def render_to_json(self, plugins, status):
        return JsonResponse(
            {str(plugin.identifier()): str(plugin.prettify_status()) for plugin in plugins},
            status=status
        )

    @never_cache
    def get(self, request, *args, **kwargs):
        plugins = []
        errors = []

        for plugin_class, options in plugin_dir._registry:
            plugin = plugin_class(**copy.deepcopy(options))
            plugin.run_check()
            plugins.append(plugin)
            errors += plugin.errors

        plugins.sort(key=lambda plugin: plugin.identifier())
        status = HTTP_503_SERVICE_UNAVAILABLE if errors else HTTP_200_OK

        logger.info(
            "state", status=status
        )

        if request.META.get('CONTENT_TYPE', '') == 'application/json':
            return self.render_to_json(plugins, status)

        return self.render_to_response(
            {
                'plugins': plugins, 'service_name': settings.SERVICE_NAME.title()
            },
            status=status
        )
