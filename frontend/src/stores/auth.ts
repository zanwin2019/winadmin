import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { userAuthApi } from '/@/api/auth';
import { defineConstants } from '/@/config/constants';

const { ACCESS_TOKEN, REFRESH_TOKEN } = defineConstants();

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const userAuth = defineStore('userAuth', {
	state: (): AuthInfo => ({
        accessToken: Session.get(ACCESS_TOKEN),
        refreshToken: Session.get(REFRESH_TOKEN),
        errorMessage: ''
    }),
	actions: {
        /**
         * 登录
         */
		async login (data: LoginInfo) {
            // console.log(data);
            // const { access, refresh, detail } = await userAuthApi().login(data);
            const res = await userAuthApi().login(data);
            // console.log('001',res);
            // if (res.message) {
            //     this.errorMessage = res.message;
            //     return false;
            // }
            this.accessToken = res.data.access;
            this.refreshToken = res.data.refresh;
			// 存储token到cookie
			Session.set(ACCESS_TOKEN, res.data.access);
            Session.set(REFRESH_TOKEN, res.data.refresh);
            // await this.getApiUserInfo();
            return true
		}
	},
});
