<template>
    <div
        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-red-100 p-6 flex items-start space-x-6"
    >
        <!-- 썸네일 이미지 -->
        <div class="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-inner">
            <img
                :src="image"
                :alt="title"
                class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            />
        </div>
        <!-- 정보 영역 -->
        <div class="flex-1">
            <h4 class="font-bold text-lg text-gray-900 mb-2">{{ title }}</h4>
            <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div class="flex items-center bg-red-50 px-3 py-1 rounded-full">
                    <i class="fas fa-clock text-red-500 mr-1"></i>
                    <span>{{ timeLeft }}</span>
                </div>
                <div class="flex items-center bg-red-50 px-3 py-1 rounded-full">
                    <i class="fas fa-user-bust text-red-500 mr-1"></i>
                    <span>{{ participants }}명 참여</span>
                </div>
            </div>
            <div class="mb-3">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>진행률</span>
                    <span>{{ timeLeft }}%</span>
                </div>
                <ProgressBar :percent="timeLeft" />
            </div>
            <slot />
        </div>
    </div>
</template>
<script setup>
// 마감 임박 펀딩 카드
// props:
// - image: 썸네일 이미지 URL
// - title: 펀딩 제목
// - timeLeft: 남은 시간(문자열)
// - participants: 참여자 수
// - progress: 진행률(숫자)
import ProgressBar from '@/components/common/ProgressBar.vue'

defineProps({
    image: String,
    title: String,
    timeLeft: String,
    participants: Number,
    progress: Number,
})
</script>
