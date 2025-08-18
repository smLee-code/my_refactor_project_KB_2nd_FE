<template>
    <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                <div v-if="fundType !== 'Challenge'" class="text-center">
                    <div class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        {{ formatCurrency(targetAmount) }}
                    </div>
                    <div class="text-sm text-gray-600">{{ getAmountLabel() }}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-yellow-600 mb-1">
                        {{ formatCurrency(currentAmount) }}
                    </div>
                    <div class="text-sm text-gray-600">{{ getCurrentAmountLabel() }}</div>
                </div>
                <div v-if="fundType === 'Loan'" class="text-center">
                    <div class="text-2xl font-bold text-green-600 mb-1">
                        {{ minInterestRate }}~{{ maxInterestRate }}%
                    </div>
                    <div class="text-sm text-gray-600">금리</div>
                </div>
                <div v-else-if="fundType === 'Savings'" class="text-center">
                    <div class="text-2xl font-bold text-green-600 mb-1">{{ interestRate }}%</div>
                    <div class="text-sm text-gray-600">이자율</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600 mb-1">
                        {{ participantCount }}명
                    </div>
                    <div class="text-sm text-gray-600">참여 인원</div>
                </div>
            </div>
            <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{{ getProgressLabel() }}</span>
                    <span>{{ getProgressValue() }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                    <div
                        class="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full shadow-sm transition-all duration-500"
                        :style="{ width: getActualProgress() + '%' }"
                    ></div>
                </div>
            </div>
            <div
                class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0"
            >
                <div
                    class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600"
                >
                    <div
                        class="flex items-center px-3 py-2 rounded-full"
                        :class="daysLeft > 0 ? 'bg-red-50' : 'bg-gray-100'"
                    >
                        <i
                            class="fas fa-clock mr-2"
                            :class="daysLeft > 0 ? 'text-red-500' : 'text-gray-500'"
                        ></i>
                        <span :class="daysLeft > 0 ? 'text-red-600' : 'text-gray-600'">
                            {{ daysLeft > 0 ? `${daysLeft}일 남음` : '마감된 펀딩' }}
                        </span>
                    </div>
                    <div class="text-gray-500">마감일: {{ endDate }}</div>
                </div>
                <!-- ROLE_NORMAL 사용자만 참여 가능 -->
                <button
                    v-if="userRole === 'ROLE_NORMAL' && daysLeft > 0 && !joined"
                    @click="$emit('participate')"
                    class="w-full sm:w-auto bg-yellow-400 text-gray-900 px-8 py-3 !rounded-button font-bold hover:bg-yellow-500 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    펀딩 참여하기
                </button>
                <!-- 참여 중인 펀딩 안내 메시지 -->
                <div
                    v-else-if="userRole === 'ROLE_NORMAL' && joined"
                    class="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200"
                >
                    <i class="fas fa-check-circle mr-2"></i>
                    참여중인 펀딩입니다
                </div>
                <!-- 마감된 펀딩 안내 메시지 -->
                <div
                    v-else-if="userRole === 'ROLE_NORMAL' && daysLeft <= 0"
                    class="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg"
                >
                    <i class="fas fa-info-circle mr-2"></i>
                    마감된 펀딩입니다
                </div>
                <!-- 다른 역할 사용자 안내 메시지 -->
                <div
                    v-else-if="userRole === 'ROLE_FINANCE'"
                    class="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg"
                >
                    <i class="fas fa-info-circle mr-2"></i>
                    금융사 회원은 펀딩에 참여할 수 없습니다
                </div>
                <div
                    v-else-if="userRole === 'ROLE_ADMIN'"
                    class="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg"
                >
                    <i class="fas fa-info-circle mr-2"></i>
                    관리자 계정은 펀딩에 참여할 수 없습니다
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { calculateFundingProgress } from '@/utils/fundingUtils'

// Props 정의
// @param {number} targetAmount - 목표 금액
// @param {number} currentAmount - 현재 모금액
// @param {number} progressPercentage - 달성률 (0-100)
// @param {number} participantCount - 참여 인원 수
// @param {number} daysLeft - 남은 일수
// @param {string} endDate - 마감일 (YYYY년 MM월 DD일 형식)
// @param {string} userRole - 사용자 역할 (ROLE_NORMAL, ROLE_FINANCE, ROLE_ADMIN)
// @param {number} interestRate - 이자율
// @param {string} fundType - 펀딩 타입 (Savings, Loan, Donation, Challenge)

const props = defineProps({
    targetAmount: {
        type: Number,
        required: true,
    },
    currentAmount: {
        type: Number,
        required: true,
    },
    progressPercentage: {
        type: Number,
        required: true,
    },
    participantCount: {
        type: Number,
        required: true,
    },
    daysLeft: {
        type: Number,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        default: 'ROLE_NORMAL',
    },
    interestRate: {
        type: Number,
        default: 0,
    },
    minInterestRate: {
        type: Number,
        default: 0,
    },
    maxInterestRate: {
        type: Number,
        default: 0,
    },
    fundType: {
        type: String,
        default: 'Savings',
    },
    joined: {
        type: Boolean,
        default: false,
    },
    launchAt: {
        type: [Array, String, Date],
        default: null,
    },
    endAt: {
        type: [Array, String, Date],
        default: null,
    },
})

// Emits 정의
// @emits {void} participate - 펀딩 참여 버튼 클릭 이벤트

defineEmits(['participate'])

// 금액 포맷팅 함수
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
}

