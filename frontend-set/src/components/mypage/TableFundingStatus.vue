<template>
    <div class="mt-8 bg-white rounded-xl shadow-sm p-6 max-w-7xl mx-auto">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">최근 펀딩 현황</h3>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th
                            v-for="head in headers"
                            :key="head"
                            class="text-left py-3 px-4 text-sm font-medium text-gray-700"
                        >
                            {{ head }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, idx) in data"
                        :key="idx"
                        class="border-b hover:bg-blue-50 transition-colors"
                    >
                        <td class="py-3 px-4 text-sm text-gray-800">{{ item.name }}</td>
                        <td class="py-3 px-4 text-sm text-gray-600">{{ item.type }}</td>
                        <td class="py-3 px-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                        class="h-2 rounded-full"
                                        :style="{
                                            width: item.progress + '%',
                                            backgroundColor: item.progressColor,
                                        }"
                                    ></div>
                                </div>
                                <span class="text-sm text-gray-600">{{ item.progress }}%</span>
                            </div>
                        </td>
                        <td class="py-3 px-4 text-sm text-gray-600">{{ item.participants }}</td>
                        <td class="py-3 px-4 text-sm text-gray-600">{{ item.deadline }}</td>
                        <td class="py-3 px-4">
                            <span
                                class="text-xs px-2 py-1 rounded-full"
                                :style="{ backgroundColor: item.statusBg, color: item.statusColor }"
                                >{{ item.status }}</span
                            >
                        </td>
                        <td class="py-3 px-4">
                            <button
                                class="text-[#287EFF] hover:text-[#1B5FBF] text-sm cursor-pointer !rounded-button whitespace-nowrap px-2 py-1"
                            >
                                관리
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    headers: string[]
    data: {
        name: string
        type: string
        progressColor: string
        participants: number
        deadline: string
        status: string
        statusBg: string
        statusColor: string
    }[]
}>()
</script>
