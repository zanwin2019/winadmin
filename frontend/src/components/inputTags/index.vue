<template>
    <!-- 外层div -->
    <div class="arrbox" @click="onclick">
        <!-- 标签 -->
        <el-tag v-for="(item, index) in state.tagsArr" :key="index" closable @close="removeTag(index, item)">{{ item
        }}</el-tag>
        <!-- 输入框 -->
        <el-input :placeholder="placeholder" v-model="state.currentval" @keyup.enter.native="addTags" ref="inputTag"
            type="text" />
    </div>
</template>
  

<script setup lang="ts" name="inputTags">
import { reactive, ref } from 'vue';
// 定义父组件传过来的值
// const props = defineProps({
//     props: {
//         parentArr: {
//             type: Array,
//             default() {
//                 return []
//             }
//         },
//         limit: { // 最多生成标签数
//             type: Number,
//             default: 3
//         },
//         placeholder: {
//             type: String,
//             default: '请输入'
//         }
//     },
// });

const inputTag = ref();

const state = reactive({
    currentval: '',
    tagsArr: [],
    inputLength: '',
});

const addTags = () => {
    state.tagsArr.push(state.currentval);
    state.currentval = '';
};

const removeTag = (index, item) => {
    state.tagsArr.splice(index, 1)
};

const onclick = () => {
    inputTag.value.focus();
}
</script>

<style scoped lang="scss">
/* 外层div */
.arrbox {
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    // font-size: 12px;
    text-align: left;
    padding-left: 5px;
    word-wrap: break-word;
    overflow: auto;
}

::v-deep(.el-input__wrapper) {
    // width: auto;
}

::v-deep(.el-input__wrapper) {
    border: none !important;
    box-shadow: none !important;
    padding: 0px; //前边边距去掉
    height: 100%
}

::v-deep(.el-tag--large.is-closable) {
    padding-right: 5px;
    margin-right: 5px;
}
</style>
