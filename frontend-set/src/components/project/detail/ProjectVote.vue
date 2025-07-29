<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">좋아요</h3>
    <p class="text-gray-600 text-sm mb-4">
      이 프로젝트가 마음에 드시나요? 좋아요를 눌러 관심을 표현해보세요.
    </p>
    <button
      @click="toggleLike"
      class="w-full bg-gray-100 text-gray-700 px-4 py-3 !rounded-button font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap transition-all border border-gray-300"
    >
      <i :class="isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart'" class="mr-2"></i>
      {{ isLiked ? '좋아요 취소' : '좋아요' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const likeCount = ref(0)
const isLiked = ref(false)

// const toggleLike = () => {
//   isLiked.value = !isLiked.value
//   likeCount.value += isLiked.value ? 1 : -1
// }

const toggleLike = async () => {
  console.log('👍 userId:', props.userId)
  console.log('📁 projectId:', props.projectId)

  const payload = {
    userId: props.userId,
    projectId: props.projectId,
  }

  try {
    if (isLiked.value) {
      await axios.delete('/api/votes', { data: payload })
      likeCount.value--
    } else {
      await axios.post('/api/votes', payload)
      likeCount.value++
    }

    isLiked.value = !isLiked.value
  } catch (error) {
    console.error('좋아요 요청 실패:', error)
  }
}

const props = defineProps({
  projectId: Number,
  userId: Number,
})
</script>
