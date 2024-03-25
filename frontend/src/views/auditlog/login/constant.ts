// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data: [],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'user_obj', colWidth: '', align: 'center', title: '账号名称', type: 'text', isCheck: true, slot: 'userSlot' },
		{ key: 'login_ip', colWidth: '', align: 'center', title: 'IP地址', type: 'text', isCheck: true },
		// { key: 'login_addr', colWidth: '', align: 'center', title: '登录地址', type: 'text', isCheck: true },
		{ key: 'login_browser', colWidth: '180', align: 'center', title: '浏览器', type: 'text', isCheck: true },
		{ key: 'login_os', colWidth: '180', align: 'center', title: '登录系统', type: 'text', isCheck: true },
		{ key: 'login_time', colWidth: '', align: 'center', title: '登录时间', type: 'text', isCheck: true },
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
