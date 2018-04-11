from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test
)

from .api.views import *
from .models import Item as Table

# global variable
module = 'item'
urlpatterns = [
    url(r'^$',
        permission_required('item.view_feeitem', login_url='core:not_found')
        (TemplateView.as_view(template_name=module+"/list.html")), name="index"),
    url(r'^api/create/$',
        permission_required('item.add_feeitem', login_url='core:not_found')
        (CreateAPIView.as_view()), name='api-create'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$',
        permission_required('item.delete_feeitem', login_url='core:not_found')
        (DestroyView.as_view()), name='api-delete'),
    url(r'^api/list/$',
        permission_required('item.view_feeitem', login_url='core:not_found')
        (ListAPIView.as_view()), name='api-list'),
    url(r'^api/update/(?P<pk>[0-9]+)/$',
        permission_required('item.change_feeitem', login_url='core:not_found')
        (UpdateAPIView.as_view()), name='api-update'),
    url(r'^add/$',
        permission_required('item.add_feeitem', login_url='core:not_found')
        (TemplateView.as_view(template_name=module+"/form.html")), name='add'),
    url(r'^update/(?P<pk>[0-9]+)/$',
        permission_required('item.change_feeitem', login_url='core:not_found')
        (UpdateView.as_view(template_name=module+"/form.html", model=Table, fields=['id', 'name'])),
        name='update'),
]

