<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                <span class="ml-3 text-gray-600">펀딩 정보를 불러오는 중...</span>
            </div>

            <FundingHeaderSection
                v-if="!isLoading && fundingData"
                :funding-image="
                    fundingData.imageUrls && fundingData.imageUrls.length > 0
                        ? fundingData.imageUrls[0].imageUrl
                        : '/public/images/logo.png'
                "
                :image-urls="fundingData.imageUrls"
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
                :min-interest-rate="fundingData.minInterestRate"
                :max-interest-rate="fundingData.maxInterestRate"
                :fund-type="fundingData.fundType"
                :joined="fundingData.joined"
                :launch-at="fundingData.launchAt"
                :end-at="fundingData.endAt"
                @participate="handleParticipate"
            />

            <section v-if="fundingData && fundingData.financialInstitution" class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <div
                                class="w-16 h-16 rounded-full flex items-center justify-center"
                                :class="getCompanyStyle(fundingData.financialInstitution).bg"
                            >
                                <i
                                    class="fas fa-building text-xl"
                                    :class="getCompanyStyle(fundingData.financialInstitution).text"
                                ></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-1">
                                <h3 class="text-lg font-bold text-gray-900">
                                    {{ fundingData.financialInstitution }}
                                </h3>
                                <span
                                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    <i class="fas fa-check-circle mr-1"></i>
                                    공식 금융기관
                                </span>
                            </div>
                            <p class="text-sm text-gray-600">
                                {{ getFundTypeKorean(fundingData.fundType) }} 상품 제공
                                <span v-if="fundingData.createdAt">
                                    {{
                                        new Date(fundingData.createdAt).toLocaleDateString('ko-KR')
                                    }}
                                    등록
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <SourceProjectSection
                v-if="!isLoading && fundingData && fundingData.projectId"
                :project-id="fundingData.projectId"
                @view-project-detail="goToProjectDetail"
            />

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
                :verify-standard="fundingData.verifyStandard"
            />

            <ChallengeUploadSection
                v-if="fundingData && fundingType === 'Challenge' && fundingData.joined"
                :funding-id="fundingData.id"
                :user-challenge-id="fundingData.userChallengeId"
                :verify-standard="fundingData.verifyStandard"
                :certification-data="certificationData"
                :start-date="fundingData.startDate"
                :end-date="fundingData.endDateForCertification"
                @image-uploaded="handleCertificationUploaded"
                @upload-error="handleUploadError"
            />

            <CommentSection
                v-if="!isLoading && fundingData"
                target-type="Funding"
                :target-id="fundingData.id"
            />

            <section class="mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">다른 펀딩 둘러보기</h3>

                <!-- 로딩 상태 -->
                <div v-if="isRecommendLoading" class="flex justify-center items-center py-12">
                    <div
                        class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"
                    ></div>
                    <span class="ml-3 text-gray-600">추천 펀딩을 찾는 중...</span>
                </div>

                <!-- 추천 펀딩 목록 -->
                <div
                    v-else-if="recommendedFunds.length > 0"
                    class="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div
                        v-for="fund in recommendedFunds"
                        :key="fund.fundId"
                        @click="goToFundingDetail(fund.fundId)"
                        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                    >
                        <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                            <img
                                :src="getFundImageUrl(fund)"
                                :alt="fund.name || '추천 펀딩'"
                                class="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div class="p-4">
                            <h4 class="font-bold text-gray-900 mb-2">{{ fund.name }}</h4>
                            <p class="text-sm text-gray-600 mb-3">{{ fund.detail }}</p>
                            <div class="flex items-center justify-end text-sm">
                                <span class="text-blue-600 font-medium">{{
                                    getFundTypeKorean(fund.projectType)
                                }}</span>
                            </div>
                            <div class="mt-2 text-xs text-gray-500">
                                <div class="flex items-center justify-between">
                                    <span v-if="fund.financialInstitution">{{
                                        fund.financialInstitution
                                    }}</span>
                                    <span v-if="fund.retryVotesCount"
                                        >투표 {{ fund.retryVotesCount }}회</span
                                    >
                                </div>
                                <div v-if="fund.interestRate" class="mt-1">
                                    <span class="text-green-600 font-medium"
                                        >연 {{ fund.interestRate }}%</span
                                    >
                                    <span v-if="fund.periodDays" class="ml-2"
                                        >{{ fund.periodDays }}일</span
                                    >
                                </div>
                                <div v-if="fund.nickname" class="mt-1 text-gray-400">
                                    {{ fund.nickname }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 추천 펀딩이 없는 경우 -->
                <div v-else class="text-center py-12">
                    <div class="text-gray-500">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p class="text-lg">현재 추천할 펀딩이 없습니다.</p>
                        <p class="text-sm mt-2">다른 펀딩을 둘러보세요!</p>
                    </div>
                </div>
            </section>
        </div>

        <button
            @click="openSummaryModal"
            class="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-5 rounded-full shadow-lg flex items-center transition-transform transform hover:scale-105"
        >
            <i class="fas fa-robot mr-2"></i>
            <span>AI 요약</span>
        </button>

        <div
            v-if="isModalOpen"
            class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            @click.self="closeModal"
        >
            <div
                class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in-up"
            >
                <button
                    @click="closeModal"
                    class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <i class="fas fa-times text-2xl"></i>
                </button>

                <div v-if="isSummarizing" class="text-center py-12">
                    <div class="flex justify-center items-center mb-4">
                        <div
                            class="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"
                        ></div>
                    </div>
                    <p class="text-lg font-semibold text-gray-700 animate-pulse">
                        AI가 펀딩 정보를 요약중이에요...
                    </p>
                </div>

                <div v-if="!isSummarizing && summaryText">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <i class="fas fa-robot text-yellow-400 mr-3"></i>
                        AI 펀딩 요약
                    </h3>
                    <div
                        class="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg"
                    >
                        {{ summaryText }}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

import FundingHeaderSection from '@/components/funding/FundingHeaderSection.vue'
import FundingProgressCard from '@/components/funding/FundingProgressCard.vue'
import ChallengeUploadSection from '@/components/funding/ChallengeUploadSection.vue'
import SavingsFundingDetailSection from '@/components/funding/SavingsFundingDetailSection.vue'
import ChallengeFundingDetailSection from '@/components/funding/ChallengeFundingDetailSection.vue'
import SourceProjectSection from '@/components/funding/SourceProjectSection.vue'
import CommentSection from '@/components/funding/CommentSection.vue'
import { calculateFundingProgress, getFundTypeKorean } from '@/utils/fundingUtils'
import Footer from '@/components/layout/MainFooter.vue'

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
    userChallengeId: null, // 사용자 챌린지 ID 추가
    imageUrls: [], // imageUrls 추가
    keywords: [],
    // 챌린지 전용 필드들
    challengePeriodDays: 0,
    challengeReward: '',
    challengeRewardCondition: '',
    verifyStandard: '',
})
const isLiked = ref(false)
const isLoading = ref(true)

