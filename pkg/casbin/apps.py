# -*- coding: utf-8 -*-
# @Time  : 2022/6/6 10:50
# @File  : apps.py

from django.apps import AppConfig

from django.db.models.signals import post_migrate
from django.db import transaction
from pkg.common.log import logger


def bulk_create_init_data():
    # 初始化casbin rule
    from .models import CasbinRule
    CasbinRule.objects.bulk_create([
        CasbinRule(ptype='p', v0='*', v1='/', v2='*'),
        CasbinRule(ptype='p', v0='*', v1='/api/auth/*', v2='*'),
        CasbinRule(ptype='p', v0='*', v1='/api/token/*', v2='*'),
        CasbinRule(ptype='p', v0='*', v1='/admin/*', v2='*'),
        CasbinRule(ptype='p', v0='*', v1='/api/account/user/userinfo/', v2='GET'),
        CasbinRule(ptype='p', v0='*', v1='/api/account/user/user_permissions/', v2='GET'),
        CasbinRule(ptype='p', v0='*', v1='/api/account/login_logs/', v2='GET'),
        CasbinRule(ptype='p', v0='*', v1='/api/audit_logs/', v2='GET'),
        CasbinRule(ptype='p', v0='*', v1='/api/system/configtab/', v2='GET'),
        CasbinRule(ptype='p', v0='*', v1='/api/main/*', v2='GET'),
    ])


def app_ready_handler(sender=None, **kwargs):
    try:
        logger.info('init casbin rule data: start...')
        transaction.on_commit(lambda: bulk_create_init_data())
        logger.info('init casbin rule data: end...')
    except Exception as e:
        pass


class CasbinConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pkg.casbin'

    def ready(self):
        post_migrate.connect(app_ready_handler, sender=self)
