// src/i18n.ts
import { createI18n } from 'vue-i18n';
import zhCn from './locales/zh-cn';
import en from './locales/en';

// 创建 i18n 实例，默认语言为中文
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'zh-cn',  // 从 localStorage 获取语言设置
  messages: {
    'zh-cn': zhCn,
    en,
  },
});

export default i18n;
