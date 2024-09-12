// src/i18n.ts
import { createI18n } from 'vue-i18n';
import zhCn from './locales/zh-cn';
import en from './locales/en';

// 创建 i18n 实例，默认语言为中文
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'zh-cn', // 默认语言
  fallbackLocale: 'en',  // 如果找不到当前语言的翻译，则回退到英文
  messages: {
    en,       // 加载英文语言包
    'zh-cn': zhCn // 加载中文语言包，注意键名与 locale 一致
  }
});

export default i18n;
