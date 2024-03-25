// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data: [],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'operator', colWidth: '', align: 'center', title: '用户名', type: 'text', isCheck: true },
		{ key: 'operation_model', colWidth: '', align: 'center', title: '操作模块', type: 'text', isCheck: true },
		{ key: 'operation_object', colWidth: '', align: 'center', title: '操作对象', type: 'text', isCheck: true, slot: 'objectSlot' },
		{ key: 'operation_action', colWidth: '', align: 'center', title: '操作类型', type: 'text', isCheck: true },
		{ key: 'request_method', colWidth: '', align: 'center', title: '请求方法名', type: 'text', isCheck: true, slot: 'methodSlot' },
		{ key: 'request_path', colWidth: '', align: 'center', title: '请求地址', type: 'text', isCheck: true },
		{ key: 'request_data', colWidth: '', align: 'center', title: '请求数据', type: 'text', isCheck: true },
		{ key: 'response_data', colWidth: '', align: 'center', title: '响应数据', type: 'text', isCheck: true },
		{ key: 'response_status_code', colWidth: '', align: 'center', title: '响应码', type: 'text', isCheck: true },
		{ key: 'user_ip', colWidth: '', align: 'center', title: '用户IP', type: 'text', isCheck: true },
		{ key: 'user_agent', colWidth: '', align: 'center', title: '浏览器', type: 'text', isCheck: true },
		{ key: 'timestamp', colWidth: '180', align: 'center', title: '日志时间', type: 'text', isCheck: true },
	],
	// 配置项（必传）
	config: {
		total: 0, // 列表总数
		loading: true, // loading 加载
		isBorder: true, // 是否显示表格边框
		isSerialNo: true, // 是否显示表格序号
		isSelection: false, // 是否显示表格多选
		isOperate: false, // 是否显示表格操作栏
		isPage:true, // 是否显示分页
		isSetup:true,// 是否显示设置
	},
	// 搜索参数
	param: {
		page: 1,
		page_size: 10,
	},
	// 打印标题
	printName: 'winadmin 表格打印演示',
};

export const searchData = {
	// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
	search: [
		{ label: '开始时间', prop: 'start_time', placeholder: '请输入开始时间', required: false, type: 'datetime' },
		{ label: '结束时间', prop: 'end_time', placeholder: '请输入结束时间', required: false, type: 'datetime' },
	],
};