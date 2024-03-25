import request from '/@/utils/request';

export function useLoginLogsApi() {
	return {
		getLoginLogs: (params?: object) => {
			return request({
				url: '/api/account/login_logs/',
				method: 'GET',
				params,
			});
		},
	};
}
