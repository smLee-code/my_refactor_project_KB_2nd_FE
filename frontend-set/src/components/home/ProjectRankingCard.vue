<template>
    <div
        class="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 flex-1 min-h-[110px] max-h-[150px] flex flex-col justify-center"
    >
        <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
                <div
                    class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg"
                >
                    {{ rank }}
                </div>
            </div>
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
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
    projectId: Number,
    rank: Number,
    title: String,
    description: String,
    participants: Number,
    image: String,
})

const likes = ref(0)

onMounted(async () => {
    try {
        const res = await axios.get('/votes/count', {
            params: { projectId: props.projectId },
        })
        likes.value = res.data
        console.log(`프로젝트 ${props.projectId} 좋아요 수:`, likes.value)
    } catch (err) {
        console.error(`❌ 프로젝트 ${props.projectId} 좋아요 데이터 조회 실패:`, err)
    }
})
</script>
