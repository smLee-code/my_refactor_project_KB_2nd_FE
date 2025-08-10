<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 메인 콘텐츠 -->
        <div class="max-w-6xl mx-auto px-8 py-8">
            <!-- 페이지 타이틀 -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">마이페이지</h1>
                <!-- 에러 메시지 -->
                <div
                    v-if="error"
                    class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                    {{ error }}
                </div>
            </div>

            <!-- 탭 네비게이션 -->
            <TabNavigation :active-tab="activeTab" @update:active-tab="activeTab = $event" />

            <!-- 로딩 상태 -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                <span class="ml-3 text-gray-600">로딩 중...</span>
            </div>

            <!-- 탭 콘텐츠 -->
            <div v-else class="relative overflow-hidden">
                <div
                    class="flex transition-transform duration-300 ease-in-out"
                    :style="{
                        transform: `translateX(${activeTab === 'info' ? '0%' : '-100%'})`,
                    }"
                >
                    <!-- 내 정보 탭 -->
                    <div class="w-full flex-shrink-0 py-6 px-4">
                        <UserInfoCard
                            :user-info="userInfo"
                            :loading="loading"
                            @update:user-info="userInfo = $event"
                        />
                    </div>

                    <!-- 내 활동 탭 -->
                    <div class="w-full flex-shrink-0 py-6 px-4">
                        <LikedProjectsSection
                            :liked-projects="likedProjects"
                            :liked-fundings="likedFundings"
                        />
                        <ParticipatingFundingsSection
                            :participating-fundings="participatingFundings"
                            @update:participating-fundings="participatingFundings = $event"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import {
    getMyPageInfo,
    getMyKeywords,
    updateMyKeywords,
    updateAccountInfo,
    getMyVotes,
    getMyProjects,
    getMyChallenges,
    getMyDonations,
    getMyLoans,
    getMySavings,
} from '@/api/mypageApi'
import { useAuthStore } from '@/stores/auth'

// 컴포넌트 import
import TabNavigation from '@/components/mypage/TabNavigation.vue'
import UserInfoCard from '@/components/mypage/UserInfoCard.vue'
import LikedProjectsSection from '@/components/mypage/LikedProjectsSection.vue'
import ParticipatingFundingsSection from '@/components/mypage/ParticipatingFundingsSection.vue'

const authStore = useAuthStore()
const token = authStore.loadToken()

const activeTab = ref('info')
const showUserMenu = ref(false)
const loading = ref(false)
const error = ref(null)

// 사용자 정보
const userInfo = reactive({
    userId: null,
    username: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    role: '',
    createAt: '',
    totalVotes: 0,
    totalProjects: 0,
    keywords: [],
})

const notifications = ref([
    { id: 1, message: '새로운 펀딩이 등록되었습니다.' },
    { id: 2, message: '회원님의 펀딩이 마감되었습니다.' },
])

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

// 마이페이지 정보 로드
const loadMyPageInfo = async () => {
    try {
        loading.value = true
        error.value = null
        const data = await getMyPageInfo(token)

        // 사용자 정보 업데이트
        Object.assign(userInfo, data)
    } catch (err) {
        error.value = err.response?.data?.error || '마이페이지 정보를 불러오는데 실패했습니다.'
        console.error('마이페이지 정보 로드 실패:', err)

        // Mock 데이터로 대체
        Object.assign(userInfo, {
            userId: 1,
            username: '김펀딩',
            email: 'funding@example.com',
            nickname: '펀딩러버',
            phoneNumber: '010-1234-5678',
            role: 'ROLE_NORMAL',
            createAt: '2024-01-15T00:00:00',
            totalVotes: 5,
            totalProjects: 2,
            keywords: ['기술', '환경', '문화', '교육'],
        })
    } finally {
        loading.value = false
    }
}

