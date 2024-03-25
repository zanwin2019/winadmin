<template>
	<div class="system-menu-container layout-padding" style="display: flex;">
		<el-tabs type="border-card" size="large" @tab-click="handleTopChange" v-if="state.tabs"
			class="table-demo-padding layout-padding-view">
			<el-tab-pane v-for="tab in state.tabs" :label="tab.title" :key="tab.code">
				<el-tabs size="small" @tab-click="handleSubChange" v-if="tab.children">
					<el-tab-pane v-for="subTab in tab.children" :label="subTab.title" :key="subTab.code">
						<div>
							<Form :formModels="subTab.configs" :ruleForm="state.ruleForm" ref="myFormRef"
								style="width: 60%;margin: auto;"></Form>
							<div class="footer" v-if="subTab.configs.length">
								<el-button size="default">取 消</el-button>
								<el-button type="primary" @click="onSubmit(subTab.id)" size="default">提交</el-button>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
				<div v-else>
					<Form :formModels="tab.configs" :ruleForm="state.ruleForm" ref="myFormRef"
						style="width: 60%;margin: auto;"></Form>
					<div class="footer" v-if="tab.configs.length">
						<el-button size="default">取 消</el-button>
						<el-button type="primary" @click="onSubmit(tab.id)" size="default">提交</el-button>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script setup lang="ts" name="systemPost">
import { ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useConfigtabApi } from '/@/api/platform/config/index';
import { useGlobalApi } from '/@/api/system/global/index';
import Form from '/@/components/form/index.vue';

const state = reactive({
	dialogVisible: false,
	dialogVisibleTab: false,
	menuList: [],
	menuListTab: [],
	SeachTabData: '',
	operate: false,
	operateId: '',
	tabId: '',
	tabs: [],
	formModels: [],
	ruleForm: {},
	childdata: {},
	tabs:true
});
const myFormRef = ref<FormInstance>();

// 获取tabs数据
const handleQueryTab = () => {
	useConfigtabApi().getConfigtab().then(res => {
		state.tabs = res.data
		handleTopChange();
	})
}

// 获取tabs-panel数据
const handleTopChange = (pane:any, event:any) => {
	if (pane) {
		var num = event.target.getAttribute('id').split("-")[1];
	} else {
		var num = 0
	}

	if (state.tabs[num].children) {
		state.childdata = state.tabs[num].children
		handleSubChange()
	} else {
		var arr = []
		state.tabs[num].configs.forEach(function (item) {
			if (item.type === 'checkbox') {
				const value = [...item.value]
				arr.push({ key: item.key, value: value, })
			} else {
				arr.push({ key: item.key, value: item.value, })
			}
		})
		let obj = {}
		arr.forEach(item => {
			obj[item.key] = item.value
		})
		state.ruleForm = obj
	}
}

// 切换清空表单
// const handleSubChange = () => {
// 	state.ruleForm = {}
// }
const handleSubChange = (pane, event) => {
	if (pane) {
		var num = event.target.getAttribute('id').split("-")[1];
	} else {
		var num = 0
	}
	var arr = []
	state.childdata[num].configs.forEach(function (item) {
		if (item.type === 'checkbox') {
			const value = [...item.value]
			arr.push({ key: item.key, value: value, })
		} else {
			arr.push({ key: item.key, value: item.value, })
		}
	})
	let obj = {}
	arr.forEach(item => {
		obj[item.key] = item.value
	})
	state.ruleForm = obj
}

// 提交
const onSubmit = async (id: any) => {
	// let flag1 = await myFormRef.value?.validateJbxx();
	// if (!flag1) return;
	const data = { config_tab_id: id, configs: state.ruleForm }
	await useGlobalApi().saveGlobal(data)
	ElMessage.success('提交成功');
	handleQueryTab();
	state.tabs= false
	setTimeout(() => {
		state.tabs= true
	}, 100);
	
}

// 页面加载时
onMounted(async () => {
	handleQueryTab();
});

</script>
<style scoped lang="scss">
.system-menu-container {
	.table-demo-padding {
		.table-demo {
			flex: 1;
			overflow: hidden;
		}
	}
	.layout-padding-view {
		overflow: auto;
	}
}

.footer {
	margin: auto;
	width: 150px;
	margin-top: 50px;
}

.el-tabs .el-tabs--top {
	padding: 0 0 0 20px;
}
</style>
