<template>
  <!--suppress TypeScriptUnresolvedReference -->
  <el-form-item :label="$t(label)" :prop="prop">
    <!--suppress TypeScriptUnresolvedReference -->
    <el-input
      v-model="internalValue"
      :placeholder="$t(placeholder)"
      :type="type"
      :prefix-icon="prefixIcon"
    />
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '', // 用于传递 el-form-item 的 prop，用于验证
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue);

    // 实时监听 modelValue 的变化并更新 internalValue
    watch(
      () => props.modelValue,
      (newValue) => {
        internalValue.value = newValue;
      }
    );

    // 监听 internalValue 的变化并更新父组件的 modelValue
    watch(internalValue, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return {
      internalValue,
    };
  },
});
</script>
<!--suppress CssUnusedSymbol -->
<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
