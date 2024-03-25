import os
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.utils.functional import cached_property
from mptt.models import MPTTModel, TreeManager, TreeForeignKey
from rest_framework import serializers
from pkg.common.constants import * # noqa
from pkg.common.log import logger
from apps.system.constants import TYPE_CHOICES, METHOD_CHOICES, TARGET_CHOICES, STATUS
from apps.system import managers
from apps.system.utils import fill_tree_route
from pkg.casbin.adapter import adapter


class Model(models.Model):
    """基础字段"""

    DISPLAY_FIELDS = (
        'is_builtin',
        'creator',
        'create_at',
        'updater',
        'update_at',
    )
    READONLY_FIELDS = ("is_builtin",)

    creator = models.CharField(_("创建者"), max_length=LEN_LONG, null=True, blank=True)
    create_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    update_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)
    is_deleted = models.BooleanField(_("是否软删除"), default=False)
    is_builtin = models.BooleanField(_("是否内置"), default=False)

    class Meta:
        abstract = True

    objects = models.Manager()
    _objects = models.Manager()

    def delete(self, using=None):
        self.is_deleted = True
        self.save()

    def hard_delete(self, using=None):
        super(Model, self).delete()


class BaseMpttModel(Model, MPTTModel):
    """基础字段"""

    _objects = TreeManager()
    objects = managers.BaseTreeManager()

    class Meta:
        app_label = 'system'
        abstract = True

    def delete(self, using=None):
        self.is_deleted = True
        self.save()

    def hard_delete(self, using=None):
        super(BaseMpttModel, self).delete()


class SystemMenu(MPTTModel):
    name = models.CharField(_("菜单名称"), max_length=LEN_NORMAL)
    type = models.IntegerField(_("菜单类型"), choices=TYPE_CHOICES, default=3)
    permission = models.CharField(_("权限标识"), max_length=LEN_MIDDLE)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, verbose_name=_("上级目录"),
                            null=True, blank=True, related_name='children')
    path = models.CharField(_("路由地址"), max_length=LEN_LONG, null=True, blank=True)
    icon = models.CharField(_("菜单图标"), max_length=LEN_SHORT, null=True, blank=True)
    href = models.CharField(_("API接口地址"), max_length=LEN_MIDDLE, null=True, blank=True)
    method = models.CharField(_("请求方法"), choices=METHOD_CHOICES, max_length=LEN_SHORT, null=True, blank=True)
    params = models.CharField(_("请求参数"), max_length=LEN_LONG, null=True, blank=True)
    sort = models.IntegerField(_("排序"), default=EMPTY_INT)
    is_hidden = models.IntegerField(_("是否隐藏"), default=EMPTY_INT)
    redirect = models.CharField(_("重定向"), max_length=LEN_LONG, null=True, blank=True)
    component = models.CharField(_("组件路径"), max_length=LEN_MIDDLE, blank=True, null=True)
    target = models.SmallIntegerField(choices=TARGET_CHOICES, default=EMPTY_INT)
    remark = models.CharField(_("备注"), max_length=LEN_LONG, blank=True, null=True)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)
    status = models.IntegerField(_("菜单状态"), choices=STATUS, default=1)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_menu'
        verbose_name = _("菜单")
        verbose_name_plural = _("菜单")
        unique_together = ['name', 'permission']

    class MPTTMeta:
        parent_attr = 'parent'
        order_insertion_by = ['name']

    def __str__(self):
        return self.name

    @classmethod
    def init_builtin_data(cls):
        from .utils import get_json_data
        data = get_json_data(settings.SYSTEM_MENU_PATH)
        for item in data:
            cls.init_menu_data(item)

    @classmethod
    def init_menu_data(cls, menu_data, parent=None):
        if "children" in menu_data.keys():
            children = menu_data.pop("children")
        else:
            children = []

        instance, _ = cls.objects.get_or_create(
            name=menu_data.get('name'), permission=menu_data.get('permission'),
            parent=parent, defaults=menu_data
        )
        for i in children:
            cls.init_menu_data(i, instance)


