// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data: [],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'id', colWidth: '', align: 'center', title: 'ID', type: 'text', isCheck: true },
		{ key: 'name', colWidth: '', align: 'center', title: '字典名称', type: 'text', isCheck: true },
		{ key: 'key', colWidth: '', align: 'center', title: '字典编码', type: 'text', isCheck: true },
		{ key: 'parent_name', colWidth: '', align: 'center', title: '父级', type: 'text', isCheck: true },
		{ key: 'order', colWidth: '', align: 'center', title: '排序', type: 'text', isCheck: true },
		{ key: 'operate', colWidth: '180', align: 'center', title: '操作', type: 'text', isCheck: true, slot: 'operateSlot' },
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