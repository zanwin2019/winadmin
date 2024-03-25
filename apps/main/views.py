from django.db.models import Count
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now, timedelta
from pkg.drf import viewsets
from rest_framework import serializers
from apps.account.models import Loignlog
from pkg.audit.models import AuditLog
from .constants import PROVICES


class MainViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ModelSerializer

    @action(methods=['get'], detail=False, url_path='num', url_name='num')
    def get_top_num(self, request):
        """
        顶部数据统计
        :param request:
        :return:
        """
        today = now()
        day_1 = now() + timedelta(days=-1)  # 昨天
        # 访问人数
        login_count = Loignlog.objects.all().count()

        login_count_today = Loignlog.objects.filter(login_time__year=today.year, login_time__month=today.month,
                                             login_time__day=today.day).count()

        login_count_yestoday = Loignlog.objects.filter(login_time__year=day_1.year, login_time__month=day_1.month,
                                                    login_time__day=day_1.day).count()
        if login_count_today:
            login_rate = round((login_count_today * 100 - login_count_yestoday * 100)/float(login_count_today), 2)
        else:
            login_rate = round((login_count_today * 100 - login_count_yestoday * 100), 2)

        # 点击量（30天）
        day_30 = now() + timedelta(days=-30)
        day_60 = day_30 + timedelta(days=-30)
        logs_30 = AuditLog.objects.filter(timestamp__range=(day_30, today)).count()
        logs_60 = AuditLog.objects.filter(timestamp__range=(day_60, day_30)).count()
        if logs_30:
            logs_30_rate = round((logs_30 * 100 - logs_60 * 100)/float(logs_30), 2)
        else:
            logs_30_rate = round((logs_30 * 100 - logs_60 * 100), 2)
        # 点击量（近7天）
        day_7 = now() + timedelta(days=-7)
        day_14 = day_7 + timedelta(days=-7)
        logs_7 = AuditLog.objects.filter(timestamp__range=(day_7, today)).count()
        logs_14 = AuditLog.objects.filter(timestamp__range=(day_14, day_7)).count()
        if logs_7:
            logs_7_rate = round((logs_7 * 100 - logs_14 * 100)/float(logs_7), 2)
        else:
            logs_7_rate = round((logs_7 * 100 - logs_14 * 100), 2)

        # 点击量（当天）

        logs_today = AuditLog.objects.filter(timestamp__year=today.year, timestamp__month=today.month,
                                             timestamp__day=today.day).count()

        logs_1 = AuditLog.objects.filter(timestamp__year=day_1.year, timestamp__month=day_1.month,
                                             timestamp__day=day_1.day).count()

        if logs_today:
            logs_1_rate = round((logs_today * 100 - logs_1 * 100)/float(logs_today), 2)
        else:
            logs_1_rate = round((logs_today * 100 - logs_1 * 100), 2)

        data = {
            'login': {
                'count': login_count,
                'rate': login_rate,
                'name': '总访问人数',
                'icon': 'iconfont icon-icon-',
                'color': '--el-color-primary',
                'backgroundColor': '--next-color-primary-lighter'
            },
            'logs_30': {
                'count': logs_30,
                'rate': logs_30_rate,
                'name': '点击量（近30天）',
                'icon': 'iconfont icon-xianshimima',
                'color': '--el-color-success',
                'backgroundColor': '--next-color-success-lighter'
            },
            'logs_7': {
                'count': logs_7,
                'rate': logs_7_rate,
                'name': '点击量（近7天）',
                'icon': 'iconfont icon-tongzhi1',
                'color': '--el-color-warning',
                'backgroundColor': '--next-color-warning-lighter'
            },
            'logs_1': {
                'count': logs_today,
                'rate': logs_1_rate,
                'name': '点击量（当天）',
                'icon': 'iconfont icon-tongzhi2',
                'color': '--el-color-danger',
                'backgroundColor': '--next-color-danger-lighter'
            }
        }
        return Response(data)

    @action(methods=['get'], detail=False, url_path='user_distribution', url_name='user_distribution')
    def get_user_distribution(self, request):
        """
        获取用户分布
        :param request:
        :return:
        """
        # 根据浏览器的分布
        login_browsers = Loignlog.objects.filter(login_browser__isnull=False).values('login_browser').\
            annotate(log_num=Count('user'))
        browsers = [{'name': log['login_browser'], 'value': log['log_num']} for log in login_browsers]

        # 根据操作系统的分布
        login_os = Loignlog.objects.filter(login_os__isnull=False).values('login_os'). \
            annotate(log_num=Count('user'))
        os = [{'name': log['login_os'], 'value': log['log_num']} for log in login_os]
        # 根据地区
        login_addr = Loignlog.objects.filter(login_province__isnull=False).values('login_province'). \
            annotate(log_num=Count('user'))
        addr = [{'name': log['login_province'], 'value': log['log_num']} for log in login_addr if log['login_province']]
        address = []
        for p in PROVICES:
            dic = {
                'name': p,
                'value': 0
            }
            for add in addr:
                name = add['name']
                if p == name:
                    dic['value'] = add['value']
            address.append(dic)
        data = {
            'browser': browsers,
            'os': os,
            'address': sorted(address, key=lambda x: x['value'], reverse=False)
        }
        return Response(data)
