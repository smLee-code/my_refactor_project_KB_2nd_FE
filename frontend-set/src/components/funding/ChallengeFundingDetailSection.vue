<template>
    <section class="mb-8">
        <div class="grid grid-cols-1 gap-6">
            <!-- 챌린지 정보 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-trophy text-yellow-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">챌린지 정보</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">챌린지명</span>
                            <span class="font-bold text-gray-900">{{ challengeName }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">챌린지 설명</span>
                            <span class="font-bold text-gray-900">{{ challengeDetail }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">참여 조건</span>
                            <span class="font-bold text-gray-900">{{ productCondition }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">챌린지 기간</span>
                            <span class="font-bold text-gray-900">{{ challengePeriodDays }}일</span>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">보상</span>
                            <span class="font-bold text-green-600">{{ challengeReward }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">보상 조건</span>
                            <span class="font-bold text-gray-900">{{
                                challengeRewardCondition
                            }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">진행 상태</span>
                            <span class="font-bold text-blue-600">{{
                                getProgressText(progress)
                            }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">참여 여부</span>
                            <span
                                class="font-bold"
                                :class="joined ? 'text-green-600' : 'text-gray-600'"
                            >
                                {{ joined ? '참여중' : '미참여' }}
                            </span>
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

            <!-- 챌린지 상세 설명 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <i class="fas fa-info-circle text-green-500 text-xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-900">챌린지 상세 설명</h3>
                </div>
                <div class="prose max-w-none">
                    <p class="text-gray-700 leading-relaxed mb-4">
                        {{ challengeDetail }}
                    </p>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <h4 class="font-bold text-yellow-900 mb-2">챌린지 참여 방법</h4>
                        <ul class="list-disc list-inside text-yellow-800 space-y-1">
                            <li>매일 인증샷을 업로드하여 챌린지를 진행합니다</li>
                            <li>{{ challengePeriodDays }}일 동안 꾸준히 참여하세요</li>
                            <li>모든 조건을 달성하면 {{ challengeReward }}를 받을 수 있습니다</li>
                            <li>인증 실패 시 재도전 기회가 있습니다</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Props 정의
// @param {string} challengeName - 챌린지명
// @param {string} challengeDetail - 챌린지 설명
// @param {string} productCondition - 참여 조건
// @param {number} challengePeriodDays - 챌린지 기간 (일)
// @param {string} challengeReward - 보상
// @param {string} challengeRewardCondition - 보상 조건
// @param {string} progress - 진행 상태
// @param {boolean} joined - 참여 여부
// @param {Array} keywords - 관련 키워드

const props = defineProps({
    challengeName: {
        type: String,
        required: true,
    },
    challengeDetail: {
        type: String,
        required: true,
    },
    productCondition: {
        type: String,
        required: true,
    },
    challengePeriodDays: {
        type: Number,
        required: true,
    },
    challengeReward: {
        type: String,
        required: true,
    },
    challengeRewardCondition: {
        type: String,
        required: true,
    },
    progress: {
        type: String,
        default: 'Launch',
    },
    joined: {
        type: Boolean,
        default: false,
    },
    keywords: {
        type: Array,
        default: () => [],
    },
})

// 진행 상태별 텍스트 반환
const getProgressText = (progress) => {
    switch (progress) {
        case 'Launch':
            return '준비중'
        case 'Active':
            return '진행중'
        case 'Completed':
            return '완료'
        default:
            return '진행중'
    }
}
</script>
