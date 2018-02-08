from django.conf.urls import url

from .views import (
    SiteSettingListAPIView,
    SiteSettingsUpdateAPIView
    )


urlpatterns = [
    url(r'^$', SiteSettingListAPIView.as_view(),
        name='api-site_settings-list'),
    url(r'^$', SiteSettingsUpdateAPIView.as_view(),
        name='api-update_settings')
]

