<template>
		<!-- <div style="margin-top: 8px" class="table-demo-padding layout-padding-view layout-padding-auto"> -->
            <el-divider />
            <el-button icon="ele-Plus" type="success" size="default"  @click="onOpenAddDictdatas('add')" style="width:80px;margin-bottom:10px"> 新增 </el-button>
			<Table ref="tableRef" v-bind="state.tableData" class="table-demo" @pageChange="pageChange">
				<template v-slot:operateSlot="{ scopeData }">
					<el-button icon="ele-Edit" text type="primary" @click="onOpenEditDictdatas('edit', scopeData.row)" :disabled="scopeData.row.is_readonly == true"> 编辑 </el-button>
					<el-button icon="ele-Delete" text type="danger" @click="delDictdatas(scopeData.row)"> 删除 </el-button>
				</template>
			</Table>
		<!-- </div> -->
		<DictdatasDialog ref="menuDialogRef" :DictdataList="state.DictdataList" @handleQuery="handleQuery" v-if="state.dialogVisible" @DictdatashandleClose="DictdatashandleClose"/>
</template>

<script setup lang="ts" name="systemDictdatas">
import { defineAsyncComponent, ref, onMounted, reactive, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableData } from './constant'
import { useDictdatasApi } from '/@/api/platform/dict/index';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const DictdatasDialog = defineAsyncComponent(() => import('./common/dialog.vue'));

const menuDialogRef = ref();
const dict = ref();
const state = reactive({
	tableData,
	dialogVisible:false,
    DictdataList:[],
});

const props = defineProps({
	//子组件接收父组件传递过来的值
	dictData: Object,
})
//使用父组件传递过来的值
const { dictData } = toRefs(props)


const str = ref<any>("")
const pageChange  = (value: any) => {
	str.value = value
	state.tableData.param = str
	handleQuery()
}

// 获取表格数据、搜索
const handleQuery = () => {
    dict.value = props.dictData
	state.tableData.config.loading = true;
    var params = {...state.tableData.param,...{dict_table:props.dictData.id}}

	useDictdatasApi().getDictdatas(params).then(res => {
		state.tableData.data = res.data.items
		state.tableData.config.total = res.data.count
        const propData = res.data.items
        DictdataProp(propData)
	}).finally(() => {
		state.tableData.config.loading = false;
	})
}
// 菜单树传给弹窗
const DictdataProp = (propData: any) => {
	state.DictdataList = ref<any>(JSON.parse(JSON.stringify(propData)))
}

// 打开新增菜单弹窗
const onOpenAddDictdatas = (type: string) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type,dict.value);
	}, 200);
};

// 打开编辑菜单弹窗
const onOpenEditDictdatas = (type: string, row: EmptyObjectType) => {
	state.dialogVisible = true;
	setTimeout(() => {
		menuDialogRef.value?.openDialog(type, row);
	}, 200);
};

// 关闭弹窗并重置表单
const DictdatashandleClose =() => {
      state.dialogVisible = false;
    }

// 删除当前行
const delDictdatas = (row: any) => {
	ElMessageBox.confirm(`确定删除字典：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		await useDictdatasApi().delDictdatas(row.id)
		handleQuery();
		ElMessage.success('删除成功');
	}).catch(() => { });
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
