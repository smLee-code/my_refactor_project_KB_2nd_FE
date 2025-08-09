<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen" style="background-color: var(--kb-ui-10)">
        <!-- 메인 콘텐츠 -->
        <div class="max-w-[1200px] mx-auto px-5 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- 좌측 콘텐츠 영역 -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- 프로젝트 헤더 (사진 부분) -->
                    <DetailHeader
                        :imageList="data.imageList"
                        :title="data.basicInfo?.title"
                        fallbackImage="/images/placeholder.png"
                    />

                    <!-- 프로젝트 정보 -->
                    <ProjectInfo v-if="projectData" :project="projectData" />

                    <!-- 실시간 채팅 섹션 -->
                    <ChatComponent :roomId="projectId" />
                </div>

                <!-- 우측 정보 영역 -->
                <div class="space-y-6">
                    <!-- 기본 정보 -->
                    <summary-basic-info
                        v-if="projectData"
                        :detail="projectData"
                        :voteCount="voteCount"
                    />

                    <!-- 작성자 정보 -->
                    <writer-info v-if="projectData" :detail="projectData" />

                    <!-- 좋아요 -->
                    <project-vote
                        :userId="userId"
                        :projectId="projectId"
                        :isLiked="isLiked"
                        @update-like="handleUpdateLike"
                    />

                    <!-- 펀딩 생성 버튼 -->
                    <create-funding-button :projectId="Number(projectId)" />
                </div>
            </div>

            <!-- 관련 프로젝트 추천 -->
            <RecommendRelated
                v-if="relatedProjects.length"
                :projects="relatedProjects"
                :userId="userId"
                key="recommend-related"
            />
        </div>

        <!-- 푸터 -->
        <Footer />
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'

import ProjectInfo from '@/components/project/detail/ProjectInfo.vue'
import SummaryBasicInfo from '@/components/project/detail/SummaryBasicInfo.vue'
import WriterInfo from '@/components/project/detail/WriterInfo.vue'
import ProjectVote from '@/components/project/detail/ProjectVote.vue'
import CreateFundingButton from '@/components/project/detail/CreateFundingButton.vue'
import '@/assets/styles/projectDetail.css'
import ChatComponent from '@/components/chat/ChatComponent.vue'
import Footer from '@/components/layout/Footer.vue'
import RecommendRelated from '@/components/project/detail/RecommendRelated.vue'
import DetailHeader from '@/components/project/detail/DetailHeader.vue'

const userId = ref(5)
const route = useRoute()
const projectId = ref(String(route.params.id || ''))

const projectData = ref(null)
const isLiked = ref(false)
const voteCount = ref(0)
const relatedProjects = ref([])
const loading = ref(false)

// ✅ 템플릿에서 쓰던 data alias (안전 기본값 포함)
const data = computed(() => {
    return (
        projectData.value ?? {
            basicInfo: null,
            detailInfo: null,
            imageList: [], // DetailHeader가 비어 있어도 안전
        }
    )
})

// 좋아요 토글 시 상단 카운트 반영
const handleUpdateLike = (newState) => {
    isLiked.value = newState
    voteCount.value += newState ? 1 : -1
}

const fetchProjectData = async (id) => {
    if (!id) return
    loading.value = true
    projectData.value = null

    try {
        const res = await axios.get(`/project/list/detail/${id}/full`)
        projectData.value = res.data

        // 응답 안에 voteCount가 이미 있으면 초기값 세팅 (없으면 아래에서 다시 가져옴)
        if (typeof res.data?.voteCount === 'number') {
            voteCount.value = res.data.voteCount
        }

        const [relatedRes, likeRes] = await Promise.all([
            axios.get(`/project/related/${id}`),
            axios.get(`/votes?userId=${userId.value}&projectId=${id}`),
        ])
        relatedProjects.value = relatedRes.data
        isLiked.value = !!likeRes.data

        // 응답에 voteCount 없으면 별도 카운트 API 호출
        if (typeof res.data?.voteCount !== 'number') {
            const countRes = await axios.get('/votes/count', { params: { projectId: id } })
            voteCount.value = countRes.data
        }
    } catch (e) {
        console.error('❌ 프로젝트 데이터 갱신 실패:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchProjectData(projectId.value)
})

// 좋아요 상태 바뀌면 서버 카운트 동기화
watch(
    () => isLiked.value,
    async () => {
        try {
            const res = await axios.get(`/votes/count`, { params: { projectId: projectId.value } })
            voteCount.value = res.data
        } catch (err) {
            console.error('❌ 프로젝트 좋아요 수 데이터 조회 실패:', err)
        }
    },
)

// URL의 id가 바뀌면 다시 로드
watch(
    () => route.params.id,
    (newId, oldId) => {
        if (newId && newId !== oldId) {
            projectId.value = String(newId)
            fetchProjectData(projectId.value)
        }
    },
)
</script>
