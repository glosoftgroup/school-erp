from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView

from .api.views import *
from .models import Attendance as Table

# global
module = 'attendance'
urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name=module+"/list.html"), name="index"),
    url(r'^api/create/$', CreateAPIView.as_view(), name='api-create-house'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$', DestroyView.as_view(), name='api-delete'),
    url(r'^api/list/$', ListAPIView.as_view(), name='api-list-'+module),
    url(r'^api/update/(?P<pk>[0-9]+)/$', UpdateAPIView.as_view(), name='api-update'),
    url(r'^add/$', TemplateView.as_view(template_name=module+"/form.html"), name='add-'+module),
    url(r'^update/(?P<pk>[0-9]+)/$',
        UpdateView.as_view(template_name=module+"/form.html", model=Table, fields=['id', 'name']),
        name='update-'+module),
]

