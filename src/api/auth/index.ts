import axios from '@/http/axios';
import { RegisterRequest, AuthRequest, Verify2FARequest, ApiResponse } from '@/api/auth/types';

// 用户注册 API
export const Register_Response = (data: RegisterRequest): Promise<ApiResponse> => {
  return axios.post('register/', data);
};

// 用户登录 API
export const Login_Response = (data:AuthRequest): Promise<ApiResponse> => {
  return axios.post('login/', data)
}

// 用户注销 API
export const logout = (): Promise<ApiResponse> => {
  return axios.post('logout/');
};

// 启用 2FA API
export const enable2FA = (): Promise<ApiResponse> => {
  return axios.get('enable-2fa/');
};

// 禁用 2FA API
export const disable2FA = (token: string): Promise<ApiResponse> => {
  return axios.post('disable-2fa/', { token });
};

// 验证 2FA API
export const verify2FA = (data: Verify2FARequest): Promise<ApiResponse> => {
  return axios.post('verify-2fa/', data);
};
