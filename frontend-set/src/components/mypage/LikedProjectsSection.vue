<template>
    <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">좋아요한 프로젝트</h2>

        <!-- 좋아요한 프로젝트가 없을 때 -->
        <div
            v-if="likedProjects.length === 0"
            class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        >
            <div class="text-gray-400 mb-4">
                <i class="fas fa-heart text-4xl"></i>
            </div>
            <p class="text-gray-600 mb-2">아직 좋아요한 프로젝트가 없습니다.</p>
            <p class="text-sm text-gray-500 mb-6">관심 있는 프로젝트에 좋아요를 눌러보세요!</p>
            <button
                @click="goToProjectList"
                class="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors duration-200 font-medium"
            >
                프로젝트 살펴보기 →
            </button>
        </div>

        <!-- 좋아요한 프로젝트 목록 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard
                v-for="project in likedProjects"
                :key="project.id"
                :project="project"
                @click="goToProjectDetail(project.id)"
                @toggle-like="handleToggleLike"
            />
        </div>
    </div>

    <!-- 좋아요한 펀딩 섹션 -->
    <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">관심있는 펀딩</h2>

        <!-- 좋아요한 펀딩이 없을 때 -->
        <div
            v-if="likedFundings.length === 0"
            class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        >
            <div class="text-gray-400 mb-4">
                <i class="fas fa-star text-4xl"></i>
            </div>
            <p class="text-gray-600 mb-2">아직 좋아요한 펀딩이 없습니다.</p>
            <p class="text-sm text-gray-500 mb-6">관심 있는 펀딩에 좋아요를 눌러보세요!</p>
            <button
                @click="goToFundingList"
                class="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors duration-200 font-medium"
            >
                펀딩 살펴보기 →
            </button>
        </div>

        <!-- 좋아요한 펀딩 목록 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FundingCard
                v-for="funding in likedFundings"
                :key="funding.id"
                :id="funding.id"
                :fund-type="funding.fundType"
                :image="funding.image"
                :title="funding.title"
                :description="funding.description"
                :days-left="funding.daysLeft"
                :category="funding.category"
                :likes="funding.likes"
                :progress="funding.progress"
            />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProjectCard from '@/components/project/list/ProjectCard.vue'
import FundingCard from '@/components/funding/FundingCard.vue'

const router = useRouter()

const props = defineProps({
    likedProjects: {
        type: Array,
        default: () => [],
    },
    likedFundings: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['toggle-like'])

// props 변경 감지
console.log('LikedProjectsSection - received likedProjects:', props.likedProjects)
console.log('LikedProjectsSection - received likedFundings:', props.likedFundings)

// 프로젝트 상세 페이지로 이동
const goToProjectDetail = (projectId) => {
    if (projectId) {
        router.push(`/project/detail/${projectId}`)
    }
}

// 프로젝트 리스트 페이지로 이동
const goToProjectList = () => {
    router.push('/project')
}

// 펀딩 리스트 페이지로 이동
const goToFundingList = () => {
    router.push('/funding')
}

// 펀딩 상세 페이지로 이동
const goToFundingDetail = (fundId) => {
    if (fundId) {
        router.push(`/funding/detail/${fundId}`)
    }
}

// 좋아요 토글 처리
const handleToggleLike = async (projectId) => {
    try {
        console.log('좋아요 토글 시작:', projectId)

        // 부모 컴포넌트에 이벤트 발생
        emit('toggle-like', projectId)

        console.log('좋아요 토글 완료:', projectId)
    } catch (error) {
        console.error('좋아요 토글 실패:', error)
    }
}
</script>
