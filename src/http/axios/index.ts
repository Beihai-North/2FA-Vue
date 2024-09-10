import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
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
    const { data, status } = response;

    // 检查非 2xx 范围内的状态码
    if (status < 200 || status >= 300) {
      // 没有 data.message 时，使用通用错误消息
      handleError(status, data.message || '请求失败');
      return Promise.reject(new Error('请求失败'));
    }
    return data;
  },

  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      // 根据状态码调用处理函数
      handleError(status, '请求失败');
    } else if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，请检查网络连接');
    } else {
      ElMessage.error('网络错误，请检查网络连接');
    }

    return Promise.reject(error);
  }
);

// 错误处理函数，根据不同状态码显示不同的错误消息
function handleError(status: number, defaultMsg: string) {
  switch (status) {
    case 400:
      ElMessage.error('请求参数错误（400）');
      break;
    case 401:
      ElMessage.error('未授权，登录已过期或凭证无效（401）');
      break;
    case 403:
      ElMessage.error('没有权限访问此资源（403）');
      break;
    case 404:
      ElMessage.error('请求的资源不存在（404）');
      break;
    case 409:
      ElMessage.error('请求冲突，可能是重复的请求（409）');
      break;
    case 422:
      ElMessage.error('请求格式错误或验证失败（422）');
      break;
    case 500:
      ElMessage.error('服务器内部错误（500）');
      break;
    case 502:
      ElMessage.error('网关错误（502）');
      break;
    case 503:
      ElMessage.error('服务不可用，服务器暂时过载或维护（503）');
      break;
    case 504:
      ElMessage.error('网关超时（504）');
      break;
    default:
      ElMessage.error(defaultMsg || `请求失败，状态码：${status}`);
  }
}



export default instance;
