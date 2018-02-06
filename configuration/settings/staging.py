# flake8:noqa
from .base import *

DEBUG = False

STAGE = "staging"

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'basecode',
        'USER': 'basecode',
        'ADMINUSER':'postgres',
        'PASSWORD': 'Y904510P6cXM668mO96e',
        'HOST': 'basecode-staging.cjlbpfelubaj.eu-west-1.rds.amazonaws.com',
        'PORT': '5432',
    }
}

BROKER_USE_SSL = False
BROKER_URL = "amqp://guest:guest@rabbitmq:5672//"
