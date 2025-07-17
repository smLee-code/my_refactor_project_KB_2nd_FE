<template>
  <div class="flex items-center">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="px-4 py-2 border border-kb-ui-08 rounded-lg focus:outline-none text-sm text-kb-ui-02 cursor-pointer"
    >
      <option value="latest">최신순</option>
      <option value="likes">좋아요순</option>
      <option value="deadline">마감임박순</option>
      // 필요 시 정렬 기준 추가
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>
