from __future__ import unicode_literals

from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone
from datetime import date
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import pgettext_lazy


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, is_staff=False,
                    is_active=True, username='', **extra_fields):
        """Creates a User with the given username, email and password"""
        email = UserManager.normalize_email(email)
        user = self.model(email=email, is_active=is_active,
                          is_staff=is_staff, **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(email, password, is_staff=True,
                                is_superuser=True, **extra_fields)

@python_2_unicode_compatible
class User(PermissionsMixin, AbstractBaseUser):
    email = models.EmailField(pgettext_lazy('User field', 'email'), unique=True)
    fullname = models.CharField(pgettext_lazy('User field', 'fullname'), max_length=100, null=True, blank=True)
    username = models.CharField(pgettext_lazy('User field', 'username'), unique=True, max_length=100, null=True, blank=True)
    is_staff = models.BooleanField(
        pgettext_lazy('User field', 'employee status'),
        default=False)
    is_active = models.BooleanField(
        pgettext_lazy('User field', 'active'),
        default=True)
    send_mail = models.BooleanField(
        pgettext_lazy('User field', 'send mail'),
        default=True)
    jobTitle = models.CharField(max_length=100, default='', blank=True, null=True,
        verbose_name=pgettext_lazy('User field', 'job title'))
    nationalId = models.CharField(max_length=100, null=True,blank=True)
    mobile = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='employee', null=True, blank=True)
    date_joined = models.DateTimeField(
        pgettext_lazy('User field', 'date joined'),
        default=timezone.now, editable=False)
    is_teacher = models.BooleanField(
        pgettext_lazy('User field', 'isTeacher'),
        default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    class Meta:
        verbose_name = pgettext_lazy('User model', 'user')
        verbose_name_plural = pgettext_lazy('User model', 'users')

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email


class UserTrail(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    action = models.CharField(max_length=100, null=True, blank=True)
    now = models.DateTimeField(default=timezone.now)
    date = models.DateField(default=date.today)
    crud = models.CharField(max_length=100, null=True, blank=True)
