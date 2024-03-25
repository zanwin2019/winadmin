/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	// {
	// 	label: '用户名称',
	// 	key: 'username',
	// 	type: 'input',
	// 	rule: true,
	// 	isrow:false
	// },
	{
		label: '真实姓名',
		key: 'chname',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '公司',
		key: 'company',
		type: 'input',
		rule: false,
		isrow:false
	},
	{
		label: '手机',
		key: 'phone',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '邮箱',
		key: 'email',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: 'QQ',
		key: 'qq',
		type: 'input',
		rule: false,
		isrow:false
	},
]


export const formPassword = [
	{
		label: '当前密码',
		key: 'password1',
		type: 'input',
		rule: true,
		isrow: true
	},
	{
		label: '新密码',
		key: 'password2',
		type: 'input',
		rule: true,
		isrow: true
	},
	{
		label: '确认密码',
		key: 'password3',
		type: 'input',
		rule: true,
		isrow: true
	},
]


