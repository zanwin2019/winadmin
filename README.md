## WinAdmin企业级通用后台管理系统

[![img](https://img.shields.io/badge/python-%3E=3.8.x-green.svg)](https://python.org/) [![PyPI - Django Version badge](https://img.shields.io/badge/django%20versions-4.2.x-blue)](https://docs.djangoproject.com/zh-hans/4.0/) [![img](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/zh-cn/) [![img](https://img.shields.io/badge/postgresql-14.x-orange)](https://www.postgresql.org/) [![img](https://img.shields.io/badge/star-768-red)](https://gitee.com/zanwin/winadmin)

### Slogan

WinAdmin，首选的开源企业后台管理系统。

### 系统简介

💡 [WinAdmin](https://gitee.com/zanwin/winadmin) 基于Python3.8.x + Django4.x + DRF3.x + Vue3.x + TypeScript + Vite + Element Plus的企业级通用后台管理系统，助您快速开发，轻松管理，完全免费！

* 🧑‍🤝‍🧑前端采用[Vue-Next-Admin](https://gitee.com/lyt-top/vue-next-admin)、[Vue](https://cn.vuejs.org/)、[Element Plus](https://github.com/element-plus/element-plus)。
* 👭后端采用 Python 语言 Django 框架以及强大的 [Django REST Framework](https://pypi.org/project/djangorestframework)。
* 👫权限认证使用[Django REST Framework SimpleJWT](https://pypi.org/project/djangorestframework-simplejwt)，支持多终端认证系统。
* 👬支持加载动态权限菜单，多方式轻松权限控制。
* 💏特别鸣谢：[Vue-Next-Admin](https://gitee.com/lyt-top/vue-next-admin)

### 🎬在线体验

- 社区版 演示地址：https://ce.winadmin.zanwin.cn 账号：admin 密码：win123456
- 企业版 演示地址：https://ee.winadmin.zanwin.cn 账号：admin 密码：win123456

### ✨ 特性

- 遵循 RESTful API 设计规范
- 基于Casbin的 RBAC 访问控制模型
- JWT 认证
- 支持 Swagger 文档
- 多租户的支持
- TODO: 单元测试

### 🎁 内置

- 多租户：系统默认支持多租户，同一个库，不同scheme。

- 用户管理：用户是系统操作者，该功能主要完成系统用户配置。

- 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。

- 岗位管理：配置系统用户所属担任职务。

- 菜单管理：配置系统菜单，操作权限，按钮权限标识，接口权限等。

- 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。

- 字典管理：对系统中经常使用的一些较为固定的数据进行维护。

- 配置管理：对系统动态配置常用参数。

- 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。

- 登录日志：系统登录日志记录查询包含登录异常。

### 环境支持

| Edge      | Firefox      | Chrome      | Safari      |
| --------- | ------------ | ----------- | ----------- |
| Edge ≥ 88 | Firefox ≥ 78 | Chrome ≥ 87 | Safari ≥ 13 |

> 由于 Vue3 不再支持 IE11，故而 ElementPlus 也不支持 IE11 及之前版本。

### 📦使用说明

```bash
【后端】
# 克隆项目
git clone https://gitee.com/zanwin/winadmin.git

# 进入项目
cd winadmin

# 安装依赖
pip install -r requirements.txt 

# 本地数据库配置
vi config/local.py
DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',
        'NAME': 'winadmin',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}

# 执行迁移
python manage.py migrate

# 运行
python manage.py runserver 8000


【前端】
# Vite 不再支持 Node 12 / 13 / 15，因为上述版本已经进入了 EOL 阶段。现在你必须使用 Node 14.18+ / 16+ 版本。

# 克隆项目
git clone https://gitee.com/zanwin/winadmin.git

# 进入项目
cd winadmin/frontend

# 安装依赖
npm install

# 运行项目
npm run dev

# 打包发布
npm run build
```

### 开发文档

- 文档地址：https://winadmin.readthedocs.io/

### 技术交流

- 开发者WX号：zanwin2019

- QQ群号：756493328

### 🤝鸣谢列表

- <a href="https://github.com/vuejs/vue" target="_blank">vue</a>
- <a href="https://github.com/element-plus/element-plus" target="_blank">element-plus</a>
- <a href="https://github.com/microsoft/TypeScript" target="_blank">typescript</a>
- <a href="https://github.com/vitejs/vite" target="_blank">vite</a>
- <a href="https://www.python.org" target="_blank">python</a>
- <a href="https://github.com/django/django" target="_blank">django</a>
- <a href="https://github.com/encode/django-rest-framework" target="_blank">django-rest-framework</a>
- <a href="https://github.com/jazzband/djangorestframework-simplejwt" target="_blank">djangorestframework-simplejwt</a>
- <a href="https://github.com/django-tenants/django-tenants" target="_blank">django-tenants</a>
- <a href="https://github.com/casbin/casbin" target="_blank">casbin</a>

### 🤟支持作者

如果觉得系统不错，希望你可以去 <a target="_blank" href="https://github.com/zanwin2019/winadmin">Github</a> 或者<a target="_blank" href="https://gitee.com/zanwin/winadmin">Gitee</a> 帮我点个 ⭐ Star，这将是对我们极大的鼓励与支持。

### 路线图

- 统一门户
- 流程编排
- 工单审批
- 自定义仪表盘
- 数据可视化大屏

### 🔑License

MIT license
