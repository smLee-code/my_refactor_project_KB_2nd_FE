<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <!-- 메인 콘텐츠 영역 -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-32 py-8">
            <!-- 뒤로가기 버튼 -->
            <div class="mb-6">
                <a
                    href="#"
                    class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    <i class="fas fa-arrow-left mr-2"></i>
                    <span class="font-medium">돌아가기</span>
                </a>
            </div>
            <!-- 펀딩 참여 헤더 -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">펀딩 참여하기</h1>
                <p class="text-lg text-gray-600">펀딩 제목</p>
            </div>
            <!-- 참여자 혜택 안내 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-gift text-orange-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">참여자 혜택</h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-medal text-blue-500 text-xl mr-2"></i>
                                <h4 class="font-bold text-gray-900">₩10,000 이상</h4>
                            </div>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• 프로젝트 진행 보고서</li>
                                <li>• 감사 인증서</li>
                                <li>• 이메일 업데이트</li>
                            </ul>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-trophy text-green-500 text-xl mr-2"></i>
                                <h4 class="font-bold text-gray-900">₩50,000 이상</h4>
                            </div>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• 위 혜택 모두 포함</li>
                                <li>• 친환경 제품 샘플</li>
                                <li>• 프로젝트 참여 기념품</li>
                            </ul>
                        </div>
                        <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-crown text-purple-500 text-xl mr-2"></i>
                                <h4 class="font-bold text-gray-900">₩100,000 이상</h4>
                            </div>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• 위 혜택 모두 포함</li>
                                <li>• 기술 설명회 초대</li>
                                <li>• VIP 후원자 인증서</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 챌린지 참여 금액 고정 안내 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-coins text-yellow-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">참가비</h3>
                    </div>
                    <div class="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">₩50,000</div>
                        <div class="text-gray-600">고정 참가비</div>
                        <div class="mt-4 text-sm text-gray-500">
                            이 프로젝트는 고정 금액으로 운영되며, 금액 변경이 불가능합니다.
                        </div>
                    </div>
                </div>
            </section>
            <!-- 펀딩 금액 선택 -->
            <section class="mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div class="flex items-center mb-6">
                        <i class="fas fa-coins text-yellow-500 text-xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">참여 금액 입력</h3>
                    </div>
                    <form @submit.prevent="handleAmountSubmit" class="mb-6">
                        <div class="relative">
                            <span
                                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium"
                                >₩</span
                            >
                            <input
                                type="number"
                                v-model="customAmount"
                                class="w-full pl-8 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg font-bold"
                                placeholder="후원 금액을 입력해주세요"
                                min="1000"
                                step="1000"
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
                        <p class="mt-2 text-sm text-gray-600">최소 후원 금액은 1,000원입니다</p>
                        <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                                type="button"
                                @click="setQuickAmount(10000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 1만원
                            </button>
                            <button
                                type="button"
                                @click="setQuickAmount(50000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 5만원
                            </button>
                            <button
                                type="button"
                                @click="setQuickAmount(100000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 10만원
                            </button>
                            <button
                                type="button"
                                @click="setQuickAmount(500000)"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors whitespace-nowrap !rounded-button"
                            >
                                + 50만원
                            </button>
                        </div>
                        <button
                            type="submit"
                            class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 transition-all !rounded-button"
                        >
                            금액 설정하기
                        </button>
                    </form>
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
                            <span class="text-gray-700">펀딩 금액</span>
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
                                <button class="text-yellow-600 hover:text-yellow-700 ml-2">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
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
                                <button class="text-yellow-600 hover:text-yellow-700 ml-2">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            </span>
                        </label>
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input
                                v-model="agreements.marketing"
                                type="checkbox"
                                class="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                            />
                            <span class="text-sm text-gray-700">
                                <span class="text-gray-500">[선택]</span> 마케팅 정보 수신에
                                동의합니다
                            </span>
                        </label>
                        <label class="flex items-start space-x-3 cursor-pointer">
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
                        {{ formatCurrency(selectedAmount) }} 결제하기
                    </button>
                    <p class="text-xs text-gray-500 text-center mt-3">
                        결제 정보는 안전하게 암호화되어 처리됩니다
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
const selectedAmount = ref(0)
const customAmount = ref('')
const selectedPaymentMethod = ref('card')
const participantInfo = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
})
const setQuickAmount = (amount: number) => {
    const currentAmount = Number(customAmount.value) || 0
    customAmount.value = String(currentAmount + amount)
}
const resetAmount = () => {
    customAmount.value = ''
    selectedAmount.value = 0
}
const handleAmountSubmit = () => {
    const amount = Number(customAmount.value)
    if (amount >= 1000) {
        selectedAmount.value = amount
    }
}
const agreements = ref({
    terms: false,
    privacy: false,
    marketing: false,
    anonymous: false,
})
const selectAmount = (amount: number) => {
    selectedAmount.value = amount
}
const selectPaymentMethod = (method: string) => {
    selectedPaymentMethod.value = method
}
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    }).format(amount)
}
const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
        card: '신용카드',
        bank: '계좌이체',
        kakaopay: '카카오페이',
        naverpay: '네이버페이',
    }
    return methods[method] || '선택 안함'
}
const canProceedPayment = computed(() => {
    return (
        selectedAmount.value > 0 &&
        selectedPaymentMethod.value &&
        participantInfo.value.name &&
        participantInfo.value.email &&
        participantInfo.value.phone &&
        agreements.value.terms &&
        agreements.value.privacy
    )
})
const processPayment = () => {
    if (canProceedPayment.value) {
        alert(
            `${formatCurrency(selectedAmount.value)} 결제가 완료되었습니다!\n프로젝트 참여해 주셔서 감사합니다.`,
        )
    }
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
@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
@media (max-width: 768px) {
    .text-3xl {
        font-size: 1.5rem;
        line-height: 2rem;
    }
    .text-2xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
    .p-6 {
        padding: 1rem;
    }
}
</style>
