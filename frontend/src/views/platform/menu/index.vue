<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
			<TableSearch v-bind="state.searchData" @search="handleQuery" />
			<FunctionButton v-bind="state.buttonData" @onadd="onOpenAddMenu('add')" />
		</el-card>
		<div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto">
			<Table ref="tableRef" v-bind="state.tableData" class="table-demo">
				<template v-slot:nameSlot="{ scopeData }">
					<SvgIcon :name="scopeData.row.icon" />
					<span class="ml10">{{ $t(scopeData.row.name) }}</span>
				</template>
				<template v-slot:typeSlot="{ scopeData }">
					<el-tag type="info" v-if="scopeData.row.type === 1">模块</el-tag>
					<el-tag type="success" v-if="scopeData.row.type === 2">导航</el-tag>
					<el-tag type="primary" v-if="scopeData.row.type === 3">菜单</el-tag>
					<el-tag type="warning" v-if="scopeData.row.type === 4">节点</el-tag>
				</template>
				<template v-slot:statusSlot="{ scopeData }">
					<el-tag type="success" v-if="scopeData.row.status === 1">启用</el-tag>
					<el-tag type="danger" v-else>禁用</el-tag>
				</template>
				<template v-slot:operateSlot="{ scopeData }">
					<el-button icon="ele-Edit" text type="primary" @click="onOpenEditMenu('edit', scopeData.row)"> 编辑
					</el-button>
					<el-button icon="ele-Delete" text type="danger" @click="delMenu(scopeData.row)"> 删除 </el-button>
				</template>
			</Table>
		</div>
		<!-- v-if="menuList!=null" -->
		<MenuDialog ref="menuDialogRef" @handleQuery="handleQuery" :menuList="state.menuList" v-if="state.dialogVisible"
			@MenuhandleClose="MenuhandleClose" />
	</div>
</template>

<script setup lang="ts" name="systemMenu">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData, searchData, buttonData } from './constant'
import { useMenuApi } from '/@/api/platform/menu/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const MenuDialog = defineAsyncComponent(() => import('./common/dialog.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));
// 定义变量内容
// const stores = useRoutesList();
// const { routesList } = storeToRefs(stores);
const menuDialogRef = ref();
const state = reactive({
	searchData,
	buttonData,
	tableData,
	menuList: [],
	dialogVisible: false,
});


// 获取表格数据、搜索
const handleQuery = (searchParams: any) => {
	state.tableData.config.loading = true;
	if (searchParams) {
		var params = searchParams
	}
	useMenuApi().getMenu(params).then(res => {
		state.tableData.data = res.data
		const propData = res.data
		menuListProp(propData)
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}
// 菜单树传给弹窗
const menuListProp = (propData: any) => {
	state.menuList = ref<any>(JSON.parse(JSON.stringify(propData)))
}
// const menuList = ref<any>(JSON.parse(JSON.stringify(state.tableData.data)))

// 打开新增菜单弹窗
const onOpenAddMenu = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditMenu = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const MenuhandleClose = () => {
	state.dialogVisible = false;
}

// 删除当前行
const delMenu = (row: any) => {
	ElMessageBox.confirm(`确定删除菜单：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useMenuApi().delMenu(row.id)
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
