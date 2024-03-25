<template>
    <!-- 表单 -->
    <el-form :model="props.ruleForm" :rules="rules" ref="ruleFormRef">
        <el-row :gutter="35">
            <el-col :span="formModel.isrow == true ? 24 : 12" v-for="formModel in props.formModels" :key="formModel.key">
                <slot v-if="slots[formModel.key]" :name="formModel.key" v-bind="{ key: props.ruleForm[formModel.key] }">
                </slot>
                <!-- <el-form-item :label="formModel.label" v-for="formModel in props.formModels" :prop="formModel.key"> -->
                <el-form-item :label="formModel.label" :prop="formModel.key" label-width="80px" v-else>
                    <!-- 预留自定义表单 -->
                    <!-- <slot v-if="slots[formModel.key]" :name="formModel.key" v-bind="{ key: props.ruleForm[formModel.key] }">
                    </slot> -->
                    <!-- 输入框 -->
                    <el-input v-if="formModel.type === 'input'" v-model="props.ruleForm[formModel.key]"
                        :placeholder="formModel.placeholder" :disabled="formModel.disabled" clearable />
                    <!-- 密码框 -->
                    <el-input v-else-if="formModel.type === 'password'" v-model="props.ruleForm[formModel.key]"
                        type="password" :placeholder="formModel.placeholder" :disabled="formModel.disabled" show-password
                        clearable />
                    <!-- 文本框 -->
                    <el-input v-else-if="formModel.type === 'textarea'" v-model="props.ruleForm[formModel.key]"
                        :autosize="{ minRows: 4, maxRows: 6 }" type="textarea" :placeholder="formModel.placeholder"
                        :disabled="formModel.disabled" clearable />
                    <!-- 数字输入框 -->
                    <el-input-number v-else-if="formModel.type === 'number'" v-model="props.ruleForm[formModel.key]"
                        :disabled="formModel.disabled" :precision="formModel.props?.precision ?? 0" />
                    <!-- 单选 -->
                    <el-radio-group v-else-if="formModel.type === 'radio'" v-model="props.ruleForm[formModel.key]">
                        <el-radio v-for="item in formModel?.options" :key="item.key" :label="item.value">
                            {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                    <!-- 多选框 -->
                    <el-checkbox-group v-else-if="formModel.type === 'checkbox'" v-model="props.ruleForm[formModel.key]">
                        <el-checkbox v-for="item in formModel?.options" :key="item.key" :label="item.value">
                            {{ item.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!-- 下拉单选 -->
                    <el-select v-else-if="formModel.type === 'select'" v-model="props.ruleForm[formModel.key]"
                        :placeholder="formModel.placeholder" :disabled="formModel.disabled" clearable filterable>
                        <el-option v-for="item in formModel?.options" :key="item.key" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <!-- 联级单选 -->
                    <el-cascader v-else-if="formModel.type === 'cascader'" v-model="props.ruleForm[formModel.key]"
                        :options="formModel?.options" :props="formModel?.props" :placeholder="formModel.placeholder"
                        :disabled="formModel.disabled" :show-all-levels="false" clearable />
                    <!-- 开关 -->
                    <el-switch v-else-if="formModel.type === 'switch'" v-model="props.ruleForm[formModel.key]"
                        :disabled="formModel.disabled" />
                    <!-- 时间 -->
                    <el-time-picker v-else-if="formModel.type === 'time'" v-model="props.ruleForm[formModel.key]"
                        :placeholder="formModel.placeholder" :disabled="formModel.disabled" value-format="HH:mm:ss" />
                    <!-- 时间 to 时间 -->
                    <el-time-picker v-else-if="formModel.type === 'time-to-time'" v-model="props.ruleForm[formModel.key]"
                        is-range range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        :disabled="formModel.disabled" value-format="HH:mm:ss" />
                    <!-- 日期 -->
                    <el-date-picker v-else-if="formModel.type === 'date'" v-model="props.ruleForm[formModel.key]"
                        type="date" :placeholder="formModel.placeholder" :disabled="formModel.disabled"
                        value-format="YYYY-MM-DD" />
                    <!-- 日期 to 日期 -->
                    <el-date-picker v-else-if="formModel.type === 'date-to-date'" v-model="props.ruleForm[formModel.key]"
                        :placeholder="formModel.placeholder" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" :disabled="formModel.disabled" value-format="YYYY-MM-DD" />
                    <!-- 日期时间 -->
                    <el-date-picker v-else-if="formModel.type === 'datetime'" v-model="props.ruleForm[formModel.key]"
                        type="datetime" :placeholder="formModel.placeholder" :disabled="formModel.disabled"
                        value-format="YYYY-MM-DD HH:mm:ss" />
                    <!-- 日期时间 to 日期时间 -->
                    <el-date-picker v-else-if="formModel.type === 'datetime-to-datetime'"
                        v-model="props.ruleForm[formModel.key]" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" :disabled="formModel.disabled"
                        value-format="YYYY-MM-DD HH:mm:ss" />
                    <!-- 文件上传 -->
                    <el-upload v-else-if="formModel.type === 'upload'" v-model:file-list="props.ruleForm[formModel.key]"
                        :action="formModel?.props?.action" :limit="formModel?.props?.limit || 1" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :disabled="formModel.disabled"
                        :class="{ 'el-upload--none': props.ruleForm[formModel.key].length === formModel?.props?.limit }">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <!-- 文件上传--mini -->
                    <el-upload v-else-if="formModel.type === 'upload-mini'"
                        v-model:file-list="props.ruleForm[formModel.key]" :action="formModel?.props?.action"
                        :limit="formModel?.props?.limit || 1" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :disabled="formModel.disabled" class="upload-mini"
                        :class="{ 'el-upload--none': props.ruleForm[formModel.key].length === formModel?.props?.limit }">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <!-- 图标选择 -->
                    <IconSelector v-else-if="formModel.type === 'icon'" v-model="props.ruleForm[formModel.key]"
                        :placeholder="formModel.placeholder" :disabled="formModel.disabled" clearable />

                    <!-- <IconSelector placeholder="菜单图标" type="all" /> -->

                    <inputTags v-else-if="formModel.type === 'inputTags'" v-model="props.ruleForm[formModel.key]"
                        :placeholder="formModel.placeholder" :disabled="formModel.disabled" clearable />


                    <el-tree v-else-if="formModel.type === 'tree'" v-model="props.ruleForm[formModel.key]" ref="treeRef"
                        :data="formModel?.options" node-key="id" show-checkbox
                        :props="{ children: 'children', label: 'name', class: treeNodeClass }" highlight-current />
                </el-form-item>
            </el-col>
        </el-row>
        <!-- <el-form-item class="form-operations">
            <el-button type="primary" @click="submitForm" v-if="showSubmitBtn">{{ submitText }}</el-button>
            <el-button @click="resetForm" v-if="showResetBtn">重置</el-button>
        </el-form-item> -->

        <el-dialog v-model="dialog.visible">
            <img w-full :src="dialog.imageUrl" alt="Preview Image" />
        </el-dialog>
    </el-form>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, reactive, useSlots, nextTick } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import { Key, Plus } from '@element-plus/icons-vue';
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'));

const inputTags = defineAsyncComponent(() => import('/@/components/inputTags/index.vue'));

// 【接口】通用设置key
interface IKey {
    [key: string]: any;
}

// 【接口】form表单模型
interface IFormModel {
    label: string;
    key: string;
    type: string;
    rule?: any;
    placeholder?: string;
    disabled?: boolean;
    options?: any;
    props?: any;
    isrow?: any;
    validator?: any;
    pattern?: any
    message?: string
}

// 【接口】接受传参字段
interface IProps {
    formModels: IFormModel[];
    ruleForm: IKey;
    showSubmitBtn?: boolean;
    submitText?: string;
    showResetBtn?: boolean;
}

// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {
    showSubmitBtn: true,
    submitText: '提交',
    showResetBtn: true,
});

