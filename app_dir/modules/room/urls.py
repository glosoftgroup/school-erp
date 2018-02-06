from django.conf.urls import url
from django.views.generic import TemplateView

from .api.views import RoomListAPIView


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="list.html")),
    url(r'^api/list/$', RoomListAPIView.as_view()),
]

