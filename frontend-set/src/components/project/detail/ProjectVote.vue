<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">좋아요</h3>
    <p class="text-gray-600 text-sm mb-4">
      이 프로젝트가 마음에 드시나요? 좋아요를 눌러 관심을 표현해보세요.
    </p>
    <button
      @click="toggleLike"
      class="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-button font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap transition-all border border-gray-300"
    >
      <i :class="[isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart', 'mr-2']"></i>
      {{ isLiked ? '좋아요 취소' : '좋아요' }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  projectId: Number,
  userId: Number,
  isLiked: Boolean, // 부모에서 내려오는 좋아요 상태
})

const emit = defineEmits(['toggle-like'])

const localIsLiked = ref(props.isLiked)

// 부모에서 isLiked가 바뀌면 로컬 상태 반영
watch(
  () => props.isLiked,
  (newVal) => {
    localIsLiked.value = newVal
  },
)

const toggleLike = async () => {
  const newState = !localIsLiked.value
  try {
    if (newState) {
      // 좋아요 취소 (DELETE 시 data 속성 필요)
      await axios.post('/votes', { userId: props.userId, projectId: props.projectId })
    } else {
      // 좋아요 추가
      await axios.post('/votes', { userId: props.userId, projectId: props.projectId })
    }

    emit('update-like', newState)
  } catch (err) {
    console.error('❌ 좋아요 토글 실패:', err)
  }
}
</script>
