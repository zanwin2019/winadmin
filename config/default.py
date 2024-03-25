# -*- encoding: UTF-8 -*-

import datetime
import os
# ===============================================================================
# 应用基本信息
# ===============================================================================
# 应用密钥
SECRET_KEY = '9jy(37zzypfy210f-=3upt3e$up%%ocod%k^-bv+*!3&78)8cb'
APP_ID = 'winadmin'

# ==============================================================================
# 应用运行环境配置信息
# ==============================================================================
ENVIRONMENT = os.environ.get('APP_ENV', 'development')
# ==============================================================================
# Middleware and apps
# ==============================================================================
MIDDLEWARE = (
    'django_tenants.middleware.main.TenantMainMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'pkg.casbin.middleware.CasbinMiddleware',
    # 'pkg.audit.middleware.AuditLogMiddleware',
    'pkg.audit.middleware.OperationLogMiddleware',
    # 'auditlog.middleware.AuditlogMiddleware'
)

# Application definition
INSTALLED_APPS = (
    'django_tenants',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'rest_framework',
    'rest_framework_simplejwt',
    'django_filters',
    'corsheaders',
    "pkg.casbin",
    'pkg.audit',
    'apps.account',
    'apps.platforms',
    'apps.system',
)
ALLOWED_HOSTS = ['*']

# AUTH_USER_MODEL = 'auth.User'
AUTH_USER_MODEL = 'account.WaUser'

APP_ID = os.environ.get('APP_ID', APP_ID)

# 运行模式， DEVELOP(开发模式)， TEST(测试模式)， PRODUCT(正式模式)
RUN_MODE = 'DEVELOP'
if ENVIRONMENT.endswith('production'):
    RUN_MODE = 'PRODUCT'
    DEBUG = False
elif ENVIRONMENT.endswith('testing'):
    RUN_MODE = 'TEST'
    DEBUG = False
else:
    RUN_MODE = 'DEVELOP'
    DEBUG = True

# ==============================================================================
# Django 项目配置
# ==============================================================================
TIME_ZONE = 'Asia/Shanghai'

# 项目路径
PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT, PROJECT_MODULE_NAME = os.path.split(PROJECT_PATH)
BASE_DIR = os.path.dirname(os.path.dirname(PROJECT_PATH))

# ==============================================================================
# 国际化
# 生成语言文件： python manage.py makemessages -l en
# 编译语言文件： python manage.py compilemessages
# 使用国际化：
# from django.utils.translation import gettext_lazy as _
# _("要翻译的文本")
# ==============================================================================
# 语言, 先设置成中文
LANGUAGE_CODE = 'zh-hans'

USE_I18N = True
# 开启本地化
USE_L10N = True
USE_TZ = False
LANGUAGES = (
    ('zh-hans', '简体中文'),
    ('en', 'English'),
    ('ja', '日语')
)
# 翻译文件所在目录, 与 manage.py 文件在同级目录下
LOCALE_PATHS = (
    os.path.join(PROJECT_ROOT, 'locale'),
)

# ==============================================================================
# Templates
# ==============================================================================
# Django TEMPLATES配置
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(PROJECT_ROOT, 'templates'),
            os.path.join(PROJECT_ROOT, 'static/dist')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                # the context to the templates
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.request',
                'django.template.context_processors.csrf',
                'django.template.context_processors.i18n',
                'django.contrib.messages.context_processors.messages'
            ],
            'debug': DEBUG
        },
    },
]

REDIRECT_FIELD_NAME = 'next'
ROOT_URLCONF = 'urls'
# 应用访问路径
SITE_URL = '/'
STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'static'),
)
STATIC_VERSION = '1.0.0'
# 应用本地静态资源目录
STATIC_URL = '%sstatic/' % SITE_URL

# ln -s static static_root
# python manage.py collectstatic
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static_root/')

SITE_ID = 1
# 数据库初始化 管理员列表
ADMIN_USERNAME_LIST = ['admin']

# AUTHENTICATION_BACKENDS = (
#     # 'account.backends.Backend',
# )

# ==============================================================================
# REST FRAMEWORK SETTING
# ==============================================================================
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': "pkg.exception.generic.exception_handler",
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    "DEFAULT_PAGINATION_CLASS": "pkg.drf.mixins.pagination.CustomPageNumberPagination",
    "PAGE_SIZE": 10,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # JWT认证
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # Session认证
        'rest_framework.authentication.SessionAuthentication',
        # Basic认证
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DATETIME_FORMAT': "%Y-%m-%d %H:%M:%S"
}


SIMPLE_JWT = {
    # token有效时长
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(minutes=60 * 60 * 4),
    # token刷新后的有效时间
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=1),
}

# ==============================================================================
# logging
# ==============================================================================
# 应用日志配置
LOG_DIR = os.environ.get('LOG_DIR', '/data/app/logs/')
LOGGING_DIR = os.path.join(BASE_DIR, 'logs', APP_ID)
LOG_CLASS = 'logging.handlers.RotatingFileHandler'
if RUN_MODE == 'DEVELOP':
    LOG_LEVEL = 'DEBUG'
