import request from '/@/utils/request';

export function useOperateLogsApi() {
	return {
		getOperateLogs: (params?: object) => {
			return request({
				url: '/api/audit_logs/',
				method: 'GET',
				params,
			});
		},
	};
}
