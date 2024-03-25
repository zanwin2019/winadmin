/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '上级菜单',
		key: 'parent',
		type: 'cascader',
		value: 0,
		isrow: true,
		props: {
			checkStrictly: true,
			emitPath: false,
			value: 'id',
			label: 'name',
			children: 'children'
		},
		options: []
	},

	{
		label: '菜单类型',
		key: 'type',
		type: 'radio',
		value: 0,
		rule: true,
		disabled: false,
		isrow: true,
		options: [
			{
				key: 1,
				label: "菜单",
				value: 3
			},
			{
				key: 2,
				label: "节点",
				value: 4
			}
		]
	},
	{
		label: '菜单名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: '权限标识',
		key: 'permission',
		type: 'input',
		rule: true,
		isrow: false
	},
	//节点独有
	{
		label: '请求地址',
		key: 'href',
		type: 'input',
		rule: true,
		isrow: false
	},
	//节点独有
	{
		label: '请求类型',
		key: 'method',
		type: 'select',
		rule: true,
		disabled: false,
		isrow: false,
		options: [
			{
				value: '1',
				label: 'POST',
			},
			{
				value: '2',
				label: 'GET',
			},
			{
				value: '3',
				label: 'PUT',
			},
			{
				value: '4',
				label: 'DELETE',
			},
			{
				value: '5',
				label: 'PATCH',
			},
		]
	},
	{
		label: '重定向',
		key: 'redirect',
		type: 'input',
		rule: false,
		isrow: false
	},
	{
		label: '路由路径',
		key: 'path',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: '组件路径',
		key: 'component',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: 'icon',
		key: 'icon',
		type: 'icon',
		rule: false,
		isrow: false
	},

	{
		label: '菜单排序',
		key: 'sort',
		type: 'number',
		rule: false,
		isrow: false
	},
	//节点独有
	{
		label: '打开方式',
		key: 'is_iframe',
		type: 'radio',
		value: 1,
		disabled: false,
		isrow: false,
		options: [
			{
				label: "内链",
				value: 0
			},
			{
				label: "外链",
				value: 1
			}
		]
	},
	{
		label: '是否隐藏',
		key: 'is_hidden',
		type: 'radio',
		value: 1,
		disabled: false,
		isrow: false,
		options: [
			{
				label: "隐藏",
				value: 1
			},
			{
				label: "不隐藏",
				value: 0
			}
		]
	},
	{
		label: '菜单状态',
		key: 'status',
		type: 'radio',
		value: 0,
		disabled: false,
		isrow: false,
		options: [
			{
				label: "启用",
				value: 1
			},
			{
				label: "禁用",
				value: 0
			}
		]
	},
	{
		label: '备注',
		key: 'remark',
		type: 'textarea',
		rule: false,
		isrow: true
	},

]


