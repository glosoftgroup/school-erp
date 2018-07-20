from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView

from .api.views import *
from .models import Fee as Table

# global variable
module = 'student_fee'
urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name=module+"/list.html"), name="index"),
    url(r'^api/create/$', CreateAPIView.as_view(), name='api-create'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$', DestroyView.as_view(), name='api-delete'),
    url(r'^api/list/$', ListAPIView.as_view(), name='api-list'),
    url(r'^api/update/(?P<pk>[0-9]+)/$', UpdateAPIView.as_view(), name='api-update'),
    url(r'^add/$', TemplateView.as_view(template_name=module+"/form.html"), name='add'),
    url(r'^update/(?P<pk>[0-9]+)/$',
        UpdateView.as_view(template_name=module+"/form.html", model=Table, fields=['id', 'name']),
        name='update'),
    url(r'^update/view/(?P<pk>[0-9]+)/$',
        UpdateView.as_view(template_name=module+"/view.html", model=Table, fields=['id', 'name']),
        name='update-view'),
]