// 펀딩 타입별 라벨 반환
const getAmountLabel = () => {
    switch (props.fundType) {
        case 'Savings':
            return '월 납입 금액'
        case 'Loan':
            return '대출 한도'
        case 'Donation':
        case 'Challenge':
            return '목표 금액'
        default:
            return '목표 금액'
    }
}

const getCurrentAmountLabel = () => {
    switch (props.fundType) {
        case 'Savings':
            return '누적 납입액'
        case 'Loan':
            return '현재 대출액'
        case 'Donation':
        case 'Challenge':
            return '현재 모금액'
        default:
            return '현재 모금액'
    }
}

const getProgressLabel = () => {
    switch (props.fundType) {
        case 'Savings':
            return '저축 진행률'
        case 'Loan':
            return '대출 진행률'
        case 'Donation':
        case 'Challenge':
            return '펀딩 진행률'
        default:
            return '진행률'
    }
}

const getProgressValue = () => {
    const progress = getActualProgress()
    switch (props.fundType) {
        case 'Savings':
            return `${progress}% 달성`
        case 'Loan':
            return `${progress}% 진행`
        case 'Donation':
        case 'Challenge':
            return `${progress}% 달성`
        default:
            return `${progress}%`
    }
}

// 실제 진행률 계산
const getActualProgress = () => {
    console.log(`[FundingProgressCard] fundType: ${props.fundType}, interestRate: ${props.interestRate}, launchAt:`, props.launchAt, ', endAt:', props.endAt)
    
    // 기부형: 목표 금액 대비 현재 금액으로 계산
    if (props.fundType === 'Donation' && props.targetAmount > 0) {
        const calculatedProgress = (props.currentAmount / props.targetAmount) * 100
        return Math.min(100, Math.round(calculatedProgress * 10) / 10) // 소수점 1자리, 최대 100%
    }
    
    // 저축형, 대출형, 챌린지형: 날짜 기반 진행률 계산 (리스트와 동일)
    if ((props.fundType === 'Savings' || props.fundType === 'Loan' || props.fundType === 'Challenge') && props.launchAt && props.endAt) {
        const fundData = {
            launchAt: props.launchAt,
            endAt: props.endAt
        }
        const progress = calculateFundingProgress(fundData)
        console.log(`[FundingProgressCard] 계산된 진행률: ${progress}%`)
        return Math.round(progress * 10) / 10 // 소수점 1자리
    }
    
    // 날짜 정보가 없으면 0 반환
    console.log(`[FundingProgressCard] 날짜 정보 없음 - 진행률 0% 반환`)
    return 0
}
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
