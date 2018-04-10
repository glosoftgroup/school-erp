# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-04-07 12:51
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('academic_year', '0001_initial'),
        ('room', '0001_initial'),
        ('stream', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='name')),
                ('class_group', models.IntegerField(default=0)),
                ('no_of_students', models.CharField(blank=True, max_length=128, null=True, verbose_name='no_of_students')),
                ('academic_year', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='academic_year.AcademicYear')),
                ('class_teacher', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('room', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='room.Room')),
                ('stream', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='stream.Stream')),
            ],
        ),
    ]
