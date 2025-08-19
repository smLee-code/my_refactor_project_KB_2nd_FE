<!-- 결제가 있는 펀딩 참여 페이지 (챌린지, 기부) -->
<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <!-- 메인 콘텐츠 영역 -->
        <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
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
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ fundingTitle }}</h1>
                <p class="text-lg text-gray-600">
                    {{ fundingType === 'Challenge' ? '챌린지' : '기부' }} 참여하기
                </p>
            </div>

            <!-- 챌린지 보증금 안내 (챌린지일 경우에만 표시) -->
            <section v-if="fundingType === 'Challenge'" class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-shield-alt text-blue-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">챌린지 보증금</h3>
                    </div>
                    <div class="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">
                            {{ formatCurrency(3000) }}
                        </div>
                        <div class="text-gray-600">보증금</div>
                        <div class="mt-4 text-sm text-gray-500">
                            챌린지 완주 시 보증금은 전액 환급됩니다.
                        </div>
                    </div>
                </div>
            </section>

            <!-- 기부 금액 선택 (기부일 경우에만 표시) -->
            <section v-if="fundingType === 'Donation'" class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-hand-holding-heart text-pink-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">기부 금액 입력</h3>
                    </div>
                    <form @submit.prevent="handleAmountSubmit" class="mb-6">
                        <div class="relative">
                            <span
                                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium"
                                >₩</span
                            >
                            <input
                                type="text"
                                v-model="customAmount"
                                @input="formatAmount"
                                class="w-full pl-8 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-lg font-bold"
                                placeholder="기부 금액을 입력해주세요"
                                required
                            />
                            <button
                                type="button"
                                @click="resetAmount"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                title="금액 초기화"
                            >
                                <i class="fas fa-times-circle text-xl"></i>
                            </button>
                        </div>
                        <p class="mt-2 text-sm text-gray-600">
                            최소 기부 금액: {{ formatCurrency(minAmount) }}
                        </p>
                        <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                                type="button"
                                @click="setQuickAmount(10000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-pink-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 1만원
                            </button>
                            <button
                                type="button"
                                @click="setQuickAmount(50000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-pink-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 5만원
                            </button>
                            <button
                                type="button"
                                @click="setQuickAmount(100000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-pink-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 10만원
                            </button>
                            <button
                                type="button"
                                @click="setQuickAmount(500000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-pink-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 50만원
                            </button>
                        </div>
                        <button
                            type="submit"
                            class="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 transition-all !rounded-button"
                        >
                            금액 설정하기
                        </button>
                    </form>
                </div>
            </section>

            <!-- 결제 수단 선택 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-credit-card text-green-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">결제 수단 선택</h3>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <button
                            @click="selectedPaymentMethod = 'kakaopay'"
                            :class="{
                                'ring-2 ring-yellow-400 bg-yellow-50':
                                    selectedPaymentMethod === 'kakaopay',
                                'bg-white': selectedPaymentMethod !== 'kakaopay',
                            }"
                            class="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                        >
                            <div class="flex items-center justify-center mb-2">
                                <img src="/images/kakaopay.png" alt="카카오페이" class="h-8" />
                            </div>
                            <p class="text-sm font-medium">카카오페이</p>
                        </button>
                        <button
                            @click="selectedPaymentMethod = 'kcp'"
                            :class="{
                                'ring-2 ring-blue-400 bg-blue-50': selectedPaymentMethod === 'kcp',
                                'bg-white': selectedPaymentMethod !== 'kcp',
                            }"
                            class="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                        >
                            <div class="flex items-center justify-center mb-2">
                                <i class="fas fa-credit-card text-3xl text-blue-600"></i>
                            </div>
                            <p class="text-sm font-medium">신용/체크카드</p>
                        </button>
                    </div>
                </div>
            </section>

            <!-- 결제 요약 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-receipt text-purple-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">결제 요약</h3>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-gray-700">{{
                                fundingType === 'challenge' ? '참가비' : '기부 금액'
                            }}</span>
                            <span class="font-bold text-gray-900">{{
                                formatCurrency(selectedAmount)
                            }}</span>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-gray-700">결제 수단</span>
                            <span class="font-medium text-gray-900">{{
                                getPaymentMethodName(selectedPaymentMethod)
                            }}</span>
                        </div>
                        <div class="border-t pt-3 mt-3">
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-bold text-gray-900">총 결제 금액</span>
                                <span class="text-2xl font-bold text-yellow-600">{{
                                    formatCurrency(selectedAmount)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 최종 결제 버튼 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="space-y-4 mb-6">
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input
                                v-model="agreements.terms"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="font-medium">[필수]</span> 서비스 이용 약관에
                                동의합니다
                            </span>
                        </label>
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input
                                v-model="agreements.privacy"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="font-medium">[필수]</span> 개인정보 수집 및 이용에
                                동의합니다
                            </span>
                        </label>
                        <label
                            v-if="fundingType === 'Donation'"
                            class="flex items-start space-x-3 cursor-pointer"
                        >
                            <input
                                v-model="agreements.anonymous"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="text-gray-500">[선택]</span> 익명으로 기부하겠습니다
                                <i class="fas fa-user-secret ml-2 text-gray-400"></i>
                            </span>
                        </label>
                    </div>
                    <button
                        @click="processPayment"
                        :disabled="!canProceedPayment"
                        :class="{
                            'bg-yellow-400 hover:bg-yellow-500 text-gray-900': canProceedPayment,
                            'bg-gray-300 text-gray-500 cursor-not-allowed': !canProceedPayment,
                        }"
                        class="w-full py-4 !rounded-button font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        <i class="fas fa-lock mr-2"></i>
                        결제하기
                    </button>
                    <p class="text-xs text-gray-500 text-center mt-3">
                        결제 정보는 안전하게 암호화되어 처리됩니다
                    </p>
                </div>
            </section>
        </div>
    </div>

    <!-- 성공 팝업 -->
    <SuccessPopup
        v-model="showSuccessPopup"
        title="가입이 완료되었습니다! 🎉"
        :message="
            fundingType === 'Challenge'
                ? '챌린지 참여가 성공적으로 완료되었습니다.'
                : '기부가 성공적으로 완료되었습니다.'
        "
        :subMessage="
            fundingType === 'Challenge'
                ? '챌린지를 완주하면 보증금이 환급됩니다!'
                : '따뜻한 마음을 나눠주셔서 감사합니다.'
        "
        @confirm="handlePopupConfirm"
    />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import api from '@/api'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import SuccessPopup from '@/components/common/SuccessPopup.vue'

// IMP 타입 선언
declare global {
    interface Window {
        IMP: any
    }
}

const route = useRoute()
const router = useRouter()
const fundingId = route.params.id

// 펀딩 정보
const fundingData = ref(null)
const fundingTitle = ref('소외계층 아동 교육 지원')
const fundingType = ref('') // 'Challenge' | 'Donation' | 'Loan' | 'Savings'
const fixedAmount = ref(50000) // 챌린지 고정 금액
const minAmount = ref(1000) // 기부 최소 금액
const maxAmount = ref(1000000) // 기부 최대 금액

// 성공 팝업 관련
const showSuccessPopup = ref(false)

// 펀딩 정보 조회
const fetchFundingInfo = async () => {
    try {
        console.log(`🔍 펀딩 ID ${fundingId} 정보 조회 중...`)

        const response = await api.get(`/fund/${fundingId}`)
        fundingData.value = response.data

        console.log('펀딩 상세 정보:', response.data)

        if (response.data) {
            fundingTitle.value = response.data.name || response.data.fundName || `펀딩`
            fundingType.value = response.data.fundType || 'Donation'

            // 챌린지는 보증금 3000원 고정
            if (response.data.fundType === 'Challenge') {
                fixedAmount.value = 3000
                selectedAmount.value = 3000
            } else if (response.data.fundType === 'Donation') {
                minAmount.value = response.data.minAmount || 1000
                maxAmount.value = response.data.maxAmount || 1000000
                selectedAmount.value = 0
            }
        }
    } catch (error) {
        console.error('펀딩 정보 조회 실패:', error)
        // 실패시 기본값 설정
        fundingTitle.value = `펀딩`
        fundingType.value = 'Donation'
        minAmount.value = 1000
        maxAmount.value = 1000000
    }
}

// 금액 관련
const selectedAmount = ref(0)
const customAmount = ref('')
const selectedPaymentMethod = ref('kakaopay')

// 약관 동의
const agreements = ref({
    terms: false,
    privacy: false,
    anonymous: false,
})

// 금액 포맷팅 함수
const formatNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 금액 입력 포맷팅
const formatAmount = (event: Event) => {
    const target = event.target as HTMLInputElement
    const formatted = formatNumber(target.value)
    customAmount.value = formatted
    target.value = formatted
}

// 빠른 금액 설정
const setQuickAmount = (amount: number) => {
    const currentAmount = parseInt(customAmount.value.replace(/,/g, '') || '0')
    customAmount.value = formatNumber(String(currentAmount + amount))
}

// 금액 초기화
const resetAmount = () => {
    customAmount.value = ''
    selectedAmount.value = 0
}

// 금액 설정 제출
const handleAmountSubmit = () => {
    const amount = parseInt(customAmount.value.replace(/,/g, '') || '0')
    if (amount >= minAmount.value && amount <= maxAmount.value) {
        selectedAmount.value = amount
    } else if (amount < minAmount.value) {
        alert(`최소 기부 금액은 ${formatCurrency(minAmount.value)}입니다.`)
    } else if (amount > maxAmount.value) {
        alert(`최대 기부 금액은 ${formatCurrency(maxAmount.value)}입니다.`)
    }
}

// 통화 포맷팅
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    }).format(amount)
}

