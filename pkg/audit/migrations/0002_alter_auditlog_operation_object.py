# Generated by Django 4.2.3 on 2023-10-13 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audit', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auditlog',
            name='operation_object',
            field=models.TextField(blank=True, null=True, verbose_name='操作对象'),
        ),
    ]