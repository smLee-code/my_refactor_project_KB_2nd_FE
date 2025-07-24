<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="px-6 py-3 font-medium rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap"
    :class="[
      loading || disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 text-white',
      customClass,
    ]"
  >
    <span v-if="loading">
      <i class="fas fa-spinner fa-spin mr-2"></i>
      처리 중...
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>
<script setup>
// loading: 로딩 상태 여부
// disabled: 비활성화 여부
// type: 버튼 타입 (submit, button 등)
// customClass: 추가 커스텀 클래스

defineProps({
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'submit' },
  customClass: String,
})
</script>
