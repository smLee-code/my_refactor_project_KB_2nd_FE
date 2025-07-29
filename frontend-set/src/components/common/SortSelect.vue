<template>
  <div class="relative">
    <button
      @click="show = !show"
      class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 text-sm cursor-pointer flex items-center space-x-2 whitespace-nowrap"
    >
      <span>{{ options[modelValue] }}</span>
      <i class="fas fa-chevron-down text-xs"></i>
    </button>
    <div
      v-if="show"
      class="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
    >
      <button
        v-for="(label, key) in options"
        :key="key"
        @click="($emit('update:modelValue', key), (show = false))"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// options: { [key]: label } 형태의 옵션 목록
// modelValue: 현재 선택된 옵션 key (v-model)
const props = defineProps({
  options: { type: Object, default: () => ({}) },
  modelValue: String,
})
const show = ref(false)
</script>
