import axios from '@/http/axios';
import {
  RegisterRequest,
  AuthRequest,
  Verify2FARequest,
  ApiResponse,
  Enable2FA_Request,
  Status2FA_Request,
  logoutResponse} from '@/api/auth/types'

// 用户注册 API
export const Register_Response = (data: RegisterRequest): Promise<ApiResponse> => {
  return axios.post('register/', data);
};

// 用户登录 API
export const Login_Response = (data:AuthRequest): Promise<ApiResponse> => {
  return axios.post('login/', data)
}

// 用户注销 API
export const logout_Response = (data:logoutResponse): Promise<ApiResponse> => {
  return axios.post('logout/',data);
};

// 启用 2FA API
export const enable2FA_Response = (): Promise<Enable2FA_Request> => {
  return axios.get('2fa/qr/');
};

// 禁用 2FA API
export const disable2FA = (token: string): Promise<ApiResponse> => {
  return axios.post('disable-2fa/', { token });
};

// 验证 2FA API
export const verify2FA_Response = (data: Verify2FARequest): Promise<ApiResponse> => {
  return axios.post('2fa/verify_2fa/', data);
};

export const status2FA_Response = (): Promise<Status2FA_Request> => {
  return axios.get('2fa/check-2fa-status/');
}
