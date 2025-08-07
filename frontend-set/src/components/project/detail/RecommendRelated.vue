<template>
    <div class="mt-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">관련 프로젝트</h3>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <RelatedCard
                v-for="p in projects"
                :key="p.projectId"
                :project="p"
                @click="goToDetail(p.projectId)"
                @toggle-like="toggleLike(p.projectId)"
                class="cursor-pointer"
            />
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import RelatedCard from './RelatedCard.vue'
import axios from 'axios' // ✅ axios 추가

const props = defineProps({
    projects: {
        type: Array,
        default: () => [],
    },
    userId: Number,
})

const router = useRouter()

const goToDetail = (id) => {
    if (!id) {
        console.error('❌ project.id 값이 없습니다.', projectId)
        return
    }
    router.push(`/project/detail/${id}`)
}
</script>
