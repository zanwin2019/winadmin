/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '上级配置',
		key: 'pid',
		type: 'cascader',
		value: 0,
		isrow: true,
		props: {
			checkStrictly: true,
			emitPath: false,
			value: 'id',
			label: 'title',
			children: 'children'
		},
		options: []
	},
	{
		label: '配置名称',
		key: 'title',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '配置编码',
		key: 'code',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '类型',
		key: 'type',
		type: 'input',
		rule: true,
		isrow:false
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
		label: '是否显示',
		key: 'is_display',
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
]


