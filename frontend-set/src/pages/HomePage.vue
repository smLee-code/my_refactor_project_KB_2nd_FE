<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <!-- 좌측: 메인 배너 + 당신이 좋아할만한 펀딩 -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- 메인 배너 슬라이더 -->
                    <MainBannerSlider 
                        :banners="mainBanners" 
                        v-model:current="currentSlide"
                        @mouseenter="stopAutoSlide"
                        @mouseleave="startAutoSlide"
                        @indicator-click="handleSlideChange"
                    />
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
                        v-for="item in recommendedProjects.slice(0, 4)"
                        :key="item.id"
                        :project="item"
                        @click="goToProject(item.projectId)"
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
                            :id="item.id"
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
import { onMounted, onUnmounted, ref } from 'vue'
import MainBannerSlider from '@/components/home/MainBannerSlider.vue'
import FundingCard from '@/components/funding/FundingCard.vue'
import ProjectRankingCard from '@/components/project/ProjectRankingCard.vue'
import ProjectCard from '@/components/project/list/ProjectCard.vue'
import FundingUrgentCard from '@/components/funding/FundingUrgentCard.vue'
import Footer from '@/components/layout/MainFooter.vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const token = authStore.loadToken()

const router = useRouter()
const topProjects = ref([])
const recommendedProjects = ref([])
const latestFundings = ref([]) // 최신 펀딩 데이터

const goToProject = (id) => {
    router.push(`project/detail/${id}`)
}

onMounted(async () => {
    // 최신 펀딩 데이터 가져오기
    try {
        const fundRes = await axios.get('/fund/list', { params: { progress: 'Launch' } })
        const sortedFunds = fundRes.data
            .sort((a, b) => new Date(b.launchAt) - new Date(a.launchAt)) // 최신순 정렬
            .slice(0, 3) // 상위 3개만
        
        latestFundings.value = sortedFunds
        
        // 펀딩 데이터가 있으면 캐러셀 배너 업데이트
        if (latestFundings.value.length > 0) {
            updateBannersWithFundings()
        }
    } catch (err) {
        console.error('❌ 최신 펀딩 로딩 실패:', err)
    }
    
    // 자동 슬라이드 시작
    startAutoSlide()
    
    console.log('token123123:', token) // ✅ JWT 문자열 출력돼야 함

    // console.log('토큰 상태:', {
    //     token: authStore.loadToken(),
    //     userRole: authStore.loadRole(),
    //     isLoggedIn: authStore.isLoggedIn,
    // })

    try {
        const res = await axios.get('/project/top')
        topProjects.value = res.data
        console.log(`프로젝트 인기목록:`, res.data)
    } catch (err) {
        console.error(`❌ 프로젝트 인기목록 실패:`, err)
    }

    try {
        const allRes = await axios.get('/project/list', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) // 전체 프로젝트

        const allProjects = allRes.data.sort(() => Math.random() - 0.5) // 랜덤 섞기

        if (authStore.isLoggedIn && token) {
            const recommendRes = await axios.get('/project/list/keyword', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('dasfewaf', token)
            const recommended = recommendRes.data || []
            const recommendedIds = recommended.map((p) => p.projectId)

            // 중복 제거 후 부족한 수만큼 랜덤으로 채움
            const extra = allProjects
                .filter((p) => !recommendedIds.includes(p.projectId))
                .slice(0, 4 - recommended.length)

            recommendedProjects.value = [...recommended, ...extra]
            console.log('추천 프로젝트:', recommendRes.data)
        } else {
            // 로그인 안 했을 때는 그냥 랜덤 4개
            recommendedProjects.value = allProjects.slice(0, 4)
        }
    } catch (err) {
        console.error('❌ 추천 프로젝트 로딩 실패:', err)
    }
})

const goToProjectList = () => {
    router.push('/project')
}

const goToFunding = (id) => {
    router.push(`/funding/detail/${id}`)
}

const mainBanners = ref([
    {
        title: '첫번째 배너 타이틀',
        image: '/images/logo.png',
        fundId: null,
        description: '',
        progress: 0,
        daysLeft: 0,
    },
    {
        title: '두번째 배너 타이틀',
        image: '/images/logo.png',
        fundId: null,
        description: '',
        progress: 0,
        daysLeft: 0,
    },
    {
        title: '세번째 배너 타이틀',
        image: '/images/logo.png',
        fundId: null,
        description: '',
        progress: 0,
        daysLeft: 0,
    },
])

// 펀딩 데이터로 배너 업데이트
const updateBannersWithFundings = () => {
    mainBanners.value = latestFundings.value.map(fund => ({
        title: fund.name,
        image: fund.thumbnailImage?.imageUrl || '/images/logo.png',
        fundId: fund.fundId,
        description: fund.financialInstitution || '금융기관 정보 없음',
        progress: fund.progress || 0,
        daysLeft: getDaysLeft(fund.endAt),
    }))
}

const getDaysLeft = (endAt) => {
    const end = new Date(endAt)
    const today = new Date()
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
    return diff >= 0 ? diff : 0
}
const currentSlide = ref(0)

// 자동 슬라이드 기능
let slideInterval = null

const startAutoSlide = () => {
    // 기존 interval이 있으면 먼저 정리
    if (slideInterval) {
        clearInterval(slideInterval)
    }
    slideInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % mainBanners.value.length
    }, 6000) // 6초마다 슬라이드 변경
}

const stopAutoSlide = () => {
    if (slideInterval) {
        clearInterval(slideInterval)
        slideInterval = null
    }
}

// 사용자가 인디케이터 점을 클릭했을 때 자동 슬라이드 리셋
const handleSlideChange = (index) => {
    currentSlide.value = index
    stopAutoSlide()
    startAutoSlide() // 타이머를 리셋하여 다시 시작
}

// 컴포넌트 언마운트 시 자동 슬라이드 정지
onUnmounted(() => {
    stopAutoSlide()
})

const popularFundings = [
    // FundingCard용 mock data
    {
        id: 1,
        image: '/images/logo.png',
        title: '인기 펀딩 1',
        description: '설명1',
        daysLeft: 10,
        category: '저축형',
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
