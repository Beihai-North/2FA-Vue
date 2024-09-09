interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  // 可以根据你项目的需要，添加更多的环境变量类型
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
