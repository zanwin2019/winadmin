
<template>
	<el-dialog v-model="state.dialog.isShowDialog" draggable width="769px" @close="CloseIn">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
				<span>{{ state.dialog.title }}</span>
			</div>
		</template>
		<Form :formModels="state.formModels" :ruleForm="state.ruleForm" ref="myFormRef"></Form>
		<Dict :dictData="state.ruleForm"  v-if="state.type === 'edit'" ></Dict>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="onCancel" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, defineAsyncComponent,nextTick } from 'vue';
import Form from '/@/components/form/index.vue';
import { formModels } from './constant';
import { useDatadictsApi } from '/@/api/platform/dict/index';
import type { FormInstance } from 'element-plus';
const state = reactive({
	type:'',
	formModels,
	ruleForm: {
		name:'',
		key:'',
		is_enabled:true,
		desc:''
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const Dict = defineAsyncComponent(() => import('./dialogDict/index.vue'));

const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQuery','DatadictshandleClose']);

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	state.dialog.isShowDialog = true;
	state.type = type
	formType.value = type
	if (type === 'add') {
		state.dialog.title = '新增字典';
		state.dialog.submitTxt = '新 增';
	} else {
		editId.value = row.id
		//防止表单回显
		nextTick(() => {
			state.ruleForm = JSON.parse(JSON.stringify(row));
		});
		state.dialog.title = `修改字典【${row.name}】`;
		state.dialog.submitTxt = '修 改';
	}
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQuery');
		emits('DatadictshandleClose');
	}, 500);
	state.dialog.isShowDialog = false;
};

// 取消
const onCancel = () => {
	state.dialog.isShowDialog = false;
};

//关闭弹窗all
const CloseIn = () => {
	setTimeout(() => {
		emits('DatadictshandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = state.ruleForm
		const params = editId.value
		await useDatadictsApi().editDatadicts(data, params)
	} else {
		await useDatadictsApi().addDatadicts(state.ruleForm)
		// state.type = 'edit' //新增提交后显示子
	}
	closeDialog();
}
onMounted(async () => {
	// 调用子组件“resetRuleForm”函数
	myFormRef.value?.resetRuleForm();
});
// 暴露变量
defineExpose({
	openDialog,
});



</script>


<style scoped lang="scss">
// ::v-deep(.el-overlay .el-overlay-dialog .el-dialog) {
// 	height: 80%;
//     overflow: auto;
// }
</style>
