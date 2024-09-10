// 定义注册成功时的响应数据结构
export interface RegisterResponse {
  id: number;          // 用户ID
  username: string;    // 用户名
  email: string;       // 用户邮箱
}

export const fieldMapping: Record<string, string> = {
  "username": "用户名",
  "password": "密码",
  "email": "电子邮件",
  // 可以继续添加更多映射
};
