from django_filters import rest_framework as filters
from .models import Tenant


class PlatformTenantFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")

    class Meta:
        model = Tenant
        exclude = []