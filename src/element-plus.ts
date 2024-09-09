// src/element-plus.ts
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';  // 中文语言包
import en from 'element-plus/es/locale/lang/en';       // 英文语言包
import 'element-plus/dist/index.css';

const locales = {
  'zh-cn': zhCn,
  'en': en
};

export default {
  install(app: any, language: keyof typeof locales = 'zh-cn') {
    // 根据传入的语言参数动态选择语言
    const locale = locales[language] || zhCn;

    app.use(ElementPlus, {
      locale,  // 设置语言
    });
  },
};