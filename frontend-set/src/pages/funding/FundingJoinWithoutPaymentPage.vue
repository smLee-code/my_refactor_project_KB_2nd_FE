<!-- 결제가 없는 펀딩 참여 페이지 (대출, 저축) -->
<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <!-- 메인 콘텐츠 영역 -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-32 py-8">
            <!-- 뒤로가기 버튼 -->
            <div class="mb-6">
                <a
                    href="#"
                    @click.prevent="$router.back()"
                    class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    <i class="fas fa-arrow-left mr-2"></i>
                    <span class="font-medium">돌아가기</span>
                </a>
            </div>
            <!-- 펀딩 참여 헤더 -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                    {{ fundingTitle || '로딩중...' }} 신청하기
                </h1>
                <p v-if="fundingType" class="text-lg text-gray-600">
                    {{ fundingType === 'loan' ? '대출' : '저축' }} 상품
                </p>
            </div>

            <!-- 상품 정보 요약 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i
                            :class="
                                fundingType === 'loan'
                                    ? 'fas fa-hand-holding-usd text-blue-500'
                                    : 'fas fa-piggy-bank text-green-500'
                            "
                            class="text-xl mr-3"
                        ></i>
                        <h3 class="text-xl font-bold text-gray-900">상품 정보</h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-if="fundingType === 'loan'" class="bg-blue-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">대출 한도</p>
                            <p class="text-lg font-bold text-gray-900">
                                {{ formatCurrency(loanLimit) }}
                            </p>
                        </div>
                        <div v-if="fundingType === 'loan'" class="bg-blue-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">금리</p>
                            <p class="text-lg font-bold text-gray-900">
                                {{ minInterestRate }}% ~ {{ maxInterestRate }}%
                            </p>
                        </div>
                        <div v-if="fundingType === 'savings'" class="bg-green-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">목표 금액</p>
                            <p class="text-lg font-bold text-gray-900">
                                {{ formatCurrency(targetAmount) }}
                            </p>
                        </div>
                        <div v-if="fundingType === 'savings'" class="bg-green-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">연 이자율</p>
                            <p class="text-lg font-bold text-gray-900">{{ interestRate }}%</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 신청자 정보 입력 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-user text-purple-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">신청자 정보</h3>
                    </div>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                이름 <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="applicantInfo.name"
                                type="text"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="신청자 이름을 입력하세요"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                연락처 <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="applicantInfo.phone"
                                type="tel"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="010-0000-0000"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                이메일 <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="applicantInfo.email"
                                type="email"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="example@email.com"
                                required
                            />
                        </div>
                        <div v-if="fundingType === 'loan'">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                희망 대출 금액 <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input
                                    v-model="applicantInfo.requestedAmount"
                                    @input="formatRequestedAmount"
                                    type="text"
                                    class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="희망 대출 금액을 입력하세요"
                                    required
                                />
                                <span
                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >원</span
                                >
                            </div>
                            <p class="mt-1 text-sm text-gray-500">
                                최대 한도: {{ formatCurrency(loanLimit) }}
                            </p>
                        </div>
                        <div v-if="fundingType === 'savings'">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                월 납입 금액 <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input
                                    v-model="applicantInfo.monthlyDeposit"
                                    @input="formatMonthlyDeposit"
                                    type="text"
                                    class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="매월 납입할 금액을 입력하세요"
                                    required
                                />
                                <span
                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >원</span
                                >
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <!-- 신청 완료 버튼 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="space-y-4 mb-6">
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input
                                v-model="agreements.terms"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="font-medium">[필수]</span> 상품 약관 및 이용 조건에
                                동의합니다
                            </span>
                        </label>
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input
                                v-model="agreements.privacy"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="font-medium">[필수]</span> 개인정보 수집 및 이용에
                                동의합니다
                            </span>
                        </label>
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input
                                v-model="agreements.creditCheck"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="font-medium">[필수]</span> 신용정보 조회에 동의합니다
                            </span>
                        </label>
                    </div>
                    <button
                        @click="submitApplication"
                        :disabled="!canProceedApplication"
                        :class="{
                            'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white':
                                canProceedApplication,
                            'bg-gray-300 text-gray-500 cursor-not-allowed': !canProceedApplication,
                        }"
                        class="w-full py-4 !rounded-button font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        <i class="fas fa-check-circle mr-2"></i>
                        {{ fundingType === 'loan' ? '대출 신청하기' : '저축 가입하기' }}
                    </button>
                    <p class="text-xs text-gray-500 text-center mt-3">
                        신청 후 심사를 거쳐 최종 승인됩니다
                    </p>
                </div>
            </section>
        </div>
    </div>
    
    <!-- 성공 팝업 -->
    <SuccessPopup
        v-model="showSuccessPopup"
        title="신청이 완료되었습니다! 🎉"
        :message="fundingType === 'loan' ? '대출 신청이 성공적으로 완료되었습니다.' : '저축 가입이 성공적으로 완료되었습니다.'"
        :subMessage="fundingType === 'loan' ? '심사 결과는 영업일 기준 2-3일 내 안내됩니다.' : '함께 꾸준히 저축해요!'"
        @confirm="handlePopupConfirm"
    />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SuccessPopup from '@/components/common/SuccessPopup.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const fundingId = route.params.id as string

