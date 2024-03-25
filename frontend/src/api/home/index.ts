import request from '/@/utils/request';

export function useHomeApi() {
	return {
		getMain: (params?: object) => {
			return request({
				url: '/api/main/num/',
				method: 'GET',
				params,
			});
		},
        getDistribution: (params?: object) => {
			return request({
				url: '/api/main/user_distribution/',
				method: 'GET',
				params,
			});
		},
	};
}
