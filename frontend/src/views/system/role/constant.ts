// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data:[],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'id', colWidth: '', align:'center', title: 'ID', type: 'text', isCheck: true },
		{ key: 'name', colWidth: '', align:'center', title: '角色名称', type: 'text', isCheck: true },
		{ key: 'code', colWidth: '', align:'center', title: '角色标识', type: 'text', isCheck: true },
		{ key: 'status', colWidth: '', align:'center', title: '状态', type: 'text', isCheck: true,slot:'statusSlot' },
		{ key: 'type', colWidth: '', align:'center', title: '角色类型', type: 'text', isCheck: true,slot:'typeSlot' },
		{ key: 'creator', colWidth: '', align:'center', title: '创建者', type: 'text', isCheck: true },
		{ key: 'updater', colWidth: '', align:'center', title: '更新者', type: 'text', isCheck: true },
		{ key: 'is_builtin', colWidth: '', align:'center', title: '是否内置', type: 'text', isCheck: true,slot:'builtinSlot' },
		{ key: 'sort', colWidth: '', align:'center', title: '排序', type: 'text', isCheck: true },
		{ key: 'created_at', colWidth: '180', align:'center', title: '创建时间', type: 'text', isCheck: true },
		{ key: 'updated_at', colWidth: '180', align:'center', title: '修改时间', type: 'text', isCheck: true },
		{ key: 'remark', colWidth: '', align:'center', title: '备注', type: 'text', isCheck: true },
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
		{ label: '角色名称', prop: 'name', placeholder: '请输入角色名称',required:false, type: 'input' },
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