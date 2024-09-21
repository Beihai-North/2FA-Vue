
export interface AuthRequest {
  username: string;
  password: string;
}

// 注册的请求类型（包含 email）
export interface RegisterRequest extends AuthRequest {
  email: string;
}

// 通用的响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
// 定义 ApiResponse 接口来匹配后端返回的数据格式
export interface Enable2FA_Request {
  qr_code: string;
  otp_auth_url: string;
}
// 2FA 验证的请求类型
export interface Verify2FARequest {
  otp: string;
  username: string;
}

export interface Status2FA_Request {
  status: boolean;
  detail: string;
}


export interface logoutResponse {
  refresh: string|null;
}
