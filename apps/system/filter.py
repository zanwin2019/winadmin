from django_filters import rest_framework as filters
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


class SystemMenuFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")

    class Meta:
        model = SystemMenu
        exclude = []


class SystemRoleFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")

    class Meta:
        model = SystemRole
        exclude = []


class SystemRoleMenuFilter(filters.FilterSet):
    role_id = filters.CharFilter(field_name="role_id", lookup_expr="exact")

    class Meta:
        model = SystemRoleMenu
        exclude = []


class SystemConfigTabFilter(filters.FilterSet):
    title = filters.CharFilter(field_name="title", lookup_expr="contains")

    class Meta:
        model = SystemConfigTab
        exclude = []


class SystemConfigFilter(filters.FilterSet):
    key = filters.CharFilter(method="search_key")

    class Meta:
        model = SystemConfig
        exclude = ['options', ]

    def search_key(self, queryset, *args):
        key = args[1]
        keys = key.split(',')
        return queryset.filter(key__in=keys)


class SystemDeptFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")
    id = filters.NumberFilter(field_name="id", lookup_expr="exact")

    class Meta:
        model = SystemDept
        exclude = []


class SystemPostFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")

    class Meta:
        model = SystemPost
        exclude = []


class SysDictFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")
    key = filters.CharFilter(field_name="key", lookup_expr="contains")
    is_enabled = filters.BooleanFilter(field_name='is_enabled', lookup_expr="exact")

    class Meta:
        model = SysDict
        exclude = []


class DictDataFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")
    key = filters.CharFilter(field_name="key", lookup_expr="contains")

    class Meta:
        model = DictData
        exclude = []
