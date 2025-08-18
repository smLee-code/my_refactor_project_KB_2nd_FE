<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 메인 콘텐츠 -->
        <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
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
                            @update:user-info="handleUserInfoUpdate"
                            @update-completed="handleUpdateCompleted"
                        />
                    </div>

                    <!-- 내 활동 탭 -->
                    <div class="w-full flex-shrink-0 py-6 px-4">
                        <LikedProjectsSection
                            :likedProjects="likedProjects"
                            :liked-fundings="likedFundings"
                            @toggle-like="handleProjectToggleLike"
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
    getMyAllSavings,
    getMyAllLoans,
    getMyAllDonations,
    getMyAllChallenges,
    getLikedFundings,
    getMyAllVotedFunds,
    getProjectDetail,
    toggleProjectLike,
} from '@/api/mypageApi'
import { getUserBadges } from '@/api/badgeApi'
import { useAuthStore } from '@/stores/auth'

// 컴포넌트 import
import TabNavigation from '@/components/mypage/TabNavigation.vue'
import UserInfoCard from '@/components/mypage/UserInfoCard.vue'
import LikedProjectsSection from '@/components/mypage/LikedProjectsSection.vue'
import ParticipatingFundingsSection from '@/components/mypage/ParticipatingFundingsSection.vue'

const authStore = useAuthStore()
const token = authStore.loadToken()

// 토큰 디버깅
console.log('🔑 토큰 확인:', token)
console.log('🔑 토큰 타입:', typeof token)
console.log('🔑 토큰 길이:', token ? token.length : 0)

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
    badges: [],
})

const notifications = ref([
    { id: 1, message: '새로운 펀딩이 등록되었습니다.' },
    { id: 2, message: '회원님의 펀딩이 마감되었습니다.' },
])

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

const toDate = (v) => {
    if (!v) return null
    if (v instanceof Date) return v
    if (Array.isArray(v)) {
        const [y, m, d, hh = 0, mm = 0, ss = 0] = v
        return new Date(y, (m ?? 1) - 1, d ?? 1, hh, mm, ss)
    }
    return new Date(v)
}

const formatDate = (val) => {
    const dt = toDate(val)
    if (!dt || isNaN(dt)) return ''
    const y = dt.getFullYear()
    const m = String(dt.getMonth() + 1).padStart(2, '0')
    const d = String(dt.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

// 뱃지 정보 로드
const loadUserBadges = async () => {
    try {
        console.log('뱃지 정보 로드 시작')
        const badges = await getUserBadges(token)
        console.log('뱃지 정보 로드 완료:', badges)
        userInfo.badges = badges || []
    } catch (err) {
        console.error('뱃지 정보 로드 실패:', err)
        // API 실패 시 빈 배열로 설정
        userInfo.badges = []

        // Mock 데이터로 대체 (테스트용)
        userInfo.badges = [
            {
                badgeId: 1,
                name: 'CertifiedCompany4 (업체 인증)',
                description: '업체 인증 (Company Certification)',
                autoGrantCondition: 'COMPLETED_FUNDING',
            },
            {
                badgeId: 3,
                name: 'Donor (기부가)',
                description: '기부가 (Donor)',
                autoGrantCondition: 'DONATED',
            },
            {
                badgeId: 4,
                name: 'Challenger (챌린저)',
                description: '챌린저 (Challenger)',
                autoGrantCondition: 'CHALLENGE_PARTICIPATION',
            },
            {
                badgeId: 8,
                name: 'CommentKing (댓글왕)',
                description: '댓글왕 (Comment King)',
                autoGrantCondition: 'COMMENT_MASTER',
            },
        ]
    }
}

// 마이페이지 정보 로드
const loadMyPageInfo = async () => {
    try {
        loading.value = true
        error.value = null
        const data = await getMyPageInfo(token)

        // 사용자 정보 업데이트
        Object.assign(userInfo, data)

        // 가입일 날짜 형식 처리
        if (userInfo.createAt) {
            try {
                const date = new Date(userInfo.createAt)
                if (isNaN(date.getTime())) {
                    // 날짜가 유효하지 않은 경우 현재 날짜로 설정
                    userInfo.createAt = new Date().toISOString()
                }
            } catch (err) {
                console.error('날짜 파싱 오류:', err)
                userInfo.createAt = new Date().toISOString()
            }
        }

        // 키워드 정보가 없는 경우 빈 배열로 초기화
        if (!userInfo.keywords) {
            userInfo.keywords = []
        }

        // 뱃지 정보 로드
        await loadUserBadges()
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
            keywords: [
                { keywordId: 1, name: '운동' },
                { keywordId: 2, name: '봉사' },
                { keywordId: 3, name: '마음 건강' },
            ],
            badges: [],
        })

        // 뱃지 정보도 로드
        await loadUserBadges()
    } finally {
        loading.value = false
    }
}

