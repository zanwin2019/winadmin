from django.urls import include, path
from django.contrib import admin
from apps.account.views import (
    AccountTokenObtainPairView,
    AccountTokenRefreshView,
    AccountTokenVerifyView
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # DRF 提供的一系列身份认证的接口，用于在页面中认证身份，详情查阅DRF文档
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    # 获取Token的接口
    path('api/token/', AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # 刷新Token有效期的接口
    path('api/token/refresh/', AccountTokenRefreshView.as_view(), name='token_refresh'),
    # 验证Token的有效性
    path('api/token/verify/', AccountTokenVerifyView.as_view(), name='token_verify'),

    # 路由版本控制
    path('api/', include('router.v1')),
    # 首页入口
    path('', include('sites.urls')),
]
