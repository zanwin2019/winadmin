
<template>
	<el-dialog v-model="state.dialog.isShowDialog" width="769px" draggable @close="CloseIn">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
				<span>{{ state.dialog.title }}</span>
			</div>
		</template>
		<Form :formModels="state.formModels" :ruleForm="state.ruleForm" ref="myFormRef">
			<template v-slot:href="" v-if="state.ruleForm.type === 3"></template>
			<template v-slot:method="" v-if="state.ruleForm.type === 3"></template>
			<template v-slot:is_iframe="" v-if="state.ruleForm.type === 3"></template>

			<template v-slot:pathname="" v-if="state.ruleForm.type === 4"></template>
			<template v-slot:path="" v-if="state.ruleForm.type === 4"></template>
			<template v-slot:component="" v-if="state.ruleForm.type === 4"></template>
			<template v-slot:icon="" v-if="state.ruleForm.type === 4"></template>
			<template v-slot:redirect="" v-if="state.ruleForm.type === 4"></template>
		</Form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="onCancel" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, toRefs,nextTick } from 'vue';
import Form from '/@/components/form/index.vue';
import { formModels } from './constant';
import { useMenuApi } from '/@/api/platform/menu/index';
import type { FormInstance } from 'element-plus';
const state = reactive({
	formModels,
	ruleForm: {
		parent:'0',
		type: 3,
		name:'',
		permission:'',
		sort: 0,
		is_hidden: 0,
		status: 1,
		remark:'',

		is_iframe:1,
		href:'',
		method:'',

		redirect:'',
		path:'',
		component:'',
		icon:'',

	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// watch(()=>state.ruleForm.type,(newValue,valuOld)=>{
// 	// window.console.log(`count值从${valuOld}变为${newValue}`)
// 	if(newValue === 4){
// 		// state.ruleForm["is_iframe"]= 1
// 		// state.ruleForm["href"]= ''
// 		// state.ruleForm["method"]= ''

// 		// delete state.ruleForm["redirect"]
// 		// delete state.ruleForm["path"]
// 		// delete state.ruleForm["component"]
// 		// delete state.ruleForm["icon"]
// 	}else{
// 		// delete state.ruleForm["is_iframe"]
// 		// delete state.ruleForm["href"]
// 		// delete state.ruleForm["method"]

// 		// state.ruleForm["redirect"]= ''
// 		// state.ruleForm["path"]= ''
// 		// state.ruleForm["component"]= ''
// 		// state.ruleForm["icon"]= ''
// 	}
//  })

const props = defineProps({
	//子组件接收父组件传递过来的值
	menuList: Object,
})
//使用父组件传递过来的值
const { menuList } = toRefs(props)
const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQuery','MenuhandleClose']);

// 为下拉框赋值对应的数据到option里
const handlePatch = () => {
	var dataOption = state.formModels.filter((i) => i.options)
	for (var item of dataOption) {
		//获取字典主表数据
		if (item["key"] === "parent") {
			item["options"] = JSON.parse(JSON.stringify(props.menuList));
		}
	}
}

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	// myFormRef.value?.resetForm();//重置表单
	state.dialog.isShowDialog = true;
	// myFormRef.value?.resetRuleForm();//清除表单
	handlePatch()
	formType.value = type
	if (type === 'add') {
		state.dialog.title = '新增菜单';
		state.dialog.submitTxt = '新 增';
	} else {
		editId.value = row.id
		//防止表单回显
		nextTick(() => {
			state.ruleForm = JSON.parse(JSON.stringify(row));
		});
		// state.ruleForm = JSON.parse(JSON.stringify(row));
		state.dialog.title = `修改菜单【${row.name}】`;
		state.dialog.submitTxt = '修 改';
	}
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQuery');
		emits('MenuhandleClose');
	}, 500);
	state.dialog.isShowDialog = false;
};

// 取消
const onCancel = () => {
	// closeDialog();
	state.dialog.isShowDialog = false;
};

//关闭弹窗all
const CloseIn = () => {
	setTimeout(() => {
		emits('MenuhandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = state.ruleForm
		const params = editId.value
		await useMenuApi().editMenu(data, params)
	} else {
		await useMenuApi().addMenu(state.ruleForm)
	}
	closeDialog();
}
onMounted(async () => {
	handlePatch()
});
// 暴露变量
defineExpose({
	openDialog,
});



</script>


<style scoped></style>