// 获取“占位符”
const getPlaceholder = (type: string, label: string): string => {

    // if (type === ('input' || 'number' || 'tag' || 'textarea')) {
    //     return '请输入' + label;
    // }
    if (type === 'textarea' || type === 'input' || type === 'number' || type === 'password') {
        return '请输入' + label;
    }

    if (type === 'upload') {
        return '请上传' + label;
    }

    return '请选择' + label;
};

// form表单校验规则
const rules = reactive<FormRules>({});

props.formModels.forEach(formModel => {

    if (!formModel.placeholder) {
        formModel.placeholder = getPlaceholder(formModel.type, formModel.label);
    }

    if (formModel.rule) {

        if ((typeof formModel.rule) === 'boolean') {

            if (formModel.validator) {
                rules[formModel.key] = [{
                    required: true,
                    trigger: 'blur',
                    validator: formModel.validator,
                    message: formModel.message,
                }];
            } else if (formModel.pattern) {
                rules[formModel.key] = [{
                    required: true,
                    message: formModel.message,
                    trigger: 'blur',
                    pattern: formModel.pattern
                }];
            } else {
                rules[formModel.key] = [{
                    required: true,
                    message: formModel.placeholder,
                    trigger: 'blur',
                }];
            }
        } else {
            rules[formModel.key] = formModel.rule;
        }
    }
});

