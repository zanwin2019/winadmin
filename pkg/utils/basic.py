# -*- coding: utf-8 -*-
"""
    基础工具包
"""
import datetime
import os
import posixpath
import random
import re
import stat
import tarfile
import time
from collections import Counter, namedtuple
from functools import reduce
from itertools import combinations

# from celery.result import AsyncResult

from pkg.common.log import logger

from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.crypto import get_random_string

# from pypinyin import lazy_pinyin

# 清理终端颜色
COLOR_REMOVE = re.compile(r'\x1b[^m]*m')
CLEAR_COLOR_RE = re.compile(r'\\u001b\[\D{1}|\[\d{1,2}\D?|\\u001b\[\d{1,2}\D?~?', re.I | re.U)
# 换行转换
LINE_BREAK_RE = re.compile(r'\r\n|\r|\n', re.I | re.U)
# ip地址v4版本
IPV4_RE = re.compile(r'(?:[0-9]{1,3}\.){3}[0-9]{1,3}')


# def unicode_to_pinyin_key(name):
#     """
#     通过中文名生成英文key
#     若拼音解析失败，则生成随机key
#     """
#     try:
#         word_list = lazy_pinyin(name)
#     except Exception:
#         word_list = [get_random_string(3) for _ in range(4)]

#     pinyin_key = '%s_%d' % ('_'.join(word_list), int(time.time()))
#     # pinyin_key = filter(str.isalnum, pinyin_key)

#     return pinyin_key


class ComplexRegexField(object):
    """
    复杂正则字符验证
    validate_type：type:list 说明：en：英文   num：0-9数字 ch：中文 numwithoutzero：1-9数字 lower-en：小写a-z upper-en：大写：a-z special：特殊字符
    special_char:用户指定特殊字符，如果没有指定，默认键盘上能输入的其他特殊字符
    min_match_count：至少匹配的type个数 type:int
    start_with：以什么类型的字符开头 type:list
    end_with：以什么类型的字符结束 type:list
    """

    def __init__(self, validate_type=[],
                 min_match_count=1, start_with=[], end_with=[], special_char=''):
        self.validate_type = validate_type
        self.min_match_count = min_match_count if min_match_count else len(validate_type)
        self.start_with = start_with
        self.end_with = end_with
        self.regex_dict = {'num': '0-9',
                           'numwithoutzero': '1-9',
                           'lower-en': 'a-z',
                           'upper-en': 'A-Z',
                           'en': 'a-zA-Z',
                           'ch': u'\u4e00-\u9fa5',
                           'special': '~!@#$%^&*()_+-=?/; :<>.'}
        self.regex_display_dict = {'num': u'数字0-9',
                                   'numwithoutzero': u'数字1-9',
                                   'lower-en': u'小写字母',
                                   'upper-en': u'大写字母',
                                   'en': u'英文',
                                   'ch': u'中文',
                                   'special': special_char}
        self.regex_error_display = [value for key, value in self.regex_display_dict.items() if
                                    key in self.validate_type]
        if special_char:
            self.regex_dict['special'] = special_char
        if not self.validate_type:
            self.validate_type = self.regex_dict.keys()

    def get_regex(self):
        regex_list = list(
            combinations(['(?=.*[%s])' % self.regex_dict.get(type_key, '') for type_key in self.validate_type],
                         self.min_match_count))
        start_pattern = '[%s]' % ''.join(
            [self.regex_dict.get(type_key, '') for type_key in self.start_with]) if self.start_with else ''
        end_pattern = '[%s]' % ''.join(
            [self.regex_dict.get(type_key, '') for type_key in self.end_with]) if self.end_with else ''
        include_rules = ''.join([self.regex_dict.get(type_key, '') for type_key in self.validate_type])
        include_pattern = '^%s[%s]*%s$' % (start_pattern, include_rules, end_pattern)
        end_pattern = '^.*%s$' % end_pattern
        start_pattern = '^%s.*$' % start_pattern
        least_pattern = '^%s.*$' % '|'.join([''.join(item) for item in regex_list])
        return include_pattern, least_pattern, start_pattern, end_pattern

    def validate(self, value):
        if not value:
            return
        include_pattern, least_pattern, start_pattern, end_pattern = self.get_regex()
        if list(set(self.start_with).difference(self.validate_type)):
            raise ValidationError(u'包含了指定字符【{}】以外的内容'.format(','.join(self.regex_error_display)), code='not-matched')
        if list(set(self.end_with).difference(self.validate_type)):
            raise ValidationError(u'包含了指定字符【{}】以外的内容'.format(','.join(self.regex_error_display)), code='not-matched')
        if not re.match(start_pattern, value):
            raise ValidationError(u'开头格式不正确', code='not-matched')
        if not re.match(end_pattern, value):
            raise ValidationError(u'结尾格式不正确', code='not-matched')
        if not re.match(include_pattern, value):
            raise ValidationError(u'包含了指定字符【{}】以外的内容'.format(','.join(self.regex_error_display)), code='not-matched')
        if not re.match(least_pattern, value):
            raise ValidationError(u'至少需要匹配%s种字符(%s)' % (self.min_match_count, ','.join(self.regex_error_display)),
                                  code='not-matched')


