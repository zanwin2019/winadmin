<template>
	<el-button v-if="props.config.isadd" type="success" size="default" @click="emit('onadd')" :disabled="config.isaddDisabled" style="margin-left: 10px;">
		<el-icon>
			<ele-Plus />
		</el-icon>
		新增
	</el-button>
	<el-button v-if="config.isimport" type="warning" size="default" @click="onOpenAddDic('add')" :disabled="config.isimportDisabled">
		<el-icon>
			<ele-Upload />
		</el-icon>
		导入
	</el-button>
	<el-button v-if="config.isexport" type="danger" size="default" @click="onOpenAddDic('tableSearchRef')" :disabled="config.isexportDisabled">
		<el-icon>
			<ele-Download />
		</el-icon>
		导出
	</el-button>
</template>

<script setup lang="ts" name="makeTableDemoSearch">
// import {defineEmit} from 'vue';

// 定义父组件传过来的值
const props = defineProps({
	// 配置项
	config: {
		type: Object,
		default: () => { },
	},
});
// const state = reactive({
// 	onadd:false,
// 	isToggle: false,
// })
// 定义子组件向父组件传值/事件
const emit = defineEmits(['onadd'])


// 定义变量内容
// const tableSearchRef = ref<FormInstance>();
// const state = reactive({
// 	form: {},
// 	isToggle: false,
// })
// 页面加载时
// onMounted(() => {
// 	initFormField();
// });
</script>

<style scoped lang="scss">
.table-search-container {
	display: flex;

	.table-form {
		flex: 1;

		.table-form-btn-toggle {
			white-space: nowrap;
			user-select: none;
			display: flex;
			align-items: center;
			color: var(--el-color-primary);
		}
	}
}
</style>
