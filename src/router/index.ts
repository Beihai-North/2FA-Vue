import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import AuthLayout from '@/layouts/AuthLayout/index.vue';
import { getStorage } from '@/utils/storage';

// 定义路由配置
export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About/index.vue'),
        meta: { requiresAuth: true }
      },
      // 通配符路由，用于捕捉未找到的路由
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView/index.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView/index.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/RegisterView/index.vue')
      }
    ]
  },
];

// 创建并导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, _from, next) => {
  // 检查目标路由是否需要登录
  if (to.meta.requiresAuth && !getStorage('access_token')) {
    next({ name: 'Login' }) // 重定向到登录页面
  } else {
    if ((to.name === 'Login' || to.name === 'Register') && getStorage('access_token')) {
      next({ name: 'Home' })
    } else {
      console.log('检查token有效性')
      next() // 允许继续访问
    }
  }
})

export default router;