// 좋아요한 프로젝트 로드
const loadLikedProjects = async () => {
    try {
        console.log('좋아요한 프로젝트 로드 시작 - token:', token)
        const votes = await getMyVotes(token)
        console.log('API 응답 - votes:', votes)

        // 프로젝트 ID 목록 추출
        const projectIds = votes
        console.log('프로젝트 ID 목록:', projectIds)

        // 각 프로젝트의 상세 정보를 가져오기
        const projectDetails = await Promise.all(
            projectIds.map(async (projectId) => {
                try {
                    const detail = await getProjectDetail(projectId, token)
                    console.log(`프로젝트 ${projectId} 상세 정보:`, detail)
                    return detail
                } catch (error) {
                    console.error(`프로젝트 ${projectId} 상세 정보 로드 실패:`, error)
                    return null
                }
            }),
        )

        likedProjects.value = projectDetails
            .filter((project) => project !== null)
            .map((project) => {
                console.log('프로젝트 원본 데이터:', project)

                const transformedProject = {
                    type: project.basicInfo.projectType,
                    likes: project.voteCount,
                    title: project.basicInfo.title,
                    description: project.basicInfo.promotion,
                    createdAt: formatDate(project.basicInfo.createAt),
                    status:
                        project.basicInfo.progress === 'Active'
                            ? '진행중'
                            : project.basicInfo.progress === 'Close'
                              ? '마감'
                              : '준비중',
                    id: project.basicInfo.projectId,
                    image: project.imageList?.[0]?.imageUrl,
                    isLiked: true,
                }

                console.log('변환된 프로젝트 데이터:', transformedProject)
                return transformedProject
            })

        console.log('변환된 likedProjects:', likedProjects.value)
    } catch (err) {
        console.error('좋아요한 프로젝트 로드 실패:', err)
        console.error('에러 상세:', err.response?.data)
        // API 실패 시 빈 배열로 설정
        likedProjects.value = []
        console.log('API 실패로 빈 배열 설정')
    }
}

// 참여 중인 펀딩 로드
const loadParticipatingFundings = async () => {
    try {
        // 타입별로 API 호출
        const [savings, loans, donations, challenges] = await Promise.all([
            getMyAllSavings(token),
            getMyAllLoans(token),
            getMyAllDonations(token),
            getMyAllChallenges(token),
        ])

        // 각 타입별 데이터를 통합
        const allFundings = []

        // 저축 데이터 추가
        console.log('저축 데이터 원본:', savings)
        savings.forEach((saving) => {
            console.log('저축 데이터 처리 중:', saving)
            const savingImage =
                saving.images && saving.images.length > 0
                    ? saving.images[0].imageUrl
                    : `https://readdy.ai/api/search-image?query=savings%20product&width=150&height=150&seq=saving${saving.userSavingId}`

            allFundings.push({
                id: saving.userSavingId,
                title: saving.savingName || '저축 상품',
                joinDate: `참여일: ${new Date().toLocaleDateString('ko-KR')}`,
                amount: saving.savingAmount || 0,
                type: 'saving',
                fundId: saving.productId,
                status: '진행중',
                thumbnail: savingImage,
            })
        })

        // 대출 데이터 추가
        console.log('대출 데이터 원본:', loans)
        loans.forEach((loan) => {
            console.log('대출 데이터 처리 중:', loan)
            const loanImage =
                loan.images && loan.images.length > 0
                    ? loan.images[0].imageUrl
                    : `https://readdy.ai/api/search-image?query=loan%20product&width=150&height=150&seq=loan${loan.userLoanId}`

            allFundings.push({
                id: loan.userLoanId,
                title: loan.loanName || '대출 상품',
                joinDate: `참여일: ${new Date().toLocaleDateString('ko-KR')}`,
                amount: loan.loanAmount || 0,
                type: 'loan',
                fundId: loan.productId,
                status: '진행중',
                thumbnail: loanImage,
            })
        })

        // 기부 데이터 추가
        console.log('기부 데이터 원본:', donations)
        donations.forEach((donation) => {
            console.log('기부 데이터 처리 중:', donation)
            const donationImage =
                donation.images && donation.images.length > 0
                    ? donation.images[0].imageUrl
                    : `https://readdy.ai/api/search-image?query=donation%20product&width=150&height=150&seq=donation${donation.userDonationId}`

            allFundings.push({
                id: donation.userDonationId,
                title: donation.donationName || '기부 상품',
                joinDate: `참여일: ${new Date().toLocaleDateString('ko-KR')}`,
                amount: donation.donationAmount || 0,
                type: 'donation',
                fundId: donation.productId,
                status: '진행중',
                thumbnail: donationImage,
            })
        })

        // 챌린지 데이터 추가
        console.log('챌린지 데이터 원본:', challenges)
        challenges.forEach((challenge) => {
            console.log('챌린지 데이터 처리 중:', challenge)
            console.log('챌린지 productId:', challenge.productId)
            console.log('챌린지 userChallengeId:', challenge.userChallengeId)

            const challengeImage =
                challenge.challengeImageUrl ||
                `https://readdy.ai/api/search-image?query=challenge%20product&width=150&height=150&seq=challenge${challenge.userChallengeId}`

            const challengeData = {
                id: challenge.userChallengeId,
                title: challenge.challengeName || '챌린지',
                joinDate: `참여일: ${new Date().toLocaleDateString('ko-KR')}`,
                amount: 0,
                type: 'challenge',
                fundId: challenge.fundId, // userChallengeId를 사용해보기
                status: challenge.challengeStatus || '진행중',
                thumbnail: challengeImage,
            }

            console.log('생성된 챌린지 데이터:', challengeData)
            allFundings.push(challengeData)
        })

        participatingFundings.value = allFundings
        console.log('참여중인 펀딩 데이터:', participatingFundings.value)
        console.log('총 참여 펀딩 수:', allFundings.length)

        // 각 타입별 개수 로깅
        const typeCounts = allFundings.reduce((acc, funding) => {
            acc[funding.type] = (acc[funding.type] || 0) + 1
            return acc
        }, {})
        console.log('타입별 참여 펀딩 개수:', typeCounts)
    } catch (err) {
        console.error('참여 중인 펀딩 로드 실패:', err)
        console.error('에러 상세:', err.response?.data)
        // API 실패 시 빈 배열로 설정
        participatingFundings.value = []
        console.log('API 실패로 빈 배열 설정')
    }
}

