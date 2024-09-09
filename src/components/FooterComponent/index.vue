<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 My Website. All rights reserved.</p>
      <ul class="social-links">
        <li>
          <a href="https://facebook.com" target="_blank">Facebook</a>
        </li>
        <li>
          <a href="https://twitter.com" target="_blank">Twitter</a>
        </li>
        <li>
          <a href="https://github.com" target="_blank">GitHub</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 如果需要，导入额外的工具或组件
</script>

<style scoped>
/* 底部样式 */
.footer {
  background-color: #343a40;
  color: white;
  padding: 1rem;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-links {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: white;
  text-decoration: none;
}

.social-links a:hover {
  text-decoration: underline;
}
</style>
