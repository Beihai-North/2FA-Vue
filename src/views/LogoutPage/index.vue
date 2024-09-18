<template>
  <div class="logout-container">
    <h2 class="title">选择要注销的帐户</h2>

    <div class="account-card">
      <!-- 用户头像和信息 -->
      <div class="user-info">
        <img :src="user.avatarUrl" alt="User Avatar" class="avatar" />
        <div class="user-details">
          <p class="login-identity">登录身份</p>
          <p class="username">{{ user.name }}</p>
        </div>
      </div>

      <!-- 登出按钮 -->
      <el-button class="logout-button" type="primary" @click="logout">
        登出
      </el-button>
    </div>

    <!-- 注销所有帐户 -->
    <el-button class="logout-all-button" type="text" @click="logoutAll">
      从所有帐户注销
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import avatarImage from '@/assets/70597799.jpg'

export default {
  name: 'LogoutPage',
  setup() {
    // 模拟的用户数据
    const user = ref({
      name: '北海北',
      avatarUrl: avatarImage, // 替换为实际图片路径
    });

    const logout = () => {
      console.log('登出当前账户');
    };

    const logoutAll = () => {
      console.log('从所有帐户注销');
    };

    return {
      user,
      logout,
      logoutAll,
    };
  },
};
</script>

<style scoped>
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.account-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.login-identity {
  font-size: 14px;
  color: #606266;
}

.username {
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
}

.logout-button {
  margin-left: auto;
}

.logout-all-button {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
