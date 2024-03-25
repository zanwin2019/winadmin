from builtins import object
from django.conf import settings
from django.core import validators
from django.db import models
from django.utils.translation import gettext as _, gettext_lazy as _l
from django.contrib.auth.models import AbstractUser
from pkg.common.constants import LEN_NORMAL
from apps.system.models import SystemRole


class WaUser(AbstractUser):
    """
    WinAdmin user

    username and password are required. Other fields are optional.
    """

    chname = models.CharField(_l("中文名"), max_length=254, blank=True)
    company = models.CharField(_l("公司"), max_length=128, blank=True)
    qq = models.CharField(_l("QQ号"), max_length=32, blank=True)
    phone = models.CharField(_l("手机号"), max_length=64, blank=True)
    email = models.EmailField(_l("邮箱"), max_length=254, blank=True)

    creator = models.CharField(_("创建者"), max_length=LEN_NORMAL, null=True, blank=True)
    updater = models.CharField(_("更新者"), max_length=LEN_NORMAL, null=True, blank=True)

    USERNAME_FIELD = "username"

    class Meta(object):
        db_table = 'win_user'
        verbose_name = _("用户")
        verbose_name_plural = _("用户")

    @classmethod
    def init_builtin_data(cls):
        from apps.system.utils import get_json_data
        from django.contrib.auth.hashers import make_password

        user_data = get_json_data(settings.SYSTEM_ACCOUNT_PATH)
        for item in user_data:
            item['password'] = make_password(item['password'])
            cls.objects.get_or_create(
                username=item.get('username'), defaults=item
            )

class WaUserProperty(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='property')
    key = models.CharField(max_length=LEN_NORMAL, help_text=_('Required. 64 characters or fewer. Letters, digits and underlined only.'),
        validators = [validators.RegexValidator(r'^[a-zA-Z0-9_]+$', _('Enter a valid key. This value may contain only letters, numbers and underlined characters.'), 'invalid'),
        ],
    )
    value = models.TextField()

    class Meta:
        verbose_name = _('用户属性')
        verbose_name_plural = _('用户属性')
        db_table = 'win_user_property'
        unique_together = (('user', 'key'), )


class Loignlog(models.Model):
    """
    User login log
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="loginlog", verbose_name=_l("用户"))
    login_time = models.DateTimeField(_l("登录时间"))
    login_browser = models.CharField(_l("登录浏览器"), max_length=200, blank=True, null=True)
    login_ip = models.CharField(_l("用户登录ip"), max_length=50, blank=True, null=True)
    login_addr = models.CharField(_l("登录地址"), max_length=255, blank=True, null=True)
    login_country = models.CharField(_l("登录地址(国家)"), max_length=255, blank=True, null=True)
    login_province = models.CharField(_l("登录地址(省份)"), max_length=255, blank=True, null=True)
    login_city = models.CharField(_l("登录地址(城市)"), max_length=255, blank=True, null=True)
    login_os = models.CharField(_l("登录设备操作系统"), max_length=100, blank=True, null=True)
    login_user_agent = models.TextField(_l('userAgent'), blank=True, null=True)

    class Meta:
        db_table = 'win_user_login_log'
        verbose_name = _l("用户登录日志")
        verbose_name_plural = _l("用户登录日志")
