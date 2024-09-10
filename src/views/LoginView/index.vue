<template>
  <div id="app" class="login-view">
    <!-- 左侧动画区域 -->
    <div class="animation-section">
      <div class="animation-content">
        <p>Animation Placeholder</p>
      </div>
    </div>

    <!-- 右侧登录区域 -->
    <div class="login-section">
      <div class="login-container">
        <h2>{{ // noinspection TypeScriptUnresolvedReference
        $t('login.title') }}</h2>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/LoginForm/index.vue';

export default defineComponent({
  name: 'LoginView',
  components: { LoginForm },
});
</script>

<style scoped>
/* 重新定义 #app 样式，使其占满全屏宽度和高度 */
#app {
  display: flex;
  height: 100vh; /* 占满整个视口高度 */
  width: 100vw; /* 占满整个视口宽度 */
  margin: 0;
  padding: 0;
  overflow: hidden; /* 防止溢出导致的滚动条 */
}

/* 左侧动画区域 */
.animation-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa;
}

/* 右侧登录框区域 */
.login-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.login-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}
</style>
