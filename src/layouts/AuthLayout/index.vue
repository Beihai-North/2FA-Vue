<template>
  <div class="auth-layout">
    <main>
      <router-view /> <!-- 渲染登录、注册页面 -->
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 页面高度充满整个浏览器窗口 */
  width: 100%;
  background-color: #f1f3f5; /* 背景颜色 */
}

main {
  width: 100%;
  height: 100%;
}
</style>
