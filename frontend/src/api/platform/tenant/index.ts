import request from '/@/utils/request';

export function useTenantApi() {
	return {
		getTenant: (params?: object) => {
			return request({
				url: '/api/platform/tenant/',
				method: 'GET',
				params,
			});
		},
		addTenant: (data?: object) => {
			return request({
				url: '/api/platform/tenant/',
				method: 'POST',
				data,
			});
		},
		editTenant: (data?: object,id?:number) => {
			return request({
				url: '/api/platform/tenant/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delTenant: (id?:number) => {
			return request({
				url: '/api/platform/tenant/'+id+'/',
				method: 'DELETE',
			});
		},
		// 域名
		postDomain: (data?: object) => {
			return request({
				url: '/api/platform/domain/',
				method: 'POST',
				data,
			});
		},
		//权限
		getTenantMenu: (params?: object) => {
			return request({
				url: '/api/platform/tenant/role_menu/',
				method: 'GET',
				params
			});
		},
		perTenant: (data:object) => {
			return request({
				url: '/api/platform/tenant/bind_role_menu/',
				method: 'POST',
				data
			});
		},
	};
}
