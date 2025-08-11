<template>
    <div class="flex flex-wrap gap-2">
        <div v-for="badge in badges" :key="badge.badgeId" class="relative group">
            <!-- 뱃지 이미지 -->
            <div
                class="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                :class="getBadgeColorClass(badge.name)"
            >
                <img
                    :src="getBadgeImage(badge.name)"
                    :alt="badge.name"
                    class="w-8 h-8 object-contain"
                    @error="handleImageError"
                />
            </div>

            <!-- 뱃지 툴팁 -->
            <div
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10"
            >
                <div class="font-semibold">{{ badge.name }}</div>
                <div class="text-gray-300">{{ getBadgeDescription(badge.description) }}</div>
            </div>
        </div>

        <!-- 뱃지가 없을 때 -->
        <div v-if="badges.length === 0" class="text-gray-500 text-sm">
            아직 획득한 뱃지가 없습니다.
        </div>
    </div>
</template>

<script setup>
import { getBadgeImage, getBadgeColorClass, getBadgeDescription } from '@/utils/badgeUtils'

const props = defineProps({
    badges: {
        type: Array,
        default: () => [],
    },
})

const handleImageError = (event) => {
    // 이미지 로드 실패 시 기본 뱃지 이미지로 대체
    event.target.src = '/images/badges/1.webp'
}
</script>

<style scoped>
/* 뱃지 호버 효과 */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

/* 툴팁 화살표 */
.group:hover .group-hover\:opacity-100::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #1f2937;
}
</style>
