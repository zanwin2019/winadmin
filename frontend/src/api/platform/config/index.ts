import request from '/@/utils/request';

export function useConfigtabApi() {
	return {
		getConfigtab: (params?: object) => {
			return request({
				url: '/api/system/configtab/',
				method: 'GET',
				params,
			});
		},
		addConfigtab: (data?: object) => {
			return request({
				url: '/api/system/configtab/',
				method: 'POST',
				data,
			});
		},
		editConfigtab: (data?: object,id?:number) => {
			return request({
				url: '/api/system/configtab/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delConfigtab: (id?:number) => {
			return request({
				url: '/api/system/configtab/'+id+'/',
				method: 'DELETE',
			});
		},
	};
}

export function useConfigApi() {
	return {
		getConfig: (params?: object) => {
			return request({
				url: '/api/system/config/',
				method: 'GET',
				params,
			});
		},
		addConfig: (data?: object) => {
			return request({
				url: '/api/system/config/',
				method: 'POST',
				data,
			});
		},
		editConfig: (data?: object,id?:number) => {
			return request({
				url: '/api/system/config/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delConfig: (id?:number) => {
			return request({
				url: '/api/system/config/'+id+'/',
				method: 'DELETE',
			});
		},
	};
}
