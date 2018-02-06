from .base import *

DEBUG = True
INSTALLED_APPS += ('django_extensions',)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'basecode',
        'USER': 'basecode',
        'ADMINUSER':'postgres',
        'PASSWORD': 'basecode',
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}

BROKER_USE_SSL = False
BROKER_URL = "amqp://guest:guest@rabbitmq:5672//"

# use console in dev
LOGGING['loggers']['django.request']['handlers'] = ['console']
LOGGING['loggers']['django.request']['level'] = 'DEBUG'
LOGGING['loggers']['celery']['level'] = 'DEBUG'
LOGGING['loggers']['celery']['handlers'] = ['console']
LOGGING['formatters']['verbose']['format'] += '\n'
