from django.contrib import admin
from .models import (
    SystemMenu,
    SystemRole,
    SystemRoleMenu,
    SystemUserRole,
    SystemConfigTab,
    SystemConfig,
    SystemDept,
    SystemPost
)


# Register your models here.
@admin.register(SystemMenu)
class SysMenuAdmin(admin.ModelAdmin):
    search_fields = (
        'name',
    )
    list_display = [
        'id',
        'name'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'name',
    )
    list_editable = (
    )


@admin.register(SystemRole)
class SystemRoleAdmin(admin.ModelAdmin):
    search_fields = (
        'name',
    )
    list_display = [
        'id',
        'name'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'name',
    )
    list_editable = (
    )


@admin.register(SystemRoleMenu)
class SystemRoleMenuAdmin(admin.ModelAdmin):
    search_fields = (
        'role_id',
    )
    list_display = [
        'id',
        'role_id',
        'menu_id'
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


@admin.register(SystemUserRole)
class SystemUserRoleAdmin(admin.ModelAdmin):
    search_fields = (
        'role_id',
    )
    list_display = [
        'id',
        'role_id',
        'user_id'
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


@admin.register(SystemConfigTab)
class SystemConfigTabAdmin(admin.ModelAdmin):
    search_fields = (
        'title',
    )
    list_display = [
        'id',
        'title'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'title',
    )
    list_editable = (
    )


@admin.register(SystemConfig)
class SystemConfigAdmin(admin.ModelAdmin):
    search_fields = (
        'label',
    )
    list_display = [
        'id',
        'label'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'label',
    )
    list_editable = (
    )


@admin.register(SystemDept)
class SysDeptAdmin(admin.ModelAdmin):
    search_fields = (
        'name',
    )
    list_display = [
        'id',
        'name',
        'leader',
        'created_at',
        'sort'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'name',
    )
    list_editable = (
    )


@admin.register(SystemPost)
class SysPostAdmin(admin.ModelAdmin):
    search_fields = (
        'name',
    )
    list_display = [
        'id',
        'name',
        'code',
        'created_at',
        'sort'
    ]
    exclude = [
    ]
    readonly_fields = [
    ]
    list_display_links = (
        'name',
    )
    list_editable = (
    )