<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
			<TableSearch v-bind="state.searchData" @search="handleQuery" />
			<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddTenant('add')" />
		</el-card>
		<div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto">
			<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
				<template v-slot:statusSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.status === 1">启用</el-tag>
					<el-tag type="danger" v-if="scopeData.row.status === 0">禁用</el-tag>
				</template>
				<template v-slot:operateSlot="{ scopeData }">
					<el-button icon="ele-Edit" text type="primary" @click="onOpenEditTenant('edit', scopeData.row)">编辑</el-button>
					<el-button icon="ele-Delete" text type="danger" @click="delTenant(scopeData.row)" :disabled="scopeData.row.schema_name === 'public'"> 删除 </el-button>
					<el-dropdown>
						<el-button icon="ele-MoreFilled" size="small" text type="primary" style="padding:15px 0 0 20px" />
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item icon="ele-CopyDocument" @click="onOpenPerTenant(scopeData.row)"> 分配权限 </el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</Table>
		</div>
		<TenantDialog ref="menuDialogRef" @handleQuery="handleQuery" v-if="state.dialogVisible" @TenanthandleClose="TenanthandleClose"/>
		<PerDialog ref="perDialogRef" @handleQuery="handleQuery" v-if="state.dialogVisible2" @PerhandleClose="PerhandleClose"/>
	</div>
</template>

<script setup lang="ts" name="platformTenant">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, searchData, buttonData } from './constant'
import { useTenantApi } from '/@/api/platform/tenant/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TenantDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const PerDialog = defineAsyncComponent(() => import('./common/dialogPer.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));

const menuDialogRef = ref();
const perDialogRef = ref();
const state = reactive({
	searchData,
	buttonData,
	tableData,
	dialogVisible:false,
	dialogVisible2:false,
});


const str = ref<any>("")
const pageChange  = (value: any) => {
	str.value = value
	state.tableData.param = str
	handleQuery()
}

// 获取表格数据、搜索
const handleQuery = (searchParams: any) => {
	state.tableData.config.loading = true;
	if (searchParams) {
		var params = Object.assign(searchParams,state.tableData.param);
	}else{
		var params = state.tableData.param
	}

	useTenantApi().getTenant(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}

// 打开新增菜单弹窗
const onOpenAddTenant = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditTenant = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const TenanthandleClose =() => {
      state.dialogVisible = false;
    }
const PerhandleClose =() => {
	state.dialogVisible2 = false;
}

// 删除当前行
const delTenant = (row: any) => {
	ElMessageBox.confirm(`确定删除租户：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useTenantApi().delTenant(row.id)
		handleQuery();
		ElMessage.success('删除成功');
	})
		.catch(() => { });
};

// 分配权限
// 打开编辑菜单弹窗
const onOpenPerTenant = (row: EmptyObjectType) => {
	state.dialogVisible2 = true;
	setTimeout(() => {
	perDialogRef.value?.openDialog(row);
	}, 200);
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
