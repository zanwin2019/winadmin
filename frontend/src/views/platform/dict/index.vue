<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
			<TableSearch v-bind="state.searchData" @search="handleQuery" />
			<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddDatadicts('add')" />
		</el-card>
		<div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto">
			<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
				<template v-slot:enabledSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.is_enabled == true">启用</el-tag>
					<el-tag type="danger" v-if="scopeData.row.is_enabled == false">禁用</el-tag>
				</template>
				<template v-slot:readonlySlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.is_readonly == true">是</el-tag>
					<el-tag type="danger" v-if="scopeData.row.is_readonly == false">否</el-tag>
				</template>
				<template v-slot:builtinSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.is_builtin == true">是</el-tag>
					<el-tag type="danger" v-if="scopeData.row.is_builtin == false">否</el-tag>
				</template>
				<template v-slot:operateSlot="{ scopeData }">
					<el-button icon="ele-Edit" text type="primary" @click="onOpenEditDatadicts('edit', scopeData.row)" :disabled="scopeData.row.is_readonly == true"> 编辑 </el-button>
					<el-button icon="ele-Delete" text type="danger" @click="delDatadicts(scopeData.row)" :disabled="scopeData.row.is_builtin == true"> 删除 </el-button>
				</template>
			</Table>
		</div>
		<DatadictsDialog ref="menuDialogRef" @handleQuery="handleQuery" v-if="state.dialogVisible" @DatadictshandleClose="DatadictshandleClose"/>
	</div>
</template>

<script setup lang="ts" name="systemDatadicts">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, searchData, buttonData } from './constant.ts'
import { useDatadictsApi } from '/@/api/platform/dict/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const DatadictsDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));

const menuDialogRef = ref();
const state = reactive({
	searchData,
	buttonData,
	tableData,
	dialogVisible:false,
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

	useDatadictsApi().getDatadicts(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}

// 打开新增菜单弹窗
const onOpenAddDatadicts = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditDatadicts = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const DatadictshandleClose =() => {
      state.dialogVisible = false;
    }

// 删除当前行
const delDatadicts = (row: any) => {
	ElMessageBox.confirm(`确定删除字典：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useDatadictsApi().delDatadicts(row.id)
		handleQuery();
		ElMessage.success('删除成功');
	})
		.catch(() => { });
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
