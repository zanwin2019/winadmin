# -*- coding: utf-8 -*-

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '3306'
    }
}

# 多人开发时，无法共享的本地配置可以放到新建的 local.py 文件中
# 并且把 local.py 加入版本管理忽略文件中
try:
    from .local import *  # noqa
except ImportError:
    pass
