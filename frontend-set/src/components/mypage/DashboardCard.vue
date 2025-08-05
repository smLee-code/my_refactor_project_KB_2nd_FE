<template>
    <!-- <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
            <i :class="icon" :style="{ color: iconColor }" class="text-xl"></i>
        </div>
        <slot></slot>
    </div> -->

    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
            <i class="fas fa-chart-line text-blue-600 text-xl"></i>
        </div>
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
            <div
                class="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center"
            >
                <canvas ref="dashboardChart" class="w-full h-full"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    totalFunding: Number
    activeFunding: Number
    title: string
    icon: string
    iconColor?: string
}>()
</script>
