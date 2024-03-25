from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    timestamp = models.DateTimeField(_("操作时间"), auto_now_add=True)
    operation_model = models.CharField(_("操作模块"), max_length=100)
    operation_object = models.TextField(_("操作对象"), null=True, blank=True)
    operation_action = models.CharField(_("操作类型"), max_length=100)
    request_method = models.CharField(_("请求方法名"), max_length=10)
    request_path = models.CharField(_("请求地址"), max_length=200)
    request_data = models.TextField(_("请求数据"))
    response_data = models.TextField(_("响应数据"))
    response_status_code = models.PositiveIntegerField(_("响应码"))
    user_ip = models.GenericIPAddressField(_("用户IP"))
    user_agent = models.CharField(_("浏览器UA"), max_length=200)

    class Meta:
        app_label = 'audit'
        db_table = "win_audit_log"
        verbose_name = _("操作日志")
        verbose_name_plural = _("操作日志")

    @property
    def operator(self):
        return self.user.username if self.user.username else None
