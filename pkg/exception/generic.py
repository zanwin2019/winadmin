"""
异常统一处理处理
分类：
    rest_framework框架内异常
    app自定义异常
"""

from django.http.response import Http404
from pkg.exception import basic as exceptions
from rest_framework.exceptions import (
    APIException,
    ValidationError,
    ParseError,  # 400错误
    AuthenticationFailed,
    NotAuthenticated,  # 401 错误
    PermissionDenied,  # 403 错误
    NotFound,  # 404 错误
    MethodNotAllowed,  # 405 错误
    NotAcceptable,  # 406 错误
)
from rest_framework.response import Response


def exception_handler(exc, context):
    data = {"result": False, "data": None}
    if isinstance(exc, Http404):
        _exc = exceptions.ResourceNotFound(exc.args)
    elif isinstance(exc, exceptions.WaException):
        _exc = exc
    elif isinstance(exc, APIException):
        if isinstance(exc, (ValidationError, ParseError)):
            _exc = exceptions.ParamValidationError(exc.detail)
        elif isinstance(exc, (NotAuthenticated, AuthenticationFailed)):
            _exc = exceptions.AuthenticationFailed(exc.detail)
        elif isinstance(exc, PermissionDenied):
            _exc = exceptions.RequestForbidden(exc.detail)
        elif isinstance(exc, NotFound):
            _exc = exceptions.ResourceNotFound(exc.detail)
        elif isinstance(exc, MethodNotAllowed):
            _exc = exceptions.MethodForbidden(exc.detail)
        elif isinstance(exc, NotAcceptable):
            _exc = exceptions.NotAcceptableError(exc.detail)
        else:
            _exc = exceptions.WaException(exc.detail)
    else:
        _exc = exceptions.WaException(exc)
    data["code"] = _exc.ERROR_CODE
    data["message"] = _exc.message
    data["data"] = _exc.data
    return Response(data, status=_exc.STATUS_CODE)
