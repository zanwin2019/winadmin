<template>
	<div class="system-user-container layout-padding" style="display: flex;">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
					<TableSearch v-bind="state.searchData" @search="handleQuery" />
					<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddUser('add')" />
				</el-card>
				<div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto">
					<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
						<template v-slot:superuserSlot="{ scopeData }">
							<el-tag type="success" v-if="scopeData.row.is_superuser == true">是</el-tag>
							<el-tag type="danger" v-if="scopeData.row.is_superuser == false">否</el-tag>
						</template>
						<template v-slot:activeSlot="{ scopeData }">
							<el-tag type="success" v-if="scopeData.row.is_active == true">有效</el-tag>
							<el-tag type="danger" v-if="scopeData.row.is_active == false">无效</el-tag>
						</template>
						<template v-slot:staffSlot="{ scopeData }">
							<el-tag type="success" v-if="scopeData.row.is_staff == true">是</el-tag>
							<el-tag type="danger" v-if="scopeData.row.is_staff == false">否</el-tag>
						</template>
						<template v-slot:operateSlot="{ scopeData }">
							<el-button icon="ele-Edit" text type="primary" @click="onOpenEditUser('edit', scopeData.row)">编辑</el-button>
							<el-button icon="ele-Delete" text type="danger" @click="delUser(scopeData.row)" :disabled="scopeData.row.is_superuser == true"> 删除 </el-button>
							<el-dropdown>
								<el-button icon="ele-MoreFilled" size="small" text type="primary" style="padding:15px 0 0 20px" />
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item icon="ele-CopyDocument" @click="resetPassword(scopeData.row)"> 重置密码 </el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</template>
					</Table>
				</div>
		<UserDialog ref="userDialogRef" @handleQuery="handleQuery" v-if="state.dialogVisible"
			@UserhandleClose="UserhandleClose" />
	</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, searchData, buttonData } from './constant'
import { useUserApi } from '/@/api/system/user/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
// const UserTree = defineAsyncComponent(() => import('./common/deptTree.vue'));
const UserDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));

const userDialogRef = ref();
const state = reactive({
	searchData,
	buttonData,
	tableData,
	userList: [],
	dialogVisible: false
});


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
		// var params ={searchParams,...state.tableData.param}
	} else {
		var params = state.tableData.param
	}

	useUserApi().getUser(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}

// 打开新增菜单弹窗
const onOpenAddUser = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		userDialogRef.value?.openDialog(type);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditUser = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		userDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const UserhandleClose = () => {
	state.dialogVisible = false;
}

// 删除当前行
const delUser = (row: any) => {
	ElMessageBox.confirm(`确定删除用户：【${row.username}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useUserApi().delUser(row.id)
		handleQuery();
		ElMessage.success('删除成功');
	}).catch(() => { });
};

// 重置密码
const resetPassword = (row: any) => {
	ElMessageBox.confirm(`确定重置用户【${row.username}】的密码?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const data = {id:row.id}
		await useUserApi().resetPassword(data).then(res => {
		ElMessage.success(res.data.message);
	})
	}).catch(() => { });
};

// 页面加载时
onMounted(async () => {
	handleQuery();
});

</script>
<style scoped lang="scss">
.system-user-container {
	.table-demo-padding {
		padding: 15px;

		.table-demo {
			flex: 1;
			overflow: hidden;
		}
	}
}
</style>
