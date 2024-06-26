# Generated by Django 4.2.3 on 2023-07-24 17:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SystemConfigTab',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pid', models.IntegerField(default=0, verbose_name='父级ID')),
                ('title', models.CharField(max_length=128, verbose_name='选项卡名称')),
                ('code', models.CharField(max_length=128, verbose_name='选项卡标识')),
                ('status', models.IntegerField(default=0, verbose_name='状态')),
                ('is_display', models.IntegerField(default=1, verbose_name='是否显示')),
                ('icon', models.CharField(blank=True, max_length=64, null=True, verbose_name='图标')),
                ('type', models.IntegerField(blank=True, null=True, verbose_name='配置类型')),
                ('sort', models.IntegerField(blank=True, null=True, verbose_name='排序')),
            ],
            options={
                'verbose_name': '系统配置选项卡',
                'verbose_name_plural': '系统配置选项卡',
                'db_table': 'win_system_config_tab',
            },
        ),
        # migrations.CreateModel(
        #     name='SystemMenu',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('name', models.CharField(max_length=64, verbose_name='菜单名称')),
        #         ('type', models.IntegerField(choices=[(1, '模块'), (2, '导航'), (3, '菜单'), (4, '节点')], default=3, verbose_name='菜单类型')),
        #         ('permission', models.CharField(max_length=128, verbose_name='权限标识')),
        #         ('pid', models.IntegerField(default=0, verbose_name='父菜单ID')),
        #         ('path', models.CharField(blank=True, max_length=255, null=True, verbose_name='路由地址')),
        #         ('icon', models.CharField(blank=True, max_length=32, null=True, verbose_name='菜单图标')),
        #         ('href', models.CharField(blank=True, max_length=128, null=True, verbose_name='API接口地址')),
        #         ('method', models.CharField(blank=True, choices=[('1', 'POST'), ('2', 'GET'), ('3', 'PUT'), ('4', 'DELETE'), ('5', 'PATCH')], max_length=32, null=True, verbose_name='请求方法')),
        #         ('params', models.CharField(blank=True, max_length=255, null=True, verbose_name='请求参数')),
        #         ('sort', models.IntegerField(default=0, verbose_name='排序')),
        #         ('is_hidden', models.IntegerField(default=0, verbose_name='是否隐藏')),
        #         ('redirect', models.CharField(blank=True, max_length=255, null=True, verbose_name='重定向')),
        #         ('component', models.CharField(blank=True, max_length=128, null=True, verbose_name='组件路径')),
        #         ('target', models.SmallIntegerField(choices=[(0, '组件'), (1, '内链'), (2, '外链')], default=0)),
        #         ('remark', models.CharField(blank=True, max_length=255, null=True, verbose_name='备注')),
        #         ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
        #         ('creator', models.CharField(blank=True, max_length=64, null=True, verbose_name='创建者')),
        #         ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
        #         ('updater', models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者')),
        #         ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='菜单状态')),
        #     ],
        #     options={
        #         'verbose_name': '菜单',
        #         'verbose_name_plural': '菜单',
        #         'db_table': 'win_system_menu',
        #         'unique_together': {('name', 'permission')},
        #     },
        # ),
        migrations.CreateModel(
            name='SystemRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='角色名称')),
                ('code', models.CharField(max_length=64, verbose_name='角色标识')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='状态')),
                ('type', models.IntegerField(blank=True, null=True, verbose_name='角色类型')),
                ('sort', models.IntegerField(default=0, verbose_name='排序')),
                ('remark', models.CharField(blank=True, max_length=255, null=True, verbose_name='备注')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('creator', models.CharField(blank=True, max_length=255, null=True, verbose_name='创建者')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('updater', models.CharField(blank=True, max_length=64, null=True, verbose_name='更新者')),
                ('is_builtin', models.BooleanField(default=False, verbose_name='是否内置')),
            ],
            options={
                'verbose_name': '角色',
                'verbose_name_plural': '角色',
                'db_table': 'win_system_role',
                'ordering': ('-sort',),
                'unique_together': {('code',)},
            },
        ),
        migrations.CreateModel(
            name='SystemUserRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_id', models.ForeignKey(help_text='关联角色', on_delete=django.db.models.deletion.CASCADE, related_name='user_role', to='system.systemrole')),
                ('user_id', models.ForeignKey(help_text='关联用户', on_delete=django.db.models.deletion.CASCADE, related_name='user_role', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': '用户角色',
                'verbose_name_plural': '用户角色',
                'db_table': 'win_user_role',
            },
        ),
        # migrations.CreateModel(
        #     name='SystemRoleMenu',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('menu_id', models.ForeignKey(help_text='关联菜单', on_delete=django.db.models.deletion.CASCADE, related_name='role_menu', to='system.systemmenu')),
        #         ('role_id', models.ForeignKey(help_text='关联角色', on_delete=django.db.models.deletion.CASCADE, related_name='role_menu', to='system.systemrole')),
        #     ],
        #     options={
        #         'verbose_name': '角色菜单',
        #         'verbose_name_plural': '角色菜单',
        #         'db_table': 'win_system_role_menu',
        #     },
        # ),
        migrations.CreateModel(
            name='SystemConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=128, verbose_name='字段KEY')),
                ('name', models.CharField(max_length=128, verbose_name='字段名称')),
                ('type', models.CharField(choices=[('Input', '输入框'), ('InputNumber', '数字'), ('Textarea', '文本域'), ('Select', '下拉选择框'), ('Radio', '单选框'), ('Checkbox', '复选框'), ('Date', '日期'), ('Time', '时间'), ('DateTime', '日期+时间'), ('DateRange', '时间区间'), ('Cascader', '级联'), ('Switch', '开关'), ('SelectGroup', '选择(按钮组)')], default='Input', max_length=64, verbose_name='字段类型')),
                ('options', models.JSONField(blank=True, default=dict, null=True, verbose_name='可选项')),
                ('upload_type', models.IntegerField(blank=True, choices=[(1, '单图'), (2, '多图'), (3, '文件')], null=True, verbose_name='上传文件格式')),
                ('required', models.BooleanField(default=False, verbose_name='是否必填')),
                ('width', models.IntegerField(blank=True, null=True, verbose_name='多行文本框宽度')),
                ('height', models.IntegerField(blank=True, null=True, verbose_name='多行文本框的高度')),
                ('value', models.TextField(blank=True, null=True, verbose_name='值')),
                ('info', models.CharField(blank=True, max_length=255, null=True, verbose_name='配置名称')),
                ('desc', models.CharField(blank=True, max_length=255, null=True, verbose_name="'配置简介")),
                ('sort', models.IntegerField(default=0, verbose_name='排序')),
                ('status', models.IntegerField(default=0, verbose_name='状态')),
                ('config_tab_id', models.ForeignKey(help_text='关联配置选项卡', on_delete=django.db.models.deletion.CASCADE, related_name='config', to='system.systemconfigtab')),
            ],
            options={
                'verbose_name': '系统配置',
                'verbose_name_plural': '系统配置',
                'db_table': 'win_system_config',
            },
        ),
    ]
