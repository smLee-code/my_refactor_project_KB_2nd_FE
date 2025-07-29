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
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  projectId: Number,
  userId: Number,
  isLiked: Boolean, // 부모에서 내려오는 좋아요 상태
})

const emit = defineEmits(['update-like'])

const toggleLike = async () => {
  try {
    const payload = {
      userId: props.userId,
      projectId: props.projectId,
    }

    if (props.isLiked) {
      await axios.delete('/api/votes', { data: payload })
    } else {
      await axios.post('/api/votes', payload)
    }

    emit('update-like', !props.isLiked)
  } catch (error) {
    console.error('좋아요 요청 실패:', error)
  }
}
</script>
