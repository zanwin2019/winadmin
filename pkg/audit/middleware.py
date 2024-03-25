import json
from rest_framework.views import APIView
from django.utils import timezone
from django.forms.models import model_to_dict
from django.utils.deprecation import MiddlewareMixin
from .models import AuditLog
# 不允许记录的url列表
NOT_ADD_LOG_LIST = ['/api/auth/', '/api/token/', '/api/token/refresh/', '/api/token/verify/', '/api/audit_logs/']
# 允许记录的方法
METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']
# 扩展
EXTRA_LOG_LIST = [
    {
        'url': '/api/test/',
        'operation_model': '测试模块',
        'method': "GET"
    }
]


class OperationLogMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.view_func = None
        self.view = None
        self.view_kwargs = None
        self.request_body = None
        super().__init__(get_response)

    def process_view(self, request, view_func, view_args, view_kwargs):
        self.view_func = view_func
        view_func_obj = self.view_func.__dict__
        self.view = view_func_obj.get('cls')
        self.view_kwargs = view_kwargs
        self.request_body = ''
        request_method = request.method
        if request_method in ['POST', 'PATCH', 'PUT']:
            self.request_body = json.dumps(json.loads(request.body.decode()))
        else:
            self.request_body = request.GET.dict()

    def process_response(self, request, response):
        try:
            request_path = request.path
            if not self.is_add_log(request_path):
                return response
            request_method = request.method
            if request_method not in METHODS and not self.is_extra_url(request_path, request_method):
                return response
            if self.view and issubclass(self.view, APIView):
                module = self.view.queryset.model
                operation_model = module._meta.verbose_name
                pk = self.view_kwargs.get('pk')
                if pk:
                    object_inst = self._get_object_data(module, pk)
                    operation_object = json.dumps(model_to_dict(object_inst))
                else:
                    data = json.loads(response.content.decode("utf-8"))
                    operation_object = json.dumps(data.get('data'))
            else:
                if not self.is_extra_url(request_path, request_method):
                    return response
                operation_model = self.get_extra_operation(path=request_path)
                data = json.loads(response.content.decode("utf-8"))
                operation_object = json.dumps(data.get('data'))
            user = request.user if request.user.is_authenticated else None
            timestamp = timezone.now()
            operation_action = self.get_operation_action(request.method)
            request_data = self.request_body
            response_data = response.content.decode("utf-8")
            response_status_code = response.status_code
            user_ip = self.get_client_ip(request)
            user_agent = request.META.get("HTTP_USER_AGENT", "")
            response_data_json = json.loads(response_data)
            if response_data_json.get('result'):
                # 创建操作日志记录
                log_entry = AuditLog(
                    user=user,
                    timestamp=timestamp,
                    operation_model=operation_model,
                    operation_object=operation_object,
                    operation_action=operation_action,
                    request_method=request_method,
                    request_path=request_path,
                    request_data=request_data,
                    response_data=response_data,
                    response_status_code=response_status_code,
                    user_ip=user_ip,
                    user_agent=user_agent,
                )
                log_entry.save()
        except Exception as e:
            pass
        return response

    def get_operation_action(self, method):
        actions = {
            "GET": "查看",
            "POST": "新增",
            "PUT": "编辑",
            "PATCH": "编辑",
            "DELETE": "删除"
        }
        return actions.get(method, "unknown")

    def is_add_log(self, path):
        if '/api/' not in path:
            return False
        for not_all_path in NOT_ADD_LOG_LIST:
            if not_all_path in path:
                return False
        return True

    def is_extra_url(self, path, method):
        """
        是额外url, 且请求方法不在METHODS
        :param path:
        :return:
        """
        for extra_log in EXTRA_LOG_LIST:
            extra_path = extra_log.get('url')
            if extra_path in path:
                extra_method = extra_log.get('method')
                if extra_method == method:
                    return True
        return False

    def get_extra_operation(self, path):
        for extra_log in EXTRA_LOG_LIST:
            extra_path = extra_log.get('url')
            if extra_path in path:
                return extra_log.get('operation_model')
        return ''

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip

    def _get_object_data(self, module, key):
        if key:
            object_insts = module.objects.filter(id=key)
        else:
            object_insts = module.objects.filter(None)
        return object_insts.first() if object_insts else None


class AuditLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(request.POST)
        response = self.get_response(request)
        self.log_audit(request, response)
        return response

    def log_audit(self, request, response):

        # 获取请求相关信息
        user = request.user if request.user.is_authenticated else None
        timestamp = timezone.now()
        operation_model = "system"  # 根据实际情况获取操作模块
        operation_object = "object"  # 根据实际情况获取操作对象
        operation_action = self.get_operation_action(request.method)
        request_method = request.method
        request_path = request.path
        request_data = "N/A"  # 没有包含在此代码中，避免异常
        response_data = response.content.decode("utf-8")
        response_status_code = response.status_code
        user_ip = self.get_client_ip(request)
        user_agent = request.META.get("HTTP_USER_AGENT", "")
        print(request_path)
        # print(request)

        # 创建操作日志记录
        # log_entry = AuditLog(
        #     user=user,
        #     timestamp=timestamp,
        #     operation_model=operation_model,
        #     operation_object=operation_object,
        #     operation_action=operation_action,
        #     request_method=request_method,
        #     request_path=request_path,
        #     request_data=request_data,
        #     response_data=response_data,
        #     response_status_code=response_status_code,
        #     user_ip=user_ip,
        #     user_agent=user_agent,
        # )
        # log_entry.save()

    def get_operation_action(self, method):
        actions = {
            "GET": "查看",
            "POST": "新增",
            "PUT": "编辑",
            "PATCH": "编辑",
            "DELETE": "删除"
        }
        return actions.get(method, "unknown")

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
