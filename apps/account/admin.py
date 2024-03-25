from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import WaUser, WaUserProperty, Loignlog
from .forms import WaUserChangeForm, WaUserCreationForm


@admin.register(WaUser)
class WaUserAdmin(UserAdmin):
    """
    The forms to add and change user instances.

    The fields to be used in displaying the User model.
    These override the definitions on the base UserAdmin
    """

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("chname",)}),
        (_("Contact info"), {"fields": ("qq", "phone", "email")}),
        (_("Permissions"), {"fields": ("is_superuser",)}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = ((None, {"classes": ("wide",), "fields": ("username", "password1", "password2")}),)
    form = WaUserChangeForm
    add_form = WaUserCreationForm
    list_display = ("username", "chname", "is_superuser")
    list_filter = ("is_superuser",)
    search_fields = (
        "username",
        "chname",
    )
    ordering = ("username",)


@admin.register(WaUserProperty)
class WaUserPropertyAdmin(admin.ModelAdmin):
    list_display = ["key", "value", "user"]


@admin.register(Loignlog)
class LoignlogAdmin(admin.ModelAdmin):
    """
    The forms to add and change login log instances.

    The fields to be used in displaying the Loginlog model.
    """

    list_display = ["user", "login_time", "login_browser", "login_ip", "login_os"]
    search_fields = ["user__username"]
