from rest_framework.response import Response
from django_filters import rest_framework as filters
from pkg.drf import viewsets
from pkg.casbin.adapter import adapter
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
from .serializer import (
    SystemMenuSerializer,
    SystemRoleSerializer,
    SystemRoleMenuSerializer,
    SystemConfigTabSerializer,
    SystemConfigSerializer,
    SystemDeptSerializer,
    SystemPostSerializer,
    SysDictSerializer,
    DictDataSerializer
)
from .filter import (
    SystemMenuFilter,
    SystemRoleFilter,
    SystemRoleMenuFilter,
    SystemConfigTabFilter,
    SystemConfigFilter,
    SystemDeptFilter,
    SystemPostFilter,
    DictDataFilter,
    SysDictFilter
)
from rest_framework.decorators import action
from rest_framework import status


class SystemMenuViewSet(viewsets.ModelViewSet):
    queryset = SystemMenu.objects.all().order_by('sort')
    serializer_class = SystemMenuSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemMenuFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not self.request.query_params:
            queryset = queryset.filter(parent=None)

        organized_data = []
        for parent_menu in queryset:
            parent_data = self.get_serializer(parent_menu).to_representation(parent_menu)
            organized_data.append(parent_data)

        return Response(organized_data)


class SystemRoleViewSet(viewsets.ModelViewSet):
    serializer_class = SystemRoleSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemRoleFilter
    queryset = SystemRole.objects.all().order_by('sort')


class SystemRoleMenuViewSet(viewsets.ModelViewSet):
    serializer_class = SystemRoleMenuSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemRoleMenuFilter
    queryset = SystemRoleMenu.objects.all()

    def create(self, request, *args, **kwargs):
        role_id = request.data.get("role_id")
        menu_ids = request.data.get('menu_ids', [])
        existing_menus = SystemRoleMenu.objects.filter(role_id=role_id)
        existing_menu_ids = set(existing_menus.values_list('menu_id', flat=True))

        selected_menu_ids = set(menu_ids)

        # 删除不再需要的菜单记录
        menus_to_delete = existing_menu_ids - selected_menu_ids
        delete_role_menus = SystemRoleMenu.objects.filter(role_id=role_id, menu_id__in=menus_to_delete)
        for role_menu in delete_role_menus:
                # 删除策略
                adapter.remove_policy(sec=None, ptype='p', rule=[role_menu.role_id.code,
                                                                 role_menu.menu_id.href, role_menu.menu_id.get_method_display()])
        # 删除菜单
        delete_role_menus.delete()

        # 添加新增的菜单记录
        menus_to_add = selected_menu_ids - existing_menu_ids
        bulk_create_list = [{"role_id": role_id, "menu_id": menu_id} for menu_id in menus_to_add]
        serializer = SystemRoleMenuSerializer(data=bulk_create_list, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response()


class SystemConfigTabViewSet(viewsets.ModelViewSet):
    serializer_class = SystemConfigTabSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemConfigTabFilter
    queryset = SystemConfigTab.objects.filter(is_display=1, status=1).order_by('sort')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not self.request.query_params:
            queryset = queryset.filter(pid=0)

        config_data = []
        for parent_config in queryset:
            parent_data = self.get_serializer(parent_config).to_representation(parent_config)
            config_data.append(parent_data)

        return Response(config_data)


class SystemConfigViewSet(viewsets.ModelViewSet):
    serializer_class = SystemConfigSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemConfigFilter
    queryset = SystemConfig.objects.filter(disabled=False).order_by('sort')

    @action(methods=['post'], detail=False, url_path='save_configs', url_name='save_configs')
    def save_configs(self, request, *args, **kwargs):
        config_tab_id = request.data.get('config_tab_id')
        configs = request.data.get('configs', {})
        try:
            tab = SystemConfigTab.objects.get(pk=config_tab_id)
        except SystemConfigTab.DoesNotExist:
            return Response({"detail": "Invalid config_tab_id"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(configs, dict):
            return Response({"detail": "configs should be a dict"}, status=status.HTTP_400_BAD_REQUEST)

        for key, value in configs.items():
            config_data = {}
            config_data['key'] = key
            config_data['config_tab_id'] = tab
            config = SystemConfig.objects.filter(**config_data).first()

            if config:
                config.value = value
                config.save()

        return Response()


class SystemDeptViewSet(viewsets.ModelViewSet):
    serializer_class = SystemDeptSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemDeptFilter
    queryset = SystemDept.objects.all().order_by('sort')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not self.request.query_params:
            queryset = queryset.filter(parent_id=0)

        organized_data = []
        for parent_dept in queryset:
            parent_data = self.get_serializer(parent_dept).to_representation(parent_dept)
            organized_data.append(parent_data)

        return Response(organized_data)


class SystemPostViewSet(viewsets.ModelViewSet):
    serializer_class = SystemPostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SystemPostFilter
    queryset = SystemPost.objects.all().order_by('sort')


class SysDictViewSet(viewsets.ModelViewSet):
    """数据字典视图集合"""

    serializer_class = SysDictSerializer
    queryset = SysDict.objects.all().order_by("-is_builtin", "create_at")
    ordering_fields = "__all__"
    filterset_class = SysDictFilter

    def get_queryset(self):
        if not self.request.query_params.get("page_size"):
            self.pagination_class = None

        return super(SysDictViewSet, self).get_queryset()

    @action(methods=["POST"], detail=False)
    def batch_delete(self, request, *args, **kwargs):
        """批量删除操作"""

        id_list = filter(lambda i: i.isdigit(), request.data.get("id").split(","))

        will_deleted = self.queryset.filter(id__in=id_list)
        real_deleted = list(will_deleted.values_list("id", flat=True))
        will_deleted.delete()

        return Response(real_deleted)

    @action(methods=["GET"], detail=False)
    def get_data_by_key(self, request, *args, **kwargs):
        """获取字典数据，支持两种视图：tree/list"""

        return Response(
            SysDict.get_data_by_key(
                request.query_params.get("key"),
                request.query_params.get("view_type"),
            )
        )

    @action(methods=["POST"], detail=False)
    def update_used_num(self, request, *args, **kwargs):
        """更新字典数据使用次数"""
        import json

        body_data = json.loads(request.body)

        return Response(
            DictData.update_used_num(
                body_data.get("sys_key"),
                body_data.get("dict_key"),
                body_data.get("action", 1),
            )
        )


class SysDictDataViewSet(viewsets.ModelViewSet):
    """字典数据视图集合"""

    serializer_class = DictDataSerializer
    queryset = DictData.objects.all()
    filterset_class = DictDataFilter
    ordering_fields = "order"
