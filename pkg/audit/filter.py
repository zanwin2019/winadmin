from django_filters import rest_framework as filters
from .models import AuditLog
from apps.account.models import WaUser


class AuditLogFilter(filters.FilterSet):
    operator = filters.Filter(method='search_user')
    request_method = filters.CharFilter(field_name="request_method", lookup_expr="exact")
    operation_action = filters.CharFilter(field_name="operation_action", lookup_expr="exact")
    start_time = filters.Filter(field_name="timestamp", lookup_expr="gte")
    end_time = filters.Filter(field_name="timestamp", lookup_expr="lte")

    class Meta:
        model = AuditLog
        exclude = []

    def search_user(self, queryset, *arg):
        key = arg[1]
        return queryset.filter(user__username__contains=key)
