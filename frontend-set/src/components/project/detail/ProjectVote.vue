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

<!-- <script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  projectId: Number,
  userId: Number,
  isLiked: Boolean, // 부모에서 내려오는 좋아요 상태
})

const emit = defineEmits(['update-like'])

const toggleLike = async (projectId) => {
  const project = projects.value.find((p) => p.id === projectId)
  if (!project) return

  try {
    if (project.isLiked) {
      await axios.post('/votes', { userId: 1, projectId })
      project.likes--
    } else {
      await axios.post('/votes', { userId: 1, projectId })
      project.likes++
    }
    project.isLiked = !project.isLiked
  } catch (err) {
    console.error('❌ 좋아요 토글 실패:', err)
  }
}
</script> -->
<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  projectId: Number,
  userId: Number,
  isLiked: Boolean, // 부모에서 내려오는 좋아요 상태
})

const emit = defineEmits(['update-like'])

const localIsLiked = ref(props.isLiked)

// props 변경 시 로컬 값도 반영
watch(
  () => props.isLiked,
  (newVal) => {
    localIsLiked.value = newVal
  },
)

const toggleLike = async () => {
  try {
    if (localIsLiked.value) {
      await axios.delete('/votes', { loginId: 1, projectId: props.projectId })
    } else {
      // await axios.post('/votes', { userId: props.loginId, projectId: props.projectId })
      await axios.post('/votes', { loginId: 1, projectId: props.projectId })
    }
    localIsLiked.value = !localIsLiked.value
    emit('update-like', localIsLiked.value) // 부모에게 변경 사항 전달
  } catch (err) {
    console.error('❌ 좋아요 토글 실패:', err)
  }
}
</script>
