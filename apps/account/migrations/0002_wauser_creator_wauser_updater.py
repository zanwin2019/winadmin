# Generated by Django 4.2.3 on 2023-09-04 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='wauser',
            name='creator',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='创建者'),
        ),
        migrations.AddField(
            model_name='wauser',
            name='updater',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者'),
        ),
    ]