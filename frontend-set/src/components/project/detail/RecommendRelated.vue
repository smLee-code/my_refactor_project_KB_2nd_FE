<template>
    <div class="mt-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">관련 프로젝트</h3>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ProjectCard
                v-for="p in projects"
                :key="p.id"
                :project="p"
                @toggle-like="toggleLike(p.id)"
                @click="goToDetail(p.id)"
            />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProjectCard from '../list/ProjectCard.vue'

const props = defineProps({
    projects: {
        type: Array,
        default: () => [],
    },
})

const router = useRouter()

const goToDetail = (id) => {
    router.push(`/project/detail/${id}`)
}

const toggleLike = (id) => {
    // 좋아요 토글 로직 (부모 emit 가능)
    console.log('좋아요 토글:', id)
}
</script>
