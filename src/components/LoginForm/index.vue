<template>
  <el-form :model="form" ref="loginFormRef" :rules="rules" label-position="top">
    <InputField
      v-model="form.username"
      label="login.username"
      placeholder="login.usernamePlaceholder"
      prefix-icon="el-icon-user"
      prop="username"
    />
    <InputField
      v-model="form.password"
      label="login.password"
      type="password"
      placeholder="login.passwordPlaceholder"
      prefix-icon="el-icon-lock"
      prop="password"
    />
    <el-button type="primary" :loading="loading" @click="handleSubmit">登录</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import InputField from '@/components/InputField/index.vue';

export default defineComponent({
  name: 'LoginForm',
  components: { InputField },
  setup() {
    const form = ref({
      username: '',
      password: '',
    });

    const loading = ref(false);
    const loginFormRef = ref(null);
    const authStore = useAuthStore();
    const router = useRouter();

    // 验证规则
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母和数字', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ]
    };

    const handleSubmit = () => {
      <!--suppress TypeScriptUnresolvedReference -->
      loginFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          console.log('表单验证通过');

          try {
            // 调用登录方法
            await authStore.login(form.value.username, form.value.password);
            // 登录成功后跳转
            router.push('/');
          } catch (error) {
            console.error('登录失败:', error);
          } finally {
            loading.value = false;
          }
        } else {
          console.log('表单验证失败');
        }
      });
    };

    return {
      form,
      loading,
      rules,
      loginFormRef,
      handleSubmit,
    };
  },
});
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.el-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
