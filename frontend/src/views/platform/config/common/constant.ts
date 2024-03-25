/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '字段key',
		key: 'key',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: '字段名称',
		key: 'label',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: '字段类型',
		key: 'type',
		type: 'select',
		rule: true,
		isrow: false,
		value: 0,
		options: [
			{
				label: '单行文本',
				value: 'input'
			},
			{
				label: '文本域',
				value: 'textarea'
			},
			{
				label: '密码框',
				value: 'password'
			},
			{
				label: '数字',
				value: 'number'
			},
			{
				label: '下拉选择',
				value: 'select'
			},
			{
				label: '级联选择',
				value: 'cascader'
			},
			{
				label: '开关',
				value: 'switch'
			},
			{
				label: '单选框',
				value: 'radio'
			},
			{
				label: '多选框',
				value: 'checkbox'
			},
			{
				label: '日期',
				value: 'date'
			},
			{
				label: '时间',
				value: 'time'
			},
			{
				label: '日期时间',
				value: 'datetime'
			},
			{
				label: '日期区间',
				value: 'date-to-date'
			},
			{
				label: '时间区间',
				value: 'time-to-time'
			},
			{
				label: '日期时间区间',
				value: 'datetime-to-datetime'
			},
		]
	},
	{
		label: '是否必填',
		key: 'rule',
		type: 'radio',
		value: 0,
		disabled: false,
		isrow: false,
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
		label: '可选项',
		key: 'options',
		type: 'textarea',
		rule: false,
		isrow: true
	},
	{
		label: '配置名称',
		key: 'info',
		type: 'input',
		rule: false,
		isrow: false
	},
	{
		label: '文件格式',
		key: 'upload_type',
		type: 'input',
		rule: false,
		isrow: false
	},
	{
		label: '宽',
		key: 'width',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: '高',
		key: 'height',
		type: 'input',
		rule: true,
		isrow: false
	},
	{
		label: '值',
		key: 'value',
		type: 'input',
		rule: false,
		isrow: false
	},
	{
		label: '排序',
		key: 'sort',
		type: 'number',
		rule: false,
		isrow: false
	},
	{
		label: '是否整行',
		key: 'isrow',
		type: 'radio',
		disabled: false,
		isrow: false,
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
		label: '是否禁用',
		key: 'disabled',
		type: 'radio',
		disabled: false,
		isrow: false,
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
	// {
	// 	label: '状态',
	// 	key: 'status',
	// 	type: 'checkbox',
	// 	value: 0,
	// 	disabled: false,
	// 	isrow: false,
	// 	options: [
	// 		{
	// 			label: "启用",
	// 			value: 1
	// 		},
	// 		{
	// 			label: "禁用",
	// 			value: 0
	// 		}
	// 	]
	// },
	// {
	// 	label: 'Configtabid',
	// 	key: 'config_tab_id',
	// 	type: 'input',
	// 	rule: true,
	// 	isrow:false
	// },
	{
		label: '配置简介',
		key: 'desc',
		type: 'textarea',
		rule: false,
		isrow: true
	},
]


