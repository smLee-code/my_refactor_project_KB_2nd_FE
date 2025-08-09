<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <!-- 메인 콘텐츠 영역 -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-32 py-8">
            <!-- 로딩 상태 -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                <span class="ml-3 text-gray-600">펀딩 정보를 불러오는 중...</span>
            </div>

            <!-- 펀딩 메인 비주얼 -->
            <FundingHeaderSection
                v-if="!isLoading && fundingData"
                :funding-image="
                    fundingData.imageUrls && fundingData.imageUrls.length > 0
                        ? fundingData.imageUrls[0]
                        : '/public/images/logo.png'
                "
                :funding-name="fundingData.name"
                :funding-detail="fundingData.detail"
                :fund-type="fundingData.fundType"
                :financial-institution="fundingData.financialInstitution"
                :interest-rate="fundingData.interestRate"
                :period-days="fundingData.periodDays"
                :progress="fundingData.progress"
                :is-liked="isLiked"
                @toggle-like="toggleLike"
                @share="shareProject"
            />

            <!-- 펀딩 현황 카드 -->
            <FundingProgressCard
                v-if="fundingData"
                :target-amount="fundingData.targetAmount"
                :current-amount="fundingData.currentAmount"
                :progress-percentage="fundingData.progressPercentage"
                :participant-count="fundingData.participantCount"
                :days-left="fundingData.daysLeft"
                :end-date="fundingData.endDate"
                :user-role="authStore.userRole"
                :interest-rate="fundingData.interestRate"
                :fund-type="fundingData.fundType"
                :joined="fundingData.joined"
                @participate="handleParticipate"
            />

            <!-- 출처 프로젝트 섹션 -->
            <SourceProjectSection
                v-if="!isLoading && fundingData && fundingData.projectId"
                :project-id="fundingData.projectId"
            />

            <!-- 상세 정보 섹션 - fundType에 따라 다른 컴포넌트 렌더링 -->

            <!-- Savings 타입 -->
            <SavingsFundingDetailSection
                v-if="!isLoading && fundingData && fundingData.fundType === 'Savings'"
                :product-name="fundingData.name"
                :product-detail="fundingData.detail"
                :financial-institution="fundingData.financialInstitution"
                :product-type="fundingData.fundType"
                :interest-rate="fundingData.interestRate"
                :period-days="fundingData.periodDays"
                :product-condition="fundingData.productCondition"
                :success-condition="fundingData.successCondition"
                :keywords="fundingData.keywords"
            />

            <!-- Challenge 타입 -->
            <ChallengeFundingDetailSection
                v-if="!isLoading && fundingData && fundingData.fundType === 'Challenge'"
                :challenge-name="fundingData.name"
                :challenge-detail="fundingData.detail"
                :product-condition="fundingData.productCondition"
                :challenge-period-days="fundingData.challengePeriodDays"
                :challenge-reward="fundingData.challengeReward"
                :challenge-reward-condition="fundingData.challengeRewardCondition"
                :progress="fundingData.progress"
                :joined="fundingData.joined"
                :keywords="fundingData.keywords"
            />

            <!-- 인증샷 업로드 영역 (챌린지 타입이고 참여 중인 경우에만 표시) -->
            <ChallengeUploadSection
                v-if="fundingData && fundingType === 'Challenge' && fundingData.joined"
                :funding-id="fundingData.id"
                :certification-data="certificationData"
                :start-date="fundingData.startDate"
                :end-date="fundingData.endDateForCertification"
                @image-uploaded="handleCertificationUploaded"
                @upload-error="handleUploadError"
            />

            <!-- 참여자 피드백 영역 -->
            <CommentSection
                v-if="!isLoading && fundingData"
                target-type="Funding"
                :target-id="fundingData.id"
            />

            <!-- 추천 펀딩 섹션 -->
            <section class="mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">다른 펀딩 둘러보기</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                    >
                        <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                            <img
                                src="https://readdy.ai/api/search-image?query=local%20art%20community%20funding%20project%20with%20clean%20white%20background%2C%20creative%20arts%20initiative%2C%20colorful%20artistic%20elements%2C%20modern%20cultural%20design%2C%203D%20depth%20effect&width=300&height=200&seq=rec1&orientation=landscape"
                                alt="추천 펀딩 1"
                                class="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div class="p-4">
                            <h4 class="font-bold text-gray-900 mb-2">Local Art Fund Raising</h4>
                            <p class="text-sm text-gray-600 mb-3">
                                지역 예술가들을 위한 창작 지원 프로젝트
                            </p>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-gray-500">8일 남음</span>
                                <span class="text-blue-600 font-medium">60% 달성</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                    >
                        <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                            <img
                                src="https://readdy.ai/api/search-image?query=technology%20innovation%20for%20everyone%20with%20clean%20white%20background%2C%20inclusive%20tech%20development%2C%20modern%20digital%20elements%2C%20professional%20tech%20design%2C%203D%20depth%20effect&width=300&height=200&seq=rec2&orientation=landscape"
                                alt="추천 펀딩 2"
                                class="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div class="p-4">
                            <h4 class="font-bold text-gray-900 mb-2">Tech Innovations for All</h4>
                            <p class="text-sm text-gray-600 mb-3">
                                모든 사람을 위한 기술 혁신 프로젝트
                            </p>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-gray-500">12일 남음</span>
                                <span class="text-blue-600 font-medium">45% 달성</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                    >
                        <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                            <img
                                src="https://readdy.ai/api/search-image?query=community%20health%20initiative%20project%20with%20clean%20white%20background%2C%20healthcare%20accessibility%20program%2C%20medical%20care%20elements%2C%20professional%20health%20design%2C%203D%20depth%20effect&width=300&height=200&seq=rec3&orientation=landscape"
                                alt="추천 펀딩 3"
                                class="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div class="p-4">
                            <h4 class="font-bold text-gray-900 mb-2">Community Health Drive</h4>
                            <p class="text-sm text-gray-600 mb-3">지역 사회 건강 증진 프로그램</p>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-gray-500">30일 남음</span>
                                <span class="text-blue-600 font-medium">30% 달성</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { useAuthStore } from '@/stores/auth'

