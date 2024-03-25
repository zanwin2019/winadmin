/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '租户名称',
		key: 'name',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '数据库名',
		key: 'schema_name',
		type: 'input',
		rule: true,
		isrow:false
	},
	{
		label: '联系人',
		key: 'contact_person',
		type: 'input',
		rule: false,
		isrow:false
	},
	{
		label: '联系电话',
		key: 'contact_phone',
		type: 'input',
		rule: false,
		isrow:false
	},
	{
		label: '联系邮箱',
		key: 'contact_email',
		type: 'input',
		rule: false,
		isrow:false
	},
	{
		label: '过期时间',
		key: 'expire_date',
		type: 'datetime',
		rule: false,
		isrow:false
	},
	{
		label: '域名',
		key: 'test',
		type: 'input',
		rule: true,
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


