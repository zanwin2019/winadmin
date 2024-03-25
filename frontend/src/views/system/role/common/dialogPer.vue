
<template>
	<el-dialog v-model="state.dialog.isShowDialog" draggable width="600px" @close="CloseIn">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
				</el-icon>
				<span>{{ state.dialog.title }}</span>
			</div>
		</template>
		<el-tree ref="treeRef" :data="state.menuData" node-key="id" show-checkbox :check-strictly="state.checkStrict"
			style="margin-left: 30px;" :props="{ children: 'children', label: 'name', class: treeNodeClass }"
			:default-checked-keys="state.ownOrgData" highlight-current default-expand-all />
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
import { useRoleApi } from '/@/api/system/role/index';
import { useMenuApi } from '/@/api/platform/menu/index';
const state = reactive({
	menuData: [],
	ownOrgData: [],
	checkStrict: true,
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const treeRef = ref<InstanceType<typeof ElTree>>();
const editId = ref();
const emits = defineEmits(['handleQuery', 'PerhandleClose']);

// 获取树
const getHandleQuery = () => {
	useMenuApi().getMenu().then(res => {
		state.menuData = res.data
	})
}

// 获取树getRoleMenu
const getRoleMenu = () => {
	var params = { role_id: editId.value }
	useRoleApi().getRoleMenu(params).then(res => {
		state.checkStrict = true
		nextTick(() => {
			treeRef.value?.setCheckedKeys(res.data.map(o => { return o.menu_id }));
		});
	})
}

// 打开弹窗
const openDialog = (row: EmptyObjectType) => {
	state.dialog.isShowDialog = true;
	editId.value = row.id
	getRoleMenu(),
		state.dialog.title = `分配权限【${row.name}】`;
	state.dialog.submitTxt = '提 交';
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		emits('handleQuery');
		emits('PerhandleClose');
	}, 500);
	state.dialog.isShowDialog = false;
};

// 取消
const onCancel = () => {
	state.dialog.isShowDialog = false;
};

// 弹窗关闭
const CloseIn = () => {
	setTimeout(() => {
		emits('PerhandleClose');
	}, 500);
};

// 提交
const onSubmit = async () => {
	var treeData = treeRef.value?.getCheckedKeys() as Array<number>;
	var data = { ...{ role_id: editId.value }, ...{ menu_ids: treeData } }
	await useRoleApi().perRole(data)

	closeDialog();
}

// 叶子节点同行显示样式
const treeNodeClass = (node: SysMenu) => {
	let addClass = true; // 添加叶子节点同行显示样式
	for (var key in node.children) {
		// 如果存在子节点非叶子节点，不添加样式
		if (node.children[key].children?.length ?? 0 > 0) {
			addClass = false;
			break;
		}
	}
	return addClass ? 'penultimate-node' : '';
};

onMounted(async () => {
	getHandleQuery();
});

// 暴露变量
defineExpose({
	openDialog,
});



</script>


<style lang="scss" scoped>
.menu-data-tree {
	width: 100%;
	border: 1px solid var(--el-border-color);
	border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
	padding: 5px;
}

:deep(.penultimate-node) {
	.el-tree-node__children {
		padding-left: 40px;
		white-space: pre-wrap;
		line-height: 100%;

		.el-tree-node {
			display: inline-block;
		}

		.el-tree-node__content {
			padding-left: 5px !important;
			padding-right: 5px;

			// .el-tree-node__expand-icon {
			// 	display: none;
			// }
		}
	}
}
</style>