import FundingHeaderSection from '@/components/funding/FundingHeaderSection.vue'
import FundingProgressCard from '@/components/funding/FundingProgressCard.vue'
import ChallengeUploadSection from '@/components/funding/ChallengeUploadSection.vue'
import SavingsFundingDetailSection from '@/components/funding/SavingsFundingDetailSection.vue'
import ChallengeFundingDetailSection from '@/components/funding/ChallengeFundingDetailSection.vue'
import SourceProjectSection from '@/components/funding/SourceProjectSection.vue'
import CommentSection from '@/components/funding/CommentSection.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const fundingId = route.params.id

// 펀딩 정보
const fundingData = ref({
    id: null,
    projectId: null,
    targetAmount: 0,
    currentAmount: 0,
    progressPercentage: 0,
    participantCount: 0,
    daysLeft: 0,
    endDate: '',
    startDate: '',
    endDateForCertification: '',
    fundType: 'Savings',
    name: '',
    detail: '',
    financialInstitution: '',
    interestRate: 0,
    periodDays: 0,
    productCondition: '',
    successCondition: '',
    joined: false,
    keywords: [],
    // 챌린지 전용 필드들
    challengePeriodDays: 0,
    challengeReward: '',
    challengeRewardCondition: '',
})
const isLiked = ref(false)
const isLoading = ref(true)

