from django.urls import include, path
from rest_framework import routers
from . import views

routers = routers.DefaultRouter()
routers.register(r'tenant', views.PlatformTenantViewSet, basename='tenant')
routers.register(r'domain', views.PlatformDomainViewSet, basename='domain')

urlpatterns = [
    path('', include(routers.urls))
]
