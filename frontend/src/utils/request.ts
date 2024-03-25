import axios, { AxiosInstance } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session,Local } from '/@/utils/storage';
import qs from 'qs';
import { defineConstants } from '/@/config/constants';

const { ACCESS_TOKEN, REFRESH_TOKEN } = defineConstants();

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			// return qs.stringify(params, { allowDots: true });
			return qs.stringify(params, { indices: false });
		},
	},
});


// axios.interceptors.request.use(config => {
//     // 为请求头添加x-access-token字段为服务端返回的token
//    config.headers!['Authorization'] = `${'Bearer'}${' '}${Session.get(ACCESS_TOKEN)}`;
//     // return config是固定用法 必须有返回值
//     return config
// })


// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		if (Session.get(ACCESS_TOKEN)) {
			// config.headers!['Authorization'] = `${Session.get(ACCESS_TOKEN)}`;
			config.headers['Authorization'] = `${'Bearer'}${' '}${Session.get(ACCESS_TOKEN)}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 0 && res.code !== 'OK') {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401 || res.code === 4001 || res.code === 40101) {
				Session.clear(); // 清除浏览器全部临时缓存
				Local.clear();// 清除浏览器全部本地缓存
				window.location.href = '/'; // 去登录页
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => {})
					.catch(() => {});
			}
			return Promise.reject(service.interceptors.response);
		} else {
			return res;
		}
	},
	(error) => {
        // console.log("999",error);
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			// if (error.response.data) ElMessage.error(error.response.statusText);
			// if (error.response.data) ElMessage.error(error.response.data.message);//第二次修改

			// bug:错误信息存在字符串和数组
			// 数组在提交表单时为key：value；在修改密码时为0：error
			// key：value已调整，0会显示
			if (error.response.data) {
				const errorMessage2 =  Object.values(error.response.data.message)[0].toString();
				const errorMessage1 =  Object.keys(error.response.data.message)[0].toString();
				const aaa = errorMessage1+errorMessage2
				// window.console.log('errorMessage1',errorMessage1)
				// window.console.log('errorMessage2',errorMessage2)

				// const errorMessage = typeof(error.response.data.message)=='string' ? error.response.data.message : Object.values(error.response.data.message)[0].toString();
				const errorMessage = typeof(error.response.data.message)=='string' ? error.response.data.message : aaa;
				ElMessage.error(errorMessage);
				// ElMessage.error(error.response.data.message);
				if(error.response.data.code === '401' || error.response.data.code === '4001' || error.response.data.code === '40101'){
					Session.clear(); // 清除浏览器全部临时缓存
					Local.clear();// 清除浏览器全部本地缓存
					// window.location.href = '/'; // 去登录页
				}
			}

			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
