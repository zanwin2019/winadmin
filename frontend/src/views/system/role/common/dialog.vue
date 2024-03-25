
<template>
	<el-dialog v-model="state.dialog.isShowDialog" draggable width="769px" @close="CloseIn">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
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
import { ref, reactive, onMounted, toRefs,nextTick } from 'vue';
import Form from '/@/components/form/index.vue';
import { formModels } from './constant';
import { useRoleApi } from '/@/api/system/role/index';
import { useMenuApi } from '/@/api/platform/menu/index';
import type { FormInstance } from 'element-plus';
const state = reactive({
	formModels,
	treeList:[],
	ruleForm: {
		name:'',
		code:'',
		type:'',
		sort:0,
		is_builtin:true,
		status:1,
		remark:''
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const formType = ref('')
const myFormRef = ref<FormInstance>();
const editId = ref();
const emits = defineEmits(['handleQuery','RolehandleClose']);


//获取权限树
const getMenu = () => {
	useMenuApi().getMenu().then(res => {
		getMenuList(res.data)
	})
}
const getMenuList = (res:any) => {
	var dataOption = state.formModels.filter((i) => i.options)
	for (var item of dataOption) {
		if (item["key"] === "tree") {
			item["options"] = res;
		}
	}
}

// 打开弹窗
const openDialog = (type: string, row: EmptyObjectType) => {
	getMenu()
	state.dialog.isShowDialog = true;
	formType.value = type
	if (type === 'add') {
		state.dialog.title = '新增角色';
		state.dialog.submitTxt = '新 增';
	} else {
		editId.value = row.id
		//防止表单回显
		nextTick(() => {
			state.ruleForm = JSON.parse(JSON.stringify(row));
		});
		state.dialog.title = `修改角色【${row.name}】`;
		state.dialog.submitTxt = '修 改';
	}
};
// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQuery');
		emits('RolehandleClose');
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
		emits('RolehandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	let flag1 = await myFormRef.value?.validateJbxx();
	if (!flag1) return;
	if (formType.value === 'edit') {
		const data = state.ruleForm
		const params = editId.value
		await useRoleApi().editRole(data, params)
	} else {
		await useRoleApi().addRole(state.ruleForm)
	}
	closeDialog();
}
onMounted(async () => {
	// 调用子组件“resetRuleForm”函数
	// myFormRef.value?.resetRuleForm();
});
// 暴露变量
defineExpose({
	openDialog,
});



</script>


<style scoped></style>