def now():
    """
    返回当前时间
    """
    return timezone.now()


def time_delta(hours=1, minutes=30):
    """
    时间间隔
    """
    return datetime.timedelta(hours=hours, minutes=minutes)


def index_of_list(objarr, key, val):
    """
    根据对象的某一属性寻找对象在其所在列表中的位置
    """
    return next((k for k, v in enumerate(objarr) if v[key] == val), -1)


def safe_cast(val, to_type, default=None):
    """
    安全类型转换
    """
    try:
        return to_type(val)
    except ValueError:
        return default or val
    except TypeError:
        return default or val


def duplicate_check(id_list):
    """
    重复元素校验
    """

    # 筛选出现次数大于1的元素
    return len([k for k, v in Counter(id_list).items() if v > 1]) > 0


def safe_remove(file_path):
    """
    安全删除文件
    """
    try:
        os.remove(file_path)
    except Exception:
        pass


def deep_getattr(obj, attr):
    """
    Recurses through an attribute chain to get the ultimate value.
    http://pingfive.typepad.com/blog/2010/04/deep-getattr-python-function.html
    """
    return reduce(getattr, attr.split('.'), obj)


def group_by(item_list, key_or_index_tuple, dict_result=False, aggregate=None, as_key=None):
    """
    对列表中的字典元素进行groupby操作，依据为可排序的某个key
    :param item_list: 待分组字典列表或元组列表
    :param key_or_index_tuple: 分组关键字或位置列表
    :param dict_result: 是否返回字典格式
    :return: 可迭代的groupby对象或者字典
    :ref: http://stackoverflow.com/questions/21674331/
    group-by-multiple-keys-and-summarize-average-values-of-a-list-of-dictionaries
    """
    from itertools import groupby
    from operator import itemgetter

    list_sorted = sorted(item_list, key=itemgetter(*key_or_index_tuple))
    group_result = groupby(list_sorted, key=itemgetter(*key_or_index_tuple))
    if dict_result:
        return {k: list(g) for k, g in group_result}
    else:
        return group_result


def revoke_task(task):
    """
    递归revoke
    """

    if task.children:
        for child in task.children:
            revoke_task(child)
            # 终止未执行的任务
            # if not task.ready():
            #     task.revoke(terminate=True)

    try:
        task.revoke(terminate=True)
    except Exception:
        pass


def parse_color(content):
    """
    成功/失败/正常/异常/结果/返回码
    <span class='agent-color-red'>中转机登录失败</span>
    """

    color_pattern_list = [
        {
            'pattern': [
                u'失败', u'异常', u'超时', u'放弃', u'无法', u'错误码', u'错误', u'批量安装作业启动失败',
                u'command not found', u'error', u'exception', u'timeout', u'failed', u'setup failed',
                u'no such file or directory'
            ],
            'class': 'agent-color-red'
        },
        {
            'pattern': [
                u'执行成功', u'启动成功', u'发送成功', u'成功录入cmdb', u'Done', u'step done',
                u'正常', u'install_success', u'success', u'100%'
            ],
            'class': 'agent-color-green'
        },
        {'pattern': [], 'class': 'agent-color-gray'},
        {
            'pattern': [u'返回码', u'执行完毕', u'作业参数', u'curl',
                        u'status', u'agent状态', u'yum', u'apt-get'],
            'class': 'agent-color-black'
        },
        {'pattern': [
            u'warning', u'执行命令', u'输出结果', u'add crontab task failed. you can add it manually',
            u'register host to cmdb failed. you can add it manually'
        ], 'class': 'agent-color-orange'},
        {'pattern': IPV4_RE, 'class': 'agent-color-black'},
    ]

    # 正则替换
    for color_pattern in color_pattern_list:
        pattern = color_pattern.get('pattern')
        cls = color_pattern.get('class')
        if isinstance(pattern, list):
            # 空规则跳过
            if not pattern:
                continue
            t = re.compile('|'.join(pattern), re.IGNORECASE)
        else:
            t = pattern

        pts = set(t.findall(content))
        for kw in pts:
            content = content.replace(kw, u'<span class="{}">{}</span>'.format(cls, kw))
    else:
        return content