// 펀딩 정보
const fundingData = ref(null)
const fundingTitle = ref('')
const fundingType = ref('') // 'loan' 또는 'savings' - 초기값 없음
const loanLimit = ref(50000000) // 대출 한도

// 성공 팝업 관련
const showSuccessPopup = ref(false)
const minInterestRate = ref(2.5) // 최소 금리
const maxInterestRate = ref(4.5) // 최대 금리
const targetAmount = ref(10000000) // 저축 목표 금액
const interestRate = ref(3.5) // 저축 이자율

// 펀딩 정보 조회 및 타입 확인
const fetchFundingInfo = async () => {
    try {
        const response = await api.get(`/fund/${fundingId}`)
        fundingData.value = response.data

        console.log('펀딩 정보:', response.data)

        // 펀딩 타입 확인
        const type = response.data.fundType

        // 이 페이지는 결제가 없는 펀딩(대출/저축)만 처리
        if (type === 'Donation' || type === 'Challenge') {
            // 기부/챌린지인 경우 올바른 페이지로 리다이렉트
            router.replace(`/funding/join-payment/${fundingId}`)
            return
        }

        // 펀딩 정보 업데이트
        fundingTitle.value = response.data.fundName || response.data.name || '펀딩 프로젝트'
        fundingType.value = type.toLowerCase() // 'Loan' -> 'loan', 'Savings' -> 'savings'

        console.log('펀딩 타입:', fundingType.value)

        if (type === 'Loan') {
            loanLimit.value = response.data.loanLimit || 50000000
            minInterestRate.value = response.data.minInterestRate || 2.5
            maxInterestRate.value = response.data.maxInterestRate || 4.5
        } else if (type === 'Savings') {
            targetAmount.value = response.data.targetAmount || 10000000
            interestRate.value = response.data.interestRate || 3.5
        }
    } catch (error) {
        console.error('펀딩 정보 조회 실패:', error)
        alert('펀딩 정보를 불러올 수 없습니다.')
        // 에러시 이전 페이지로 돌아가기
        router.back()
    }
}

onMounted(() => {
    fetchFundingInfo()
})

// 팝업 확인 시 페이지 이동 (2초 후 자동 이동)
const handlePopupConfirm = () => {
    router.push({
        path: `/funding/detail/${fundingId}`,
        query: { joined: 'true' }
    })
}

// 신청자 정보
const applicantInfo = ref({
    name: '',
    phone: '',
    email: '',
    requestedAmount: '', // 대출 희망 금액
    monthlyDeposit: '', // 저축 월 납입액
})

// 약관 동의
const agreements = ref({
    terms: false,
    privacy: false,
    creditCheck: false,
})

// 금액 포맷팅 함수
const formatNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 희망 대출 금액 포맷팅
const formatRequestedAmount = (event: Event) => {
    const target = event.target as HTMLInputElement
    const formatted = formatNumber(target.value)
    applicantInfo.value.requestedAmount = formatted
    target.value = formatted
}

// 월 납입액 포맷팅
const formatMonthlyDeposit = (event: Event) => {
    const target = event.target as HTMLInputElement
    const formatted = formatNumber(target.value)
    applicantInfo.value.monthlyDeposit = formatted
    target.value = formatted
}

// 통화 포맷팅
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    }).format(amount)
}

// 신청 가능 여부
const canProceedApplication = computed(() => {
    const baseCondition =
        applicantInfo.value.name &&
        applicantInfo.value.phone &&
        applicantInfo.value.email &&
        agreements.value.terms &&
        agreements.value.privacy &&
        agreements.value.creditCheck

    if (fundingType.value === 'loan') {
        return baseCondition && applicantInfo.value.requestedAmount
    } else {
        return baseCondition && applicantInfo.value.monthlyDeposit
    }
})

// 신청 제출
const submitApplication = async () => {
    if (!canProceedApplication.value) return

    try {
        let response
        
        if (fundingType.value === 'loan') {
            // 대출 신청
            const requestData = {
                loanAmount: parseInt(applicantInfo.value.requestedAmount.replace(/,/g, '') || '0')
            }
            console.log('대출 신청 요청 데이터:', requestData)
            
            response = await api.post(
                `/user-loan/${fundingId}`,
                requestData
            )
        } else {
            // 저축 가입
            const requestData = {
                savingAmount: parseInt(applicantInfo.value.monthlyDeposit.replace(/,/g, '') || '0')
            }
            console.log('저축 가입 요청 데이터:', requestData)
            
            response = await api.post(
                `/user-saving/${fundingId}`,
                requestData
            )
        }

        console.log('응답 데이터:', response.data)
        
        // response.data.success가 없거나 response.status가 200-299면 성공으로 처리
        if (response.data.success || (response.status >= 200 && response.status < 300)) {
            // 성공 팝업 표시
            showSuccessPopup.value = true
        } else {
            alert('신청 처리 중 오류가 발생했습니다.')
        }
    } catch (error) {
        console.error('신청 오류:', error)
        alert('신청 처리 중 오류가 발생했습니다.')
    }
}
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
