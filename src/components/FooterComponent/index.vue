<template>
  <div class="footer-content">
    <p>&copy; 2024 金海集团. 保留所有权利。</p>
    <ul class="social-links">
      <li><a href="/privacy-policy" target="_blank">隐私政策</a></li>
      <li><a href="/terms-of-service" target="_blank">服务条款</a></li>
      <li><a href="/cookie-policy" target="_blank">Cookie 政策</a></li>
    </ul>
    <p>电话：+86 17609301807 | 邮箱：jinhai.ma@icloud.com</p>
<!--    <p>地址：中国北京市朝阳区XXX大厦XX层</p>-->
  </div>
</template>

<script setup lang="ts">
// 如果需要逻辑处理，可以在这里添加
</script>

<style scoped>
.footer-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
}
.social-links{
  display: flex;
  gap: 1rem;
}
.social-links li a{
  color: white;
  text-decoration: none;
}

</style>
