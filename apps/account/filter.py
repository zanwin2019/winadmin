from django_filters import rest_framework as filters
from .models import WaUser, WaUserProperty, Loignlog


class WaUserFilter(filters.FilterSet):
    username = filters.CharFilter(field_name="username", lookup_expr="contains")
    id = filters.NumberFilter(field_name="id", lookup_expr="exact")

    class Meta:
        model = WaUser
        exclude = []


class WaUserPropertyFilter(filters.FilterSet):
    key = filters.CharFilter(field_name="key", lookup_expr="contains")

    class Meta:
        model = WaUserProperty
        exclude = []


class LoignlogFilter(filters.FilterSet):
    start_time = filters.Filter(field_name="login_time", lookup_expr="gte")
    end_time = filters.Filter(field_name="login_time", lookup_expr="lte")

    class Meta:
        model = Loignlog
        exclude = []
