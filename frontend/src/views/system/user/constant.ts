// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data:[],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'id', colWidth: '', align:'center', title: 'ID', type: 'text', isCheck: true },
		{ key: 'username', colWidth: '', align:'center', title: '用户名称', type: 'text', isCheck: true },
		{ key: 'role_name', colWidth: '', align:'center', title: '用户角色', type: 'text', isCheck: true },
		{ key: 'is_superuser', colWidth: '120', align:'center', title: '超管用户状态', type: 'text', isCheck: true,slot:'superuserSlot' },
		{ key: 'chname', colWidth: '', align:'center', title: '姓名', type: 'text', isCheck: true },
		{ key: 'company', colWidth: '', align:'center', title: '公司', type: 'text', isCheck: true },
		{ key: 'phone', colWidth: '', align:'center', title: '手机号', type: 'text', isCheck: true },
		{ key: 'email', colWidth: '', align:'center', title: '邮箱', type: 'text', isCheck: true },
		{ key: 'is_active', colWidth: '100', align:'center', title: '是否有效', type: 'text', isCheck: true,slot:'activeSlot' },
		{ key: 'is_staff', colWidth: '150', align:'center', title: '工作用户状态', type: 'text', isCheck: true,slot:'staffSlot' },
		{ key: 'date_joined', colWidth: '180', align:'center', title: '加入时间', type: 'text', isCheck: true },
		{ key: 'last_login', colWidth: '180', align:'center', title: '最后一次登录时间', type: 'text', isCheck: true},
		{ key: 'operate', colWidth: '200', align:'center', title: '操作', type: 'text', isCheck: true,slot:'operateSlot', fixed:'right' },
	],
	// 配置项（必传）
	config: {
		total: 0, // 列表总数
		loading: true, // loading 加载
		isBorder: true, // 是否显示表格边框
		isSerialNo: false, // 是否显示表格序号
		isSelection: false, // 是否显示表格多选
		isOperate: false, // 是否显示表格操作栏
		isPage:true, // 是否显示分页
		isSetup:true,// 是否显示设置
	},
	// 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
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
		{ label: '账号', prop: 'username', placeholder: '请输入账号',required:false, type: 'input' },
	],
};

export const buttonData = {
	// 配置项（必传）
	config: {
		isadd: true,
		isexport:false,
		isdownload:false,
	},
}