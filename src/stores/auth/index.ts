import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';
import { Login_Response } from '@/api/auth'

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

      // 跳转到首页
      window.location.href = '/';
    } catch (error) {
      console.error('登录失败:', error);
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
    login,
    logout,
  };
});
