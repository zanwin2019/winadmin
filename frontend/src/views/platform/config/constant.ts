// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data:[],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'id', colWidth: '', align:'center', title: 'ID', type: 'text', isCheck: true },
		{ key: 'label', colWidth: '100', align:'center', title: '字段名称', type: 'text', isCheck: true },
		{ key: 'key', colWidth: '100', align:'center', title: '字段key', type: 'text', isCheck: true },
		{ key: 'type', colWidth: '100', align:'center', title: '字段类型', type: 'text', isCheck: true },
		{ key: 'rule', colWidth: '100', align:'center', title: '是否必填', type: 'text', isCheck: true,slot:'ruleSlot' },
		{ key: 'isrow', colWidth: '100', align:'center', title: '是否整行', type: 'text', isCheck: true,slot:'isrowSlot' },
		{ key: 'disabled', colWidth: '100', align:'center', title: '是否禁用', type: 'text', isCheck: true,slot:'disabledSlot' },
		{ key: 'info', colWidth: '100', align:'center', title: '配置名称', type: 'text', isCheck: true },
		{ key: 'options', colWidth: '100', align:'center', title: '可选项', type: 'text', isCheck: true },
		{ key: 'upload_type', colWidth: '100', align:'center', title: '文件格式', type: 'text', isCheck: true },
		{ key: 'width', colWidth: '100', align:'center', title: '宽', type: 'text', isCheck: true },
		{ key: 'height', colWidth: '100', align:'center', title: '高', type: 'text', isCheck: true },
		{ key: 'value', colWidth: '100', align:'center', title: '值', type: 'text', isCheck: true },
		{ key: 'creator', colWidth: '100', align:'center', title: '创建者', type: 'text', isCheck: true },
		{ key: 'updater', colWidth: '100', align:'center', title: '更新者', type: 'text', isCheck: true },
		{ key: 'sort', colWidth: '', align:'center', title: '排序', type: 'text', isCheck: true },
		{ key: 'created_at', colWidth: '150', align:'center', title: '创建时间', type: 'text', isCheck: true },
		{ key: 'updated_at', colWidth: '150', align:'center', title: '修改时间', type: 'text', isCheck: true },
		{ key: 'desc', colWidth: '120', align:'center', title: '配置简介', type: 'text', isCheck: true },
		{ key: 'operate', colWidth: '180', align:'center', title: '操作', type: '', isCheck: true,slot:'operateSlot', fixed:'right' },
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
		{ label: '字段名称', prop: 'name', placeholder: '请输入字段名称',required:false, type: 'input' },
		{ label: '字段key', prop: 'key', placeholder: '请输入字段key',required:false, type: 'input' },
	],
};

export const buttonData = {
	// 配置项（必传）
	config: {
		isadd: true,
		isaddDisabled:true,
		isimport:false,
		isimportDisabled:false,
		isexport:false,
		isexportDisabled:false,
	},
}

export const TableDataTab = {
	// 列表数据（必传）
	data:[],
	// 表头内容（必传，注意格式）
	header: [
		// { key: 'id', colWidth: '80', align:'center', title: 'ID', type: 'text', isCheck: true },
		{ key: 'title', colWidth: '', align:'left',title: '配置选项卡', type: 'text', isCheck: true },
		{ key: 'operate', colWidth: '60', align:'center', title: '', type: 'text', isCheck: true,slot:'operateSlot', fixed:'right' },
	],
	// 配置项（必传）
	config: {
		total: 0, // 列表总数
		loading: true, // loading 加载
		isBorder: false, // 是否显示表格边框
		isSerialNo: false, // 是否显示表格序号
		isSelection: false, // 是否显示表格多选
		isOperate: false, // 是否显示表格操作栏
		isPage:false, // 是否显示分页
		isSetup:false,// 是否显示设置
	},
	// 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
	param: {
		page: 1,
		page_size: 10,
	},
	// 打印标题
	printName: 'winadmin 表格打印演示',
};
export const searchDataTab = {
	// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
	search: [
		{ label: '', prop: 'title', placeholder: '请输入配置名称',required:false, type: 'input' },
	],
};