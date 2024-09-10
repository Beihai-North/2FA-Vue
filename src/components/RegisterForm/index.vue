<template>
  <el-form :model="form" ref="registerFormRef" :rules="rules" label-position="top">
    <InputField
      v-model="form.email"
      label="register.email"
      placeholder="register.emailPlaceholder"
      prefix-icon="el-icon-message"
      prop="email"
    />
    <InputField
      v-model="form.username"
      label="register.username"
      placeholder="register.usernamePlaceholder"
      prefix-icon="el-icon-user"
      prop="username"
    />
    <InputField
      v-model="form.password"
      label="register.password"
      type="password"
      placeholder="register.passwordPlaceholder"
      prefix-icon="el-icon-lock"
      prop="password"
    />
    <InputField
      v-model="form.confirmPassword"
      label="register.confirmPassword"
      type="password"
      placeholder="register.confirmPasswordPlaceholder"
      prefix-icon="el-icon-lock"
      prop="confirmPassword"
    />
    <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputField from '@/components/InputField/index.vue';

export default defineComponent({
  name: 'RegisterForm',
  components: { InputField },
  setup() {
    const form = ref({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });

    const loading = ref(false);
    const registerFormRef = ref(null);

    const rules = {
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
      ],
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母和数字', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
          validator: (rule: any, value: string, callback: Function) => {
            if (value !== form.value.password) {
              callback(new Error('两次输入的密码不一致'));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
      ],
    };

    const handleSubmit = () => {
      registerFormRef.value.validate((valid: boolean) => {
        if (valid) {
          console.log('表单验证成功');
        } else {
          console.log('表单验证失败');
        }
      });
    };

    return {
      form,
      rules,
      loading,
      registerFormRef,
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