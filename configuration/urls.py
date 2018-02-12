from django.conf.urls import url, include
from django.contrib import admin

from app_dir.core.views import test_celery
from app_dir.core.views import index, home
from app_dir.modules.room.urls import urlpatterns as room_urls
from app_dir.modules.site.urls import urlpatterns as site_urls
from app_dir.modules.users.urls import urlpatterns as users_urls
from app_dir.modules.academic_year.urls import urlpatterns as academic_year_urls

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^home/$', home, name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^room/', include(room_urls, namespace='room')),
    url(r'^academic_year/', include(academic_year_urls, namespace='academic_year')),
    url(r'^users/', include(users_urls, namespace='users')),
    url(r'^site/', include(site_urls, namespace='site')),
    url(r'^test_celery', test_celery, name='test_celery'),
]
