TYPE_CHOICES = ((1, '模块'), (2, '导航'), (3, '菜单'), (4, '节点'))
METHOD_CHOICES = (('1', 'POST'), ('2', 'GET'), ('3', 'PUT'), ('4', 'DELETE'), ('5', 'PATCH'))
BOOL_CHOICES = ((0, '否'), (1, '是'))
TARGET_CHOICES = ((0, '组件'), (1, '内链'), (2, '外链'))
STATUS = ((0, '禁用'), (1, '正常'))
CHECK_STATUS = ((0, '审核中'), (1, '启用'), (2, '禁用'))
AGENT_TYPE = (
    (1, '企业'),
    (2, '个人')
)

METHOD = {
    'GET': {
        'action': 'query',
        'describe': '查询'
    },
    'DETAIL': {
        'action': 'get',
        'describe': '详情'
    },
    'POST': {
        'action': 'add',
        'describe': '新增'
    },
    'DELETE': {
        'action': 'delete',
        'describe': '删除'
    },
    'PUT': {
        'action': 'update',
        'describe': '更新'
    },
    'PATCH': {
        'action': 'update',
        'describe': '更新'
    }
}

ACTION = {
    'ALL': [
        METHOD['GET'],
        METHOD['POST'],
        METHOD['DELETE'],
        METHOD['PUT'],
        METHOD['PATCH'],
        METHOD['DETAIL']
    ],
    'GET': METHOD['GET'],
    'POST': METHOD['POST'],
    'DELETE': METHOD['DELETE'],
    'PUT': METHOD['PUT'],
    'PATCH': METHOD['PATCH'],
    'DETAIL': METHOD['DETAIL']
}
# 内置数据字典
BUILTIN_SYSDICT_LIST = []
