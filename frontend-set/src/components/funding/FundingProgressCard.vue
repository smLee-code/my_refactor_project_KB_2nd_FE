<template>
    <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                <div class="text-center">
                    <div class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        {{ formatCurrency(targetAmount) }}
                    </div>
                    <div class="text-sm text-gray-600">목표 금액</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-yellow-600 mb-1">
                        {{ formatCurrency(currentAmount) }}
                    </div>
                    <div class="text-sm text-gray-600">현재 모금액</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-green-600 mb-1">
                        {{ progressPercentage }}%
                    </div>
                    <div class="text-sm text-gray-600">달성률</div>
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
                    <span>펀딩 진행률</span>
                    <span>{{ progressPercentage }}% 달성</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                    <div
                        class="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full shadow-sm transition-all duration-500"
                        :style="{ width: progressPercentage + '%' }"
                    ></div>
                </div>
            </div>
            <div
                class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0"
            >
                <div
                    class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600"
                >
                    <div class="flex items-center bg-red-50 px-3 py-2 rounded-full">
                        <i class="fas fa-clock text-red-500 mr-2"></i>
                        <span>{{ daysLeft }}일 남음</span>
                    </div>
                    <div class="text-gray-500">마감일: {{ endDate }}</div>
                </div>
                <!-- ROLE_NORMAL 사용자만 참여 가능 -->
                <button
                    v-if="userRole === 'ROLE_NORMAL'"
                    @click="$emit('participate')"
                    class="w-full sm:w-auto bg-yellow-400 text-gray-900 px-8 py-3 !rounded-button font-bold hover:bg-yellow-500 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    펀딩 참여하기
                </button>
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
// Props 정의
// @param {number} targetAmount - 목표 금액
// @param {number} currentAmount - 현재 모금액
// @param {number} progressPercentage - 달성률 (0-100)
// @param {number} participantCount - 참여 인원 수
// @param {number} daysLeft - 남은 일수
// @param {string} endDate - 마감일 (YYYY년 MM월 DD일 형식)
// @param {string} userRole - 사용자 역할 (ROLE_NORMAL, ROLE_FINANCE, ROLE_ADMIN)

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
})

// Emits 정의
// @emits {void} participate - 펀딩 참여 버튼 클릭 이벤트

defineEmits(['participate'])

// 금액 포맷팅 함수
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
}
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
