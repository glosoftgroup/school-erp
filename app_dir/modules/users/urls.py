from django.conf.urls import url
from django.views.generic import TemplateView
from .api.views import (
    UserListAPIView,
    UserCreateAPIView,
    )


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="users/add_user.html"), name='users'),
    url(r'^api/list/$', UserListAPIView.as_view(), name='user-list'),
    url(r'^api/create/$', UserCreateAPIView.as_view(),name='user-create'),
]

