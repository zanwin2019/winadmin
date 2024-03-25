import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { Session } from '/@/utils/storage';
import { userAuthApi } from '/@/api/auth';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos = <UserInfos>await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		async getApiUserInfo() {
			return new Promise((resolve) => {
				userAuthApi().userinfo().then(res => {
					// if (res.data == null) return;
					
					const userInfos = res.data
						// var d = res.data;
						// const userInfos = {
						// 	id:d.id,
						// 	realName: d.chname,
						// 	userName: d.username,
						// 	avatar: d.avatar ? d.avatar : '/favicon.ico',
						// 	roles:[d.user_permissions],
						// 	time: d.last_login,
						// 	photo:'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
						// };
					Session.set('userInfo', userInfos);
					resolve(userInfos);
				})
			});
		},
	},
});
