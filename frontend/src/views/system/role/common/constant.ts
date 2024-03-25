/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '角色名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow:false,
	},
	{
		label: '角色标识',
		key: 'code',
		type: 'input',
		rule: true,
		isrow:false,
		pattern: /[a-zA-z]$/,
		message:'角色标识应为英文字符',
		// validator:(rule:any,value:any, callback:any) =>{
		// 	if (/[a-zA-z]$/.test(value) == false) {
		// 	  callback(new Error('角色标识只能是英文字符'));
		// 	} else {
		// 	  callback();
		// 	}
		//   }
	},
	{
		label: '角色类型',
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
		label: '是否内置',
		key: 'is_builtin',
		type: 'radio',
		value: 0,
		disabled: false,
		isrow:false,
		options: [
			{
				label: "是",
				value: true
			},
			{
				label: "否",
				value: false
			}
		]
	},
	{
		label: '状态',
		key: 'status',
		type: 'radio',
		value: 0,
		disabled: false,
		isrow:false,
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
	// {
	// 	label: '分配权限',
	// 	key: 'tree',
	// 	type: 'tree',
	// 	rule: false,
	// 	isrow:true,
	// 	options: []
	// },
]


