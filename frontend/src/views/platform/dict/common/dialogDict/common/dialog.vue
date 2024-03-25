
<template>
	<el-dialog v-model="state.dialog.isShowDialog" draggable width="600px" @close="CloseIn">
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
import { formModels } from './constant';
import { useDictdatasApi } from '/@/api/platform/dict/index';
import type { FormInstance } from 'element-plus';
const state = reactive({
	formModels,
	ruleForm: {
		parent: '',
		order: '1'
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
	dataDictsData: {}, //数据字典数据
});

const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQuery', 'DictdatashandleClose']);

const props = defineProps({
	//子组件接收父组件传递过来的值
	DictdataList: Object,
})
//使用父组件传递过来的值
const { DictdataList } = toRefs(props)

// 为下拉框赋值对应的数据到option里
const handlePatch = () => {
	var dataOption = state.formModels.filter((i) => i.options)
	for (var item of dataOption) {
		//获取字典主表数据
		if (item["key"] === "parent") {
			const result = JSON.parse(JSON.stringify(props.DictdataList)).map(o => { return { value: o.id, label: o.name } });
			item["options"] = result
		}
	}
}

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	state.dialog.isShowDialog = true;
	handlePatch()
	formType.value = type
	if (type === 'add') {
		state.dataDictsData = row
		state.dialog.title = '新增字典';
		state.dialog.submitTxt = '新 增';
	} else {
		editId.value = row.id
		state.dataDictsData = row
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
		emits('DictdatashandleClose');
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
		emits('DictdatashandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = { ...state.ruleForm, ...{ dict_table: state.dataDictsData.dict_table } }
		const params = editId.value
		await useDictdatasApi().editDictdatas(data, params)
	} else {
		if (state.ruleForm.parent) {
			const parentdata = props.DictdataList.filter(el => el.id === state.ruleForm.parent);
			const parentObj = JSON.parse(JSON.stringify(parentdata[0]))
			const data = { ...state.ruleForm, ...{ dict_table: state.dataDictsData.id }, ...{ parentObj: parentObj } }
			await useDictdatasApi().addDictdatas(data)
		} else {
			const data = { ...state.ruleForm, ...{ dict_table: state.dataDictsData.id }, ...{ parentObj: {} } }
			await useDictdatasApi().addDictdatas(data)
		}
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
