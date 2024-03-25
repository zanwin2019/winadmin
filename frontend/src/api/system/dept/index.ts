import request from '/@/utils/request';

export function useDeptApi() {
	return {
		getDept: (params?: object) => {
			return request({
				url: '/api/system/dept/',
				method: 'GET',
				params,
			});
		},
		addDept: (data?: object) => {
			return request({
				url: '/api/system/dept/',
				method: 'POST',
				data,
			});
		},
		editDept: (data?: object,id?:number) => {
			return request({
				url: '/api/system/dept/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delDept: (id?:number) => {
			return request({
				url: '/api/system/dept/'+id+'/',
				method: 'DELETE',
			});
		},
	};
}
