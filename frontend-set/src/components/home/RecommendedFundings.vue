<template>
    <!-- 당신이 좋아할만한 펀딩 -->
    <div>
        <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 drop-shadow-sm">
                {{ authStore.isLoggedIn ? '당신이 좋아할만한 펀딩' : '인기 펀딩' }}
            </h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FundingCard
                v-for="item in popularFundings"
                :key="item.id"
                :id="item.id"
                :fundType="item.fundType"
                :image="item.image"
                :title="item.title"
                :description="item.description"
                :daysLeft="item.daysLeft"
                :category="item.category"
                :likes="item.likes"
                :progress="item.progress"
            />
        </div>
    </div>
</template>

<script setup>
import FundingCard from '@/components/funding/FundingCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

defineProps({
    popularFundings: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>