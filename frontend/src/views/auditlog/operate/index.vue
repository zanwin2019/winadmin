<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0', display: 'flex' }">
			<TableSearch v-bind="state.searchData" @search="handleQuery" />
		</el-card>
		<div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto">
			<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
				<template v-slot:objectSlot="{ scopeData }">
					<span>{{ scopeData.row.operation_model }}</span>
					<span>( id={{scopeData.row.operation_object.id }})</span>
				</template>
				<template v-slot:methodSlot="{ scopeData }">
					<el-tag type="primary" v-if="scopeData.row.request_method === 'GET'">{{scopeData.row.request_method}}</el-tag>
					<el-tag type="success" v-if="scopeData.row.request_method === 'POST'">{{scopeData.row.request_method}}</el-tag>
					<el-tag type="danger" v-if="scopeData.row.request_method === 'DELETE'">{{scopeData.row.request_method}}</el-tag>
					<el-tag type="info" v-if="scopeData.row.request_method === 'PATCH'">{{scopeData.row.request_method}}</el-tag>
					<el-tag type="warning" v-if="scopeData.row.request_method === 'PUT'">{{scopeData.row.request_method}}</el-tag>
				</template>
			</Table>
		</div>
	</div>
</template>

<script setup lang="ts" name="systemPost">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { tableData, searchData } from './constant'
import { useOperateLogsApi } from '/@/api/auditlog/operate/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));

const state = reactive({
	searchData,
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

	useOperateLogsApi().getOperateLogs(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}

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
