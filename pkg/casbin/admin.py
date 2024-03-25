from django.contrib import admin
from .models import CasbinRule


@admin.register(CasbinRule)
class CasbinRuleAdmin(admin.ModelAdmin):
    search_fields = (
        'ptype',
    )
    list_display = [
        'id',
        'ptype',
        'v0',
        'v1',
        'v2'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'id',
    )
    list_editable = (
    )
