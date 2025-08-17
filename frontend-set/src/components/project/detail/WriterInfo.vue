<template>
    <div v-if="detail && detail.basicInfo" class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">작성자 정보</h3>
        <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <i class="fas fa-user text-gray-600"></i>
            </div>
            <div>
                <h4 class="font-medium text-gray-900">{{ detail.basicInfo.nickname }}</h4>
                <div class="flex items-center gap-1">
                    <!-- <p class="text-sm text-gray-600 m-0">뱃지등급:</p> -->
                    <img
                        v-for="badge in detail.basicInfo.badges"
                        :key="badge.badgeId"
                        class="w-8 h-8"
                        :src="`/images/badges/${badge.badgeId}.webp`"
                    />
                </div>
            </div>
        </div>
        <!-- <p class="text-gray-600 text-sm mb-4">
      지역 발전과 소상공인 지원을 위한 다양한 프로젝트를 추진하고 있습니다.
    </p> -->
        <div class="space-y-2 text-sm">
            <div class="flex items-center space-x-2">
                <i class="fas fa-envelope text-gray-400"></i>
                <span class="text-gray-600">{{ detail.basicInfo.email }}</span>
            </div>
            <!-- <div class="flex items-center space-x-2">
        <i class="fas fa-phone text-gray-400"></i>
        <span class="text-gray-600">02-3396-4000</span>
      </div> -->
            <!-- <div class="flex items-center space-x-2">
        <i class="fas fa-globe text-gray-400"></i>
        <a href="#" class="text-blue-600 hover:text-blue-800 cursor-pointer">www.junggu.seoul.kr</a>
      </div> -->
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
    detail: Object,
})
</script>
