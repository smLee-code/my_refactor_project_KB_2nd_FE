<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <!-- 좌측: 메인 배너 + 당신이 좋아할만한 펀딩 -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- 메인 배너 슬라이더 -->
                    <MainBannerSlider :banners="mainBanners" v-model:current="currentSlide" />
                    <!-- 당신이 좋아할만한 펀딩 -->
                    <div>
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold text-gray-900 drop-shadow-sm">
                                당신이 좋아할만한 펀딩
                            </h3>
                            <a
                                href="#"
                                class="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 pb-0.5 font-medium cursor-pointer whitespace-nowrap transition-all flex items-center space-x-1"
                            >
                                <span>더 보기</span></a
                            >
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FundingCard
                                v-for="item in popularFundings"
                                :key="item.id"
                                :image="item.image"
                                :title="item.title"
                                :description="item.description"
                                :daysLeft="item.daysLeft"
                                :category="item.category"
                                :likes="item.likes"
                                :progress="item.progress"
                                :link="item.link"
                            />
                        </div>
                    </div>
                </div>
                <!-- 우측: 인기 프로젝트 -->
                <div class="h-full">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 drop-shadow-sm">
                        인기 프로젝트
                    </h3>
                    <div class="space-y-4 flex flex-col justify-between">
                        <ProjectRankingCard
                            v-for="(project, index) in topProjects.slice(0, 5)"
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
                </div>
            </div>
        </div>
        <!-- 관심 기반 추천 프로젝트 -->
        <section class="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-bold text-gray-900 drop-shadow-sm">
                        관심 기반 추천 프로젝트
                    </h3>
                    <a
                        href="#"
                        @click.prevent="goToProjectList"
                        class="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 pb-0.5 font-medium cursor-pointer whitespace-nowrap transition-all flex items-center space-x-1"
                    >
                        <span>더 보기</span>
                        <i class="fas fa-arrow-right text-gray-700"></i>
                    </a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <ProjectCard
                        v-for="item in recommendedProjects"
                        :key="item.id"
                        :project="item"
                    />
                </div>
            </div>
        </section>
        <!-- 마감 임박 펀딩 -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-8 drop-shadow-sm">마감 임박 펀딩</h3>
                <div class="relative">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FundingUrgentCard
                            v-for="item in visibleUrgentFundings"
                            :key="item.id"
                            :image="item.image"
                            :title="item.title"
                            :timeLeft="item.timeLeft"
                            :participants="item.participants"
                            :progress="item.progress"
                        />
                    </div>
                </div>
            </div>
        </section>
        <!-- 푸터 -->
        <Footer></Footer>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import MainBannerSlider from '@/components/home/MainBannerSlider.vue'
import FundingCard from '@/components/funding/FundingCard.vue'
import ProjectRankingCard from '@/components/project/ProjectRankingCard.vue'
import ProjectCard from '@/components/project/list/ProjectCard.vue'
import FundingUrgentCard from '@/components/funding/FundingUrgentCard.vue'
import Footer from '@/components/layout/MainFooter.vue'
import axios from 'axios'

const router = useRouter()
const topProjects = ref([])

const goToProject = (id) => {
    router.push(`project/detail/${id}`)
}

onMounted(async () => {
    try {
        const res = await axios.get('/project/top')
        topProjects.value = res.data
        console.log(`프로젝트 인기목록:`, res.data)
    } catch (err) {
        console.error(`❌ 프로젝트 인기목록 실패:`, err)
    }
})

const goToProjectList = () => {
    router.push('/project')
}

const mainBanners = [
    {
        title: '첫번째 배너 타이틀',
        image: '/images/logo.png',
    },
    {
        title: '두번째 배너 타이틀',
        image: '/images/logo.png',
    },
    {
        title: '세번째 배너 타이틀',
        image: '/images/logo.png',
    },
]
const currentSlide = ref(0)

const popularFundings = [
    // FundingCard용 mock data
    {
        id: 1,
        image: '/images/logo.png',
        title: '인기 펀딩 1',
        description: '설명1',
        daysLeft: 10,
        category: '적금형',
        likes: 100,
        progress: 80,
        link: '#',
    },
    {
        id: 2,
        image: '/images/logo.png',
        title: '인기 펀딩 2',
        description: '설명2',
        daysLeft: 5,
        category: '기부형',
        likes: 80,
        progress: 60,
        link: '#',
    },
    {
        id: 3,
        image: '/images/logo.png',
        title: '인기 펀딩 3',
        description: '설명3',
        daysLeft: 2,
        category: '대출형',
        likes: 120,
        progress: 90,
        link: '#',
    },
]

const recommendedProjects = [
    // ProjectCard용 mock data
    {
        id: 4,
        title: '추천 프로젝트 1',
        description: '추천 설명1',
        likes: 90,
        participants: 20,
        image: '/images/logo.png',
        category: '적금형',
    },
    {
        id: 5,
        title: '추천 프로젝트 2',
        description: '추천 설명2',
        likes: 70,
        participants: 15,
        image: '/images/logo.png',
        category: '기부형',
    },
    {
        id: 6,
        title: '추천 프로젝트 3',
        description: '추천 설명3',
        likes: 60,
        participants: 10,
        image: '/images/logo.png',
        category: '대출형',
    },
    {
        id: 7,
        title: '추천 프로젝트 4',
        description: '추천 설명4',
        likes: 50,
        participants: 8,
        image: '/images/logo.png',
        category: '챌린지형',
    },
]
const visibleUrgentFundings = [
    // FundingUrgentCard용 mock data
    {
        id: 1,
        image: '/images/logo.png',
        title: '마감임박 펀딩 1',
        timeLeft: '3시간 남음',
        participants: 30,
        progress: 95,
    },
    {
        id: 2,
        image: '/images/logo.png',
        title: '마감임박 펀딩 2',
        timeLeft: '1시간 남음',
        participants: 20,
        progress: 80,
    },
]
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}
</style>
