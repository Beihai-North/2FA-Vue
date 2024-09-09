
// 注册和登录的请求类型
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

// 2FA 验证的请求类型
export interface Verify2FARequest {
  token: string;
  code: string;
}
