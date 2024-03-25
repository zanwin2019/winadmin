from django.apps import AppConfig
from django.db.models.signals import post_migrate
from pkg.common.log import logger


def app_ready_handler(sender=None, **kwargs):
    try:
        from apps.account.models import WaUser
        # 初始化超级管理员
        WaUser.init_builtin_data()
    except Exception as e:
        logger.error('初始化account模块数据失败，原因: %s' % e)


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.account'

    def ready(self):
        post_migrate.connect(app_ready_handler, sender=self)
