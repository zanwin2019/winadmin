# -*- coding: utf-8 -*-

from django.urls import include, path


# 公共URL配置
urlpatterns = [
    path('account/', include('apps.account.urls')),
    path('platform/', include('apps.platforms.urls')),
    path('system/', include('apps.system.urls')),
    path('overview/', include('apps.main.urls')), # TODO 路由变更，前后端需适配
    path(r'audit/', include('pkg.audit.urls')), # TODO 路由待定
]
