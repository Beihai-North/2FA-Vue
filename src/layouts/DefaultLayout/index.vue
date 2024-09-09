<template>
  <div class="layout">
    <header>
      <HeaderComponent /> <!-- 头部部分 -->
    </header>

    <main>
      <router-view /> <!-- 这里是动态内容，根据路由渲染不同的页面 -->
    </main>

    <footer>
      <FooterComponent /> <!-- 底部部分 -->
    </footer>
  </div>
</template>

<script setup lang="ts">
// 导入布局中使用的组件，比如头部、底部组件
import HeaderComponent from '@/components/HeaderComponent/index.vue';
import FooterComponent from '@/components/FooterComponent/index.vue';
</script>

<style scoped>
/* 这个布局的整体样式 */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 确保页面高度至少填满浏览器窗口 */
}

header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa; /* 主内容区域 */
}

footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>
