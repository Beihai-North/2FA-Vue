<template>
  <el-form :model="form" ref="loginFormRef" :rules="rules" label-position="top">
    <InputField
      v-model="form.username"
      :label="('login.username')"
      :placeholder="('login.usernamePlaceholder')"
      prefix-icon="el-icon-user"
    />
    <InputField
      v-model="form.password"
      :label="('login.password')"
      type="password"
      :placeholder="('login.passwordPlaceholder')"
      prefix-icon="el-icon-lock"
    />
    <SubmitButton :loading="loading" :label="('login.submit')" @submit="handleSubmit" />
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputField from '@/components/InputField/index.vue';
import SubmitButton from '@/components/SubmitButton/index.vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();

export default defineComponent({
  name: 'LoginForm',
  components: { InputField, SubmitButton },
  setup() {
    const form = ref({
      username: '',
      password: '',
    });



    const loading = ref(false);
    const loginFormRef = ref(null);

    // 验证规则使用国际化的提示
    const rules = {
      username: [
        { required: true, message: `${('login.validation.usernameRequired')}`, trigger: 'blur' },
        {
          pattern: /^[a-zA-Z0-9_]+$/,
          message: `${('login.validation.usernamePattern')}`,
          trigger: 'blur',
        },
      ],
      password: [
        { required: true, message: `${('login.validation.passwordRequired')}`, trigger: 'blur' },
      ],
    };

    const handleSubmit = () => {
      loginFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          try {
            // 调用 authStore 的 login 方法进行登录请求
            await authStore.login(form.value.username, form.value.password);

            // 登录成功后，你可以在 authStore.login 中处理页面跳转
          } catch (error) {
            // 捕获登录失败的错误并输出
            console.error('登录失败:', error);
          } finally {
            // 无论登录成功或失败，都将 loading 状态设为 false
            loading.value = false;
          }
        } else {
          console.log('Validation failed');
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

<style scoped>
.el-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
