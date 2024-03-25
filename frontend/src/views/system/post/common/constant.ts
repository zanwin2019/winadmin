/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '岗位名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '岗位编码',
		key: 'code',
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
		label: '备注',
		key: 'remark',
		type: 'textarea',
		rule: false,
		isrow:true
	},
]


