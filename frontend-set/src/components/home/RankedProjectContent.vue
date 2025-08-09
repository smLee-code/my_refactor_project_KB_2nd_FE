<template>
    <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-gray-900 mb-1 line-clamp-1">{{ title }}</h4>
        <p class="text-sm text-gray-600 mb-2 line-clamp-1">{{ description }}</p>
        <div class="flex items-center justify-between text-sm">
            <span class="text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                좋아요: {{ likes }}
            </span>
            <span class="text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                참여수: {{ participants }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
    projectId: Number, // 좋아요 조회용
    title: String,
    description: String,
    participants: Number,
    image: String,
})

// 로컬 상태로 likes 관리
const likes = ref(0)

onMounted(async () => {
    try {
        const res = await axios.get(`/votes/${props.projectId}/count`)
        likes.value = res.data
        console.log(`프로젝트 ${props.projectId} 좋아요 수:`, likes.value)
    } catch (err) {
        console.error(`❌ 프로젝트 ${props.projectId} 좋아요 데이터 조회 실패:`, err)
    }
})
</script>
