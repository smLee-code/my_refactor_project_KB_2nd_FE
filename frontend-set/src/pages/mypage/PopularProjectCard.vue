<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="space-y-2">
            <TodayProjectRanking
                v-for="(project, index) in topProjects.slice(0, 100)"
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

function goToProject(projectId) {
    window.location.href = `/project/detail/${projectId}`
}
</script>