// AI 추천 펀딩 데이터
const recommendedFunds = ref([])
const isRecommendLoading = ref(false)

// 펀딩 타입
const fundingType = ref('')

// 인증샷 데이터 (날짜별)
const certificationData = ref([])

// ============== AI 요약 관련 상태 추가 ==============
const isModalOpen = ref(false)
const isSummarizing = ref(false)
const summaryText = ref('')

// AI 요약 모달 열기
const openSummaryModal = () => {
    isModalOpen.value = true
    isSummarizing.value = true
    summaryText.value = '' // 이전 요약 내용 초기화

    // 5초 후 요약 내용 생성 (실제로는 API 호출)
    setTimeout(() => {
        if (fundingData.value) {
            const fd = fundingData.value
            summaryText.value = `이 펀딩은 '${fd.name}' 프로젝트로, ${
                fd.financialInstitution ? `${fd.financialInstitution}에서 제공하는 ` : ''
            }${getFundTypeKorean(
                fd.fundType,
            )} 상품입니다.\n\n주요 내용은 '${fd.detail}'이며, 목표 금액은 ${fd.targetAmount.toLocaleString()}원입니다.\n현재까지 ${fd.participantCount}명이 참여하여 ${fd.currentAmount.toLocaleString()}원이 모였습니다. (달성률 ${fd.progressPercentage.toFixed(1)}%)\n\n${
                fd.fundType === 'Savings'
                    ? `만기는 ${fd.periodDays}일이며, 금리는 연 ${fd.interestRate}%입니다.`
                    : ''
            }${
                fd.fundType === 'Challenge'
                    ? `챌린지 기간은 ${fd.challengePeriodDays}일이며, 성공 시 '${fd.challengeReward}' 보상이 제공됩니다.`
                    : ''
            }\n\n펀딩 마감까지 ${fd.daysLeft}일 남았습니다.`
        } else {
            summaryText.value = '펀딩 정보를 요약할 수 없습니다.'
        }
        isSummarizing.value = false
    }, 5000)
}

