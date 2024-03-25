import request from '/@/utils/request';

export function usePostApi() {
	return {
		getPost: (params?: object) => {
			return request({
				url: '/api/system/post/',
				method: 'GET',
				params,
			});
		},
		addPost: (data?: object) => {
			return request({
				url: '/api/system/post/',
				method: 'POST',
				data,
			});
		},
		editPost: (data?: object,id?:number) => {
			return request({
				url: '/api/system/post/'+id+'/',
				method: 'PUT',
				data,
			});
		},
		delPost: (id?:number) => {
			return request({
				url: '/api/system/post/'+id+'/',
				method: 'DELETE',
			});
		},
	};
}
