# flake8:noqa
from .base import *

DEBUG = False
ALLOWED_HOSTS = ['*']
STAGE = "production"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'basecode',
        'USER': 'basecode',
        'ADMINUSER':'postgres',
        'PASSWORD': '38kzddvSgRWjQXsMj9',
        'HOST': 'basecode-production.cjlbpfelubaj.eu-west-1.rds.amazonaws.com',
        'PORT': '5432',
    }
}

BROKER_USE_SSL = True
BROKER_URL = "amqp://guest:guest@rabbitmq:5672//"

