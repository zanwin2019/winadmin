from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.utils.translation import gettext_lazy as _
from .models import (
    SystemMenu,
    SystemRole,
    SystemRoleMenu,
    SystemConfigTab,
    SystemConfig,
    SystemDept,
    SystemPost,
    SysDict,
    DictData
)
from apps.system.validators import key_validator, name_validator
from pkg.casbin.adapter import adapter
from django.forms import model_to_dict


class SystemMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemMenu
        fields = '__all__'

    def subtree(self, node):
        # 获取当前菜单的子菜单
        children_menus = node.get_children().order_by("sort")
        children_serializer = SystemMenuSerializer(children_menus, many=True)
        return children_serializer.data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['children'] = self.subtree(instance)
        return representation


class SystemRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemRole
        fields = '__all__'


class SystemRoleMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemRoleMenu
        fields = '__all__'

    def create(self, validated_data):
        instance = super().create(validated_data)
        if instance.menu_id.type == 4:
            adapter.add_policy(sec=None, ptype='p', rule=[instance.role_id.code,
                                                          instance.menu_id.href, instance.menu_id.get_method_display()])

        return instance


class SystemConfigTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfigTab
        fields = '__all__'

    def get_children(self, obj):
        # 获取当前选项卡的子选项卡
        children_configs = SystemConfigTab.objects.filter(pid=obj.id, is_display=1, status=1).order_by("sort")
        if children_configs:
            children_serializer = SystemConfigTabSerializer(children_configs, many=True)
            return children_serializer.data
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['children'] = self.get_children(instance)
        configs = SystemConfig.objects.filter(config_tab_id=instance).order_by('sort')
        representation['configs'] = [model_to_dict(config) for config in configs]
        return representation


class SystemConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfig
        fields = '__all__'


class SystemDeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemDept
        fields = '__all__'

    def get_children(self, obj):
        # 获取当前菜单的子菜单
        children_depts = SystemDept.objects.filter(parent_id=obj.id).order_by("sort")
        if children_depts:
            children_serializer = SystemDeptSerializer(children_depts, many=True)
            return children_serializer.data
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['chname'] = instance.leader.chname if instance.leader else ""
        representation['children'] = self.get_children(instance)
        return representation


class SystemPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemPost
        fields = '__all__'


class DictDataSerializer(serializers.ModelSerializer):
    """数据字典数据项序列化"""

    key = serializers.CharField(
        required=True, error_messages={"blank": _("编码不能为空")}, validators=[key_validator]
    )
    name = serializers.CharField(
        required=True, error_messages={"blank": _("名称不能为空")}, validators=[]
    )
    order = serializers.IntegerField(required=False, min_value=1)

    class Meta:
        model = DictData
        fields = (
            "id",
            "key",
            "name",
            "level",
            "order",
            "parent",
            "parent_key",
            "parent_name",
            "is_readonly",
            "dict_table",
            "use_number",
        )
        read_only_fields = (
            "id",
            "level",
            "is_readonly",
            "parent_key",
            "parent_name",
            "use_number",
        ) + model.READONLY_FIELDS

        validators = [
            UniqueTogetherValidator(queryset=DictData.objects.filter(is_deleted=0), fields=["key", "dict_table"])
        ]


class SysDictSerializer(serializers.ModelSerializer):
    """数据字典序列化"""

    key = serializers.CharField(
        required=True, error_messages={"blank": _("编码不能为空")}, validators=[key_validator]
    )
    name = serializers.CharField(
        required=True, error_messages={"blank": _("名称不能为空")}, validators=[name_validator]
    )

    class Meta:
        model = SysDict
        fields = (
            "id",
            "key",
            "name",
            "desc",
            "is_enabled",
            "is_readonly",
        ) + model.DISPLAY_FIELDS
        read_only_fields = model.READONLY_FIELDS

    def validate(self, attrs):
        key = attrs.get('key')
        if self.instance:
            if SysDict.objects.filter(key=key).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError('key值已存在')
        else:
            if SysDict.objects.filter(key=key).exists():
                raise serializers.ValidationError('key值已存在')
        return attrs

    def to_representation(self, instance):
        data = super(SysDictSerializer, self).to_representation(instance)
        data["name"] = _(data["name"])
        return data
