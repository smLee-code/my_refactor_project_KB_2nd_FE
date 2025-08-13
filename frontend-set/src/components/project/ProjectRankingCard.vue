<template>
    <div
        class="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 flex-1 min-h-[110px] max-h-[150px] flex flex-col justify-center"
    >
        <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
                <div
                    class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg"
                >
                    {{ rank }}
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 mb-1 line-clamp-1">{{ title }}</h4>
                <p class="text-sm text-gray-600 mb-2 line-clamp-1">{{ promotion }}</p>
                <div class="flex items-center justify-between text-sm">
                    <span class="text-red-600 flex items-center gap-1 inline-flex"
                        ><i class="fas fa-heart"></i> {{ voteCount }}</span
                    >
                    <span class="text-grey-600 bg-grey-50 px-2 py-1 rounded-full"
                        >{{ typeMap[projectType] }}형</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// 인기 프로젝트 랭킹 카드
// props:
// - rank: 순위(숫자)
// - title: 프로젝트명
// - description: 설명
// - likes: 좋아요 수
// - participants: 참여자 수
// - image: (옵션) 썸네일 이미지

import project from '@/router/project'
import { computed } from 'vue'

defineProps({
    rank: Number,
    title: String,
    promotion: String,
    voteCount: Number,
    image: String,
    projectType: String,
})

const typeMap = {
    Savings: '저축',
    Loan: '대출',
    Challenge: '챌린지',
    Donation: '기부',
}
</script>
