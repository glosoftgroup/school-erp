from django.conf.urls import url
from django.views.generic import TemplateView

from .api.views import SettingsListAPIView


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="detail.html")),
    url(r'^api/list/$', SettingsListAPIView.as_view()),
]

