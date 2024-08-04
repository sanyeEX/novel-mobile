// 引入 Axios
import axios from 'axios';
import { Snackbar } from "@varlet/ui";

const token = localStorage.getItem('token')

// 创建一个 Axios 实例
const request = axios.create({
  baseURL: 'https://novelApi.sanyeex.top/', // 设置基本的 API 地址
  timeout: 1000000, // 设置请求超时时间
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如，可以在这里设置请求头
    config.headers.Authorization = token
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    Snackbar.error('api错误')
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 导出封装后的 Axios 实例
export default request;
