<template>
	<div class="system-role-container layout-padding" style="display: flex;">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
			<TableSearch v-bind="state.searchData" @search="handleQuery" />
			<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddRole('add')" />
		</el-card>
		<div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto">
			<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
				<template v-slot:statusSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.status === 1">启用</el-tag>
					<el-tag type="danger" v-if="scopeData.row.status === 0">禁用</el-tag>
				</template>
				<template v-slot:typeSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.type === 1">是</el-tag>
					<el-tag type="danger" v-if="scopeData.row.type === 0">否</el-tag>
				</template>
				<template v-slot:builtinSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.is_builtin == true">是</el-tag>
					<el-tag type="danger" v-if="scopeData.row.is_builtin == false">否</el-tag>
				</template>
				<template v-slot:operateSlot="{ scopeData }">
					<el-button icon="ele-Edit" text type="primary" @click="onOpenEditRole('edit', scopeData.row)">编辑</el-button>
					<el-button icon="ele-Delete" text type="danger" @click="delRole(scopeData.row)"> 删除 </el-button>
					<el-dropdown>
						<el-button icon="ele-MoreFilled" size="small" text type="primary" style="padding:15px 0 0 20px" />
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item icon="ele-CopyDocument" @click="onOpenPerRole(scopeData.row)"> 分配权限 </el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</Table>
		</div>
		<RoleDialog ref="roleDialogRef" @handleQuery="handleQuery" v-if="state.dialogVisible" @RolehandleClose="RolehandleClose"/>
		<PerDialog ref="perDialogRef" @handleQuery="handleQuery" v-if="state.dialogVisible2" @PerhandleClose="PerhandleClose"/>
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, ref, onMounted, reactive, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, searchData, buttonData } from './constant'
import { useRoleApi } from '/@/api/system/role/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const RoleDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const PerDialog = defineAsyncComponent(() => import('./common/dialogPer.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));

const roleDialogRef = ref();
const perDialogRef = ref();
const state = reactive({
	searchData,
	buttonData,
	tableData,
	roleList:[],
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
	useRoleApi().getRole(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}

// 打开新增菜单弹窗
const onOpenAddRole = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		roleDialogRef.value?.openDialog(type);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditRole = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		roleDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 删除当前行
const delRole = (row: any) => {
	ElMessageBox.confirm(`确定删除角色：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useRoleApi().delRole(row.id)
		handleQuery();
		ElMessage.success('删除成功');
	})
		.catch(() => { });
};
// 分配权限
// 打开编辑菜单弹窗
const onOpenPerRole = (row: EmptyObjectType) => {
	state.dialogVisible2 = true;
	setTimeout(() => {
	perDialogRef.value?.openDialog(row);
	}, 200);
};
// 页面加载时
onMounted(async () => {
	handleQuery();
});
// 关闭弹窗并重置表单
const RolehandleClose =() => {
      state.dialogVisible = false;
    }
const PerhandleClose =() => {
      state.dialogVisible2 = false;
    }

</script>
<style scoped lang="scss">
.system-role-container {
	.table-demo-padding {
		padding: 15px;

		.table-demo {
			flex: 1;
			overflow: hidden;
		}
	}
}
</style>
