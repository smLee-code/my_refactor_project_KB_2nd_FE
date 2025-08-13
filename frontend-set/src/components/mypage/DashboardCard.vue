<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">총 펀딩 수</span>
                <div class="text-right flex items-center gap-2">
                    <span class="text-green-500 text-sm">
                        <i class="fas fa-arrow-trend-up"></i>
                    </span>
                    <span class="text-2xl font-bold text-gray-800">{{ totalFunding || 0 }}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">진행 중인 펀딩</span>
                <div class="text-right flex items-center gap-2">
                    <span class="text-green-500 text-sm">
                        <i class="fas fa-arrow-trend-up"></i>
                    </span>
                    <span class="text-2xl font-bold text-amber-600">{{ progressFunding || 0 }}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">7일 내 마감 펀딩</span>
                <span class="text-2xl font-bold text-red-500">{{ urgentFunding || 0 }}</span>
            </div>

            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">오늘 시작한 펀딩</span>
                    <span class="text-2xl font-bold text-indigo-600">{{ todayProducts || 0 }}</span>
                </div>
                <div class="bg-amber-50 rounded-lg p-3 cursor-pointer hover:bg-amber-100 transition-colors" @click="goToFunding(recentFundingId)">
                    <div class="text-xs text-amber-700 mb-1">최근 생성된 펀딩</div>
                    <div class="text-sm font-medium text-amber-800">{{ recentFunding || '없음' }}</div>
                </div>
                <div class="bg-indigo-50 rounded-lg p-3 cursor-pointer hover:bg-indigo-100 transition-colors" @click="goToFunding(bestFundingId)">
                    <div class="text-xs text-indigo-700 mb-1">최근 생성된 펀딩</div>
                    <div class="text-sm font-medium text-indigo-800">{{ bestFunding || '없음' }}</div>
                </div>
            </div>
            <!-- <div
                class="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center"
            >
                <canvas ref="dashboardChart" class="w-full h-full"></canvas>
            </div> -->
        </div>
    </Card>
</template>

<script setup>
import Card from './Card.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    iconColor: { type: String, default: '#000' },
    totalFunding: { type: Number, default: 0 },
    progressFunding: { type: Number, default: 0 },
    urgentFunding: { type: Number, default: 0 },
    todayProducts: { type: Number, default: 0 },
    recentFunding: { type: String, default: '' },
    bestFunding: { type: String, default: '' },
    recentFundingId: { type: Number, default: null },
    bestFundingId: { type: Number, default: null },
})

const goToFunding = (fundId) => {
    if (fundId) {
        router.push(`/funding/detail/${fundId}`)
    }
}
</script>
