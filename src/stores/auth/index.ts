import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';
import {
  Login_Response,
  Register_Response,
  enable2FA_Response,
  verify2FA_Response,
  status2FA_Response,
  logout_Response
} from '@/api/auth'
import { ElMessage } from 'element-plus'
import { fieldMapping } from '@/stores/auth/types';  // 导入字段映射
import { AxiosError } from 'axios';
import { MenuList } from '@/stores/menu/types'  // 导入 axios 的错误类型

export const useAuthStore = defineStore('auth', () => {
  const refresh_token = ref<string | null>(getStorage('refresh_token'));  // 从 localStorage 初始化 token
  const access_token = ref<string | null>(getStorage('access_token'));  // 从 localStorage 初始化 token
  const status_2FA = ref<boolean | null>(null);  // 存储2FA状态
  // const user = ref<object | null>(null); // 存储登录用户信息
  // const QRcode = ref<string | null>(null);  // 存储2FA二维码

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
  const logout = async (router:any) => {
    try {
      await logout_Response({refresh:refresh_token.value});
      refresh_token.value = null;
      access_token.value = null;
      removeStorage('access_token');
      removeStorage('refresh_token');
      ElMessage.success('已退出登录');
      router.push('/');
    }catch(error){
      console.log('注销失败:', error);
    }
  };

  const enable2FA = async () => {
    try{
      const response = await enable2FA_Response()
      return response
    }catch(error){
      console.log('启用2FA失败:', error);
    }
  }

  const verify2FA = async (otp: string, username: string) => {
    try {
      const response = await verify2FA_Response({
        otp: otp,
        username: username
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const status2FA = async () => {
    try {
      const response = await status2FA_Response();
      status_2FA.value = response.status;
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    refresh_token,
    access_token,
    register,
    login,
    logout,
    enable2FA,
    verify2FA,
    status2FA,
    status_2FA
  };
});
