# Generated by Django 4.2.3 on 2023-09-12 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_wauser_creator_wauser_updater'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wauser',
            name='role',
            field=models.IntegerField(help_text='用户角色表示字符串', verbose_name='用户角色'),
        ),
    ]