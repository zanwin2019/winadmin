/* eslint-disable no-mixed-spaces-and-tabs */
// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	// data: [
	// 	{
	// 		id:'1',
	// 		name:'菜单管理1',
	// 		type:'菜单',
	// 		status:0,
	// 		icon:'ele-Avatar'
	// 	},
	// 	{
	// 		id:'2',
	// 		name:'菜单管理2',
	// 		type:'菜单',
	// 		status:0,
	// 	},
	// 	{
	// 		id:'3',
	// 		name:'菜单管理3',
	// 		type:'菜单',
	// 		status:0,
	// 		icon:'ele-Avatar',
	// 		children:[
	// 			{
	// 				id:'33',
	// 				name:'菜单管理33',
	// 				type:'菜单',
	// 				status:0,
	// 				icon:'ele-Avatar'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id:'4',
	// 		name:'菜单管理4',
	// 		type:'节点',
	// 		status:1,
	// 		children:[
	// 			{
	// 				id:'44',
	// 				name:'菜单管理44',
	// 				type:'节点',
	// 				status:1,
	// 			}
	// 		]
	// 	},
	// ],
	data:[],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'name', align:'left', colWidth: '', title: '菜单名称', type: 'text', isCheck: true,slot:'nameSlot' },
		{ key: 'type', align:'center', colWidth: '', title: '类型', type: 'text', isCheck: true,slot:'typeSlot' },
		{ key: 'path', align:'center', colWidth: '', title: '路由路径', type: 'text', isCheck: true },
		{ key: 'component', align:'center', colWidth: '', title: '组件路径', type: 'text', isCheck: true },
		{ key: 'permission', align:'center', colWidth: '', title: '权限标识', type: 'text', isCheck: true },
		{ key: 'sort', align:'center', colWidth: '', title: '排序', type: 'text', isCheck: true },
		{ key: 'status', align:'center', colWidth: '', title: '状态', type: 'text', isCheck: true,slot:'statusSlot' },
		{ key: 'updated_at', align:'center', colWidth: '', title: '修改时间', type: 'text', isCheck: true },
		{ key: 'operate', align:'center', colWidth: '', title: '操作', type: 'text', isCheck: true,slot:'operateSlot', fixed:'right' },
	],
	// 配置项（必传）
	config: {
		total: 0, // 列表总数
		loading: true, // loading 加载
		isBorder: true, // 是否显示表格边框
		isSerialNo: false, // 是否显示表格序号
		isSelection: false, // 是否显示表格多选
		isOperate: false, // 是否显示表格操作栏
		isPage:false, // 是否显示分页
		isSetup:false,// 是否显示设置
	},
	// 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
	param: {
		pageNum: 1,
		pageSize: 10,
	},
	// 打印标题
	printName: 'winadmin 表格打印演示',
};

export const searchData = {
	// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
	search: [
		{ label: '菜单名称', prop: 'name', placeholder: '请输入菜单名称', required: false, type: 'input' },
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