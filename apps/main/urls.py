from django.urls import include, path
from rest_framework import routers
from . import views

routers = routers.DefaultRouter()
routers.register(r'main', views.MainViewSet, basename='main')

urlpatterns = [
    path('', include(routers.urls))
]
