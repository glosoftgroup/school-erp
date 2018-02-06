from django.conf.urls import url, include
from django.contrib import admin

from app_dir.core.views import test_celery
from app_dir.core.views import index
from app_dir.modules.room.urls import urlpatterns as room_urls
from app_dir.modules.site.urls import urlpatterns as site_urls

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^room/', include(room_urls, namespace='room')),
    url(r'^site/', include(site_urls, namespace='site')),
    url(r'^test_celery', test_celery, name='test_celery'),
]
