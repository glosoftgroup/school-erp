from configuration.settings.base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'basecode',
        'USER': 'basecode',
        'PASSWORD': 'basecode',
        'HOST': 'db',
        'PORT': '5432',
    }
}
