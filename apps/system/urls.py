from django.urls import include, path
from rest_framework import routers
from . import views

routers = routers.DefaultRouter()
routers.register(r'menu', views.SystemMenuViewSet, basename='menu')
routers.register(r'role', views.SystemRoleViewSet, basename='role')
routers.register(r'rolemenu', views.SystemRoleMenuViewSet, basename="rolemenu")
routers.register(r'configtab', views.SystemConfigTabViewSet, basename='configtab')
routers.register(r'config', views.SystemConfigViewSet, basename='config')
routers.register(r'dept', views.SystemDeptViewSet, basename='dept')
routers.register(r'post', views.SystemPostViewSet, basename='post')
routers.register(r"datadicts", views.SysDictViewSet, basename="datadicts")
routers.register(r"dictdatas", views.SysDictDataViewSet, basename="dictdatas")

urlpatterns = [
    path('', include(routers.urls))
]
