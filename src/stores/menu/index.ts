import { defineStore } from 'pinia'
import { type MenuItem, MenuList } from './types'
import router from '@/router' // 引入 router 和 routes

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuItems: [] as MenuList // 菜单项列表
  }),
  actions: {
    // 动态加载组件的函数
    async loadComponent(componentName: string) {
      // 动态导入组件，返回一个 Promise
      try {
        const module = await import(`@/views/${componentName}/index.vue`)
        return module.default || module;
      } catch (error) {
        console.log(`不存在的组件: ${componentName}`)
        // 可以返回一个备用的组件，或者抛出错误
        // throw new Error(`Component "${componentName}" could not be loaded.`)
        return import('@/views/NotFoundView/index.vue');
      }
    },

    // 从后端获取菜单数据并动态添加路由
    async fetchMenuItemsAndAddRoutes() {
      // 模拟的菜单数据
      const mockMenuItems: MenuList = [
        {
          id: 1,
          name: '设置状态',
          route: '/status',
          component: 'StatusPage',
          icon: 'el-icon-setting',
          permissions: ['admin', 'user'],
          divider: true
        },
        {
          id: 2,
          name: '您的个人资料',
          route: '/profile',
          component: 'ProfilePage',
          icon: 'el-icon-user',
          permissions: ['user'],
          divider: false
        },
        {
          id: 3,
          name: '您的仓库',
          route: '/repositories',
          component: 'RepositoriesPage',
          icon: 'el-icon-folder',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 4,
          name: '您的 Copilot',
          route: '/copilot',
          component: 'CopilotPage',
          icon: 'el-icon-robot',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 5,
          name: '您的项目',
          route: '/projects',
          component: 'ProjectsPage',
          icon: 'el-icon-folder-opened',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 6,
          name: '您的星星',
          route: '/stars',
          component: 'StarsPage',
          icon: 'el-icon-star-on',
          permissions: ['admin', 'user'],
          divider: true // 显示分隔线
        },
        {
          id: 7,
          name: '您的组织',
          route: '/organizations',
          component: 'OrganizationsPage',
          icon: 'el-icon-office-building',
          permissions: ['admin'],
          divider: false
        },
        {
          id: 8,
          name: '您的企业',
          route: '/enterprise',
          component: 'EnterprisePage',
          icon: 'el-icon-suitcase',
          permissions: ['admin'],
          divider: false
        },
        {
          id: 9,
          name: '您的赞助商',
          route: '/sponsors',
          component: 'SponsorsPage',
          icon: 'el-icon-user-solid',
          permissions: ['admin', 'user'],
          divider: true // 显示分隔线
        },
        {
          id: 10,
          name: '功能预览',
          route: '/feature-preview',
          component: 'FeaturePreviewPage',
          icon: 'el-icon-view',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 11,
          name: '设置',
          route: '/settings',
          component: 'SettingsPage',
          icon: 'el-icon-setting',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 12,
          name: 'GitHub 文档',
          route: '/docs',
          component: 'DocsPage',
          icon: 'el-icon-document',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 13,
          name: 'GitHub 支持',
          route: '/support',
          component: 'SupportPage',
          icon: 'el-icon-phone',
          permissions: ['admin', 'user'],
          divider: false
        },
        {
          id: 14,
          name: 'GitHub 社区',
          route: '/community',
          component: 'CommunityPage',
          icon: 'el-icon-users',
          permissions: ['admin', 'user'],
          divider: true // 显示分隔线
        },
        {
          id: 15,
          name: '登出',
          route: '/logout',
          component: 'LogoutPage',
          icon: 'el-icon-switch-button',
          permissions: ['admin', 'user'],
          divider: false
        }
      ]

      // 将模拟数据赋值给菜单项状态
      this.menuItems = mockMenuItems

      // 动态添加路由
      mockMenuItems.forEach((item: MenuItem) => {
        // 手动将路由同步到 Vue Router 实例
        router.addRoute('DefaultLayout', {
          path: item.route,
          name: item.name,
          component: () => this.loadComponent(item.component), // 确保是懒加载函数
          meta: { requiresAuth: true }
        });
      })
    }
  }
})