def log_parser(content):
    """
    \n\r->换行 + 清理终端颜色码 + 特殊颜色标记
    """
    # content = CLEAR_COLOR_RE.sub('', content)
    content = LINE_BREAK_RE.sub('<br/>', content)
    return content


def strftime_local(aware_time, fmt='%Y-%m-%d %H:%M:%S %z'):
    """格式化aware_time为本地时间"""

    if timezone.is_aware(aware_time):
        return timezone.localtime(aware_time).strftime(fmt)

    return aware_time.strftime(fmt)


def tuple_choices(tupl):
    """从django-model的choices转换到namedtuple"""
    return [(t, t) for t in tupl]


def dict_to_choices(dic, is_reversed=False):
    """从django-model的choices转换到namedtuple"""
    if is_reversed:
        return [(v, k) for k, v in dic.iteritems()]
    return [(k, v) for k, v in dic.iteritems()]


def reverse_dict(dic):
    return {v: k for k, v in dic.iteritems()}


def dict_to_namedtuple(dic):
    """从dict转换到namedtuple"""
    return namedtuple('AttrStore', dic.keys())(**dic)


def choices_to_namedtuple(choices):
    """从django-model的choices转换到namedtuple"""
    return dict_to_namedtuple(dict(choices))


def tuple_to_namedtuple(tupl):
    """从tuple转换到namedtuple"""
    return dict_to_namedtuple(dict(tuple_choices(tupl)))


# def revoke_celery_task(task_id):
#     """
#     终止celery任务
#     """

#     try:
#         task = AsyncResult(task_id)
#         task.revoke(terminate=True)
#     except Exception as e:
#         logger.error(u'revoke_celery_task(Exception): %s' % e)


def rmtree(sftp, remotepath, level=0):
    """
    递归删除操作
    """

    for f in sftp.listdir_attr(remotepath):
        rpath = posixpath.join(remotepath, f.filename)

        # 如果是目录，则递归删除
        if stat.S_ISDIR(f.st_mode):
            rmtree(sftp, rpath, level + 1)
        else:
            sftp.remove(rpath)

    # 删除当前目录
    sftp.rmdir(remotepath)


def ansi_escape(str):
    """终端颜色编码清理"""
    return COLOR_REMOVE.sub('', str)


def extract_tarfile(file_name, target_dir=None):
    """extract tgz file"""
    tar = tarfile.open(file_name)
    target_dir = target_dir or os.path.dirname(file_name)
    tar.extractall(target_dir)
    tar.close()


def generate_random_sn(service='00'):
    """22位单号生成器"""

    random.seed(datetime.datetime.now())

    return 'NO{time14}{service2}{randint4}'.format(
        time14=datetime.datetime.now().strftime('%Y%m%d%H%M%S'),
        service2=service,
        randint4=format(random.randint(0, 9999), '04d')
    )


def jwt_response_payload_handler(token, user=None, request=None):
    """为返回的结果添加用户相关信息"""
    from pkg.common.constants import ResponseCodeStatus
    return {
        'result': True,
        'code': ResponseCodeStatus.OK,
        'message': 'success',
        'data': {
            'token': token,
            'user_id': user.id,
            'username': user.username
        }
    }


def jwt_response_payload_error_handler(serializer, request=None):
    from component.constants import ResponseCodeStatus
    return {
        'result': False,
        'code': ResponseCodeStatus.OK,
        'message': serializer.errors,
        'data': {}
    }


def dotted_name(nodot_str, mode="both"):
    """字符串首尾追加逗号"""
    mode_dict = {
        "prefix": ",{}",
        "suffix": "{},",
        "both": ",{},",
    }

    if not nodot_str:
        return ""

    return mode_dict.get(mode).format(nodot_str)
