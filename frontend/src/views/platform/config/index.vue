<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-row :gutter="8" style="width: 100%" class="table-demo-padding layout-padding-view">
			<el-col :span="4" :xs="24">
				<div class="system-menu-container layout-padding"
					style="display: flex;padding: 0 !important;position: inherit;">
					<el-card shadow="hover" :body-style="{ paddingBottom: '', display: 'flex' }">
						<el-input v-model="state.SeachTabData" placeholder="请输入选项卡名称" size="small" class="w-50 m-2"
							:suffix-icon="Search" clearable @change="onSearchTab"></el-input>
						<el-button icon="ele-Plus" type="primary" size="default" plain="" @click="onOpenAddConfigTab('add')"
							style="margin-left: 20px;padding-right: 10px;border: 0;"></el-button>
					</el-card>
					<div style="margin-top: 8px;" class="table-demo-padding layout-padding-view layout-padding-auto">
						<Table ref="tableRefTab" v-bind="state.TableDataTab" class="table-demo1" highlight-current-row
							@row-click="handleCurrentChange" @cell-mouse-enter="mouseEnter" @cell-mouse-leave="mouseLeave"
							:row-style="{ height: '40px' }">
							<template v-slot:operateSlot="{ scopeData }">
								<el-dropdown>
									<el-button icon="ele-MoreFilled" size="small" text type="primary"
										v-show="state.operate && state.operateId == scopeData.row.id"
										style="padding-left: 5px;padding-bottom: 25px; transform:rotate(90deg)" />
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item icon="ele-Plus"
												@click="onOpenAddConfigTab('addPid', scopeData.row)"> 添加 </el-dropdown-item>
											<el-dropdown-item icon="ele-Edit"
												@click="onOpenEditConfigTab('edit', scopeData.row)"> 编辑 </el-dropdown-item>
											<el-dropdown-item icon="ele-Delete" @click="delConfigTab(scopeData.row)">
												删除</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</template>
						</Table>
					</div>
				</div>
			</el-col>
			<el-col :span="20" :xs="24">
				<div class="system-menu-container layout-padding"
					style="display: flex;padding: 0 !important;position: inherit;">
					<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
						<TableSearch v-bind="state.searchData" @search="handleQuery" />
						<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddConfig('add')"/>
					</el-card>
					<div style="margin-top: 8px;" class="table-demo-padding layout-padding-view layout-padding-auto">
						<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
							<template v-slot:ruleSlot="{ scopeData }">
								<el-tag type="success" v-if="scopeData.row.rule === true">是</el-tag>
								<el-tag type="danger" v-if="scopeData.row.rule === false">否</el-tag>
							</template>
							<template v-slot:isrowSlot="{ scopeData }">
								<el-tag type="success" v-if="scopeData.row.isrow === true">是</el-tag>
								<el-tag type="danger" v-if="scopeData.row.isrow === false">否</el-tag>
							</template>
							<template v-slot:disabledSlot="{ scopeData }">
								<el-tag type="success" v-if="scopeData.row.disabled === true">是</el-tag>
								<el-tag type="danger" v-if="scopeData.row.disabled === false">否</el-tag>
							</template>
							<template v-slot:operateSlot="{ scopeData }">
								<el-button icon="ele-Edit" text type="primary"
									@click="onOpenEditConfig('edit', scopeData.row)">
									编辑
								</el-button>
								<el-button icon="ele-Delete" text type="danger" @click="delConfig(scopeData.row)"> 删除
								</el-button>
							</template>
						</Table>
					</div>
				</div>
			</el-col>
		</el-row>
		<ConfigtabDialog ref="menuDialogReftab" @handleQueryTab="handleQueryTab" :menuListTab="state.menuListTab"
			v-if="state.dialogVisibleTab" @ConfighandleCloseTab="ConfighandleCloseTab" />
		<ConfigDialog ref="menuDialogRef" @handleQuery="handleQuery" :menuList="state.menuList" v-if="state.dialogVisible"
			@ConfighandleClose="ConfighandleClose" />
	</div>
</template>

