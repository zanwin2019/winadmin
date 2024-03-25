# Generated by Django 4.2.3 on 2023-10-20 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0008_remove_loignlog_login_host_loignlog_login_user_agent'),
    ]

    operations = [
        migrations.AddField(
            model_name='loignlog',
            name='login_city',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='登录地址(城市)'),
        ),
        migrations.AddField(
            model_name='loignlog',
            name='login_country',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='登录地址(国家)'),
        ),
        migrations.AddField(
            model_name='loignlog',
            name='login_province',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='登录地址(省份)'),
        ),
    ]