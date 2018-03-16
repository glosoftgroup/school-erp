from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test
)

from .api.views import *
from .models import ExamConfiguration as Table


urlpatterns = [
    url(r'^$', permission_required('configuration.view_examconfiguration', login_url='core:not_found')(TemplateView.as_view(template_name="exam_configuration/list.html")), name="index"),
    url(r'^api/create/$', CreateAPIView.as_view(), name='api-create'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$', DestroyView.as_view(), name='api-delete'),
    url(r'^api/list/$', ListAPIView.as_view(), name='api-list'),
    url(r'^api/update/(?P<pk>[0-9]+)/$', UpdateAPIView.as_view(), name='api-update'),
    url(r'^add/$', permission_required('configuration.add_examconfiguration', login_url='core:not_found')(TemplateView.as_view(template_name="exam_configuration/form.html")), name='add'),
    url(r'^update/(?P<pk>[0-9]+)/$', permission_required('configuration.change_examconfiguration', login_url='core:not_found')(UpdateView.as_view(template_name="exam_configuration/form.html", model=Table, fields=['id'])),
        name='update'),
    url(r'^view/(?P<pk>[0-9]+)/$', permission_required('configuration.view_examconfiguration', login_url='core:not_found')(UpdateView.as_view(template_name="exam_configuration/detail.html", model=Table, fields=['id'])),
        name='detail'),
]

