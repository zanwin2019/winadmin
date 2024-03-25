# -*- coding: utf-8 -*-

import re

from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apps.system.models import SysDict


def time_validator(value):
    time = value[-1]
    if time not in ["m", "h", "d"]:
        raise serializers.ValidationError(_("时间单位不正确"))
    try:
        number = int(value[:-1])
        if number > 65536 or number <= 0:
            raise serializers.ValidationError(_("时间超出了设置范围（1~65536）"))
    except ValueError:
        raise serializers.ValidationError(_("数据类型错误，不是合法的时间"))


key_validator = RegexValidator(
    re.compile("^[_a-zA-Z0-9]+$"),
    message=_("请输入合法编码：英文数字及下划线"),
    code="invalid",
)

# 正则表达式带中文一定要要带上u，否则校验不通过
name_validator = RegexValidator(
    re.compile(r"^[a-zA-Z0-9_()（）\u4e00-\u9fa5]+$"),
    message=_("请输入合法名称：中英文、中英文括号、数字及下划线"),
    code="invalid",
)

# 验证key是否重复
key_repeat_validator = UniqueValidator(queryset=SysDict.objects.filter(is_deleted=False), message="key已存在")