// AI 요약 모달 닫기
const closeModal = () => {
    isModalOpen.value = false
}
// ===============================================
// ===============================================

// 펀딩 정보 조회
const fetchFundingDetail = async () => {
    try {
        const response = await api.get(`/fund/${fundingId}`)
        const data = response.data

        console.log('전체 API 응답:', response)
        console.log('펀딩 상세 정보:', data)
        console.log('data 타입:', typeof data)
        console.log('data의 키들:', data ? Object.keys(data) : 'data is null/undefined')
        console.log('joined 값:', data.joined)
        console.log('펀딩 타입:', data.fundType)

        // 사용자의 챌린지 참여 정보 조회 (챌린지 타입인 경우)
        let userChallengeId = null
        if (data.fundType === 'Challenge') {
            try {
                console.log('=== 챌린지 참여 정보 조회 시작 ===')
                console.log('현재 펀딩 정보:', {
                    fundId: data.fundId,
                    id: data.id,
                    fundType: data.fundType,
                    name: data.name,
                })

                const userChallengesResponse = await api.get(`/user-challenge/user/all/v2`, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                })
                const userChallenges = userChallengesResponse.data
                console.log('사용자 챌린지 목록:', userChallenges)

                // name과 challengeName으로 매칭 시도
                let userChallenge = userChallenges.find(
                    (challenge) => challenge.challengeName === data.name,
                )

                if (userChallenge) {
                    userChallengeId = userChallenge.userChallengeId
                    console.log('=== 챌린지 매칭 성공 ===')
                    console.log('매칭된 챌린지 정보:', userChallenge)
                    console.log('설정된 userChallengeId:', userChallengeId)
                } else {
                    console.log('=== 챌린지 매칭 실패 ===')
                    console.log('해당 펀딩의 챌린지 참여 정보를 찾을 수 없음')
                    console.log('찾으려는 펀딩 이름:', data.name)
                    console.log(
                        '사용자 챌린지 목록의 challengeName들:',
                        userChallenges.map((c) => c.challengeName),
                    )
                }
            } catch (error) {
                console.warn('사용자 챌린지 정보 조회 실패:', error)
                // 에러가 발생해도 계속 진행
            }
        }
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

            // 유틸리티 함수를 사용한 진행률 계산
            const getProgressPercentage = (data) => {
                // API에서 progressPercentage가 있으면 우선 사용
                if (
                    data.progressPercentage !== null &&
                    data.progressPercentage !== undefined &&
                    data.progressPercentage >= 0
                ) {
                    return data.progressPercentage
                }

                // 없으면 유틸리티 함수로 계산
                return calculateFundingProgress(data)
            }

            // 펀딩 데이터 디버깅
            console.log('=== 펀딩 ID', data.fundId, '데이터 ===')
            console.log('fundType:', data.fundType)
            console.log('launchAt:', data.launchAt)
            console.log('endAt:', data.endAt)
            console.log('loanLimit:', data.loanLimit)
            console.log('minInterestRate:', data.minInterestRate)
            console.log('maxInterestRate:', data.maxInterestRate)
            console.log('===========================')
            
            // 펀딩 데이터 설정
            fundingData.value = {
                id: data.fundId,
                projectId: data.projectId,
                targetAmount: data.fundType === 'Loan' ? (data.loanLimit || 50000000) : (data.targetAmount || 50000000),
                currentAmount: data.currentAmount || 0,
                progress: data.progress || '진행중', // progress 필드 추가
                progressPercentage: getProgressPercentage(data),
                participantCount: data.participantCount || 0,
                daysLeft: calculateDaysLeft(data.endAt),
                endDate: formatDateArray(data.endAt),
                startDate: formatDateArray(data.launchAt),
                endDateForCertification: formatDateArray(data.endAt),
                launchAt: data.launchAt,
                endAt: data.endAt,
                fundType: data.fundType || '',
                name: data.name,
                detail: data.detail,
                financialInstitution: data.financialInstitution,
                interestRate: data.interestRate || 0,
                minInterestRate: data.minInterestRate || 0,
                maxInterestRate: data.maxInterestRate || 0,
                loanLimit: data.loanLimit || 0,
                periodDays: calculatePeriodDays(data.periodDays, data.launchAt, data.endAt),
                productCondition: data.productCondition,
                successCondition: data.successCondition,
                joined: data.joined || false,
                userChallengeId: userChallengeId,
                imageUrls: data.imageUrls || [], // imageUrls 추가
                keywords: data.keywords || [],
                // 챌린지 전용 필드들
                challengePeriodDays: data.challengePeriodDays,
                challengeReward: data.challengeReward,
                challengeRewardCondition: data.challengeRewardCondition,
                verifyStandard: data.verifyStandard,
            }

            // 펀딩 타입 설정
            fundingType.value = data.fundType || ''
        }
    } catch (error) {
        console.error('펀딩 상세 정보 조회 실패:', error)
        // 에러 시 기본값 설정
        fundingData.value = {
            id: fundingId,
            projectId: null,
            targetAmount: 0,
            currentAmount: 0,
            progress: '',
            progressPercentage: 0,
            participantCount: 0,
            daysLeft: 0,
            endDate: '',
            startDate: '',
            endDateForCertification: '',
            fundType: '',
            name: '',
            detail: '',
            financialInstitution: '',
            interestRate: 0,
            periodDays: 0,
            productCondition: '',
            successCondition: '',
            joined: false,
            userChallengeId: null,
            imageUrls: [], // imageUrls 추가
            keywords: [],
            challengePeriodDays: 0,
            challengeReward: '',
            challengeRewardCondition: '',
            verifyStandard: '',
        }
    } finally {
        isLoading.value = false
    }

    return Promise.resolve() // Promise 반환
}

