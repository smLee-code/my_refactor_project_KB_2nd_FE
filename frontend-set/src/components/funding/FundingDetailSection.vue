<template>
    <section class="mb-8">
        <div class="grid grid-cols-1 gap-6">
            <!-- 펀딩 목적 / 배경 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-leaf text-green-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">펀딩 목적 및 배경</h3>
                </div>
                <p class="text-gray-700 leading-relaxed mb-4">
                    {{ purpose }}
                </p>
                <p class="text-gray-700 leading-relaxed">
                    {{ background }}
                </p>
            </div>

            <!-- 출처 프로젝트 정보 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-project-diagram text-blue-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">출처 프로젝트</h3>
                </div>
                <div class="flex items-start space-x-4 mb-4">
                    <div class="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                            :src="sourceProject.thumbnail"
                            :alt="sourceProject.title + ' 썸네일'"
                            class="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-900 mb-1">
                            {{ sourceProject.title }}
                        </h4>
                        <p class="text-sm text-gray-600 mb-2">{{ sourceProject.organization }}</p>
                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                            <span
                                v-for="tag in sourceProject.tags"
                                :key="tag"
                                :class="getTagClass(tag)"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">프로젝트 기간</p>
                            <p class="font-medium text-gray-900">{{ sourceProject.period }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">프로젝트 단계</p>
                            <p class="font-medium text-gray-900">{{ sourceProject.stage }}</p>
                        </div>
                    </div>
                    <p class="text-gray-700 text-sm leading-relaxed">
                        {{ sourceProject.description }}
                    </p>
                </div>
            </div>

            <!-- 자금 사용 계획 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-chart-pie text-purple-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">자금 사용 계획</h3>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div
                            v-for="item in budgetPlan"
                            :key="item.category"
                            class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                        >
                            <span class="text-gray-700">{{ item.category }}</span>
                            <span class="font-bold text-gray-900"
                                >{{ formatCurrency(item.amount) }} ({{ item.percentage }}%)</span
                            >
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <div
                            class="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center"
                        >
                            <i class="fas fa-chart-pie text-6xl text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 참여자 혜택 안내 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-gift text-orange-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">참여자 혜택</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        v-for="benefit in benefits"
                        :key="benefit.amount"
                        class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center"
                    >
                        <i :class="benefit.icon + ' text-blue-500 text-2xl mb-2'"></i>
                        <h4 class="font-bold text-gray-900 mb-2">
                            {{ formatCurrency(benefit.amount) }} 이상
                        </h4>
                        <p class="text-sm text-gray-600">
                            {{ benefit.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Props 정의
// @param {string} purpose - 펀딩 목적
// @param {string} background - 펀딩 배경
// @param {Object} sourceProject - 출처 프로젝트 정보
// @param {Array} budgetPlan - 자금 사용 계획
// @param {Array} benefits - 참여자 혜택

const props = defineProps({
    purpose: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    sourceProject: {
        type: Object,
        required: true,
    },
    budgetPlan: {
        type: Array,
        required: true,
    },
    benefits: {
        type: Array,
        required: true,
    },
})

// 금액 포맷팅 함수
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
}

// 태그별 스타일 클래스 반환
const getTagClass = (tag) => {
    const tagClasses = {
        진행중: 'bg-blue-50 px-2 py-1 rounded-full',
        연구개발: 'bg-green-50 px-2 py-1 rounded-full',
        '환경/에너지': 'bg-purple-50 px-2 py-1 rounded-full',
    }
    return tagClasses[tag] || 'bg-gray-50 px-2 py-1 rounded-full'
}
</script>
