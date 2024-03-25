from pkg.drf.viewsets import ModelViewSet
from pkg.audit.models import AuditLog
from .serializer import AuditLogSerializer
from .filter import AuditLogFilter


class AuditLogViewset(ModelViewSet):
    queryset = AuditLog.objects.all().order_by("-timestamp")
    serializer_class = AuditLogSerializer
    filterset_class = AuditLogFilter
