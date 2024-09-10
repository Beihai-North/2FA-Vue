import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import AuthLayout from '@/layouts/AuthLayout/index.vue';
import { getStorage } from '@/utils/storage'

// 定义路由配置
const routes = [
  {
    path: '/',
    component: DefaultLayout,  // 使用 DefaultLayout 布局
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'), // 首页内容
        meta: { requiresAuth: true } // 需要登录才能访问
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About/index.vue'), // 关于页面内容
        meta: { requiresAuth: true } // 需要登录才能访问
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
        component: () => import('@/views/RegisterView/index.vue') // 注册页面内容
      }
    ]
  }
];

// 创建并导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 检查目标路由是否需要登录
  if (to.meta.requiresAuth && !getStorage('access_token')) {
    // 如果没有登录状态，重定向到登录页面
    next({ name: 'Login' });
  } else {

    if(to.name === 'Login' && getStorage('access_token')){
      next({ name: 'Home' });
    }
    else{
      // 已登录或者不需要登录的页面，允许继续访问
      console.log("检查token有效性")
      next();
    }
  }
});

export default router;
