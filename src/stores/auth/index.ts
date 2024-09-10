import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';
import { Login_Response, Register_Response } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { fieldMapping } from '@/stores/auth/types';  // 导入字段映射
import { AxiosError } from 'axios';  // 导入 axios 的错误类型

export const useAuthStore = defineStore('auth', () => {
  const refresh_token = ref<string | null>(getStorage('refresh_token'));  // 从 localStorage 初始化 token
  const access_token = ref<string | null>(getStorage('access_token'));  // 从 localStorage 初始化 token
  // const user = ref<object | null>(null); // 存储登录用户信息

  // 设置 token 并保存到 localStorage
  const setToken = (RefreshToken: string,AccessToken:string) => {
    refresh_token.value = RefreshToken;
    access_token.value = AccessToken;
    setStorage('refresh_token', RefreshToken);
    setStorage('access_token', AccessToken);
  };

  // 设置用户信息
  // const setUser = (userInfo: object) => {
  //   user.value = userInfo;
  // };
// 注册方法
  const register = async (email: string, username: string, password: string,router:any) => {
    try {
      // 调用注册请求
      const response = await Register_Response({
        email: email,
        username: username,
        password: password,
      });

      // 解构返回的用户信息
      // @ts-ignore 忽略 TypeScript 校验
      const { id:ID, username: registeredUsername, email: registeredEmail } = response;

      console.log('注册成功:', { ID, registeredUsername, registeredEmail });

      // 弹出成功消息，显示邮箱和用户名
      ElMessage.success(`注册成功！邮箱: ${registeredEmail}, 用户名: ${registeredUsername}`);

      router.push('/');

    } catch (error) {
      const err = error as AxiosError;  // 使用 AxiosError 类型
      if (err.response) {
        // 错误处理：遍历错误数据并将 key 转换为中文
        const errorData = err.response.data as { [key: string]: unknown };
        Object.entries(errorData).forEach(([key, errors]) => {
          const fieldName = fieldMapping[key] || key;  // 使用映射
          (errors as string[]).forEach((error) => {
            ElMessage.error(`${fieldName}: ${error}`);
          });
        });
      } else {
        console.error('注册失败:', error);
        ElMessage.error('注册失败，发生未知错误');
      }
    }
  };

  // 登录方法
  const login = async (username: string, password: string) => {
    try {
      const response = await Login_Response({
        username: username,
        password: password
      });

      // @ts-ignore
      const { refresh_token: RefreshToken, access_token: AccessToken } = response;

      // 保存 token 和用户信息
      setToken(RefreshToken,AccessToken);
      // setUser(userInfo);
      ElMessage.success(`登录成功！`);
    } catch (error) {
      ElMessage.error('登录失败，请检查用户名或密码');
      throw new Error('登录失败，请检查用户名或密码');
    }
  };

  // 登出方法
  const logout = () => {
    refresh_token.value = null;
    access_token.value = null;
    removeStorage('token');
    window.location.href = 'login';  // 跳转到登录页
  };

  return {
    refresh_token,
    access_token,
    register,
    login,
    logout,
  };
});