class SystemRole(models.Model):
    name = models.CharField(_("角色名称"), max_length=LEN_NORMAL)
    code = models.CharField(_("角色标识"), max_length=LEN_NORMAL)
    status = models.IntegerField(_("状态"), choices=STATUS, default=1)
    type = models.IntegerField(_("角色类型"), null=True, blank=True)
    sort = models.IntegerField(_("排序"), default=EMPTY_INT)
    remark = models.CharField(_("备注"), max_length=LEN_LONG, blank=True, null=True)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    creator = models.CharField(_("创建者"), max_length=LEN_LONG, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)
    is_builtin = models.BooleanField(_("是否内置"), default=False)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_role'
        verbose_name = _("角色")
        verbose_name_plural = _("角色")
        unique_together = ['code']
        ordering = ("-sort",)

    def __str__(self):
        return self.name

    @classmethod
    def init_builtin_data(cls):
        from .utils import get_json_data
        data = get_json_data(settings.SYSTEM_ROLE_PATH)
        for item in data:
            instance, _ = cls.objects.get_or_create(
                code=item.get('code'), defaults=item
            )
            ptype = 'p'
            rule = [item['code'], '*', '*']
            if not adapter.rule_is_exists(ptype, rule):
                adapter.add_policy(sec=None, ptype=ptype, rule=rule)
            SystemRoleMenu.init_builtin_data(instance)
            SystemUserRole.init_builtin_data(instance)


class SystemRoleMenu(models.Model):
    role_id = models.ForeignKey(SystemRole, related_name='role_menu', help_text=_("关联角色"), on_delete=models.CASCADE)
    menu_id = models.ForeignKey(
        SystemMenu, related_name='role_menu', help_text=_("关联菜单"), on_delete=models.CASCADE)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_role_menu'
        verbose_name = _("角色菜单")
        verbose_name_plural = _("角色菜单")

    def __str__(self):
        return f"{self.role_id_id}_{self.menu_id_id}"

    @classmethod
    def init_builtin_data(cls, role):
        for item in SystemMenu.objects.all():
            cls.objects.get_or_create(
                role_id=role,
                menu_id=item
            )


class SystemUserRole(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_role', help_text=_("关联用户"), on_delete=models.CASCADE)
    role_id = models.ForeignKey(SystemRole, related_name='user_role', help_text=_("关联角色"), on_delete=models.CASCADE)

    class Meta:
        app_label = 'system'
        db_table = 'win_user_role'
        verbose_name = _("用户角色")
        verbose_name_plural = _("用户角色")

    @classmethod
    def init_builtin_data(cls, role):
        from apps.account.models import WaUser

        for item in WaUser.objects.filter(username='admin'):
            cls.objects.get_or_create(
                role_id=role,
                user_id=item
            )
            ptype = 'g'
            rule = [item, role.code, '*']
            if not adapter.rule_is_exists(ptype, rule):
                adapter.add_policy(sec=None, ptype=ptype, rule=rule)


class SystemConfigTab(models.Model):
    pid = models.IntegerField(_("父级ID"), default=EMPTY_INT)
    title = models.CharField(_("选项卡名称"), max_length=LEN_MIDDLE)
    code = models.CharField(_("选项卡标识"), max_length=LEN_MIDDLE)
    status = models.IntegerField(_("状态"), default=EMPTY_INT)
    is_display = models.IntegerField(_("是否显示"), default=1)
    icon = models.CharField(_("图标"), max_length=LEN_NORMAL, null=True, blank=True)
    type = models.IntegerField(_("配置类型"), null=True, blank=True)
    sort = models.IntegerField(_("排序"), null=True, blank=True)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_config_tab'
        verbose_name = _("系统配置选项卡")
        verbose_name_plural = _("系统配置选项卡")


class SystemConfig(models.Model):
    UPLOAD_TYPE = (
        (1, _("单图")),
        (2, _("多图")),
        (3, _("文件"))
    )
    FORM_TYPE = (
        ('input', _("输入框")),
        ('number', _("数字输入框")),
        ('textarea', _("文本域")),
        ('select', _("下拉选择框")),
        ('radio', _("单选框")),
        ('checkbox', _("复选框")),
        ('date', _("日期")),
        ('time', _("时间")),
        ('datetime', _("日期+时间")),
        ('datetime-to-datetime', _("时间区间")),
        ('cascader', _("级联")),
        ('switch', _("开关"))
    )
    key = models.CharField(_("字段KEY"), max_length=LEN_MIDDLE)
    label = models.CharField(_("字段名称"), max_length=LEN_MIDDLE)
    type = models.CharField(_("字段类型"), choices=FORM_TYPE, default='Input', max_length=LEN_NORMAL)
    config_tab_id = models.ForeignKey(SystemConfigTab, related_name='config',
                                      help_text=_("关联配置选项卡"), on_delete=models.CASCADE)
    options = models.JSONField(_("可选项"), default=dict, null=True, blank=True)
    upload_type = models.IntegerField(_("上传文件格式"), choices=UPLOAD_TYPE, null=True, blank=True)
    rule = models.BooleanField(_("是否必填"), default=True)
    isrow = models.BooleanField(_("是否整行"), default=False)
    width = models.IntegerField(_("多行文本框宽度"), null=True, blank=True)
    height = models.IntegerField(_("多行文本框的高度"), null=True, blank=True)
    value = models.TextField(_("值"), null=True, blank=True)
    info = models.CharField(_("配置名称"), max_length=LEN_LONG, null=True, blank=True)
    desc = models.CharField(_("'配置简介"), max_length=LEN_LONG, null=True, blank=True)
    sort = models.IntegerField(_("排序"), default=EMPTY_INT)
    disabled = models.BooleanField(_("是否禁用"), default=False)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_config'
        verbose_name = _("系统配置")
        verbose_name_plural = _("系统配置")


class SystemDept(models.Model):
    name = models.CharField(_("部门名称"), max_length=LEN_MIDDLE)
    parent_id = models.IntegerField(_("父部门ID"), default=EMPTY_INT)
    desc = models.CharField(_("描述"), max_length=LEN_LONG, blank=True, null=True)
    leader = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='system_dept', help_text=_("部门负责人"), on_delete=models.SET_NULL, null=True, blank=True)
    sort = models.IntegerField(_("排序"), default=EMPTY_INT)
    status = models.IntegerField(_("状态"), default=EMPTY_INT)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_dept'
        verbose_name = _("部门")
        verbose_name_plural = _("部门")


