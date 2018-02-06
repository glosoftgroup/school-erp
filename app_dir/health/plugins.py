class AlreadyRegistered(Exception):
    pass


class NotRegistered(Exception):
    pass


class HealthCheckPluginDirectory(object):
    """
    tracks plugins that will be used to check various aspects of system health
    """
    def __init__(self):
        self._registry = []

    def register(self, plugin, **options):
        """
        makes the provided plugin part of the health check registry

        :param plugin:
        :param options:
        :return:
        """
        self._registry.append((plugin, options))


plugin_dir = HealthCheckPluginDirectory()