// 상세 정보 데이터
const detailData = ref({
    purpose:
        '기후 변화와 환경 오염이 심각한 문제로 대두되고 있는 현재, 우리는 지속 가능한 미래를 위한 혁신적인 환경 기술 개발이 시급하다고 판단했습니다. 이 프로젝트는 재생 에너지 효율성을 높이고, 탄소 배출량을 획기적으로 줄일 수 있는 친환경 기술 솔루션을 개발하는 것을 목표로 합니다.',
    background:
        '특히 도시 환경에서 적용 가능한 스마트 에너지 관리 시스템과 폐기물 재활용 기술을 통해 지역 사회의 환경 개선과 경제적 효과를 동시에 달성하고자 합니다.',
    sourceProject: {
        thumbnail:
            'https://readdy.ai/api/search-image?query=modern%20eco%20technology%20project%20thumbnail%20with%20clean%20white%20background%2C%20environmental%20innovation%20concept%2C%20professional%20project%20presentation%20visual%2C%20minimalist%20tech%20design%20elements&width=80&height=80&seq=project1&orientation=squarish',
        title: '친환경 도시 개발 프로젝트',
        organization: 'KB 환경 연구소',
        tags: ['진행중', '연구개발', '환경/에너지'],
        period: '2025.01 - 2025.12',
        stage: '연구개발 2단계',
        description:
            "본 펀딩은 KB 환경 연구소의 '친환경 도시 개발 프로젝트'의 2단계 연구개발을 위해 개설되었습니다. 1단계에서 개발된 기술을 실제 도시 환경에 적용하기 위한 실증 연구를 진행할 예정입니다.",
    },
    budgetPlan: [
        { category: '연구개발비', amount: 25000000, percentage: 50 },
        { category: '장비 구입비', amount: 15000000, percentage: 30 },
        { category: '인건비', amount: 7500000, percentage: 15 },
        { category: '기타 운영비', amount: 2500000, percentage: 5 },
    ],
    benefits: [
        { amount: 10000, description: '프로젝트 진행 보고서 및 감사 인증서', icon: 'fas fa-medal' },
        {
            amount: 50000,
            description: '친환경 제품 샘플 + 프로젝트 참여 기념품',
            icon: 'fas fa-trophy',
        },
        { amount: 100000, description: '프로젝트 완료 후 기술 설명회 초대', icon: 'fas fa-crown' },
    ],
})

// 펀딩 타입 (챌린지로 설정하여 인증샷 업로드 영역이 보이도록 함)
const fundingType = ref('challenge')

// 인증샷 데이터 (날짜별) - 실제 펀딩 기간에 맞춤
const certificationData = ref([
    {
        date: '2025-07-15',
        image: '/images/logo.png',
        isApproved: true,
        uploadedAt: '2024-07-15',
    },
    {
        date: '2025-07-20',
        image: '/images/logo.png',
        isApproved: false,
        uploadedAt: '2024-07-20',
    },
    {
        date: '2025-07-25',
        image: '/images/logo.png',
        isApproved: true,
        uploadedAt: '2024-07-25',
    },
    // 오늘 날짜는 업로드하지 않은 상태로 설정 (테스트용)
    // 실제로는 이 부분이 없어야 하며, 오늘 날짜에 업로드하면 자동으로 추가됨
])

