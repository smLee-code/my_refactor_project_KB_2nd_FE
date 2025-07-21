<template>
  <div class="w-full bg-kb-ui-08 rounded-full h-2">
    <div
      class="h-2 rounded-full transition-all duration-500 bg-status-positive"
      :style="{ width: percent + '%' }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  percent: {
    // 진행률을 백분율로 받습니다
    type: Number,
    required: true,
  },
})
</script>
