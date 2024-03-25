from pkg.drf import viewsets
from .serializer import TenantSerializer, DomainsSerializer
from .models import Tenant, Domain
from .filter import PlatformTenantFilter
from django_filters import rest_framework as filters
from django_tenants.utils import schema_context
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.system.models import SystemMenu
from django.forms import model_to_dict


# Create your views here.
class PlatformTenantViewSet(viewsets.ModelViewSet):
    serializer_class = TenantSerializer
    queryset = Tenant.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PlatformTenantFilter

    @action(methods=['post'], detail=False, url_path='bind_role_menu', url_name='bind_role_menu')
    def bind_role_menu(self, request):
        schema_name = request.data.get('schema_name')
        menu_ids = request.data.get('menu_ids', [])
        with schema_context(schema_name):
            existing_menus = SystemMenu.objects.all()
            existing_menu_ids = set(existing_menus.values_list('id', flat=True))

            selected_menu_ids = set(menu_ids)

            # 删除不再需要的菜单记录
            menus_to_delete = existing_menu_ids - selected_menu_ids
            delete_role_menus = SystemMenu.objects.filter(id__in=menus_to_delete)
            # 删除菜单
            delete_role_menus.delete()

            # 添加新增的菜单记录
            menus_to_add = selected_menu_ids - existing_menu_ids
        
        add_role_menus = SystemMenu.objects.filter(id__in=menus_to_add)
        add_menus_data = list(add_role_menus)

        with schema_context(schema_name):
            SystemMenu.objects.bulk_create(add_menus_data)

        return Response()
    
    @action(methods=['get'], detail=False, url_path='role_menu', url_name='role_menu')
    def role_menu(self, request):
        schema_name = request.GET.get('schema_name', 'public')
        with schema_context(schema_name):
            existing_menus = SystemMenu.objects.all()
            menus = [model_to_dict(menu) for menu in existing_menus]
        
        return Response(sorted(menus, key=lambda x: x['sort']))


class PlatformDomainViewSet(viewsets.ModelViewSet):
    serializer_class = DomainsSerializer
    queryset = Domain.objects.all()