class SystemPost(models.Model):
    name = models.CharField(_("岗位名称"), max_length=LEN_MIDDLE)
    code = models.CharField(_("岗位编码"), max_length=LEN_NORMAL)
    sort = models.IntegerField(_("排序"), default=EMPTY_INT)
    remark = models.CharField(_("备注"), max_length=LEN_LONG, blank=True, null=True)
    status = models.IntegerField(_("状态"), default=EMPTY_INT)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    creator = models.CharField(_("创建者"), max_length=LEN_LONG, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)

    class Meta:
        app_label = 'system'
        db_table = 'win_system_post'
        verbose_name = _("岗位")
        verbose_name_plural = _("岗位")


class SysDict(Model):
    key = models.CharField(_("编码"), max_length=LEN_LONG)
    name = models.CharField(_("名称"), max_length=LEN_LONG)
    desc = models.CharField(
        _("描述"),
        max_length=LEN_LONG,
        null=True,
        blank=True)
    is_enabled = models.BooleanField(_("是否启用"), default=True)
    is_readonly = models.BooleanField(_("是否只读"), default=False)
    is_show = models.BooleanField(_("是否显示"), default=True)

    _objects = models.Manager()
    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'system'
        verbose_name = _("数据字典")
        verbose_name_plural = _("数据字典")

    @classmethod
    def init_builtin_data(cls):
        from apps.system.utils import get_jsonfile_content

        if not hasattr(settings, "DATADICTS_JSON_PATH"):
            return
        files = settings.DATADICTS_JSON_PATH
        if not os.path.exists(files):
            logger.error(f"数据字典初始化失败！error: {files} 路径不存在！")
            return
        if os.path.isfile(files) and not files.endswith(".json"):
            logger.error("数据字典初始化失败！error: 文件格式非json！")
            return
        data = get_jsonfile_content(files)

        for item in data:
            dict_data = item.pop("data")
            instance, _ = cls.objects.get_or_create(key=item.pop("key"), defaults=item)
            DictData.init_builtin_data(instance, dict_data=dict_data)

    def delete(self, *args, **kwargs):
        self.dict_data.all().update(is_deleted=True)

        super(SysDict, self).delete(*args, **kwargs)

    @property
    def sets_data(self):
        """字典数据的集合视图"""
        data = self.dict_data.filter(is_deleted=False)
        return {item.key for item in data}

    @property
    def list_data(self):
        """字典数据的列表视图"""
        data = self.dict_data.filter(is_deleted=False)
        return [{"id": item.id, "key": item.key, "name": item.name} for item in data]

    @property
    def tree_data(self):
        """字典数据的树状视图"""
        roots = self.dict_data.filter(level=0, is_deleted=False)
        roots = roots.order_by("lft", "id")
        tree = [DictData.subtree(root) for root in roots]
        for sub_tree in tree:
            fill_tree_route(sub_tree)
        return tree

    def get_data_by_key(self, view_type="list"):
        """根据字典表编码获取字典数据（支持列表视图和树状视图）"""
        if view_type == "tree":
            return self.tree_data
        elif view_type == "sets":
            return self.sets_data
        else:
            return self.list_data

    @property
    def get_used_data_by_key(self, is_used=True):
        """查询已经使用的字典数据"""
        roots = self.dict_data.filter(level=0, is_deleted=False)
        roots = roots.order_by("lft", "id")
        tree = [DictData.subtree(root, is_used=is_used) for root in roots]
        # # 没有子集，可用为0，返回 None。去除 空元素
        tree = list(filter(None, tree))
        return tree


