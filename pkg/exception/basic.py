import logging

from django.utils.translation import gettext_lazy as _


class WaException(Exception):
    ERROR_CODE = "0000000"
    MESSAGE = _("系统异常")
    STATUS_CODE = 500
    LOG_LEVEL = logging.ERROR

    def __init__(self, message=None, data=None, *args):
        """
        :param message: 错误消息
        :param data: 其他数据
        :param context: 错误消息 format dict
        :param args: 其他参数
        """
        super(WaException, self).__init__(message, data, *args)
        self.message = self.MESSAGE if message is None else message
        self.data = data

    def render_data(self):
        return self.data

    def response_data(self):
        return {
            "result": False,
            "code": self.ERROR_CODE,
            "message": self.message,
            "data": self.render_data(),
        }


class ClientWaException(WaException):

    MESSAGE = _("客户端请求异常")
    ERROR_CODE = "40000"
    STATUS_CODE = 400


class ServerWaException(WaException):

    MESSAGE = _("服务端服务异常")
    ERROR_CODE = "50000"
    STATUS_CODE = 500


class ParamRequiredError(ClientWaException):
    """参数不全"""

    MESSAGE = _("关键参数缺失")
    ERROR_CODE = "40001"
    STATUS_CODE = 400


class ParamValidationError(ClientWaException):
    """参数类型不对"""

    MESSAGE = _("参数验证失败")
    ERROR_CODE = "40002"
    STATUS_CODE = 400


class AuthenticationFailed(ClientWaException):
    """登录状态验证失败"""

    MESSAGE = _("用户状态认证失败")
    ERROR_CODE = "40101"
    STATUS_CODE = 401


class AccessForbidden(ClientWaException):
    """登录请求失败"""

    MESSAGE = _("登陆失败")
    ERROR_CODE = "40102"
    STATUS_CODE = 401


class RequestForbidden(ClientWaException):
    """请求拒绝"""

    MESSAGE = _("请求拒绝")
    ERROR_CODE = "40301"
    STATUS_CODE = 403


class PermissionForbidden(ClientWaException):
    """无权限操作"""

    MESSAGE = _("无权限操作")
    ERROR_CODE = "40302"
    STATUS_CODE = 403


class ResourceLock(ClientWaException):
    """禁止修改"""

    MESSAGE = _("请求资源被锁定")
    ERROR_CODE = "40303"
    STATUS_CODE = 403


class DeleteForbidden(ClientWaException):
    """资源删除被拒绝"""

    MESSAGE = _("资源删除被拒绝")
    ERROR_CODE = "40304"
    STATUS_CODE = 403


class ResourceNotFound(ClientWaException):
    """找不到请求的资源"""

    MESSAGE = _("找不到请求的资源")
    ERROR_CODE = "40401"
    STATUS_CODE = 404


class MethodForbidden(ClientWaException):
    """请求方法不允许"""

    MESSAGE = _("请求方法不支持")
    ERROR_CODE = "40501"
    STATUS_CODE = 405


class NotAcceptableError(ClientWaException):
    """请求来源不允许"""

    MESSAGE = _("请求来源不允许")
    ERROR_CODE = "40601"
    STATUS_CODE = 406


class SyntaxError(ServerWaException):
    """语法错误"""

    MESSAGE = _("语法错误")
    ERROR_CODE = "50001"
    STATUS_CODE = 500


class DatabaseError(ServerWaException):
    """数据库异常"""

    MESSAGE = _("数据库异常")
    ERROR_CODE = "50101"
    STATUS_CODE = 501


class ApiRequestError(ServerWaException):
    """远程服务请求异常"""

    MESSAGE = _("远程服务请求异常")
    ERROR_CODE = "50301"
    STATUS_CODE = 503


class ApiResultError(ServerWaException):
    """远程服务请求结果异常"""

    MESSAGE = _("远程服务请求结果异常")
    ERROR_CODE = "50302"
    STATUS_CODE = 503


class ApiNotAcceptable(ServerWaException):
    """远程服务返回结果格式异常"""

    MESSAGE = _("远程服务返回结果格式异常")
    ERROR_CODE = "50303"
    STATUS_CODE = 503
