
<template>
	<el-dialog v-model="state.dialog.isShowDialog" draggable width="769px" @close="CloseIn">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
				</el-icon>
				<span>{{ state.dialog.title }}</span>
			</div>
		</template>
		<Form :formModels="state.formModels" :ruleForm="state.ruleForm" ref="myFormRef"></Form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="onCancel" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, toRefs, nextTick } from 'vue';
import Form from '/@/components/form/index.vue';
import { formModels } from './constantTab';
import { useConfigtabApi } from '/@/api/platform/config/index';
import type { FormInstance } from 'element-plus';
const state = reactive({
	formModels,
	ruleForm: {
		pid: '0',
		title: '',
		code: '',
		status: 1,
		is_display: 1,
		icon: '',
		type: '',
		sort: '0',
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const props = defineProps({
	//子组件接收父组件传递过来的值
	menuListTab: Object,
})
//使用父组件传递过来的值
const { menuListTab } = toRefs(props)

const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQueryTab', 'ConfighandleCloseTab', 'initTreeDataTab']);

// 为下拉框赋值对应的数据到option里
const handlePatch = () => {
	var dataOption = state.formModels.filter((i) => i.options)
	for (var item of dataOption) {
		//获取字典主表数据
		if (item["key"] === "pid") {
			item["options"] = JSON.parse(JSON.stringify(props.menuListTab));
		}
	}
}

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	state.dialog.isShowDialog = true;
	handlePatch()
	formType.value = type
	if (type === 'add') {
		state.dialog.title = '新增配置';
		state.dialog.submitTxt = '新 增';
	} else if (type === 'addPid') {
		state.dialog.title = '新增配置';
		state.dialog.submitTxt = '新 增';
		//防止表单回显
		nextTick(() => {
			state.ruleForm.pid = JSON.parse(JSON.stringify(row.id));
		});

	} else {
		editId.value = row.id
		//防止表单回显
		nextTick(() => {
			state.ruleForm = JSON.parse(JSON.stringify(row));
		});
		state.dialog.title = `修改配置【${row.title}】`;
		state.dialog.submitTxt = '修 改';
	}
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQueryTab');
		emits('ConfighandleCloseTab');
		emits('initTreeDataTab');
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
		emits('ConfighandleCloseTab');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = state.ruleForm
		const params = editId.value
		await useConfigtabApi().editConfigtab(data, params)
	} else {
		await useConfigtabApi().addConfigtab(state.ruleForm)
	}
	closeDialog();
}
onMounted(async () => {
});
// 暴露变量
defineExpose({
	openDialog,
});



</script>


<style scoped></style>
