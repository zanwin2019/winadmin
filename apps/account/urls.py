from django.urls import include, path
from rest_framework import routers
from . import views

routers = routers.DefaultRouter()
routers.register(r'user', views.WaUserViewSet, basename='user')
routers.register(r'userproperty', views.WaUserPropertyViewSet, basename='userproperty')
routers.register(r'login_logs', views.LoginLogViewSet, basename='login_logs')

urlpatterns = [
    path('', include(routers.urls))
]
