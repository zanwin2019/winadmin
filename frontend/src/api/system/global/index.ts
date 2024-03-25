import request from '/@/utils/request';

export function useGlobalApi() {
	return {
		saveGlobal: (data?: object) => {
			return request({
				url: '/api/system/config/save_configs/',
				method: 'POST',
				data,
			});
		},
	};
}
