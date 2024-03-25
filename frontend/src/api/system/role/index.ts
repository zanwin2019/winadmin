import request from '/@/utils/request';

export function useRoleApi() {
	return {
		getRole: (params?: object) => {
			return request({
				url: '/api/system/role/',
				method: 'GET',
				params,
			});
		},
		addRole: (data?: object) => {
			return request({
				url: '/api/system/role/',
				method: 'POST',
				data,
			});
		},
		editRole: (data?: object,id?:number) => {
			return request({
				url: '/api/system/role/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delRole: (id?:number) => {
			return request({
				url: '/api/system/role/'+id+'/',
				method: 'DELETE',
			});
		},
		//权限
		getRoleMenu: (params?: object) => {
			return request({
				url: '/api/system/rolemenu/',
				method: 'GET',
				params
			});
		},
		perRole: (data:object) => {
			return request({
				url: '/api/system/rolemenu/',
				method: 'POST',
				data
			});
		},
	};
}
