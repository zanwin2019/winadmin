import casbin
import os

from django.utils.deprecation import MiddlewareMixin
from django.http.response import HttpResponse, JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from pkg.exception import basic as exceptions
from.adapter import adapter


def get_path(path):
    return os.path.dirname(__file__) + "/" + path


class CasbinMiddleware(MiddlewareMixin):
    """
    Casbin middleware.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # Initialize the Casbin enforcer, executed only on once.
        # self.enforcer = casbin.Enforcer(get_path("authz_model.conf"), get_path("authz_policy.csv"))
        self.jwt_authentication = JWTAuthentication()

    def __call__(self, request):
        self.enforcer = casbin.Enforcer(get_path("authz_model.conf"), adapter)
        # Check the permission for each request.
        resp = self.check_permission(request)
        if isinstance(resp, HttpResponse):
            return resp

        if not resp:
            # Not authorized, return HTTP 403 error.
            return self.require_permission_response()

        # Permission passed, go to next module.
        response = self.get_response(request)
        return response

    def check_permission(self, request):
        # JWT Token获取用户
        user = None
        try:
            user_jwt = self.jwt_authentication.authenticate(request)
            if user_jwt is not None:
                user, _ = user_jwt
                username = user.username

        except AuthenticationFailed:
            return self.exception_handler(AuthenticationFailed, None)

        # Django Auth获取用户
        if user is None:
            user = request.user
            username = request.user.username
            if request.user.is_anonymous:
                username = 'anonymous'

        # Customize it based on your authentication method.
        path = request.path
        method = request.method
        return self.enforcer.enforce(username, path, method)

    def require_permission_response(self):
        return self.exception_handler(PermissionDenied, None)

    def exception_handler(self, exc, context):
        data = {"result": False, "data": None}
        if exc == AuthenticationFailed:
            _exc = exceptions.AuthenticationFailed()
        elif exc == PermissionDenied:
            _exc = exceptions.RequestForbidden()
        else:
            _exc = exceptions.WaException()
        data["code"] = _exc.ERROR_CODE
        data["message"] = _exc.message
        data["data"] = _exc.data
        return JsonResponse(data, status=_exc.STATUS_CODE)
