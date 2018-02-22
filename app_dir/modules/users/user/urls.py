from django.conf.urls import url
from django.contrib.auth.decorators import permission_required
from .api.views import (
    UserListAPIView,
    UserCreateAPIView,
    )
from . import views, pdf, groups

urlpatterns = [
    url(r'^$', permission_required('user.view_user', login_url='core:not_found')(views.users), name='user-list'),
    url(r'^create/$', permission_required('user.add_user', login_url='core:not_found')(views.add_user), name='user-create'),
    url(r'^process/create/$', views.user_process, name='user-process-create'),
    url(r'^assign/permissions/$', views.user_assign_permission, name='user-assign-permission'),
    url(r'^detail/(?P<pk>[0-9]+)/$', views.user_detail, name='user-detail'),
    url(r'^edit/(?P<pk>[0-9]+)/$', permission_required('user.change_user', login_url='core:not_found')(views.user_edit), name='user-edit'),
    url(r'^update/(?P<pk>[0-9]+)/$', views.user_update, name='user-update'),
    url(r'^delete/(?P<pk>[0-9]+)/$', views.user_delete, name='user-delete'),
    url(r'^payload/pdf/$', pdf.pdf, name='users_pdf'),
    url(r'^users_export_csv/$', views.users_export_csv, name='users_export_csv'),


    url(r'^paginate/', views.user_paginate, name='user_paginate'),
    url(r'^search/$', views.user_search, name='user_search'),

    url(r'trail/$', views.user_trails, name='user_trail'),
    url(r'^trail/paginate/', views.usertrail_paginate, name='usertrail_paginate'),
    url(r'^trail/search/$', views.usertrail_search, name='usertrail_search'),

    url(r'^api/list/$', UserListAPIView.as_view(), name='user-api-list'),
    url(r'^api/create/$', UserCreateAPIView.as_view(),name='user-api-create'),

    url(r'^groups/$', permission_required('auth.view_group', login_url='not_found')
                (groups.groups), name='groups'),
    url(r'^perms/$', groups.perms, name='perms'),
    url(r'^add_group/$', permission_required('auth.add_group', login_url='not_found')
            (groups.create_group), name='add_group'),
    url(r'^group_assign_permission/$', permission_required('auth.add_group', login_url='not_found')
            (groups.group_assign_permission), name='group_assign_permission'),
    url(r'^get_search_users/$', groups.get_search_users, name='get_search_users'),
    url(r'^group/edit/$', permission_required('auth.change_group', login_url='not_found')
            (groups.group_edit), name='group_edit'),
    url(r'^group/manage/$', groups.group_manage, name='group_manage'),
    url(r'^group/users/$', groups.get_group_users, name='get_group_users'),
    url(r'^group/update/$', permission_required('auth.change_group', login_url='home')
            (groups.group_update), name='group_update'),
    url(r'^group/update/users/$', permission_required('auth.change_group', login_url='home')
            (groups.group_update_users), name='group_update_users'),
    url(r'^group/detail/(?P<pk>[0-9]+)/$', permission_required('auth.view_group', login_url='not_found')
            (groups.group_detail), name='group-detail'),
    url(r'^group/delete/(?P<pk>[0-9]+)/$', permission_required('auth.delete_group', login_url='not_found')
            (groups.group_delete), name='group-delete'),
    url(r'^group/paginate/', groups.group_paginate, name='group_paginate'),
    url( r'^group/search/$', groups.group_search, name = 'group_search' ),
]

