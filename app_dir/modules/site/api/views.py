from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ...site.models import SiteSettings as Table
from .serializers import (
    SiteSettingSerializer,
    UpdateSiteSettingsSerializer
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