<template>
  <header class="subheader">
    <div class="logo">
      <img src="@/assets/logo.svg" :alt="$t('header.logoAlt')" />
      <h3>{{ $t('header.welcomeText') }}</h3>
    </div>

    <!-- 用户头像，点击后显示抽屉 -->
    <img
      src="https://avatars.githubusercontent.com/u/70597799?v=4"
      alt="User Avatar"
      class="avatar"
      @click="isDrawerVisible=true"
    />
    <!-- 抽屉组件 -->
    <el-drawer
      v-model="isDrawerVisible"
      direction="rtl"
      size="25%"
      class="custom-drawer"
      style="  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;"
      @close="onDrawerClose"
      :with-header="false"
    >
      <div class="drawer-content">
      </div>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 控制抽屉是否显示
const isDrawerVisible = ref(false);

// 打开抽屉
const openDrawer = () => {
  isDrawerVisible.value = true;
};

// 关闭抽屉
const onDrawerClose = () => {
  console.log('Drawer closed');
};

// 退出登录
const logout = () => {
  ElMessage({
    message: 'User logged out successfully!',
    type: 'success',
  });
  isDrawerVisible.value = false;
};
</script>

<style scoped>
/* 头部样式 */
.subheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav a {
  color: white;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}

/* 用户头像样式 */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.custom-drawer {
}

/* 抽屉中头像样式 */
.drawer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: block;
  margin: 0 auto 1rem auto;
}

/* 抽屉内容样式 */
.drawer-content {
  color: black;
}

.drawer-content div{
  display: flex;
}
</style>
