<template>
    <div
        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
        @click="handleCardClick"
    >
        <div class="p-3">
            <div class="w-full h-56 bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-inner">
                <a :href="link" target="_blank">
                    <img
                        :src="image"
                        :alt="title"
                        class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    />
                </a>
            </div>
            <div class="px-3 pb-4">
                <h4 class="font-semibold text-gray-900 mb-1">{{ title }}</h4>
                <p class="text-sm text-gray-600 mb-3">{{ description }}</p>
                <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span class="bg-gray-100 px-2 py-1 rounded-full">D-{{ daysLeft }}</span>
                    <span :class="categoryClass">{{ category }}</span>
                    <div class="flex items-center bg-blue-50 px-2 py-1 rounded-full ml-auto">
                        <i class="fas fa-user-group text-blue-500 mr-1"></i>
                        <span>{{ likes }}</span>
                    </div>
                </div>
                <div class="mb-2">
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                        <span>진행률</span>
                        <span>{{ progress }}%</span>
                    </div>
                    <ProgressBar :percent="progress" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// 일반 펀딩 카드
// props:
// - image: 썸네일 이미지 URL
// - title: 펀딩 제목
// - description: 설명
// - daysLeft: 남은 일수
// - category: 카테고리명
// - likes: 좋아요 수
// - progress: 진행률(숫자)
// - link: 상세 페이지 링크(선택)
import ProgressBar from '@/components/common/ProgressBar.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
    fundType: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: '/default.jpg',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '금융기관 정보 없음',
    },
    daysLeft: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    progress: {
        type: Number,
        default: 0, // 백엔드에서 퍼센트 없을 경우 대비
    },
})

const router = useRouter()

const handleCardClick = () => {
    // 펀딩 상세 페이지로 이동
    router.push(`/funding/detail/${props.id}`)
}

const categoryClass = computed(() => {
    return [
        'px-2 py-1 rounded-full text-white',
        props.category === '저축형'
            ? 'bg-blue-500'
            : props.category === '대출형'
              ? 'bg-green-500'
              : props.category === '기부형'
                ? 'bg-purple-500'
                : props.category === '챌린지형'
                  ? 'bg-orange-500'
                  : 'bg-gray-400',
    ]
})
</script>
