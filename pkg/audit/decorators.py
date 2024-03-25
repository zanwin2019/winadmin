from functools import wraps
from .models import AuditLog

def audit_log_decorator(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        action = request.method
        target = request.path
        AuditLog.objects.create(user=user, action=action, target=target)
        return func(request, *args, **kwargs)
    return wrapper