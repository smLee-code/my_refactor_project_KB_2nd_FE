<template>
  <div class="flex space-x-8 h-12 border-b border-gray-200 mb-8">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      @click="$emit('update:modelValue', tab.value)"
      :class="[
        'pb-4 cursor-pointer transition-colors whitespace-nowrap text-base',
        modelValue === tab.value
          ? 'border-b-2 border-yellow-400 font-bold text-gray-900'
          : 'text-gray-500',
      ]"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
<script setup>
// tabs: [{ value, label }] 형태의 탭 목록
// modelValue: 현재 선택된 탭 값 (v-model)
defineProps({
  tabs: { type: Array, default: () => [] },
  modelValue: String,
})
</script>