// 좋아요한 프로젝트 로드
const loadLikedProjects = async () => {
    try {
        const votes = await getMyVotes()
        // 투표한 프로젝트들을 프로젝트 상세 정보로 변환
        // 실제로는 프로젝트 상세 API를 호출해야 하지만, 여기서는 간단히 처리
        likedProjects.value = votes.map((vote) => ({
            id: vote.projectId,
            title: vote.projectTitle || '프로젝트 제목',
            description: vote.projectDescription || '프로젝트 설명',
            category: vote.projectType || '기타',
            location: '서울',
            likes: vote.likeCount || 0,
            image:
                'https://readdy.ai/api/search-image?query=project%20thumbnail&width=400&height=300&seq=project' +
                vote.projectId,
        }))
    } catch (err) {
        console.error('좋아요한 프로젝트 로드 실패:', err)

        // Mock 데이터로 대체
        likedProjects.value = [
            {
                id: 1,
                title: '지역 상권 활성화 프로젝트',
                description: '지역 소상공인을 위한 통합 마케팅 및 결제 플랫폼 구축',
                category: '기타',
                location: '서울',
                likes: 98,
                image: 'https://readdy.ai/api/search-image?query=vibrant%20local%20marketplace%20street%20scene%20with%20traditional%20storefronts%2C%20small%20businesses%2C%20and%20modern%20urban%20development%2C%20clean%20architectural%20style%2C%20warm%20sunlight%2C%20professional%20photography%20perspective&width=400&height=300&seq=liked1&orientation=landscape',
            },
            {
                id: 2,
                title: '스마트 도시 인프라 구축',
                description: '도시 문제 해결을 위한 IoT 기반 스마트 시티 솔루션',
                category: '기술',
                location: '부산',
                likes: 87,
                image: 'https://readdy.ai/api/search-image?query=modern%20smart%20city%20infrastructure%20with%20IoT%20sensors%2C%20clean%20urban%20design%2C%20technological%20integration%2C%20professional%20architectural%20visualization&width=400&height=300&seq=liked2&orientation=landscape',
            },
            {
                id: 3,
                title: '친환경 에너지 전환',
                description: '지역 커뮤니티 기반 재생에너지 프로젝트',
                category: '환경',
                location: '제주',
                likes: 76,
                image: 'https://readdy.ai/api/search-image?query=renewable%20energy%20installation%20in%20urban%20setting%2C%20solar%20panels%2C%20clean%20energy%20infrastructure%2C%20professional%20environmental%20photography&width=400&height=300&seq=liked3&orientation=landscape',
            },
        ]
    }
}

// 참여 중인 펀딩 로드
const loadParticipatingFundings = async () => {
    console.log('loadParticipatingFundings 함수 시작')

    // API 호출이 실패할 가능성이 높으므로 바로 mock data 사용
    console.log('참여중인 펀딩 mock 데이터 로드 중...')

    participatingFundings.value = [
        {
            id: 1,
            title: '지역 카페 창업 지원',
            joinDate: '2024.01.20',
            amount: 50000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=cozy%20local%20coffee%20shop%20interior%20with%20warm%20lighting%2C%20comfortable%20seating%20area%2C%20professional%20cafe%20atmosphere%2C%20modern%20coffee%20equipment%2C%20clean%20business%20photography&width=150&height=150&seq=cert1&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.01.25',
                },
            ],
            type: 'challenge',
        },
        {
            id: 2,
            title: '청년 창업 지원 프로그램',
            joinDate: '2024.02.05',
            amount: 100000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=young%20entrepreneurs%20working%20in%20modern%20startup%20office%2C%20collaborative%20workspace%2C%20professional%20business%20environment%2C%20clean%20corporate%20photography&width=150&height=150&seq=cert2&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.02.10',
                },
                {
                    url: 'https://readdy.ai/api/search-image?query=startup%20team%20meeting%20with%20laptops%20and%20documents%2C%20modern%20office%20setting%2C%20professional%20business%20collaboration%2C%20clean%20workspace%20photography&width=150&height=150&seq=cert3&orientation=squarish',
                    isApproved: false,
                    uploadedAt: '2024.02.12',
                },
            ],
            type: 'donation',
        },
        {
            id: 3,
            title: '환경 보호 캠페인',
            joinDate: '2024.02.15',
            amount: 30000,
            certificationImages: [],
            type: 'loan',
        },
        {
            id: 4,
            title: '스마트 홈 IoT 프로젝트',
            joinDate: '2024.03.01',
            amount: 75000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=smart%20home%20automation%20system%20with%20IoT%20devices%2C%20modern%20home%20technology%2C%20clean%20interior%20design%2C%20professional%20smart%20home%20photography&width=150&height=150&seq=cert4&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.03.05',
                },
            ],
            type: 'challenge',
        },
        {
            id: 5,
            title: '지역 문화재 복원 프로젝트',
            joinDate: '2024.03.10',
            amount: 200000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=traditional%20korean%20cultural%20heritage%20site%20restoration%2C%20historic%20architecture%2C%20cultural%20preservation%2C%20professional%20heritage%20photography&width=150&height=150&seq=cert5&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.03.15',
                },
                {
                    url: 'https://readdy.ai/api/search-image?query=restoration%20work%20on%20traditional%20building%2C%20cultural%20preservation%20efforts%2C%20professional%20conservation%20photography&width=150&height=150&seq=cert6&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.03.18',
                },
            ],
            type: 'donation',
        },
        {
            id: 6,
            title: '친환경 자전거 공유 서비스',
            joinDate: '2024.03.15',
            amount: 150000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=eco-friendly%20bicycle%20sharing%20station%20with%20modern%20bikes%2C%20sustainable%20transportation%2C%20clean%20urban%20mobility%2C%20professional%20transportation%20photography&width=150&height=150&seq=cert7&orientation=squarish',
                    isApproved: false,
                    uploadedAt: '2024.03.20',
                },
            ],
            type: 'loan',
        },
        {
            id: 7,
            title: '디지털 아트 갤러리',
            joinDate: '2024.03.20',
            amount: 80000,
            certificationImages: [],
            type: 'saving',
        },
        {
            id: 8,
            title: '지역 농산물 직거래 플랫폼',
            joinDate: '2024.03.25',
            amount: 120000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=fresh%20local%20farm%20produce%20marketplace%2C%20direct%20trade%20platform%2C%20sustainable%20agriculture%2C%20professional%20market%20photography&width=150&height=150&seq=cert8&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.03.30',
                },
            ],
            type: 'challenge',
        },
        {
            id: 9,
            title: '청소년 코딩 교육 프로그램',
            joinDate: '2024.04.01',
            amount: 60000,
            certificationImages: [
                {
                    url: 'https://readdy.ai/api/search-image?query=teenagers%20learning%20coding%20in%20modern%20classroom%2C%20educational%20technology%2C%20programming%20education%2C%20professional%20education%20photography&width=150&height=150&seq=cert9&orientation=squarish',
                    isApproved: true,
                    uploadedAt: '2024.04.05',
                },
            ],
            type: 'donation',
        },
        {
            id: 10,
            title: '스마트 웨어러블 헬스케어',
            joinDate: '2024.04.05',
            amount: 90000,
            certificationImages: [],
            type: 'loan',
        },
    ]
    console.log('참여중인 펀딩 데이터:', participatingFundings.value)
}

