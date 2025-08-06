<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="space-y-2">
            <TodayProjectRanking
                v-for="(project, index) in topProjects"
                :key="project.projectId"
                :rank="index + 1"
                :title="project.title"
                :likes="project.likes"
                :image="project.image"
                :voteCount="project.voteCount"
                :promotion="project.promotion"
                :projectType="project.projectType"
                @click="goToProject(project.projectId)"
            />
        </div>
    </Card>
</template>

<script setup>
import Card from '@/components/mypage/Card.vue'
import TodayProjectRanking from '@/components/mypage/todayProjectRanking.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const topProjects = ref([])

defineProps({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    iconColor: { type: String, default: '#000' },
})

onMounted(async () => {
    try {
        const res = await axios.get('/project/top')
        topProjects.value = res.data
        console.log(`프로젝트 인기목록:`, res.data)
    } catch (err) {
        console.error(`❌ 프로젝트 인기목록 실패:`, err)
    }
})

function rankStyle(index) {
    if (index === 0) return 'bg-yellow-400 text-white shadow-md'
    if (index === 1) return 'bg-gray-300 text-gray-900 shadow-md'
    if (index === 2) return 'bg-amber-600 text-white shadow-md'
    return 'bg-gray-200 text-gray-800'
}

function goToProject(projectId) {
    window.location.href = `/project/detail/${projectId}`
}
</script>
