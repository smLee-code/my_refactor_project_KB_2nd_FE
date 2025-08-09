<template>
    <Card>
        <div class="mt-1 bg-white rounded-xl shadow-sm max-w-7xl mx-auto">
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
                                :style="{
                                    backgroundColor: item.statusBg,
                                    color: item.statusColor,
                                }"
                                >{{ item.status }}</span
                            >
                        </td>
                        <td class="py-3 px-4">
                            <button
                                class="text-[#287EFF] hover:text-[#1B5FBF] text-sm cursor-pointer !rounded-button whitespace-nowrap px-2 py-1"
                            >
                                바로가기
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Card>
</template>

<script setup>
import Card from './Card.vue'

defineProps({
    headers: { type: Array, required: true },
    data: { type: Array, required: true },
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
