# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-02-13 14:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('academic_year', '0001_initial'),
        ('stream', '0001_initial'),
        ('room', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True, verbose_name='name')),
                ('class_teacher', models.CharField(max_length=128, verbose_name='class_teacher')),
                ('no_of_students', models.CharField(max_length=128, verbose_name='no_of_students')),
                ('academic_year', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='academic_year.AcademicYear')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='room.Room')),
                ('stream', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stream.Stream')),
            ],
        ),
    ]
