<template>
  <el-form-item :label="$t(label)">
    <el-input
      v-model="inputValue"
      :placeholder="$t(placeholder)"
      :type="type"
      :prefix-icon="prefixIcon"
    />
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';

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
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const inputValue = computed({
      get() {
        return modelValue.value;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    return {
      inputValue,
    };
  },
});
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
