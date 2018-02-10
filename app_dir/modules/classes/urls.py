from django.conf.urls import url
from django.views.generic import TemplateView

from .api.views import *


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="room/list.html"), name="index"),
    url(r'^api/list/$', ListAPIView.as_view(), name='api-list-rooms'),
    url(r'^api/users/$', UserListAPIView.as_view(), name='api-list-users'),
    url(r'^add/$', TemplateView.as_view(template_name="room/room_form.html"), name='add-room'),
]

