from django.conf.urls import url
from django.contrib.auth import views as django_views

from . import views
from ..modules import browser_instructions


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^index/$', views.index, name='index'),
    url(r'^lock/$', views.lock, name='lock'),
    url(r'^home/$', views.home, name='home2'),
    url(r'^lock_process/$', views.lock_process, name='lock_process'),
    url(r'^style-guide/', views.styleguide, name='styleguide'),
    url(r'^not_found/$', views.not_found, name='not_found'),
    url(r'^instructions/(?P<browser>.+)/$', browser_instructions.instructions, name='browser-instructions'),
    url(r'^instructions/$', browser_instructions.instructions, name='browser-instructions2'),

    url(r'^login/$', views.login, name='account_login'),
    url(r'^logout/$', views.logout, name='account_logout'),
    url(r'^password/reset/$', views.password_reset,
        name='account_reset_password'),
    url(r'^password/reset/done/$', django_views.password_reset_done,
        kwargs={'template_name': 'account/password_reset_done.html'},
        name='account_reset_password_done'),
    url(r'^password/reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',  # noqa
        views.password_reset_confirm, name='account_reset_password_confirm'),
    url(r'password/reset/complete/$', django_views.password_reset_complete,
        kwargs={'template_name': 'account/password_reset_from_key_done.html'},
        name='account_reset_password_complete'),
]
