from app_dir.modules.term.models import Term as Table
from app_dir.modules.users.user.models import User
from django.test import TestCase, Client
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from rest_framework.test import force_authenticate
import json

global module
module = 'term'


# Define this after the ModelTestCase
class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        # create user for force_authenticate
        user = User.objects.create_superuser(username='olivia', password='secret', email="admin@xple.com")
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        self.instance_data = {
            "name": "James",
        }
        self.pk = None
        # create
        self.response = self.client.post(
            reverse(module + ':api-create'),
            self.instance_data,
        )
        self.api_list = self.client.get(reverse(module+':api-list'))

    def test_api_can_create_an_instance(self):
        """Test the api has instance creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(self.response.content).get('name'), self.instance_data.get('name'))

        instance = Table.objects.first()
        self.pk = instance.pk

        self.assertEqual(instance.name, 'James')
        api_update = self.client.put(
            reverse(module + ':api-update', kwargs={'pk': self.pk}),
            self.instance_data,
        )
        self.assertEqual(api_update.data.get('name'), 'James')

    def test_api_list(self):
        self.assertEqual(self.api_list.status_code, status.HTTP_200_OK)
