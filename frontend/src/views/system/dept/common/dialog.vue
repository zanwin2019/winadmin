
<template>
	<el-dialog v-model="state.dialog.isShowDialog" draggable width="769px" @close="CloseIn">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit/>
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
import { useDeptApi } from '/@/api/system/dept/index';
import type { FormInstance } from 'element-plus';
import { useUserApi } from '/@/api/system/user/index';
const state = reactive({
	formModels,
	ruleForm: {
		parent_id: '0',
		name: '',
		leader: '',
		status: 1,
		sort: 0,
		desc: ''
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
	leaderList:[]
});

const props = defineProps({
	//子组件接收父组件传递过来的值
	menuList: Object,
})
//使用父组件传递过来的值
const { menuList } = toRefs(props)

const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQuery', 'DepthandleClose', 'initTreeData']);

// 为下拉框赋值对应的数据到option里
const handlePatch = () => {
	var dataOption = state.formModels.filter((i) => i.options)
	for (var item of dataOption) {
		//获取字典主表数据
		if (item["key"] === "parent_id") {
			item["options"] = JSON.parse(JSON.stringify(props.menuList));
		}

		if (item["key"] === "leader") {
			const result = JSON.parse(JSON.stringify(state.leaderList)).map( o =>{return{value:o.id, label:o.chname}});
			item["options"] = result
		}

	}
}

// 获取用户负责人
const getleaderList = async() => {
	await useUserApi().getUser().then(res => {
		state.leaderList=res.data
		handlePatch()
	})
};

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	state.dialog.isShowDialog = true;
	getleaderList()
	handlePatch()
	formType.value = type
	if (type === 'add') {
		state.dialog.title = '新增部门';
		state.dialog.submitTxt = '新 增';
	} else {
		editId.value = row.id
		//防止表单回显
		nextTick(() => {
			state.ruleForm = JSON.parse(JSON.stringify(row));
		});
		state.dialog.title = `修改部门【${row.name}】`;
		state.dialog.submitTxt = '修 改';
	}
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQuery');
		emits('DepthandleClose');
		emits('initTreeData');
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
		emits('DepthandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = state.ruleForm
		const params = editId.value
		await useDeptApi().editDept(data, params)
	} else {
		await useDeptApi().addDept(state.ruleForm)
	}
	closeDialog();
}
onMounted(async () => {
	// getleaderList()
});
// 暴露变量
defineExpose({
	openDialog,
});



</script>


<style scoped></style>
