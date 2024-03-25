<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-row :gutter="8" style="width: 100%" class="table-demo-padding layout-padding-view">
			<el-col :span="4" :xs="24">
				<DeptTree ref="orgTreeRef" @node-click="nodeClick" @handleQuery="handleQuery"/>
			</el-col>
			<el-col :span="20" :xs="24">
				<div class="system-menu-container layout-padding" style="display: flex;padding: 0 !important;position: inherit;">
				<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
					<TableSearch v-bind="state.searchData" @search="handleQuery" />
					<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddDept('add')" />
				</el-card>
				<div style="margin-top: 8px;" class="table-demo-padding layout-padding-view layout-padding-auto">
					<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
						<template v-slot:statusSlot="{ scopeData }">
							<el-tag type="success" v-if="scopeData.row.status === 1">启用</el-tag>
							<el-tag type="danger" v-if="scopeData.row.status === 0">禁用</el-tag>
						</template>
						<template v-slot:operateSlot="{ scopeData }">
							<el-button icon="ele-Edit" text type="primary" @click="onOpenEditDept('edit', scopeData.row)">
								编辑
							</el-button>
							<el-button icon="ele-Delete" text type="danger" @click="delDept(scopeData.row)"> 删除 </el-button>
						</template>
					</Table>
				</div>
			</div>
			</el-col>
		</el-row>
		<DeptDialog ref="menuDialogRef" @handleQuery="handleQuery" :menuList="state.menuList" v-if="state.dialogVisible" @DepthandleClose="DepthandleClose"  @initTreeData="initTreeData" />
	</div>
</template>

<script setup lang="ts" name="systemDept">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, searchData, buttonData } from './constant'
import { useDeptApi } from '/@/api/system/dept/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const DeptTree = defineAsyncComponent(() => import('./common/deptTree.vue'));
const DeptDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));

const menuDialogRef = ref();
const state = reactive({
	searchData,
	buttonData,
	tableData,
	dialogVisible: false,
	menuList:[],
});

const orgTreeRef = ref();

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
		var params = searchParams
	}
	useDeptApi().getDept(params).then(res => {
		state.tableData.data = res.data
		const propData = res.data
		menuListProp(propData)
		// state.tableData.config.total = res.data.count
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}

// 菜单树传给弹窗
const menuListProp = (propData: any) => {
	state.menuList = ref<any>(JSON.parse(JSON.stringify(propData)))
}

// 打开新增菜单弹窗
const onOpenAddDept = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditDept = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const DepthandleClose = () => {
	state.dialogVisible = false;
}
// 表格进行操作后刷新树initTreeData
const initTreeData = () => {
	orgTreeRef.value.initTreeData()
}

// 删除当前行
const delDept = (row: any) => {
	ElMessageBox.confirm(`确定删除部门：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useDeptApi().delDept(row.id)
		handleQuery();
		initTreeData();
		ElMessage.success('删除成功');
	})
		.catch(() => { });
};

// 树组件点击
const nodeClick = async (node: any) => {
	// state.queryParams.id = node.id;
	var params = {id:node.id};
	// var params = {name:node.name};
	// state.queryParams.code = undefined;
	// state.queryParams.orgType = undefined;
	handleQuery(params);
};

// 页面加载时
onMounted(async () => {
	handleQuery();
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
