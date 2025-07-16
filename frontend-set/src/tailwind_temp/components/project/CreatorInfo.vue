<template>
  <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
    <h3 class="text-xl font-bold text-gray-900 mb-6">제안자 정보</h3>
    
    <div class="flex items-start gap-6">
      <!-- Avatar -->
      <div class="relative">
        <img
          :src="`https://readdy.ai/api/search-image?query=${creator.avatar}`"
          :alt="creator.name"
          class="w-20 h-20 rounded-full object-cover object-top"
        />
        <div class="absolute -bottom-1 -right-1 bg-[#FFD338] p-1 rounded-full">
          <i class="ri-check-line text-black w-4 h-4 flex items-center justify-center"></i>
        </div>
      </div>
      
      <!-- Info -->
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <h4 class="text-lg font-bold text-gray-900">{{ creator.name }}</h4>
          <span class="bg-[#6B5B4C] text-white px-3 py-1 text-xs rounded-full font-medium">
            {{ creator.badge }}
          </span>
        </div>
        
        <p class="text-[#6B5B4C] font-medium mb-3">{{ creator.company }}</p>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">
          {{ creator.description }}
        </p>
        
        <!-- Stats -->
        <div class="flex items-center gap-6 text-sm">
          <div class="flex items-center gap-2">
            <i class="ri-folder-line text-[#FFD338] w-4 h-4 flex items-center justify-center"></i>
            <span class="text-gray-600">진행 프로젝트</span>
            <span class="font-semibold text-gray-900">{{ creator.projects }}개</span>
          </div>
          <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div class="flex items-center gap-2">
            <i class="ri-trophy-line text-[#6B5B4C] w-4 h-4 flex items-center justify-center"></i>
            <span class="text-gray-600">성공률</span>
            <span class="font-semibold text-gray-900">{{ creator.successRate }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-col gap-3">
        <button class="bg-[#FFD338] hover:bg-[#FFBC00] text-black px-6 py-2 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
          팔로우
        </button>
        <button class="border border-gray-300 hover:border-[#6B5B4C] text-gray-700 px-6 py-2 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
          메시지
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  creator: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
