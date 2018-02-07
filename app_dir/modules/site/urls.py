from django.conf.urls import url
from django.views.generic import TemplateView

from .api.views import SiteSettingListAPIView


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="site/detail.html")),
    url(r'^api/list/$', SiteSettingListAPIView.as_view(), name='api-list'),
]

