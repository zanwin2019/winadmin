# Generated by Django 4.2.3 on 2023-10-19 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0008_sysdict_dictdata'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dictdata',
            name='end_at',
        ),
        migrations.RemoveField(
            model_name='dictdata',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='sysdict',
            name='end_at',
        ),
        migrations.RemoveField(
            model_name='sysdict',
            name='updated_by',
        ),
        migrations.AddField(
            model_name='dictdata',
            name='updater',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者'),
        ),
        migrations.AddField(
            model_name='sysdict',
            name='updater',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者'),
        ),
        migrations.AlterField(
            model_name='dictdata',
            name='creator',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='创建者'),
        ),
        migrations.AlterField(
            model_name='sysdict',
            name='creator',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='创建者'),
        ),
    ]
