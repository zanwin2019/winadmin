<template>
    <div class="system-menu-container layout-padding">
        <el-row class="table-demo-padding layout-padding-view">
            <!-- 个人信息 -->
            <el-col :xs="24" :sm="5">
                <el-card shadow="hover" class="table-demo-padding layout-padding-view">
                    <div class="account-center-avatarHolder">
                        <el-avatar :size="100" :src="state.userData.photo" @click="openCropperDialog"
                            v-loading="state.avatarLoading" element-loading-spinner="el-icon-Upload"
                            element-loading-background="rgba(0, 0, 0, 0.2)" element-loading-text="更换头像"
                            @mouseenter="mouseEnterAvatar" @mouseleave="mouseLeaveAvatar" style="cursor:pointer;" />
                        <div class="username">{{ state.userData.chname }}</div>
                        <div class="userinfo">
                            <div><span class="infoTitle">名称：</span>{{ state.userData.username }}</div>
                            <div><span class="infoTitle">角色：</span>{{ state.userData.role_name }}</div>
                            <div><span class="infoTitle">电话：</span>{{ state.userData.phone }}</div>
                            <div><span class="infoTitle">邮箱：</span>{{ state.userData.email }}</div>
                            <div><span class="infoTitle">Q Q：</span>{{ state.userData.qq }}</div>
                            <div><span class="infoTitle">公司：</span>{{ state.userData.company }}</div>
                            <div><span class="infoTitle">最后登录时间：</span>{{ state.userData.last_login }}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <!-- 修改信息 -->
            <el-col :xs="24" :sm="19" class="pl15 personal-info">
                <el-card shadow="hover" class="table-demo-padding layout-padding-view">
                    <el-tabs v-model="activeName" class="demo-tabs">
                        <el-tab-pane label="基础信息" name="first">
                            <Form :formModels="state.formModels" :ruleForm="state.ruleFormInfo" ref="myFormRefInfo"></Form>
                            <div class="footer">
                                <el-button type="primary" size="default" @click="onSubmitInfo">保存基础信息</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="修改密码" name="second">
                            <el-form ref="myFormRefPaw" :model="state.ruleFormPaw" label-width="auto">
                                <el-form-item label="当前密码" prop="old_password"
                                    :rules="[{ required: true, message: '当前密码不能为空', trigger: 'blur' }]">
                                    <el-input v-model="state.ruleFormPaw.old_password" type="password" autocomplete="off"
                                        show-password />
                                </el-form-item>
                                <el-form-item label="新密码" prop="new_password"
                                    :rules="[{ required: true, message: '新密码不能为空', trigger: 'blur' }]">
                                    <el-input v-model="state.ruleFormPaw.new_password" type="password" autocomplete="off"
                                        show-password />
                                </el-form-item>
                                <el-form-item label="确认密码" prop="passwordNew2"
                                    :rules="[{ validator: validatePassword, required: true, trigger: 'blur' }]">
                                    <el-input v-model="state.passwordNewComfire" type="password" autocomplete="off"
                                        show-password />
                                </el-form-item>
                                <el-form-item>
                                    <div class="footer">
                                        <el-button size="default" @click="resetPassword">重 置</el-button>
                                        <el-button type="primary" size="default" @click="onSubmitPassword">确 定</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
        <CropperDialog ref="cropperDialogRef" :title="state.cropperTitle" @uploadCropperImg="uploadCropperImg" />
    </div>
</template>

<script setup lang="ts" name="personal">
import { reactive, ref, onMounted } from 'vue';
import Form from '/@/components/form/index.vue';
import { ElMessage, ElForm, ElMessageBox } from 'element-plus';
import CropperDialog from '/@/components/cropper/index.vue';
import { formModels, formPassword } from './constant';
import { useUserApi } from '/@/api/system/user/index';
import { Local, Session } from '/@/utils/storage';

import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';