<script setup lang="ts" name="systemConfig">
import { defineAsyncComponent, ref, onMounted, reactive,watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, TableDataTab, searchData, searchDataTab, buttonData } from './constant'
import { useConfigtabApi, useConfigApi } from '/@/api/platform/config/index';
import { Search } from '@element-plus/icons-vue'
import { ElTable } from 'element-plus'

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const ConfigDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const ConfigtabDialog = defineAsyncComponent(() => import('./common/dialogTab.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));

const menuDialogRef = ref();
const menuDialogReftab = ref();

const state = reactive({
	searchData,
	searchDataTab,
	buttonData,
	tableData,
	TableDataTab,
	dialogVisible: false,
	dialogVisibleTab: false,
	menuList: [],
	menuListTab: [],
	SeachTabData: '',
	operate: false,
	operateId: '',
	tabId:'',
});

// const tableRefTab = ref();
const tableRefTab = ref<InstanceType<typeof ElTable>>()
const setCurrentRow = ref()

const str = ref<any>("")
const pageChange = (value: any) => {
	str.value = value
	state.tableData.param = str
	handleQuery()
}

// 获取表格数据、搜索
const handleQuery = (searchParams: any) => {
	state.tableData.config.loading = true;
	if (searchParams) {
		var params = Object.assign(searchParams, state.tableData.param);
	} else {
		var params = state.tableData.param
	}
	useConfigApi().getConfig(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
		const propData = res.data.items
		menuListProp(propData)
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}
const handleQueryTab = (searchParams: any) => {
	state.TableDataTab.config.loading = true;
	if (searchParams) {
		var params = searchParams
	}
	useConfigtabApi().getConfigtab(params).then(res => {
		state.TableDataTab.data = res.data
		const propDataTab = res.data
		menuListPropTab(propDataTab)
	}).finally(() => {
		state.TableDataTab.config.loading = false;
	})
}

// 菜单树传给弹窗
const menuListProp = (propData: any) => {
	state.menuList = ref<any>(JSON.parse(JSON.stringify(propData)))
}
const menuListPropTab = (propDataTab: any) => {
	state.menuListTab = ref<any>(JSON.parse(JSON.stringify(propDataTab)))
}

// 打开新增菜单弹窗
const onOpenAddConfig = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type,state.tabId);
	}, 200);
};
const onOpenAddConfigTab = (type: string, row: EmptyObjectType) => {
	state.dialogVisibleTab = true;
	setTimeout(() => {
		menuDialogReftab.value?.openDialog(type, row);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditConfig = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type, row);
	}, 200);
};
const onOpenEditConfigTab = (type: string, row: EmptyObjectType) => {
	state.dialogVisibleTab = true;
	setTimeout(() => {
		menuDialogReftab.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const ConfighandleClose = () => {
	state.dialogVisible = false;
}
const ConfighandleCloseTab = () => {
	state.dialogVisibleTab = false;
}

// 删除当前行
const delConfig = (row: any) => {
	ElMessageBox.confirm(`确定删除配置：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useConfigApi().delConfig(row.id)
		handleQuery();
		ElMessage.success('删除成功');
	})
		.catch(() => { });
};
const delConfigTab = (row: any) => {
	ElMessageBox.confirm(`确定删除配置：【${row.title}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useConfigtabApi().delConfigtab(row.id)
		handleQueryTab();
		ElMessage.success('删除成功');
	}).catch(() => { });
};

// 点击单行
const handleCurrentChange = (row: any) => {
	const searchParams = { config_tab_id: row.id }
	state.tabId = row.id
	state.buttonData.config.isaddDisabled = state.tabId =='' ? true : false //控制新增按钮是否禁用
	handleQuery(searchParams)
};

// Tab搜索onSearchTab
const onSearchTab = () => {
	const searchParams = { title: state.SeachTabData }
	handleQueryTab(searchParams)
};

// mouseEnter
const mouseEnter = (row: any) => {
	state.operate = true
	state.operateId = row.id
};

// mouseLeave
const mouseLeave = (row: any) => {
	state.operate = false
	state.operateId = ''
};

// 页面加载时
onMounted(async () => {
	handleQuery();
	handleQueryTab();
});

</script>
<style scoped lang="scss">
.system-menu-container {
	.table-demo-padding {
		padding: 15px;

		.table-demo {
			flex: 1;
			overflow: hidden;
		}
	}
}
</style>
