from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test
)

from .api.views import *
from .models import Class as Table


urlpatterns = [
    url(r'^$', permission_required('classes.view_class', login_url='core:not_found')(TemplateView.as_view(template_name="class/list.html")), name="index"),
    url(r'^api/create/$', CreateAPIView.as_view(), name='api-create'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$', DestroyView.as_view(), name='api-delete'),
    url(r'^api/list/$', ListAPIView.as_view(), name='api-list'),
    url(r'^api/list/groups/$', ListClassGroupsAPIView.as_view(), name='api-list-groups'),
    url(r'^api/update/(?P<pk>[0-9]+)/$', UpdateAPIView.as_view(), name='api-update'),
    url(r'^add/$', permission_required('classes.add_class', login_url='core:not_found')(TemplateView.as_view(template_name="class/form.html")), name='add'),
    url(r'^update/(?P<pk>[0-9]+)/$', permission_required('classes.change_class', login_url='core:not_found')(UpdateView.as_view(template_name="class/form.html", model=Table, fields=['id', 'name'])),
        name='update'),
]

