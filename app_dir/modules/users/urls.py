from django.conf.urls import url
from django.contrib.auth.decorators import permission_required
from .api.views import (
    UserListAPIView,
    UserCreateAPIView,
    )
from .views import (
    users,
    add_user
)

urlpatterns = [
    url(r'^$', users, name='users'),
    url(r'^create/$', add_user, name='user-create'),
    url(r'^api/list/$', UserListAPIView.as_view(), name='user-list'),
    url(r'^api/create/$', UserCreateAPIView.as_view(),name='user-api-create'),
    url(r'^process/create/$', UserListAPIView.as_view(), name='user-process-create'),
    url(r'^assign/permissions/$', UserListAPIView.as_view(), name='user-assign-permission'),
]

