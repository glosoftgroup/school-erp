from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ...site.models import SiteSettings as Table
from ...site.models import SmsSettings as Sms
from .serializers import (
    SiteSettingSerializer,
    UpdateSiteSettingsSerializer,
    UpdateSmsSettingsSerializer
     )

User = get_user_model()


class SiteSettingListAPIView(generics.ListAPIView):
    """
        list site settings details
        GET /api/setting/
    """
    serializer_class = SiteSettingSerializer
    pagination_class = None
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Table.objects.all()


class SiteSettingsUpdateAPIView(generics.RetrieveUpdateAPIView):
    """
        update site settings details
        @:param pk settings id
        @:method PUT

        PUT /api/site/update-site/
        payload Json: /payload/update_site-settings.json
    """
    queryset = Table.objects.all()
    serializer_class = UpdateSiteSettingsSerializer


# sms views
class SmsSettingListAPIView(generics.ListAPIView):
    """
        list sms settings details
        GET /api/setting/
    """
    serializer_class = UpdateSmsSettingsSerializer
    pagination_class = None
    permission_classes = (IsAuthenticatedOrReadOnly,)
    # create pk 1 if none
    try:
        Sms.objects.get(pk=1)
    except Exception as e:
        try:
            Sms.objects.create(username="sandbox", api_key='')
        except:
            pass
    queryset = Sms.objects.all()


class SmsSettingsUpdateAPIView(generics.RetrieveUpdateAPIView):
    """
        update sms settings details
        @:param pk settings id
        @:method PUT

        PUT /api/sms/update-sms/
        payload Json: /payload/update_site-settings.json
    """
    queryset = Sms.objects.all()
    serializer_class = UpdateSmsSettingsSerializer
