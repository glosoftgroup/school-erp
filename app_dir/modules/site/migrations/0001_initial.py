# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-02-13 14:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthorizationKey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('facebook', 'Facebook-Oauth2'), ('google-oauth2', 'Google-Oauth2')], max_length=20, verbose_name='name')),
                ('key', models.TextField(verbose_name='key')),
                ('password', models.TextField(verbose_name='password')),
            ],
        ),
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='BankBranch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('bank', models.ForeignKey(blank=True, max_length=100, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='branch', to='site.Bank')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.TextField(blank=True, null=True)),
                ('check', models.CharField(blank=True, max_length=256, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True, verbose_name='name')),
                ('code', models.CharField(blank=True, max_length=50, null=True, verbose_name='code')),
                ('city', models.CharField(blank=True, max_length=50, null=True, verbose_name='city')),
                ('address', models.CharField(blank=True, max_length=150, null=True, verbose_name='address')),
                ('postal_code', models.CharField(blank=True, max_length=70, null=True, verbose_name='postal code')),
                ('email', models.EmailField(blank=True, max_length=50, null=True, verbose_name='email')),
                ('mobile', models.CharField(blank=True, max_length=50, null=True, verbose_name='mobile')),
                ('header_text', models.CharField(blank=True, max_length=200, verbose_name='header text')),
                ('description', models.CharField(blank=True, max_length=500, verbose_name='site description')),
                ('sms_gateway_username', models.CharField(blank=True, max_length=500, verbose_name='sms gateway username')),
                ('sms_gateway_apikey', models.CharField(blank=True, max_length=500, verbose_name='sms gateway api key')),
                ('image', models.ImageField(blank=True, null=True, upload_to='employee')),
            ],
            options={
                'verbose_name': 'site',
                'verbose_name_plural': 'site',
            },
        ),
        migrations.CreateModel(
            name='SmsSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=500, verbose_name='sms gateway username')),
                ('api_key', models.CharField(blank=True, max_length=500, verbose_name='sms gateway api key')),
            ],
            options={
                'verbose_name': 'site',
                'verbose_name_plural': 'site',
            },
        ),
        migrations.CreateModel(
            name='UserRole',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='authorizationkey',
            name='site_settings',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site.SiteSettings'),
        ),
        migrations.AlterUniqueTogether(
            name='authorizationkey',
            unique_together=set([('site_settings', 'name')]),
        ),
    ]
