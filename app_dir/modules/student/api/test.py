from ..models import Student as Table
from app_dir.modules.users.user.models import User
from django.test import TestCase, Client
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from rest_framework.test import force_authenticate
import json

global module
module = 'student'


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
            "id": 1,
            "first_name": "James",
            "middle_name": "Alex",
            "last_name": "Mwangi",
            "nationality": "KE",
            "dob": "2018-08-15",
            "pob": "Kiambuthia",
            "por": "Kiamb",
            "gender": "male",
            "religion": "christian",
        }
        self.pk = None
        # create
        self.response = self.client.post(
            reverse('student:api-create'),
            self.instance_data,
        )
        self.api_list = self.client.get(reverse('student:api-list'))

    def test_api_can_create_an_instance(self):
        """Test the api has instance creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(self.response.content).get('first_name'), self.instance_data.get('first_name'))

        instance = Table.objects.first()
        self.pk = instance.pk

        self.assertEqual(instance.first_name, 'James')
        client = Client()
        api_update = client.put(
            reverse('student:api-delete', kwargs={'pk': self.pk}),
            self.instance_data,
        )
        self.assertEqual(api_update.status_code, status.HTTP_302_FOUND)

    def test_api_list(self):
        self.assertEqual(self.api_list.status_code, status.HTTP_302_FOUND)
