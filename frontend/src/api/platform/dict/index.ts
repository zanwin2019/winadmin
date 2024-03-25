import request from '/@/utils/request';

export function useDatadictsApi() {
	return {
		getDatadicts: (params?: object) => {
			return request({
				url: '/api/system/datadicts/',
				method: 'GET',
				params,
			});
		},
		addDatadicts: (data?: object) => {
			return request({
				url: '/api/system/datadicts/',
				method: 'POST',
				data,
			});
		},
		editDatadicts: (data?: object,id?:number) => {
			return request({
				url: '/api/system/datadicts/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delDatadicts: (id?:number) => {
			return request({
				url: '/api/system/datadicts/'+id+'/',
				method: 'DELETE',
			});
		},
	};
}

export function useDictdatasApi() {
	return {
		getDictdatas: (params?: object) => {
			return request({
				url: '/api/system/dictdatas/',
				method: 'GET',
				params,
			});
		},
		addDictdatas: (data?: object) => {
			return request({
				url: '/api/system/dictdatas/',
				method: 'POST',
				data,
			});
		},
		editDictdatas: (data?: object,id?:number) => {
			return request({
				url: '/api/system/dictdatas/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delDictdatas: (id?:number) => {
			return request({
				url: '/api/system/dictdatas/'+id+'/',
				method: 'DELETE',
			});
		},
	};
}
