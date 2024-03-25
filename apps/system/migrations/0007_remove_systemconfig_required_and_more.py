# Generated by Django 4.2.3 on 2023-09-27 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0006_rename_name_systemconfig_label_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='systemconfig',
            name='required',
        ),
        migrations.RemoveField(
            model_name='systemconfig',
            name='status',
        ),
        migrations.AddField(
            model_name='systemconfig',
            name='disabled',
            field=models.BooleanField(default=False, verbose_name='是否禁用'),
        ),
        migrations.AddField(
            model_name='systemconfig',
            name='isrow',
            field=models.BooleanField(default=False, verbose_name='是否整行'),
        ),
        migrations.AddField(
            model_name='systemconfig',
            name='rule',
            field=models.BooleanField(default=True, verbose_name='是否必填'),
        ),
    ]
