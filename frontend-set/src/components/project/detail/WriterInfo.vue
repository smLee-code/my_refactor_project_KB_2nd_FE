<template>
    <div v-if="detail && detail.basicInfo" class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">작성자 정보</h3>
        <div class="flex items-center space-x-4 mb-4">
            <div>
                <h4
                    class="text-xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                    {{ detail.basicInfo.nickname
                    }}<span class="text-lg text-gray-400 font-normal"> 님</span>
                </h4>
                <div class="flex items-center gap-1">
                    <BadgeDisplay :badges="detail.basicInfo.badges || []" />
                </div>
            </div>
        </div>
        <div class="space-y-2 text-sm">
            <div class="flex items-center space-x-2">
                <i class="fas fa-envelope text-gray-400"></i>
                <span class="text-gray-600">{{ detail.basicInfo.email }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import BadgeDisplay from '@/components/common/BadgeDisplay.vue'

defineProps({
    detail: Object,
})
</script>