const likedProjects = ref([])
const likedFundings = ref([])
const participatingFundings = ref([])

// 좋아요한 펀딩 로드
const loadLikedFundings = async () => {
    try {
        console.log('🔥 좋아요한 펀딩 로드 시작 - token:', token)
        const votedFundsData = await getMyAllVotedFunds(token)
        console.log('🔥 API 응답 - votedFundsData:', votedFundsData)

        // 응답값 형태 확인을 위한 상세 로그
        if (votedFundsData && votedFundsData.length > 0) {
            console.log('🔥 첫 번째 펀딩 데이터 구조:', votedFundsData[0])
            console.log('🔥 모든 펀딩 데이터:', votedFundsData)
        }

        // FundingCard 컴포넌트에 맞게 데이터 변환
        likedFundings.value = votedFundsData.map((funding) => {
            console.log('🔥 변환 중인 펀딩:', funding)

            const transformedFunding = {
                id: funding.fundId || funding.id,
                fundType: funding.fundType || funding.type || '저축형',
                title: funding.name || funding.title || '펀딩 제목',
                description: funding.description || funding.content || '펀딩 설명',
                daysLeft: funding.daysLeft || funding.remainingDays || 0,
                category: funding.category || funding.fundType || '저축형',
                likes: funding.likes || funding.likeCount || 0,
                progress: funding.progress || funding.progressRate || 0,
                image:
                    funding.imageUrl ||
                    funding.image ||
                    funding.thumbnail ||
                    `https://readdy.ai/api/search-image?query=funding%20thumbnail&width=400&height=300&seq=funding${funding.fundId || funding.id}`,
            }

            console.log('🔥 변환된 펀딩:', transformedFunding)
            return transformedFunding
        })

        console.log('🔥 최종 변환된 likedFundings:', likedFundings.value)
    } catch (err) {
        console.error('🔥 좋아요한 펀딩 로드 실패:', err)
        console.error('🔥 에러 상세:', err.response?.data)
        // API 실패 시 빈 배열로 설정
        likedFundings.value = []
        console.log('🔥 API 실패로 빈 배열 설정')
    }
}

const handleUserInfoUpdate = (updatedUserInfo) => {
    // 로컬 상태 업데이트 (즉시 반영)
    Object.assign(userInfo, updatedUserInfo)
}

const handleUpdateCompleted = () => {
    // 사용자 정보 업데이트가 완료되었을 때 호출되는 함수
    // 여기서는 마이페이지 정보를 다시 로드하여 최신 상태를 반영
    loadMyPageInfo()
}

// 프로젝트 좋아요 토글 처리
const handleProjectToggleLike = async (projectId) => {
    try {
        console.log('프로젝트 좋아요 토글 시작:', projectId)

        // API 호출
        await toggleProjectLike(projectId, token)

        // 좋아요 상태 업데이트
        const projectIndex = likedProjects.value.findIndex((p) => p.id === projectId)
        if (projectIndex !== -1) {
            const project = likedProjects.value[projectIndex]
            project.isLiked = !project.isLiked
            project.likes += project.isLiked ? 1 : -1

            // 좋아요 해제된 경우 목록에서 제거
            if (!project.isLiked) {
                likedProjects.value.splice(projectIndex, 1)
            }
        }

        console.log('프로젝트 좋아요 토글 완료:', projectId)
    } catch (error) {
        console.error('프로젝트 좋아요 토글 실패:', error)
    }
}

onMounted(async () => {
    console.log('MyPage onMounted 시작')
    console.log('현재 token:', token)

    // 마이페이지 정보 로드
    await loadMyPageInfo()

    // 활동 탭 데이터 로드
    console.log('활동 탭 데이터 로드 시작')
    await Promise.all([loadLikedProjects(), loadLikedFundings(), loadParticipatingFundings()])
    console.log('활동 탭 데이터 로드 완료')
    console.log('최종 likedProjects:', likedProjects.value)
    console.log('최종 likedFundings:', likedFundings.value)

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
