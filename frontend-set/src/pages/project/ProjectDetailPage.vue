<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen" style="background-color: var(--kb-ui-10)">
        <!-- 메인 콘텐츠 -->
        <div class="max-w-[1200px] mx-auto px-5 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- 좌측 콘텐츠 영역 -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- 프로젝트 헤더 (사진 부분) -->
                    <DetailHeader></DetailHeader>
                    <!-- 프로젝트 정보 -->
                    <ProjectInfo :project="projectData" />
                    <!-- 실시간 채팅 섹션 -->
                    <ChatComponent :roomId="projectId"></ChatComponent>
                </div>

                <!-- 우측 정보 영역 -->
                <div class="space-y-6">
                    <!-- 기본 정보 -->
                    <summary-basic-info
                        :detail="projectData"
                        :voteCount="voteCount"
                    ></summary-basic-info>

                    <!-- 작성자 정보 -->
                    <writer-info :detail="projectData"></writer-info>

                    <!-- 좋아요 -->
                    <project-vote
                        :userId="userId"
                        :projectId="projectId"
                        :isLiked="isLiked"
                        @update-like="handleUpdateLike"
                    />
                </div>
            </div>

            <!-- 관련 프로젝트 추천 -->
            <RecommendRelated
                :projects="relatedProjects"
                :userId="userId"
                key="recommend-related"
            ></RecommendRelated>
        </div>
        <!-- 푸터 -->
        <Footer></Footer>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, nextTick, onMounted, watch } from 'vue'
import { watchEffect } from 'vue'

import ProjectInfo from '@/components/project/detail/ProjectInfo.vue'
import SummaryBasicInfo from '@/components/project/detail/SummaryBasicInfo.vue'
import WriterInfo from '@/components/project/detail/WriterInfo.vue'
import ProjectVote from '@/components/project/detail/ProjectVote.vue'
import '@/assets/styles/projectDetail.css'
import ChatComponent from '@/components/chat/ChatComponent.vue'
import Footer from '@/components/layout/Footer.vue'
import RecommendRelated from '@/components/project/detail/RecommendRelated.vue'
import DetailHeader from '@/components/project/detail/DetailHeader.vue'

const userId = ref(5)
const route = useRoute()
const projectId = ref(route.params.id)

const projectData = ref(null)
const isLoggedIn = ref(false)
const isLiked = ref(false)
const likeCount = ref()
const voteCount = ref(0)
const relatedProjects = ref([])
const loading = ref(false)

const handleUpdateLike = (newState) => {
    isLiked.value = newState
    likeCount.value += newState ? 1 : -1
}

const fetchProjectData = async (id) => {
    console.log('fetchProjectData 호출!')

    if (!id) return
    loading.value = true
    projectData.value = null // 기존 데이터 제거

    try {
        const res = await axios.get(`/project/list/detail/${id}/full`)
        projectData.value = res.data

        const relatedRes = await axios.get(`/project/related/${id}`)
        relatedProjects.value = relatedRes.data

        const likeRes = await axios.get(`/votes?userId=${userId.value}&projectId=${id}`)
        isLiked.value = likeRes.data

        const countRes = await axios.get('/votes/count', { params: { projectId: id } })
        voteCount.value = countRes.data
    } catch (e) {
        console.error('❌ 프로젝트 데이터 갱신 실패:', e)
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    console.log('onMounted 호출!')
    fetchProjectData(projectId.value)
    // // 사용자 정보는 별도 처리 (로그인 안 된 경우 대비)
    // try {
    //   const userRes = await axios.get('/user/me')
    //   userId.value = userRes.data.id
    //   console.log('✅ 사용자 API 응답:', userId.value)
    // } catch (e) {
    //   console.warn('⚠ 사용자 정보 요청 실패 (비로그인 상태일 수 있음):', e)
    //   // userId.value = 2
    // }
})

watch(
    () => isLiked.value,
    async () => {
        try {
            const res = await axios.get(`/votes/count?projectId=${projectId.value}`)
            voteCount.value = res.data
            console.log('✅ 프로젝트 좋아요 수 API 응답:', res.data)
        } catch (err) {
            console.error(`❌ 프로젝트 좋아요 수 데이터 조회 실패:`, err)
        }
    },
)

// 라우트 id 변화 감시 (프로젝트 데이터 다시 로드)

// URL 변경 감시
watch(
    () => route.params.id, // 여기서 id만 감시
    (newId, oldId) => {
        console.log('watch route.params.id 호출', route.params.id)
        if (newId && newId !== oldId) {
            projectId.value = newId
            fetchProjectData(newId)
        }
    },
)

// onBeforeRouteUpdate((to, from) => {
//     const newId = to.params.id
//     console.log('onBeforeRouteUpdate 호출됨:', newId)
//     projectId.value = newId
//     fetchProjectData(newId)
// })
</script>
