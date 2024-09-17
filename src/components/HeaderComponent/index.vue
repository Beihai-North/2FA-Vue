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
      @click="openDrawer"
    />
  </header>
  <!-- 抽屉组件 -->
  <el-drawer
    v-model="isDrawerVisible"
    direction="rtl"
    size="325"
    class="custom-drawer"
    style="  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;"
    @close="onDrawerClose"
    :with-header="false"
  >
    <div class="drawer-content">
      <div class="drawer-left">
        <img
          src="https://avatars.githubusercontent.com/u/70597799?v=4"
          alt="User Avatar"
          class="drawer-avatar"
        />
        <p>John Doe</p>
      </div>
      <div class="drawer-right">
        <el-button class="switch-account" @click="onSwitchAccounts">
          <el-icon><Switch /></el-icon>
        </el-button>
        <el-button type="danger" class="close-drawer" @click="onDrawerClose">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 渲染菜单 -->
    <!-- 启用 router 模式 -->
    <el-menu default-active="1" class="el-menu-vertical" :router="true">
      <template v-for="(item, index) in menuItems" :key="item.id">
        <!-- 使用 item.route 作为 index，自动处理路由跳转 -->
        <el-menu-item :index="item.route" class="custom-menu-item">
          {{ item.name }}
        </el-menu-item>
        <el-divider v-if="item.divider" style="margin: 10px 0;" />
      </template>
    </el-menu>

  </el-drawer>
</template>

<script>
import { defineComponent, ref ,onMounted} from 'vue';
import { Switch, Close } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus'
import { useMenuStore } from '@/stores/menu/index.ts'

export default defineComponent({
  name: 'HeaderComponent',
  components: {
    Switch,
    Close
  },
  setup() {
    // 控制抽屉是否显示
    const isDrawerVisible = ref(false);

    // 使用 Pinia Store
    const menuStore = useMenuStore();

    const menuItems = ref([])

    // 打开抽屉
    const openDrawer = () => {
      isDrawerVisible.value = true;
    };

    // 关闭抽屉
    const onDrawerClose = () => {
      console.log('Drawer closed');
      isDrawerVisible.value = false;
    };

    const onSwitchAccounts = () => {
      ElMessageBox.confirm('你真的要切换账号吗？', '切换账号', {
        confirmButtonText: '切换',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log('切换账号中·····');
      });
    };

    // 在组件挂载时获取菜单数据
    onMounted( () => {
      menuStore.fetchMenuItemsAndAddRoutes();  // 从 Pinia Store 中获取菜单数据
      menuItems.value = menuStore.menuItems;
    });

    return {
      isDrawerVisible,
      openDrawer,
      onDrawerClose,
      menuItems,
      onSwitchAccounts,
    };
  },
});
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

/* 抽屉中头像样式 */
.drawer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: block;
}

/* 抽屉内容样式 */
.drawer-content {
  color: black;
  display: flex;
  justify-content: space-between; /* 左右两部分分别靠左和靠右 */
  align-items: center; /* 垂直居中 */
  padding: 10px;
}

/* 左侧样式 */
.drawer-left {
  display: flex;
  align-items: center; /* 确保头像和用户名垂直居中对齐 */
}

.drawer-avatar {
  width: 50px; /* 头像大小 */
  height: 50px;
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 确保图片缩放适应尺寸 */
}

.drawer-left p {
  margin-left: 15px;
  font-size: 18px; /* 字体大小 */
  line-height: 1.2; /* 可以适当调整行高，确保文字与头像对齐 */
}

/* 右侧样式 */
.drawer-right {
  display: flex;
  align-items: center; /* 确保按钮与文本垂直居中对齐 */
}

.drawer-right el-button {
  display: flex;
  align-items: center; /* 确保图标和文字在同一行 */
  gap: 8px; /* 控制图标与文字之间的间距 */
}

.switch-account {
  color: #007bff;
}

.close-drawer {
  color: #ff0000;
  font-size: 20px;
}

.el-menu-vertical{
  border-right: 0;
}

.custom-menu-item {
  height: 32px; /* 自定义高度 */
  line-height: 32px; /* 确保文本垂直居中 */
  border-radius: 8px; /* 圆角 */
}
</style>
