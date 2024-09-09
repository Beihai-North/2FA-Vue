<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Logo" />
      <h1>My Website</h1>
    </div>
    <nav class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// 如果需要，导入额外的工具或组件
</script>

<style scoped>
/* 头部样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
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
</style>