// 펀딩 정보 조회
const fetchFundingDetail = async () => {
    try {
        const response = await api.get(`/fund/${fundingId}`)
        const data = response.data

        console.log('펀딩 상세 정보:', data)

        // 실제 API 응답 데이터로 업데이트
        if (data) {
            // 날짜 배열을 문자열로 변환하는 함수
            const formatDateArray = (dateArray) => {
                if (!dateArray || dateArray.length < 3) return ''
                const [year, month, day] = dateArray
                return `${year}년 ${month}월 ${day}일`
            }

            // 남은 일수 계산 (마감일 - 오늘 날짜)
            const calculateDaysLeft = (endAt) => {
                if (!endAt || endAt.length < 3) return 0
                const [year, month, day] = endAt
                const endDate = new Date(year, month - 1, day)
                const today = new Date()

                // 오늘 날짜를 자정으로 설정하여 정확한 일수 계산
                today.setHours(0, 0, 0, 0)
                endDate.setHours(0, 0, 0, 0)

                const diffTime = endDate - today
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                console.log('daysLeft 계산:', {
                    endDate: endDate.toISOString(),
                    today: today.toISOString(),
                    diffDays: diffDays,
                    isExpired: diffDays <= 0,
                })

                return diffDays // 음수도 허용 (마감된 펀딩 표시용)
            }

            // 기간 일수 계산 (periodDays가 0이거나 null일 때 endDate - launchDate로 계산)
            const calculatePeriodDays = (periodDays, launchAt, endAt) => {
                // periodDays가 유효한 값이면 그대로 사용
                if (periodDays && periodDays > 0) {
                    return periodDays
                }

                // periodDays가 0이거나 null이면 날짜 차이로 계산
                if (launchAt && endAt && launchAt.length >= 3 && endAt.length >= 3) {
                    const [launchYear, launchMonth, launchDay] = launchAt
                    const [endYear, endMonth, endDay] = endAt

                    const launchDate = new Date(launchYear, launchMonth - 1, launchDay)
                    const endDate = new Date(endYear, endMonth - 1, endDay)

                    const diffTime = endDate - launchDate
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                    console.log('periodDays 계산:', {
                        original: periodDays,
                        calculated: diffDays,
                        launchDate: launchDate.toISOString(),
                        endDate: endDate.toISOString(),
                    })

                    return Math.max(1, diffDays) // 최소 1일
                }

                // 날짜 정보도 없으면 기본값 365일
                return 365
            }

            // 진행률 계산 (progressPercentage가 없으면 날짜 기반으로 계산)
            const calculateProgressPercentage = (progressPercentage, launchAt, endAt) => {
                // progressPercentage가 유효한 값이면 그대로 사용
                if (
                    progressPercentage !== null &&
                    progressPercentage !== undefined &&
                    progressPercentage >= 0
                ) {
                    return progressPercentage
                }

                // progressPercentage가 없으면 날짜 기반으로 계산
                if (launchAt && endAt && launchAt.length >= 3 && endAt.length >= 3) {
                    const [launchYear, launchMonth, launchDay] = launchAt
                    const [endYear, endMonth, endDay] = endAt

                    const launchDate = new Date(launchYear, launchMonth - 1, launchDay)
                    const endDate = new Date(endYear, endMonth - 1, endDay)
                    const today = new Date()

                    // 전체 기간
                    const totalDuration = endDate - launchDate
                    // 경과 기간
                    const elapsedDuration = today - launchDate

                    // 진행률 계산 (0-100 범위로 제한)
                    let percentage = (elapsedDuration / totalDuration) * 100
                    percentage = Math.max(0, Math.min(100, percentage)) // 0-100 범위로 제한

                    console.log('progressPercentage 계산:', {
                        original: progressPercentage,
                        calculated: percentage.toFixed(1),
                        launchDate: launchDate.toISOString(),
                        endDate: endDate.toISOString(),
                        today: today.toISOString(),
                        totalDuration: totalDuration / (1000 * 60 * 60 * 24) + '일',
                        elapsedDuration: elapsedDuration / (1000 * 60 * 60 * 24) + '일',
                    })

                    return parseFloat(percentage.toFixed(1)) // 소수점 한 자리까지
                }

                // 날짜 정보도 없으면 기본값 0
                return 0
            }

            // 펀딩 데이터 설정
            fundingData.value = {
                id: data.fundId,
                projectId: 117, // 임시로 프로젝트 ID 117로 설정
                targetAmount: data.targetAmount || 50000000,
                currentAmount: data.currentAmount || 0,
                progress: data.progress || '진행중', // progress 필드 추가
                progressPercentage: calculateProgressPercentage(
                    data.progressPercentage,
                    data.launchAt,
                    data.endAt,
                ),
                participantCount: data.participantCount || 0,
                daysLeft: calculateDaysLeft(data.endAt),
                endDate: formatDateArray(data.endAt),
                startDate: formatDateArray(data.launchAt),
                endDateForCertification: formatDateArray(data.endAt),
                fundType: data.fundType || 'Challenge', // 테스트용으로 Challenge로 변경
                name: data.name,
                detail: data.detail,
                financialInstitution: data.financialInstitution,
                interestRate: data.interestRate,
                periodDays: calculatePeriodDays(data.periodDays, data.launchAt, data.endAt),
                productCondition: data.productCondition,
                successCondition: data.successCondition,
                joined: data.joined || true, // 테스트용으로 참여 중으로 설정
                keywords: data.keywords || [],
                // 챌린지 전용 필드들
                challengePeriodDays: data.challengePeriodDays,
                challengeReward: data.challengeReward,
                challengeRewardCondition: data.challengeRewardCondition,
            }

            // 펀딩 타입 설정
            fundingType.value = data.fundType || 'Challenge' // 테스트용으로 Challenge로 설정
        }
    } catch (error) {
        console.error('펀딩 상세 정보 조회 실패:', error)
        // 에러 시 기본값 설정
        fundingData.value = {
            id: fundingId,
            projectId: null, // 프로젝트 ID 추가
            targetAmount: 50000000,
            currentAmount: 0,
            progress: '진행중', // progress 필드 추가
            progressPercentage: 0,
            participantCount: 0,
            daysLeft: 23, // 테스트용으로 23일 남음으로 설정
            endDate: '2025년 8월 31일', // 테스트용으로 현재 날짜 기준으로 설정
            startDate: '2025년 8월 1일', // 테스트용으로 현재 날짜 기준으로 설정
            endDateForCertification: '2025년 8월 31일', // 테스트용으로 현재 날짜 기준으로 설정
            fundType: 'Challenge', // 테스트용으로 Challenge로 설정
            name: '하루 1시간 걷기 챌린지',
            detail: '매일 1시간씩 걷기로 건강한 습관 만들기',
            financialInstitution: '국민은행',
            interestRate: 3.5,
            periodDays: 30,
            productCondition: '매일 1시간 이상 걷기',
            successCondition: '30일 중 25일 이상 인증',
            joined: true, // 테스트용으로 참여 중으로 설정
            keywords: [],
            // 챌린지 전용 필드들
            challengePeriodDays: 30,
            challengeReward: '건강한 습관 형성',
            challengeRewardCondition: '30일 중 25일 이상 인증',
        }
    } finally {
        isLoading.value = false
    }
}

