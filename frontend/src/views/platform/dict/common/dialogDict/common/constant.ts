/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '父级',
		key: 'parent',
		type: 'select',
		rule: false,
		isrow:true,
		options:[],
		// props: {
		// 	checkStrictly: true,
		// 	emitPath: false,
		// 	value: 'id',
		// 	label: 'name',
		// 	// children: 'children'
		// },
	},
	{
		label: '名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow:true
	},
	{
		label: '编码',
		key: 'key',
		type: 'input',
		rule: true,
		isrow:true
	},
	{
		label: '排序',
		key: 'order',
		type: 'number',
		rule: false,
		isrow:true
	},
]