const likedProjects = ref([])
const likedFundings = ref([])
const participatingFundings = ref([])

// 좋아요한 펀딩 mock 데이터 로드
const loadLikedFundings = async () => {
    // Mock 데이터로 대체
    likedFundings.value = [
        {
            id: 1,
            title: '친환경 패키징 솔루션',
            daysLeft: 15,
            progress: 85,
            status: '모집중',
            image: 'https://readdy.ai/api/search-image?query=eco-friendly%20packaging%20materials%20with%20sustainable%20design%2C%20green%20technology%20innovation%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20modern%20environmental%20solution&width=400&height=300&seq=funding1&orientation=landscape',
        },
        {
            id: 2,
            title: '스마트 농업 기술',
            daysLeft: 8,
            progress: 92,
            status: '모집중',
            image: 'https://readdy.ai/api/search-image?query=smart%20agriculture%20technology%20with%20modern%20farming%20equipment%2C%20IoT%20sensors%20in%20greenhouse%2C%20clean%20agricultural%20innovation%2C%20professional%20technology%20photography&width=400&height=300&seq=funding2&orientation=landscape',
        },
        {
            id: 3,
            title: '교육용 VR 플랫폼',
            daysLeft: 0,
            progress: 100,
            status: '모집완료',
            image: 'https://readdy.ai/api/search-image?query=virtual%20reality%20education%20platform%20with%20modern%20VR%20headsets%2C%20interactive%20learning%20environment%2C%20clean%20educational%20technology%2C%20professional%20tech%20photography&width=400&height=300&seq=funding3&orientation=landscape',
        },
    ]
}

onMounted(async () => {
    // 마이페이지 정보 로드
    await loadMyPageInfo()

    // 활동 탭 데이터 로드
    await Promise.all([loadLikedProjects(), loadLikedFundings(), loadParticipatingFundings()])

    document.addEventListener('click', (event) => {
        const userMenuButton = document.getElementById('user-menu-button')
        const userMenuDropdown = userMenuButton?.nextElementSibling
        if (userMenuButton && userMenuDropdown) {
            if (
                !userMenuButton.contains(event.target) &&
                !userMenuDropdown.contains(event.target)
            ) {
                showUserMenu.value = false
            }
        }
    })
})
</script>

<style scoped>
.rounded-button {
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