// 펀딩 참여하기 버튼 클릭 (incoming 브랜치의 분기 처리 로직 적용)
const goToFundingJoin = () => {
    if (!fundingData.value) {
        // 펀딩 데이터가 없으면 기본 페이지로
        router.push(`/funding/join-payment/${fundingId}`)
        return
    }

    const fundType = fundingData.value.fundType

    // 타입별 페이지 분기
    if (fundType === 'Loan' || fundType === 'Savings') {
        // 대출/저축: 결제 없는 페이지
        router.push(`/funding/join-apply/${fundingId}`)
    } else {
        // 기부/챌린지: 결제 있는 페이지
        router.push(`/funding/join-payment/${fundingId}`)
    }
}

// 펀딩 참여 처리 (FundingProgressCard에서 호출)
const handleParticipate = () => {
    goToFundingJoin()
}

// 좋아요 토글
const toggleLike = () => {
    isLiked.value = !isLiked.value
}

// 펀딩 공유
const shareProject = () => {
    if (navigator.share) {
        navigator.share({
            title: fundingData.value?.name || '펀딩 상품',
            text: fundingData.value?.detail || '펀딩 상품을 확인해보세요!',
            url: window.location.href,
        })
    } else {
        navigator.clipboard.writeText(window.location.href)
        alert('링크가 클립보드에 복사되었습니다!')
    }
}

// 인증샷 업로드 완료 처리
const handleCertificationUploaded = (data) => {
    // 새로운 인증샷 데이터 추가
    certificationData.value.push({
        date: data.uploadedAt,
        image: data.image,
        isApproved: data.isApproved,
        uploadedAt: data.uploadedAt,
    })

    console.log('인증샷 업로드 완료:', data)
}

// 업로드 에러 처리
const handleUploadError = (errorMessage) => {
    alert(errorMessage)
    console.error('업로드 에러:', errorMessage)
}

onMounted(() => {
    // role 정보 로드
    authStore.loadRole()
    console.log('현재 유저 role:', authStore.userRole)

    fetchFundingDetail()
})
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

@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

/* 모바일 최적화 스타일 */
@media (max-width: 768px) {
    .h-96 {
        height: 16rem;
    }

    .text-3xl {
        font-size: 1.5rem;
        line-height: 2rem;
    }

    .text-2xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    .space-x-4 > * + * {
        margin-left: 0.5rem;
    }

    .p-6 {
        padding: 1rem;
    }
}
</style>