class DictData(BaseMpttModel):
    """字典数据"""

    dict_table = models.ForeignKey(
        to=SysDict,
        related_name='dict_data',
        help_text=_("关联字典项"), on_delete=models.CASCADE)
    key = models.CharField(_("编码"), max_length=LEN_LONG)
    name = models.CharField(_("名称"), max_length=LEN_LONG)
    order = models.IntegerField(_("顺序"))
    is_readonly = models.BooleanField(_("是否只读（不可编辑）"), default=False)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, verbose_name=_("上级目录"),
                            null=True, blank=True, related_name='children')
    use_number = models.IntegerField(_("使用次数"), default=0)

    _objects = TreeManager()
    objects = managers.BaseTreeManager()

    def __unicode__(self):
        return '{}({})'.format(self.name, self.key)

    def delete(self, *args, **kwargs):
        if not self.is_leaf_node() and self.get_children().filter(is_deleted=False).count() > 0:
            raise serializers.ValidationError(_("请先删除【{}】下的子数据项").format(self.name))

        super(DictData, self).delete(*args, **kwargs)

    class Meta:
        ordering = ('order',)
        app_label = 'system'
        verbose_name = _("字典数据")
        verbose_name_plural = _("字典数据")

    class MPTTMeta:
        parent_attr = 'parent'
        order_insertion_by = ['name']

    @cached_property
    def parent_name(self):
        """用箭头连接的父级的名称"""
        return '->'.join([c.name for c in self.get_ancestors()])

    @cached_property
    def parent_key(self):
        """父级的key"""
        return self.parent.key

    @staticmethod
    def subtree(node, is_used=False):
        """获取以node为根的子树"""
        # 获取直接子级
        node_children = node.get_children().filter(is_deleted=False)

        children = [node.subtree(child, is_used=is_used) for child in node_children]
        # 过滤掉空的
        children = list(filter(None, children))
        # 如果 没有子集，并且当前使用次数为0，返回空
        if not children and node.use_number < 1 and is_used:
            return None
        return {
            'id': node.id,
            'key': node.key,
            'name': node.name,
            'level': node.level,
            'parent_id': getattr(node.parent, 'id', None),
            'parent_key': getattr(node.parent, 'key', ''),
            'children': children,
            'use_number': node.use_number
        }

    @classmethod
    def update_used_num(cls, sys_key, dict_key, action):
        try:
            sys = SysDict.objects.get(key=sys_key)
            dict_data = DictData.objects.get(key=dict_key, dict_table=sys)
            # 为1 说明引用，加1.其他减1.
            if action == 1:
                dict_data.use_number = dict_data.use_number + 1
                dict_data.save()
                return dict_data
            dict_data.use_number = dict_data.use_number - 1
            dict_data.save()
            return dict_data

        except DictData.DoesNotExist:
            raise serializers.ValidationError(_("字典数据不存在，请检查字典编码: %s") % dict_key)

    @classmethod
    def init_builtin_data(cls, dict_table: SysDict, parent=None, dict_data: list = None):
        """
        初始化内置字典数据
        @param {SysDict} dict_table 数据字典实例
        @param {DictData} [parent] 父级字典数据实例
        @param {list} dict_data 字典数据
        """
        for item in dict_data:
            if "children" in item.keys():
                children = item.pop("children")
            else:
                children = None
            instance, _ = cls.objects.get_or_create(
                dict_table=dict_table, key=item.pop("key"), parent=parent, defaults=item
            )
            if children:
                cls.init_builtin_data(dict_table, parent=instance, dict_data=children)
