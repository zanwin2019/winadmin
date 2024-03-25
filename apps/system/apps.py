from django.apps import AppConfig
from django.db.models.signals import post_migrate


def app_ready_handler(sender, **kwargs):
    try:
        from apps.system.models import SysDict, SystemMenu, SystemRole
        SysDict.init_builtin_data()
        # system menu init
        SystemMenu.init_builtin_data()
        # role
        SystemRole.init_builtin_data()

    except Exception as e:
        print('init/update service data exception: %s' % e)


class SystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.system'

    def ready(self):
        post_migrate.connect(app_ready_handler, sender=self)