// AI 추천 펀딩 데이터 조회
const fetchRecommendedFunds = async () => {
    isRecommendLoading.value = true
    try {
        const response = await api.get(`/ai/${fundingId}/ai-recommend`)

        // 각 추천 펀딩의 상세 정보를 조회
        const detailedFunds = await Promise.all(
            response.data.map(async (fund) => {
                try {
                    // fundId를 projectId로 사용하여 상세 정보 조회
                    const projectDetailResponse = await api.get(
                        `/project/list/detail/${fund.fundId}/full`,
                        {
                            headers: {
                                Authorization: `Bearer ${authStore.token}`,
                            },
                        },
                    )

                    const projectDetail = projectDetailResponse.data

                    return {
                        ...fund,
                        // 프로젝트 상세 정보에서 가져온 데이터
                        name: projectDetail.basicInfo?.title || `펀딩 상품 ${fund.fundId}`,
                        detail: projectDetail.basicInfo?.promotion || '펀딩 상품에 대한 상세 정보',
                        imageUrls: projectDetail.imageList || [],
                        // 기존 AI 추천 데이터
                        endAt: fund.endAt,
                        launchAt: fund.launchAt,
                        progress: fund.progress || 'Launch',
                        financialInstitution: fund.financialInstitution,
                        retryVotesCount: fund.retryVotesCount,
                        // 추가 정보
                        projectType: projectDetail.basicInfo?.projectType,
                        periodDays: projectDetail.detailInfo?.periodDays,
                        interestRate: projectDetail.detailInfo?.interestRate,
                        successCondition: projectDetail.detailInfo?.successCondition,
                        voteCount: projectDetail.voteCount,
                        nickname: projectDetail.basicInfo?.nickname,
                    }
                } catch (error) {
                    console.error(`펀딩 ${fund.fundId} 상세 정보 조회 실패:`, error)
                    // 에러가 발생해도 기본 정보로 반환
                    return {
                        ...fund,
                        name: `펀딩 상품 ${fund.fundId}`,
                        detail: '펀딩 상품에 대한 상세 정보',
                        imageUrls: [],
                        endAt: fund.endAt,
                        launchAt: fund.launchAt,
                        progress: fund.progress || 'Launch',
                        financialInstitution: fund.financialInstitution,
                        retryVotesCount: fund.retryVotesCount,
                        projectType: null,
                        periodDays: null,
                        interestRate: null,
                        successCondition: null,
                        voteCount: 0,
                        nickname: null,
                    }
                }
            }),
        )

        // 최대 3개만 표시
        recommendedFunds.value = detailedFunds.slice(0, 3)
        console.log('추천 펀딩 목록 (상세 정보 포함, 최대 3개):', recommendedFunds.value)
    } catch (error) {
        console.error('추천 펀딩 데이터 조회 실패:', error)
        recommendedFunds.value = []
    } finally {
        isRecommendLoading.value = false
    }
}