// 定义变量内容
const state = reactive({
    formModels,
    formPassword,
    avatarLoading: false,
    avatar: '',
    cropperTitle: '',
    userData: {
        photo: '',
        chname: '',
        username: '',
        role_name: '',
        phone: '',
        email: '',
        qq: '',
        company: '',
        last_login: '',
    },
    ruleFormInfo: {},
    ruleFormPaw: {
        new_password: '',
        old_password: '',
    },
    passwordNewComfire: '',
});

const activeName = ref('first')
const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);
const myFormRefInfo = ref();
const myFormRefPaw = ref();
const cropperDialogRef = ref<InstanceType<typeof CropperDialog>>();

// 上传头像图片
const uploadCropperImg = async (e: any) => {
    // var res = await getAPI(SysFileApi).apiSysFileUploadAvatarPostForm(e.img);
    // userInfos.value.avatar = res.data.result?.filePath + '/' + res.data.result?.name;
};

// 打开裁剪弹窗
const openCropperDialog = () => {
    state.cropperTitle = '更换头像';
    cropperDialogRef.value?.openDialog(state.userData.photo);
};

// 鼠标进入和离开头像时
const mouseEnterAvatar = () => {
    state.avatarLoading = true;
};

const mouseLeaveAvatar = () => {
    state.avatarLoading = false;
};

// 获取用户信息
const userinfoData = () => {
    // state.ruleFormInfo = userInfos
    var params = { id: userInfos._object.userInfos.id }
    useUserApi().getUser(params).then(res => {
        state.ruleFormInfo = res.data[0]
        state.userData = JSON.parse(JSON.stringify(res.data[0]))
    })
};

// 提交
const onSubmitInfo = async () => {
    let flag1 = await myFormRefInfo.value?.validateJbxx();
    if (!flag1) return;
    const data = state.ruleFormInfo
    const params = state.ruleFormInfo.id
    await useUserApi().editUser(data, params)
    ElMessage.success('保存成功');
    userinfoData()

}

// 密码验证
const validatePassword = (_rule: any, value: any, callback: any) => {
    if (state.passwordNewComfire != state.ruleFormPaw.new_password) {
        callback(new Error('两次密码不一致！'));
    } else {
        callback();
    }
}

const onSubmitPassword = () => {
    myFormRefPaw.value?.validate(async (valid: boolean) => {
        if (!valid) return;
        await useUserApi().modifyPassword(state.ruleFormPaw).then(res => {
            // 退出系统
            if (res.message === 'success') {
                ElMessageBox.confirm(res.data.message + `是否重新登录系统？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    Session.clear(); // 清除浏览器全部临时缓存
                    Local.clear();// 清除浏览器全部本地缓存
                    // window.location.href = '/'; // 去登录页
                    window.location.reload();
                });
            }
        })
    });
};

// 重置密码
const resetPassword = async () => {
    // state.ruleFormPaw.old_password = ''
    // state.ruleFormPaw.new_password = ''
    state.passwordNewComfire = ''
    myFormRefPaw.value?.resetFields()
}

// 页面加载时
onMounted(async () => {
    userinfoData();
});
</script>

<style scoped lang="scss">
.system-menu-container {
    .table-demo-padding {
        padding: 15px;

        // height: 80%;
        .table-demo {
            flex: 1;
            overflow: hidden;
        }
    }

    .footer {
        margin: auto;
        width: 150px;
        margin-top: 50px;
    }

    .layout-padding-view {
        overflow: auto;
    }
}

.account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    .username {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin: 10px 0;
    }

    .userinfo {
        text-align: left;
        font-size: 15px;
        line-height: 30px;
        margin-left: 2%;
    }

    .infoTitle {
        color: #909399;
        // display: inline-grid;
        // width: 110px;
        // text-align: right;
    }
}

::v-deep(.el-loading-mask .el-loading-spinner .el-loading-text) {
    font-size: 14px;
    font-weight: bold;
    color: white;
    margin-top: -30%;
}
</style>
