from django.db import models
from pkg.common.constants import * #noqa
from django.contrib.auth.models import User
from django_tenants.models import TenantMixin, DomainMixin
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from apps.system.utils import get_json_data


# Create your models here.
class Tenant(TenantMixin):
    name = models.CharField(_("租户名称"), max_length=LEN_NORMAL)
    contact_person = models.CharField(_("联系人"), max_length=LEN_SHORT)
    contact_email = models.CharField(_("联系邮箱"), max_length=LEN_NORMAL)
    contact_phone = models.CharField(_("联系电话"), max_length=LEN_SHORT)
    status = models.IntegerField(_("租户状态"), choices=STATUS_CHOICES, default=1)
    expire_date = models.DateTimeField(_("过期时间"))
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    remark = models.TextField(_("备注"), null=True, blank=True)
    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)

    class Meta:
        app_label = 'platforms'
        db_table = 'win_tenant'
        verbose_name = verbose_name_plural = '租户'

    @classmethod
    def init_builtin_data(cls):
        data = get_json_data(settings.SYSTEM_TENANT_PATH)
        for item in data:
            domain_data = item.pop("data")

            instance, _ = cls.objects.get_or_create(
                name=item.get('name'), defaults=item)
            Domain.init_builtin_data(instance, domain_data)


class Domain(DomainMixin):
    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    created_at = models.DateTimeField(_("创建时间"), auto_now_add=True)
    updated_at = models.DateTimeField(_("更新时间"), auto_now=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)
    class Meta:
        app_label = 'platforms'
        db_table = 'win_domain'
        verbose_name = verbose_name_plural = '域名'

    @classmethod
    def init_builtin_data(cls, tenant=None, domain_data=None):
        for item in domain_data:
            cls.objects.get_or_create(
                domain=item.get('domain'), tenant=tenant, defaults=item
            )
