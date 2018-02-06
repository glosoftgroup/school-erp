from plugins import plugin_dir

from app_dir.health.db.backends import DatabaseHealthCheck
from app_dir.health.queue.backends import QueueHealthCheck

plugin_dir.register(DatabaseHealthCheck)
plugin_dir.register(QueueHealthCheck)