// 결제 수단 이름 가져오기
const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
        kakaopay: '카카오페이',
        kcp: '신용/체크카드',
    }
    return methods[method] || '선택 안함'
}

// 결제 가능 여부
const canProceedPayment = computed(() => {
    return selectedAmount.value > 0 && agreements.value.terms && agreements.value.privacy
})

// IMP 초기화
onMounted(() => {
    // 펀딩 정보 먼저 조회
    fetchFundingInfo()

    // IMP 초기화
    nextTick(() => {
        setTimeout(() => {
            initIMP()
        }, 100)
    })
})

const initIMP = () => {
    console.log('🔍 DOM 로드 후 window.IMP:', window.IMP)

    if (window.IMP) {
        window.IMP.init('imp06216030')
        console.log('IMP 초기화 완료')
    } else {
        console.error('IMP 스크립트가 로드되지 않았습니다')
        loadIMPScript()
    }
}

const loadIMPScript = () => {
    const existingScript = document.querySelector('script[src*="iamport.js"]')
    if (existingScript) {
        console.log('IMP 스크립트가 이미 존재합니다. 재시도 중...')
        let retryCount = 0
        const checkIMP = setInterval(() => {
            if (window.IMP) {
                clearInterval(checkIMP)
                window.IMP.init('imp06216030')
                console.log('IMP 초기화 완료 (재시도)')
            } else if (retryCount++ > 10) {
                clearInterval(checkIMP)
                console.error('IMP 로드 실패')
            }
        }, 200)
        return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.iamport.kr/v1/iamport.js'
    script.onload = () => {
        console.log('동적 IMP 스크립트 로드 완료')
        if (window.IMP) {
            window.IMP.init('imp06216030')
            console.log('IMP 초기화 완료')
        }
    }
    script.onerror = () => {
        console.error('동적 IMP 스크립트 로드 실패')
    }
    document.head.appendChild(script)
}

// 결제 처리
const processPayment = async () => {
    if (!canProceedPayment.value) return

    const IMP = window.IMP
    if (!IMP) {
        alert('결제 모듈이 아직 로드되지 않았습니다.')
        return
    }

    // 백엔드에서 주문 생성
    const orderData = await createOrder()
    if (!orderData) return

    // 선택된 결제 수단에 따라 PG 설정
    const pgConfig =
        selectedPaymentMethod.value === 'kakaopay'
            ? { pg: 'kakaopay', pay_method: 'card' }
            : { pg: 'kcp.AO09C', pay_method: 'card' }

    // 결제 실행
    IMP.request_pay(
        {
            ...pgConfig,
            merchant_uid: orderData.merchant_uid,
            name: `${fundingTitle.value} ${fundingType.value === 'Challenge' ? '보증금' : '기부'}`,
            amount: orderData.amount,
            buyer_email: 'user@example.com',
            buyer_name: '참여자',
            buyer_tel: '010-0000-0000',
            buyer_addr: '주소',
            buyer_postcode: '00000',
            m_redirect_url: window.location.href,
        },
        async (rsp: any) => {
            if (rsp.success) {
                // 백엔드로 결제 정보 전송
                await sendPaymentToBackend({
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid,
                })
            } else {
                alert('결제 실패: ' + rsp.error_msg)
            }
        },
    )
}

// 주문 생성
const createOrder = async () => {
    console.log('🔍 주문 생성 시작')
    console.log('selectedAmount:', selectedAmount.value)
    console.log('customAmount:', customAmount.value)
    console.log('fundingId:', fundingId, 'type:', typeof fundingId)

    try {
        const requestData = {
            fundId: Number(fundingId),
            amount: selectedAmount.value,
            metadata: {
                anonymous: agreements.value.anonymous,
                fundingType: fundingType.value,
            },
        }

        console.log('서버로 전송할 데이터:', requestData)

        const response = await api.post('/payments/create', requestData)

        console.log('서버 응답:', response.data)

        return response.data // { merchant_uid, amount }
    } catch (error) {
        console.error('주문 생성 오류:', error)
        alert('주문 생성 중 오류가 발생했습니다.')
        return null
    }
}

// 결제 완료 처리
const sendPaymentToBackend = async (paymentData: any) => {
    try {
        const response = await api.post('/payments/complete', paymentData)

        if (response.data.success) {
            // 성공 팝업 표시
            showSuccessPopup.value = true
        } else {
            alert('결제 검증 실패: ' + response.data.message)
        }
    } catch (error) {
        console.error('결제 검증 오류:', error)
        alert('결제 검증 중 오류가 발생했습니다.')
    }
}

// 팝업 확인 버튼 클릭 시 페이지 이동
const handlePopupConfirm = () => {
    // 참여 완료 상태를 query parameter로 전달
    router.push({
        path: `/funding/detail/${fundingId}`,
        query: { joined: 'true' },
    })
}
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
