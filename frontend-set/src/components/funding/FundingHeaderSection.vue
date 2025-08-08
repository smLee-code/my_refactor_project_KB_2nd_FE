<template>
    <section class="mb-8">
        <!-- 펀딩 메인 비주얼 -->
        <div class="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            <img
                :src="fundingImage"
                :alt="fundingName + ' 대표 이미지'"
                class="w-full h-full object-cover object-top"
            />
            <div class="absolute top-6 right-6 flex items-center space-x-3">
                <div
                    class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                    {{ getStatusText() }}
                </div>
                <button
                    @click="$emit('toggleLike')"
                    class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all cursor-pointer"
                >
                    <i
                        :class="
                            isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600'
                        "
                    ></i>
                </button>
                <button
                    @click="$emit('share')"
                    class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all cursor-pointer"
                >
                    <i class="fas fa-share text-gray-600"></i>
                </button>
            </div>
        </div>
        <div class="mt-6">
            <div class="flex items-center space-x-3 mb-2">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ getProductTypeName(fundType) }}
                </span>
                <span class="text-sm text-gray-500">{{ financialInstitution }}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ fundingName }}
            </h1>
            <p class="text-lg text-gray-600 mb-4">
                {{ fundingDetail }}
            </p>
            <div class="flex items-center space-x-4 text-sm text-gray-600">
                <div v-if="interestRate && interestRate > 0" class="flex items-center">
                    <i class="fas fa-percentage text-green-500 mr-1"></i>
                    <span>이자율 {{ interestRate }}%</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-calendar text-blue-500 mr-1"></i>
                    <span>{{ periodDays }}일</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Props 정의
// @param {string} fundingImage - 펀딩 대표 이미지 URL
// @param {string} fundingName - 펀딩 상품명
// @param {string} fundingDetail - 펀딩 상품 설명
// @param {string} fundType - 펀딩 타입 (Savings, Loan, Donation, Challenge)
// @param {string} financialInstitution - 금융기관명
// @param {number} interestRate - 이자율
// @param {number} periodDays - 가입 기간 (일)
// @param {string} progress - 진행 상태 (Launch, 진행중 등)
// @param {boolean} isLiked - 좋아요 상태

const props = defineProps({
    fundingImage: {
        type: String,
        required: true,
    },
    fundingName: {
        type: String,
        required: true,
    },
    fundingDetail: {
        type: String,
        required: true,
    },
    fundType: {
        type: String,
        required: true,
    },
    financialInstitution: {
        type: String,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    periodDays: {
        type: Number,
        required: true,
    },
    progress: {
        type: String,
        default: '진행중',
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
})

// Emits 정의
// @emits {void} toggleLike - 좋아요 토글 이벤트
// @emits {void} share - 공유 이벤트

defineEmits(['toggleLike', 'share'])

// 상품 유형별 이름 반환
const getProductTypeName = (type) => {
    const typeNames = {
        Savings: '저축',
        Loan: '대출',
        Donation: '기부',
        Challenge: '챌린지',
    }
    return typeNames[type] || type
}

// 진행 상태별 텍스트 반환
const getStatusText = () => {
    console.log('getStatusText 호출됨, progress:', props.progress)

    switch (props.progress) {
        case 'Launch':
            return '준비중'
        case 'Active':
            return '진행중'
        case 'Close':
            return '완료'
        case '진행중':
            return '진행중'
        case '완료':
            return '완료'
        default:
            console.log('알 수 없는 progress 값:', props.progress)
            return '진행중'
    }
}
</script>
