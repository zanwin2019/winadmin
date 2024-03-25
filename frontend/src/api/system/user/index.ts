import request from '/@/utils/request';

export function useUserApi() {
	return {
		getUser: (params?: object,data?: object) => {
			return request({
				url: '/api/account/user/',
				method: 'GET',
				params,
				data,
			});
		},
		addUser: (data?: object,params?: object) => {
			return request({
				url: '/api/account/user/',
				method: 'POST',
				data,
				params
			});
		},
		editUser: (data?: object,id?:number) => {
			return request({
				url: '/api/account/user/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delUser: (id?:number) => {
			return request({
				url: '/api/account/user/'+id+'/',
				method: 'DELETE',
			});
		},
		resetPassword: (data?: object) => {
			return request({
				url: '/api/account/user/reset_password/',
				method: 'POST',
				data,
			});
		},
		modifyPassword: (data?: object,) => {
			return request({
				url: '/api/account/user/modify_password/',
				method: 'POST',
				data,
			});
		},
	};
}
