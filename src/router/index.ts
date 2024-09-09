import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import AuthLayout from '@/layouts/AuthLayout/index.vue';

// 定义路由配置
// @ts-ignore
const routes = [
  {
    path: '/',
    component: DefaultLayout,  // 使用 DefaultLayout 布局
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue') // 首页内容
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About/index.vue') // 关于页面内容
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,  // 使用 AuthLayout 布局
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView/index.vue') // 登录页面内容
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/LoginView/index.vue') // 注册页面内容
      }
    ]
  }
];

// 创建并导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
