/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '字典名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '字典编码',
		key: 'key',
		type: 'input',
		rule: true,
		isrow:false
	},
	// {
	// 	label: '排序',
	// 	key: 'sort',
	// 	type: 'number',
	// 	rule: false,
	// 	isrow:false
	// },
	{
		label: '状态',
		key: 'is_enabled',
		type: 'radio',
		disabled: false,
		isrow: false,
		options: [
			{
				label: "启用",
				value: true
			},
			{
				label: "禁用",
				value: false
			}
		]
	},
	{
		label: '备注',
		key: 'desc',
		type: 'textarea',
		rule: false,
		isrow:true
	},
]


