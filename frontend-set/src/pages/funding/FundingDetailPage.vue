<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <!-- 메인 콘텐츠 영역 -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-32 py-8">
            <!-- 프로젝트 메인 비주얼 -->
            <FundingHeaderSection
                :project-image="projectData.image"
                :project-title="projectData.title"
                :project-description="projectData.description"
                :status="projectData.status"
                :is-liked="isLiked"
                @toggle-like="toggleLike"
                @share="shareProject"
            />

            <!-- 펀딩 현황 카드 -->
            <FundingProgressCard
                :target-amount="fundingData.targetAmount"
                :current-amount="fundingData.currentAmount"
                :progress-percentage="fundingData.progressPercentage"
                :participant-count="fundingData.participantCount"
                :days-left="fundingData.daysLeft"
                :end-date="fundingData.endDate"
                :user-role="authStore.userRole"
                @participate="handleParticipate"
            />

            <!-- 상세 정보 섹션 -->
            <FundingDetailSection
                :purpose="detailData.purpose"
                :background="detailData.background"
                :source-project="detailData.sourceProject"
                :budget-plan="detailData.budgetPlan"
                :benefits="detailData.benefits"
            />

            <!-- 인증샷 업로드 영역 (챌린지 타입일 때만 표시) -->
            <ChallengeUploadSection
                v-if="fundingType === 'challenge'"
                :funding-id="fundingData.id"
                :certification-data="certificationData"
                :start-date="fundingData.startDate"
                :end-date="fundingData.endDateForCertification"
                @image-uploaded="handleCertificationUploaded"
                @upload-error="handleUploadError"
            />

            <!-- 참여자 피드백 영역 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-900">참여자 피드백</h3>
                        <span class="text-sm text-gray-600">총 24개의 댓글</span>
                    </div>
                    <div class="space-y-4 mb-6">
                        <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                            <div
                                class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                            >
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="font-medium text-gray-900">김지원</span>
                                    <span class="text-xs text-gray-500">2시간 전</span>
                                </div>
                                <p class="text-sm text-gray-700">
                                    정말 의미 있는 프로젝트네요! 환경을 위한 기술 개발에 참여할 수
                                    있어서 기쁩니다.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                            <div
                                class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                            >
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="font-medium text-gray-900">박민수</span>
                                    <span class="text-xs text-gray-500">5시간 전</span>
                                </div>
                                <p class="text-sm text-gray-700">
                                    김환경 박사님의 이전 연구 성과를 보고 신뢰하게 되었습니다.
                                    성공을 기원합니다!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="border-t pt-4">
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                            >
                                <i class="fas fa-user text-gray-600 text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <input
                                    type="text"
                                    placeholder="댓글을 입력하세요..."
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                                />
                            </div>
                            <button
                                class="bg-yellow-400 text-gray-900 px-4 py-2 !rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            </section>

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
        <!-- 푸터 -->
        <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner mt-16">
            <div class="container mx-auto px-4 sm:px-6 lg:px-32">
                <div class="flex justify-center space-x-8">
                    <a
                        href="#"
                        class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
                        >Terms and Conditions</a
                    >
                    <a
                        href="#"
                        class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
                        >Privacy Policy</a
                    >
                    <a
                        href="#"
                        class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
                        >Contact Us</a
                    >
                </div>
            </div>
        </footer>
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
import FundingDetailSection from '@/components/funding/FundingDetailSection.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const fundingId = route.params.id

// 펀딩 정보
const fundingData = ref(null)
const isLiked = ref(false)

// 프로젝트 데이터
const projectData = ref({
    image: 'https://readdy.ai/api/search-image?query=environmental%20sustainability%20project%20hero%20banner%20with%20clean%20white%20background%2C%20green%20technology%20innovation%20concept%2C%20modern%20eco-friendly%20design%20with%20left%20side%20text%20area%2C%20professional%20investment%20presentation%2C%20minimalist%20clean%20aesthetic%2C%20nature%20elements%20integrated%20seamlessly&width=1200&height=400&seq=hero1&orientation=landscape',
    title: 'Project A - Environment Sustainability Initiative',
    description: '지속 가능한 환경을 위한 혁신적인 기술 개발 프로젝트',
    status: '진행중',
})

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
        fundingData.value = response.data

        console.log('펀딩 상세 정보:', response.data)

        // 실제 데이터로 업데이트
        if (response.data) {
            // 기본값 설정
            fundingData.value = {
                id: fundingId,
                targetAmount: response.data.targetAmount || 50000000,
                currentAmount: response.data.currentAmount || 37500000,
                progressPercentage: response.data.progress || 75,
                participantCount: response.data.participantCount || 142,
                daysLeft: response.data.daysLeft || 15,
                endDate: response.data.endDate || '2025년 8월 6일',
                startDate: response.data.startDate || '2025-07-01',
                endDateForCertification: response.data.endDateForCertification || '2025-08-10',
                fundType: response.data.fundType || 'challenge',
            }

            // 펀딩 타입 설정
            fundingType.value = response.data.fundType || 'challenge'
        }
    } catch (error) {
        console.error('펀딩 상세 정보 조회 실패:', error)
        // 에러 시 기본값 설정
        fundingData.value = {
            id: fundingId,
            targetAmount: 50000000,
            currentAmount: 37500000,
            progressPercentage: 75,
            participantCount: 142,
            daysLeft: 15,
            endDate: '2025년 8월 6일',
            startDate: '2025-07-01',
            endDateForCertification: '2025-08-10',
            fundType: 'challenge',
        }
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
        // 대출/적금: 결제 없는 페이지
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

// 프로젝트 공유
const shareProject = () => {
    if (navigator.share) {
        navigator.share({
            title: projectData.value.title,
            text: projectData.value.description,
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
