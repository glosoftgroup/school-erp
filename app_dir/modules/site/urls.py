from django.conf.urls import url
from django.views.generic import TemplateView

from .api.views import *  # SiteSettingListAPIView


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="site/detail.html"), name="index"),
    url(r'^api/list/$', SiteSettingListAPIView.as_view(), name='api-list'),
    url(r'^api/list/sms/$', SmsSettingListAPIView.as_view(), name='api-list-sms'),
    url(r'^api/update/(?P<pk>[0-9]+)$', SiteSettingsUpdateAPIView.as_view(), name='api-update'),
    url(r'^api/update/(?P<pk>[0-9]+)/sms/$', SmsSettingsUpdateAPIView.as_view(), name='api-update-sms'),
]

