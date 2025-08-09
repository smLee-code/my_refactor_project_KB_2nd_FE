<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">총 펀딩 수</span>
                <div class="text-right">
                    <span class="text-2xl font-bold text-gray-800">{{ totalFunding }}</span>
                    <!-- rate 로 넣어주기 -->
                    <span class="text-green-500 text-sm ml-2">↗ +12%</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">활성 펀딩</span>
                <div class="text-right">
                    <span class="text-xl font-semibold text-blue-600">{{ activeFunding }}</span>
                    <span class="text-green-500 text-sm ml-2">↗ +8%</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">진행 중인 펀딩</span>
                <span class="text-2xl font-bold text-amber-600">42</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">마감 임박</span>
                <span class="text-lg font-semibold text-red-500">8</span>
            </div>

            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">등록된 상품</span>
                    <span class="text-2xl font-bold text-indigo-600">156</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">인기 상품</span>
                    <span class="text-lg font-semibold text-orange-500">23</span>
                </div>
                <div class="bg-amber-50 rounded-lg p-3">
                    <div class="text-xs text-amber-700 mb-1">최근 생성된 펀딩</div>
                    <div class="text-sm font-medium text-amber-800">청년 창업 지원 펀딩</div>
                </div>
                <div class="bg-indigo-50 rounded-lg p-3">
                    <div class="text-xs text-indigo-700 mb-1">이번 달 베스트</div>
                    <div class="text-sm font-medium text-indigo-800">청년 저축 플러스</div>
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

defineProps({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    iconColor: { type: String, default: '#000' },
    totalFunding: { type: Number, default: 0 },
    activeFunding: { type: Number, default: 0 },
})
</script>
