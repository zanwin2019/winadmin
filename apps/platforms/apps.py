from django.apps import AppConfig
from django.db.models.signals import post_migrate


def app_ready_handler(sender, **kwargs):
    try:
        from apps.platforms.models import Tenant
        Tenant.init_builtin_data()

    except Exception as e:
        print('init/update Tenant data exception: %s' % e)


class PlatformsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.platforms'

    def ready(self):
        post_migrate.connect(app_ready_handler, sender=self)
