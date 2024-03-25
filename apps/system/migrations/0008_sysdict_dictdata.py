# Generated by Django 4.2.3 on 2023-10-11 15:08

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0007_remove_systemconfig_required_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SysDict',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.CharField(max_length=64, verbose_name='创建人')),
                ('create_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('updated_by', models.CharField(max_length=64, null=True, verbose_name='修改人')),
                ('end_at', models.DateTimeField(null=True, verbose_name='结束时间')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='是否软删除')),
                ('is_builtin', models.BooleanField(default=False, verbose_name='是否内置')),
                ('key', models.CharField(max_length=255, verbose_name='编码')),
                ('name', models.CharField(max_length=255, verbose_name='名称')),
                ('desc', models.CharField(blank=True, max_length=255, null=True, verbose_name='描述')),
                ('is_enabled', models.BooleanField(default=True, verbose_name='是否启用')),
                ('is_readonly', models.BooleanField(default=False, verbose_name='是否只读')),
                ('is_show', models.BooleanField(default=True, verbose_name='是否显示')),
            ],
            options={
                'verbose_name': '数据字典',
                'verbose_name_plural': '数据字典',
            },
            managers=[
                ('_objects', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='DictData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.CharField(max_length=64, verbose_name='创建人')),
                ('create_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('updated_by', models.CharField(max_length=64, null=True, verbose_name='修改人')),
                ('end_at', models.DateTimeField(null=True, verbose_name='结束时间')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='是否软删除')),
                ('is_builtin', models.BooleanField(default=False, verbose_name='是否内置')),
                ('key', models.CharField(max_length=255, verbose_name='编码')),
                ('name', models.CharField(max_length=255, verbose_name='名称')),
                ('order', models.IntegerField(verbose_name='顺序')),
                ('is_readonly', models.BooleanField(default=False, verbose_name='是否只读（不可编辑）')),
                ('use_number', models.IntegerField(default=0, verbose_name='使用次数')),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('dict_table', models.ForeignKey(help_text='关联字典项', on_delete=django.db.models.deletion.CASCADE, related_name='dict_data', to='system.sysdict')),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='system.dictdata', verbose_name='上级目录')),
            ],
            options={
                'verbose_name': '字典数据',
                'verbose_name_plural': '字典数据',
                'ordering': ('order',),
            },
            managers=[
                ('_objects', django.db.models.manager.Manager()),
            ],
        ),
    ]