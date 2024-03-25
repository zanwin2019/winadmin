import datetime
import json

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.forms.models import model_to_dict
from django_filters import rest_framework as filters
from django.shortcuts import get_object_or_404
from pkg.drf import viewsets
from pkg.drf.mixins import ApiGenericMixin
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import (TokenObtainPairSerializer,
                                                  TokenRefreshSerializer,
                                                  TokenVerifySerializer)
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)

from apps.account.utils import parser_user_agent
from apps.system.models import SystemRole, SystemUserRole

from .filter import LoignlogFilter, WaUserFilter, WaUserPropertyFilter
from .models import Loignlog, WaUser, WaUserProperty
from .serializer import (LoignlogSerializer, WaUserPropertySerializer,
                         WaUserSerializer, WaUserPasswordChangeSerializer)


class AccountTokenObtainPairView(ApiGenericMixin, TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            users = WaUser.objects.get(username=request.data.get('username'))
            if users:
                user = users[0]
                log_browser, login_os, parsed_user_agent = parser_user_agent(request.META.get('HTTP_USER_AGENT'))
                log_ip = request.META.get('REMOTE_ADDR')
                Loignlog.objects.create(
                    login_time=datetime.datetime.now(),
                    user=user,
                    login_ip=log_ip,
                    login_browser=log_browser,
                    login_os=login_os,
                    login_user_agent=json.dumps(parsed_user_agent)
                )
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except WaUser.DoesNotExist:
            return Response({"message": "用户不存在"}, status=status.HTTP_404_NOT_FOUND)
        except TokenError as e:
            raise InvalidToken(e.args[0])


class AccountTokenRefreshView(ApiGenericMixin, TokenRefreshView):
    serializer_class = TokenRefreshSerializer


class AccountTokenVerifyView(ApiGenericMixin, TokenVerifyView):
    serializer_class = TokenVerifySerializer


class WaUserViewSet(viewsets.ModelViewSet):
    queryset = WaUser.objects.all().order_by('-id')
    serializer_class = WaUserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = WaUserFilter

    @action(methods=['post'], detail=False, url_path='reset_password', url_name='reset_password')
    def reset_password(self, request):
        user_id = request.data.get('id')
        user = get_object_or_404(WaUser, id=user_id)

        password = make_password(settings.DEFAULT_PASSWORD)
        user.password = password
        user.save()

        message = f"用户 {user.username} 密码重置成功为: {settings.DEFAULT_PASSWORD}"
        return Response({"message": message})

    @action(methods=['post'], detail=False, url_path='modify_password', url_name='modify_password')
    def modify_password(self, request):
        serializer = WaUserPasswordChangeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": '密码修改成功!'})

    @action(methods=['get'], detail=False, url_path='userinfo', url_name='userinfo')
    def user_info(self, request):
        user = self.get_serializer(request.user).data
        return Response(user)

    @action(methods=['get'], detail=False, url_path='user_permissions', url_name='user_permissions')
    def user_permissions(self, request):
        user = request.user

        role_id = SystemUserRole.objects.filter(user_id=user)
        if not role_id:
            return []
        role = SystemRole.objects.get(id=role_id[0].role_id.id)
        role_menus = role.role_menu.filter(menu_id__is_hidden=0, menu_id__status=1, menu_id__type=3)
        menus = [role_menu.menu_id for role_menu in role_menus]
        # 循环父级菜单
        permissions = [self.subtree(i.menu_id, perms=[menu.id for menu in menus]) for i in role_menus.filter(menu_id__parent=None)]

        return Response(sorted(permissions, key=lambda x: x['sort']))

    def subtree(self, node, perms):
        """获取以node为根的子树"""
        # 获取直接子级
        node_children = node.get_children().filter(is_hidden=0, status=1, type=3, id__in=perms)
        children = [self.subtree(child, perms) for child in node_children]
        # 过滤掉空的
        children = list(filter(None, children))
        menus = model_to_dict(node)
        menus['children'] = children
        menus.update({
            "name": menus['permission'],
            "meta": {
                "title": menus['name'],
                "icon": menus['icon'],
                "isAffix": False,
                "isHide": menus['is_hidden'],
                "isIframe": False,
                "isKeepAlive": True,
                "isLink": None
            }
        })
        return menus


class WaUserPropertyViewSet(viewsets.ModelViewSet):
    serializer_class = WaUserPropertySerializer
    filterset_class = WaUserPropertyFilter
    queryset = WaUserProperty.objects.all()


class LoginLogViewSet(viewsets.ModelViewSet):
    serializer_class = LoignlogSerializer
    queryset = Loignlog.objects.all().order_by('-id')
    filterset_class = LoignlogFilter