// 插槽对象
const slots = useSlots();

// 表单ref
const ruleFormRef = ref<FormInstance>();

// // 校验
// const validate = () => {
//     // return ruleFormRef.value?.validate();
//     if (!ruleFormRef.value) return;
//     return ruleFormRef.value.validate((valid) => {
//         return valid;
//     });
// };

const validateJbxx = async () => {
    //校验成功则方法自动返回true，校验方法报错则说明校验失败，返回false
    try {
        return await ruleFormRef.value?.validate()
    } catch (error) {
        return false
    }
}

// 清除验证
const clearValidate = (): void => {
    ruleFormRef.value?.clearValidate();
};

// 重置表单
const resetForm = (): void => {
    ruleFormRef.value?.resetFields();
};

// 事件
const emit = defineEmits<{
    (e: "submitForm", ruleForm: IKey): void;
}>();

// 提交表单
const submitForm = async (): Promise<void> => {

    await validate();

    emit('submitForm', props.ruleForm);
};

// 设置form表单值
const setRuleForm = (newRuleForm: IKey): void => {

    Object.assign(props.ruleForm, newRuleForm);

    setTimeout(() => {
        clearValidate();
    }, 30);
}

// 清空form表单值
const resetRuleForm = (): void => {

    const oldRuleForm = Object.assign({}, props.ruleForm);
    for (const key in oldRuleForm) {
        delete props.ruleForm[key];
    }

    setTimeout(() => {
        clearValidate();
    }, 30);
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

// 暴露函数
defineExpose({
    validateJbxx,
    clearValidate,
    resetForm,
    setRuleForm,
    resetRuleForm,
});

interface IDialog {
    visible: boolean;
    imageUrl: string;
};

const dialog = reactive<IDialog>({
    visible: false,
    imageUrl: '',
});

const handlePictureCardPreview = (uploadFile: any) => {
    dialog.imageUrl = uploadFile.url!
    dialog.visible = true
};

</script>

<style lang="scss" scoped>
:deep(.el-upload-list__item .el-icon--close-tip) {
    display: none !important;
}

:deep(.upload-mini .el-upload--picture-card) {
    width: 80px;
    height: 80px;
}

:deep(.upload-mini .el-upload-list__item) {
    width: 80px;
    height: 80px;
}

:deep(.el-upload--none .el-upload--picture-card) {
    display: none;
}

:deep(.el-form-item .el-form-item) {
    margin-bottom: 15px;
}

:deep(.el-input) {
    width: -webkit-fill-available;
    height: 100%;
}

:deep(.el-select) {
    width: -webkit-fill-available;
}

:deep(.el-cascader--large) {
    width: -webkit-fill-available;
}

:deep(.el-input-number--large) {
    width: -webkit-fill-available;
}

:deep(.el-input-number) {
    width: -webkit-fill-available;
    height: 100%;
}

:deep(.el-cascader) {
    width: -webkit-fill-available;
    height: 100%;
}

:deep(.el-form-item--large .el-form-item__content) {
    margin-bottom: 18px;
}


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
        }
    }
}
</style>