// 프로젝트 상세 페이지로 이동
const goToProjectDetail = (projectId) => {
    router.push(`/project/detail/${projectId}`)
}

// 펀딩 상세 페이지로 이동
const goToFundingDetail = (fundId) => {
    router.push(`/funding/detail/${fundId}`)
}

// 펀딩 이미지 URL 가져오기
const getFundImageUrl = (fund) => {
    // imageList 배열에서 첫 번째 이미지 사용
    if (fund.imageUrls && fund.imageUrls.length > 0) {
        return fund.imageUrls[0].imageUrl
    }

    // 기본 이미지 URL
    return '/public/images/logo.png'
}

// 남은 일수 계산
const calculateDaysLeft = (endAt) => {
    if (!endAt) return 0

    try {
        const endDate = new Date(endAt)
        const today = new Date()

        // 오늘 날짜를 자정으로 설정
        today.setHours(0, 0, 0, 0)
        endDate.setHours(0, 0, 0, 0)

        const diffTime = endDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return Math.max(0, diffDays)
    } catch (error) {
        console.error('날짜 계산 오류:', error)
        return 0
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

// 기업별 스타일 가져오기
const getCompanyStyle = (companyName) => {
    const styles = {
        신한은행: { bg: 'bg-gradient-to-br from-blue-100 to-blue-200', text: 'text-blue-600' },
        우리은행: { bg: 'bg-gradient-to-br from-sky-100 to-sky-200', text: 'text-sky-600' },
        KB국민은행: {
            bg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
            text: 'text-yellow-600',
        },
        하나은행: { bg: 'bg-gradient-to-br from-green-100 to-green-200', text: 'text-green-600' },
        NH농협: {
            bg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
            text: 'text-emerald-600',
        },
        카카오뱅크: { bg: 'bg-gradient-to-br from-amber-100 to-amber-200', text: 'text-amber-600' },
        토스뱅크: {
            bg: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
            text: 'text-indigo-600',
        },
    }
    return (
        styles[companyName] || {
            bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
            text: 'text-gray-600',
        }
    )
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

    fetchFundingDetail().then(() => {
        // 펀딩 데이터 로드 완료 후 추천 데이터 로드
        fetchRecommendedFunds()
    })

    // 가입 완료 후 돌아온 경우 참여자 수 증가
    if (route.query.joined === 'true') {
        // 약간의 딜레이 후 참여자 수 증가 (데이터 로드 후 적용)
        setTimeout(() => {
            if (fundingData.value) {
                fundingData.value.participantCount = (fundingData.value.participantCount || 0) + 1
                console.log('참여자 수 업데이트:', fundingData.value.participantCount)

                // query parameter 제거 (새로고침 시 중복 증가 방지)
                router.replace({
                    path: route.path,
                    query: {},
                })
            }
        }, 1000)
    }
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in-up {
    animation:
        fadeIn 0.3s ease-out,
        fadeInUp 0.3s ease-out;
}
</style>
