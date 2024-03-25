# Generated by Django 4.2.3 on 2023-10-16 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_alter_wauser_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='loignlog',
            name='login_addr',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='登录地址'),
        ),
        migrations.AddField(
            model_name='loignlog',
            name='login_os',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='登录设备操作系统'),
        ),
    ]
