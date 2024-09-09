<template>
  <el-button type="primary" :loading="loading" @click="$emit('submit')">
    {{ $t(label) }}
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubmitButton',
  props: {
    label: {
      type: String,
      default: 'login.submit',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.el-button {
  width: 100%;
  margin-top: 20px;
}
</style>
