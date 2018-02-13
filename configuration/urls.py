from django.conf.urls import url, include
from django.contrib import admin

from app_dir.core.views import test_celery
from app_dir.core.views import index, home
from app_dir.modules.academic_year.urls import urlpatterns as academic_year_urls
from app_dir.core.urls import urlpatterns as core_urls
from app_dir.modules.room.urls import urlpatterns as room_urls
from app_dir.modules.site.urls import urlpatterns as site_urls
from app_dir.modules.users.user.urls import urlpatterns as users_urls
from app_dir.modules.academic_year.urls import urlpatterns as academic_year_urls
from app_dir.modules.academics.stream.urls import urlpatterns as stream_urls
from app_dir.modules.term.urls import urlpatterns as term_urls
from app_dir.modules.users.urls import urlpatterns as users_urls

urlpatterns = [
    url(r'^', include(core_urls, namespace='core')),
    url(r'^admin/', admin.site.urls),
    url(r'^room/', include(room_urls, namespace='room')),
    url(r'^academic_year/', include(academic_year_urls, namespace='academic_year')),
    url(r'^users/', include(users_urls, namespace='users')),
    url(r'^site/', include(site_urls, namespace='site')),
    url(r'^term/', include(term_urls, namespace='term')),
    url(r'^test_celery', test_celery, name='test_celery'),
    url(r'^stream/', include(stream_urls, namespace='stream')),
]
