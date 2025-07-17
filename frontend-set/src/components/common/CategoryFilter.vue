<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('update:selected', category)"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
        selected === category
          ? 'bg-kb-yellow text-kb-ui-01'
          : 'bg-kb-ui-09 text-kb-ui-04 hover:bg-kb-ui-08',
      ]"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  selected: String, // 선택된 카테고리를 문자열로 받음 // 예: '전체', '적금형' 등
  categories: Array, // 카테고리 목록을 배열로 받음 // 예: ['전체', '적금형', '대출형', '기부형', '챌린지형']
})

defineEmits(['update:selected'])
</script>