elif RUN_MODE == 'TEST':
    LOGGING_DIR = os.path.join(LOG_DIR, APP_ID)
    LOG_LEVEL = 'INFO'
elif RUN_MODE == 'PRODUCT':
    LOGGING_DIR = os.path.join(LOG_DIR, APP_ID)
    LOG_LEVEL = 'ERROR'

# 自动建立日志目录
if not os.path.exists(LOGGING_DIR):
    try:
        os.makedirs(LOGGING_DIR)
    except Exception:
        pass

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s [%(asctime)s] %(pathname)s %(lineno)d %(funcName)s %(process)d %(thread)d \n \t %(message)s \n',  # noqa
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
        'simple': {
            'format': '%(levelname)s %(message)s \n'
        }
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'root': {
            'class': LOG_CLASS,
            'formatter': 'verbose',
            'filename': os.path.join(LOGGING_DIR, '%s.log' % APP_ID),
            'maxBytes': 1024 * 1024 * 10,
            'backupCount': 5
        },
        'component': {
            'class': LOG_CLASS,
            'formatter': 'verbose',
            'filename': os.path.join(LOGGING_DIR, 'component.log'),
            'maxBytes': 1024 * 1024 * 10,
            'backupCount': 5
        },
        'mysql': {
            'class': LOG_CLASS,
            'formatter': 'verbose',
            'filename': os.path.join(LOGGING_DIR, 'mysql.log'),
            'maxBytes': 1024 * 1024 * 4,
            'backupCount': 5
        },
        'celery': {
            'class': LOG_CLASS,
            'formatter': 'verbose',
            'filename': os.path.join(LOGGING_DIR, 'celery.log'),
            'maxBytes': 1024 * 1024 * 10,
            'backupCount': 5
        },
        'ansible': {
            'class': LOG_CLASS,
            'formatter': 'verbose',
            'filename': os.path.join(LOGGING_DIR, 'ansible.log'),
            'maxBytes': 1024 * 1024 * 10,
            'backupCount': 5
        }
    },
    'loggers': {
        'django': {
            'handlers': ['null'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': True,
        },
        # the root logger ,用于整个project的logger
        'root': {
            'handlers': ['root'],
            'level': LOG_LEVEL,
            'propagate': True,
        },
        # 组件调用日志
        'component': {
            'handlers': ['component'],
            'level': 'WARN',
            'propagate': True,
        },
        # other loggers...
        'django.db.backends': {
            'handlers': ['mysql'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'celery': {
            'handlers': ['celery'],
            'level': 'INFO',
            'propagate': True,
        },
        'ansible': {
            'handlers': ['ansible'],
            'level': 'INFO',
            'propagate': True,
        }
    }
}

if ENVIRONMENT != 'prod':
    MIDDLEWARE = (
        'corsheaders.middleware.CorsMiddleware',
    ) + MIDDLEWARE
    CORS_ORIGIN_ALLOW_ALL = True
    CORS_ORIGIN_WHITELIST = (
        'http://portal.winadmin.com:8000',
    )
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOW_METHODS = (
        'DELETE',
        'GET',
        'OPTIONS',
        'PATCH',
        'POST',
        'PUT',
    )

# 租户配置
SHARED_APPS = (
    'django_tenants',  # mandatory, should always be before any django app
    'apps.account',
    'apps.platforms',  # you must list the app where your tenant model resides in
    'apps.system',
    "pkg.casbin",
    'pkg.audit',
    'rest_framework',
    'rest_framework_simplejwt',

    'django.contrib.contenttypes',

    # everything below here is optional
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.admin',
)
TENANT_APPS = (
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.admin',

    'apps.account',
    'apps.system',

)
DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)
TENANT_MODEL = 'platforms.Tenant'
TENANT_DOMAIN_MODEL = "platforms.Domain"

TENANT_COLOR_ADMIN_APPS = False

# 默认密码
DEFAULT_PASSWORD = '123456'

# ==============================================================================
# 初始化数据配置
# ==============================================================================
# 数据字典
DATADICTS_JSON_PATH = os.environ.get("DATADICTS_JSON_PATH", os.path.join(PROJECT_ROOT, "support-files", "datadicts"))
SYSTEM_MENU_PATH = os.environ.get("SYSTEM_MENU_PATH", os.path.join(PROJECT_ROOT, "support-files", "system_menu"))
SYSTEM_TENANT_PATH = os.environ.get("SYSTEM_TENANT_PATH", os.path.join(PROJECT_ROOT, "support-files", "tenant"))
SYSTEM_ROLE_PATH = os.environ.get("SYSTEM_ROLE_PATH", os.path.join(PROJECT_ROOT, "support-files", "system_role"))
SYSTEM_ACCOUNT_PATH = os.environ.get("SYSTEM_ACCOUNT_PATH", os.path.join(PROJECT_ROOT, "support-files", "account"))
