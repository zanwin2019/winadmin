from rest_framework.routers import DefaultRouter
from pkg.audit.views import AuditLogViewset

routers = DefaultRouter(trailing_slash=True)

routers.register(r"audit_logs", AuditLogViewset, basename="audit_logs")

urlpatterns = routers.urls
