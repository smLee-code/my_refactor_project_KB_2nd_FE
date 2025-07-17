<template>
  <div class="flex justify-center items-center space-x-3">
    <!-- 이전 버튼 -->
    <button
      @click="currentPage > 1 && currentPage--"
      :class="[
        'p-2 rounded-lg transition-colors',
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-kb-ui-08 cursor-pointer',
      ]"
    >
      <FontAwesomeIcon :icon="faChevronLeft" class="text-kb-ui-06" />
    </button>

    <!-- 페이지 번호 버튼 -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      :class="[
        'w-7 h-7 rounded-lg font-light transition-colors whitespace-nowrap',
        currentPage === page
          ? 'bg-kb-yellow text-kb-ui-01'
          : 'bg-kb-ui-09 text-kb-ui-04 hover:bg-kb-ui-08',
      ]"
    >
      {{ page }}
    </button>

    <!-- 다음 버튼 -->
    <button
      @click="currentPage < totalPages && currentPage++"
      :class="[
        'p-2 rounded-lg transition-colors',
        currentPage === totalPages
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-kb-ui-08 cursor-pointer',
      ]"
    >
      <FontAwesomeIcon :icon="faChevronRight" class="text-kb-ui-06" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  modelValue: Number, // 현재 페이지
  totalPages: Number, // 총 페이지 수
})

const emit = defineEmits(['update:modelValue'])

const currentPage = ref(props.modelValue)

watch(currentPage, (val) => {
  emit('update:modelValue', val)
})

watch(
  () => props.modelValue,
  (val) => {
    if (val !== currentPage.value) currentPage.value = val
  },
)
</script>
