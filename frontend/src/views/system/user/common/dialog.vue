
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
import { ref, reactive, onMounted, nextTick } from 'vue';
import Form from '/@/components/form/index.vue';
import { formModels } from './constant';
import { useUserApi } from '/@/api/system/user/index';
import type { FormInstance } from 'element-plus';
import { useRoleApi } from '/@/api/system/role/index';
const state = reactive({
	formModels,
	ruleForm: {
		username: '',
		password: '',
		phone: '',
		email: '',
		chname: '',
		company: '',
		sort: 0,
		remark: ''
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
	roleList: []
});

const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQuery', 'UserhandleClose']);

// 为下拉框赋值对应的数据到option里
const handlePatch = () => {
	var dataOption = state.formModels.filter((i) => i.options)
	for (var item of dataOption) {
		//获取字典主表数据
		if (item["key"] === "role") {
			const result = JSON.parse(JSON.stringify(state.roleList)).map(o => { return { value: o.id, label: o.name } });
			item["options"] = result
		}

	}
}

// 获取角色
const getroleList = async () => {
	await useRoleApi().getRole().then(res => {
		state.roleList = res.data
		handlePatch()
	})
};

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	getroleList()
	state.dialog.isShowDialog = true;
	formType.value = type
	if (type === 'add') {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
	} else {
		editId.value = row.id
		//防止表单回显
		nextTick(() => {
			state.ruleForm = JSON.parse(JSON.stringify(row));
		});
		state.dialog.title = `修改用户【${row.username}】`;
		state.dialog.submitTxt = '修 改';
	}
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQuery');
		emits('UserhandleClose');
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
		emits('UserhandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = state.ruleForm
		const params = editId.value
		await useUserApi().editUser(data, params)
	} else {
		await useUserApi().addUser(state.ruleForm)
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
