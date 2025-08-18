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
                    <!-- <p class="text-sm text-gray-600 m-0">뱃지등급:</p> -->
                    <BadgeDisplay :badges="detail.basicInfo.badges || []" />
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
import BadgeDisplay from '@/components/common/BadgeDisplay.vue'

defineProps({
    detail: Object,
})
</script>
