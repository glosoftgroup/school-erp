from django.conf.urls import url
from django.contrib.auth.decorators import permission_required
from .api.views import (
    UserListAPIView,
    UserCreateAPIView,
    )
from . import views

urlpatterns = [
    url(r'^$', views.users, name='users'),
    url(r'^create/$', views.add_user, name='user-create'),
    url(r'^api/list/$', UserListAPIView.as_view(), name='user-list'),
    url(r'^api/create/$', UserCreateAPIView.as_view(),name='user-api-create'),
    url(r'^process/create/$', views.user_process, name='user-process-create'),
    url(r'^assign/permissions/$', views.user_assign_permission, name='user-assign-permission'),
    url(r'^detail/(?P<pk>[0-9]+)/$', views.user_detail, name='user-detail'),
    url(r'^edit/(?P<pk>[0-9]+)/$', views.user_edit, name='user-edit'),
    # url(r'^edit/(?P<pk>[0-9]+)/$', permission_required('userprofile.change_user', login_url='not_found')(views.user_edit), name='user-edit'),
    # url(r'^user_update(?P<pk>[0-9]+)/$', permission_required('userprofile.change_user', login_url='not_found')
    #             (user_update), name='user-update'),
    url(r'^update/(?P<pk>[0-9]+)/$', views.user_update, name='user-update'),
]

