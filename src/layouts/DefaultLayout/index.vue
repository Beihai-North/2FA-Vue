<template>
  <el-container class="layout">
    <!-- Header 部分 -->
    <el-header class="header">
      <HeaderComponent />
    </el-header>

    <!-- Main 内容部分 -->
    <el-main class="main">
      <router-view />
    </el-main>

    <!-- Footer 底部部分 -->
    <el-footer class="footer">
      <FooterComponent />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
// 导入布局中使用的组件，比如头部、底部组件
import HeaderComponent from '@/components/HeaderComponent/index.vue';
import FooterComponent from '@/components/FooterComponent/index.vue';
</script>

<style scoped>
/* 整体布局样式 */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 确保页面高度至少填满浏览器窗口 */
}

.header {
  background-color: #007bff;
  color: white;
  text-align: center;
  line-height: 60px; /* 调整Header的高度 */
  padding: 0 2rem; /* 调整内边距，留出更多的空间 */
}

.main {
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa; /* 设置主内容区域的背景色 */
}

.footer {
  background-color: #343a40;
}

/* 响应式设计：在较小屏幕设备上优化显示效果 */
@media (max-width: 768px) {
  .header, .footer {
    padding: 0.5rem 1rem;
    line-height: 50px;
  }

  .main {
    padding: 1rem;
  }
}
</style>
