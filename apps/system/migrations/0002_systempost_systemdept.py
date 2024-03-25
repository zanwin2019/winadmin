# Generated by Django 4.2.3 on 2023-08-07 16:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('system', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SystemPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='岗位名称')),
                ('code', models.CharField(max_length=64, verbose_name='岗位编码')),
                ('sort', models.IntegerField(default=0, verbose_name='排序')),
                ('remark', models.CharField(blank=True, max_length=255, null=True, verbose_name='备注')),
                ('status', models.IntegerField(default=0, verbose_name='状态')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('creator', models.CharField(blank=True, max_length=255, null=True, verbose_name='创建者')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('updater', models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者')),
            ],
            options={
                'verbose_name': '岗位',
                'verbose_name_plural': '岗位',
                'db_table': 'win_system_post',
            },
        ),
        migrations.CreateModel(
            name='SystemDept',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='部门名称')),
                ('parent_id', models.IntegerField(default=0, verbose_name='父部门ID')),
                ('desc', models.CharField(blank=True, max_length=255, null=True, verbose_name='描述')),
                ('sort', models.IntegerField(default=0, verbose_name='排序')),
                ('status', models.IntegerField(default=0, verbose_name='状态')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('creator', models.CharField(blank=True, max_length=255, null=True, verbose_name='创建者')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('updater', models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者')),
                ('leader', models.ForeignKey(blank=True, help_text='部门负责人', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='system_dept', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': '部门',
                'verbose_name_plural': '部门',
                'db_table': 'win_system_dept',
            },
        ),
    ]
