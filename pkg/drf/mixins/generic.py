from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict
from pkg.common.constants import ResponseCodeStatus
from django.utils.translation import gettext_lazy as _
from pkg.common.log import logger

OPERATE_METHODS = ["DELETE", "POST", "PUT", "PATCH"]


class ApiGenericMixin(object):
    """API视图类通用函数"""

    permission_classes = ()

    def finalize_response(self, request, response, *args, **kwargs):
        """统一数据返回格式"""
        # 文件导出时response {HttpResponse}
        if not isinstance(response, Response):
            return response
        if response.data is None:
            response.data = {
                'result': True,
                'code': ResponseCodeStatus.OK,
                'message': _('success'),
                'data': []
            }
        elif isinstance(response.data, (list, tuple)):
            response.data = {
                'result': True,
                "code": ResponseCodeStatus.OK,
                "message": _('success'),
                "data": response.data,
            }
        elif isinstance(response.data, dict) and not ("code" in response.data and "result" in response.data):
            response.data = {
                'result': True,
                "code": ResponseCodeStatus.OK,
                "message": _('success'),
                "data": response.data,
            }
        if request.method in OPERATE_METHODS and not isinstance(response.data, dict):
            response.data = {
                'result': True,
                "code": ResponseCodeStatus.OK,
                "message": _('success'),
                "data": model_to_dict(response.data),
            }
        if response.status_code == status.HTTP_204_NO_CONTENT and request.method == "DELETE":
            response.status_code = status.HTTP_200_OK

        return super(ApiGenericMixin, self).finalize_response(request, response, *args, **kwargs)
