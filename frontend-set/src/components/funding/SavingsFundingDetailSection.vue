<template>
    <section class="mb-8">
        <div class="grid grid-cols-1 gap-6">
            <!-- 금융 상품 정보 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-university text-blue-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">금융 상품 정보</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">상품명</span>
                            <span class="font-bold text-gray-900">{{ productName }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">금융기관</span>
                            <span class="font-bold text-gray-900">{{ financialInstitution }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">상품 유형</span>
                            <span class="font-bold text-gray-900">{{
                                getProductTypeName(productType)
                            }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">이자율</span>
                            <span class="font-bold text-green-600">{{ interestRate }}%</span>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">가입 기간</span>
                            <span class="font-bold text-gray-900">{{ periodDays }}일</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">가입 조건</span>
                            <span class="font-bold text-gray-900">{{ productCondition }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">성공 조건</span>
                            <span class="font-bold text-gray-900">{{ successCondition }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">상품 설명</span>
                            <span class="font-bold text-gray-900">{{ productDetail }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 키워드 정보 -->
            <div
                v-if="keywords && keywords.length > 0"
                class="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
                <div class="flex items-center mb-4">
                    <i class="fas fa-tags text-purple-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">관련 키워드</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="keyword in keywords"
                        :key="keyword.keywordId"
                        class="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                        {{ keyword.name }}
                    </span>
                </div>
            </div>

            <!-- 상품 상세 설명 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-info-circle text-green-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">상품 상세 설명</h3>
                </div>
                <div class="prose max-w-none">
                    <p class="text-gray-700 leading-relaxed mb-4">
                        {{ productDetail }}
                    </p>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-bold text-blue-900 mb-2">주요 특징</h4>
                        <ul class="list-disc list-inside text-blue-800 space-y-1">
                            <li>특별한 이자율로 더 높은 수익률 제공</li>
                            <li>청년을 위한 맞춤형 금융 상품</li>
                            <li>안정적인 금융기관의 신뢰할 수 있는 상품</li>
                            <li>명확한 가입 조건과 성공 조건</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Props 정의
// @param {string} productName - 상품명
// @param {string} productDetail - 상품 설명
// @param {string} financialInstitution - 금융기관
// @param {string} productType - 상품 유형 (Savings, Loan 등)
// @param {number} interestRate - 이자율
// @param {number} periodDays - 가입 기간 (일)
// @param {string} productCondition - 가입 조건
// @param {string} successCondition - 성공 조건
// @param {Array} keywords - 관련 키워드

const props = defineProps({
    productName: {
        type: String,
        required: true,
    },
    productDetail: {
        type: String,
        required: true,
    },
    financialInstitution: {
        type: String,
        required: true,
    },
    productType: {
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
    productCondition: {
        type: String,
        required: true,
    },
    successCondition: {
        type: String,
        required: true,
    },
    keywords: {
        type: Array,
        default: () => [],
    },
})

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
</script>
