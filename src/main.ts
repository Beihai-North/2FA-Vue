import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from '@/App.vue'
import router from './router'
import i18n from './i18n';  // vue-i18n 配置
import ElementPlusConfig from './element-plus'; // 引入 Element Plus 配置
import 'element-plus/dist/index.css';  // 导入 Element Plus 的默认样式
const app = createApp(App)


// 检查 localStorage 中是否存储了用户的语言偏好
const savedLanguage = (localStorage.getItem('language') as "zh-cn" | "en") || 'zh-cn';

app.use(i18n);  // 配置 vue-i18n
// 根据用户的语言偏好，动态加载 Element Plus 的语言包
app.use(ElementPlusConfig, savedLanguage);

app.use(createPinia())
app.use(router)

app.mount('#app')
