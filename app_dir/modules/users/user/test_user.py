from .models import User
from django.test import TestCase
from django.urls import reverse


class UserTest(TestCase):

    # def setUp(self):
    #     User.objects.create_superuser(
    #         'user1@example.com',
    #         'pswd',
    #     )
    #     self.client.login(email="user1@example.com", password="pswd")
    #
    # def tearDown(self):
    #     self.client.logout()

    """Test User Object"""
    def create_user(self, email="alexkiburu@gmail.com",
                    fullname="alex kiburu", username="kiburu",
                    is_staff=True, is_active=True, send_mail=True,
                    jobTitle="adad", nationalId="12345", mobile="0733445577"):
        return User.objects.create(email=email, fullname=fullname, username=username,
                                   is_active=is_active, is_staff=is_staff,
                                   send_mail=send_mail, jobTitle=jobTitle,
                                   nationalId=nationalId, mobile=mobile)


    def test_user_creation(self):
        createduser = self.create_user()
        self.assertTrue(isinstance(createduser, User))
        self.assertEqual(createduser.get_full_name(), createduser.email)
        self.assertEqual(createduser.get_short_name(), createduser.email)


    'Test User Manager'
    def create_user_with_manager(self, email="alexkiburu@gmail.com",
                    fullname="alex kiburu", username="kiburu",
                    is_staff=True, is_active=True, send_mail=True,
                                 jobTitle="adad", nationalId="12345", mobile="0733445577"):

        return User.objects.create_user(email=email, fullname=fullname, username=username,
                                   is_active=is_active, is_staff=is_staff,
                                   send_mail=send_mail, jobTitle=jobTitle,
                                   nationalId=nationalId, mobile=mobile)


    def test_user_creation_with_manager(self):
        createduser = self.create_user_with_manager()
        self.assertTrue(isinstance(createduser, User))


class UserViewTest(TestCase):
    def test_view_with_no_users(self):
        self.client.login(email="admin@example.com", password="admin123")
        response = self.client.get(reverse('users:user-list'))
        self.assertEqual(response.status_code, 200)
        self.assertQuerysetEqual(response.context['users'], [])

    def test_view_with_users(self):
        UserTest.create_user(self, email="alexkiburu@gmail.com",
                    fullname="alex kiburu", username="kiburu",
                    is_staff=True, is_active=True, send_mail=True,
                    jobTitle="adad", nationalId="12345", mobile="0733445577")

        UserTest.create_user(self, email="johndoe@gmail.com",
                             fullname="john doe", username="john",
                             is_staff=True, is_active=True, send_mail=True,
                             jobTitle="adad", nationalId="12345", mobile="0733445577")
        response = self.client.get(reverse("users:user-list"))
        self.assertEqual(response.status_code, 200)
        self.assertQuerysetEqual(response.context['users'], ['<User: johndoe@gmail.com>', '<User: alexkiburu@gmail.com>'])


