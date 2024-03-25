from django.contrib import admin
from .models import AuditLog


# Register your models here.
@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    search_fields = [
        'operation_model',
        'operation_object',
        'operation_action',
        'user_ip',
    ]
    list_display = [
        'operation_model',
        'operation_object',
        'operation_action',
        'user_ip',
        'user_agent',
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'operation_object',
    )
    list_editable = (
    )
