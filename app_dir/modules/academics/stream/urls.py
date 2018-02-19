from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test
)

from .api.views import *


urlpatterns = [
    url(r'^$', permission_required('stream.add_stream', login_url='core:not_found')(TemplateView.as_view(template_name="stream/list.html")), name="index"),
    url(r'^api/create/$', CreateAPIView.as_view(), name='api-create'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$', DestroyView.as_view(), name='api-delete'),
    url(r'^api/list/$', ListAPIView.as_view(), name='api-list'),
    url(r'^api/update/(?P<pk>[0-9]+)/$', UpdateAPIView.as_view(), name='api-update'),
    url(r'^add/$', permission_required('stream.add_stream', login_url='core:not_found')(TemplateView.as_view(template_name="stream/form.html")), name='add'),
    url(r'^update/(?P<pk>[0-9]+)/$', permission_required('stream.change_stream', login_url='core:not_found')(TemplateView.as_view(template_name="stream/form.html")), name='update'),
]

