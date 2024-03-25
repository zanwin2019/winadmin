/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '上级部门',
		key: 'parent_id',
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
		label: '部门名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '负责人',
		key: 'leader',
		type: 'select',
		rule: false,
		isrow:false,
		value: 0,
		options: [],
	},
	{
		label: '排序',
		key: 'sort',
		type: 'number',
		rule: false,
		isrow:false
	},
	{
		label: '状态',
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
		label: '描述',
		key: 'desc',
		type: 'textarea',
		rule: false,
		isrow:true
	},
]


