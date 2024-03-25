# -*- coding: utf-8 -*-
"""
用于正式环境的全局配置
"""
import os


# ===============================================================================
# 数据库设置, 正式环境数据库设置
# ===============================================================================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',                 # 默认用mysql
        'NAME': os.environ.get('DB_NAME', ''),          # 数据库名 (默认与APP_ID相同)
        'USER': os.environ.get('DB_USERNAME', ''),          # 你的数据库user
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),  # 你的数据库password
        'HOST': os.environ.get('DB_HOST', ''),          # 数据库HOST
        'PORT': os.environ.get('DB_PORT', ''),          # 默认3306
    },
}
