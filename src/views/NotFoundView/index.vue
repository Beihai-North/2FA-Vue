<template>
  <div class="not-found">
    <!-- 图标 -->
    <el-icon class="not-found-icon">
      <WarningFilled />
    </el-icon>

    <h1>404 - 页面不存在</h1>
    <p>您访问的页面不存在，请检查您输入的 URL。</p>

    <!-- 返回首页的按钮，带箭头图标 -->
    <router-link to="/">
      <el-button type="primary" :icon="ArrowLeft">返回首页</el-button>
    </router-link>
  </div>
</template>

<script>
import { ElButton, ElIcon } from 'element-plus';
import { ArrowLeft, WarningFilled } from '@element-plus/icons-vue'; // 引入Element Plus图标

export default {
  name: 'NotFoundView',
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  components: {
    ElButton,
    ElIcon,
    ArrowLeft, // 引入箭头图标
    WarningFilled, // 引入警告图标
  }
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}

.not-found-icon {
  font-size: 64px; /* 图标大小 */
  color: #f56c6c; /* 图标颜色 */
  margin-bottom: 20px;
}

h1 {
  font-size: 36px;
  color: #333;
}

p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

el-button {
  font-size: 16px;
}
</style>
