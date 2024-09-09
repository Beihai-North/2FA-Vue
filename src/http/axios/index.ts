import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => { // 将类型从 AxiosRequestConfig 改为 InternalAxiosRequestConfig
    const authStore = useAuthStore();
    const token = authStore.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status} = response;
    if (status !== 200) {
      ElMessage.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || 'Error'));
    }
    console.log("@@@@@",response)
    return data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录');
      const authStore = useAuthStore();
      console.log(error)
      // authStore.logout();
      // router.push('/login');
    } else if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，请检查网络连接');
    } else {
      ElMessage.error('网络错误，请检查网络连接');
    }

    return Promise.reject(error);
  }
);

export default instance;
