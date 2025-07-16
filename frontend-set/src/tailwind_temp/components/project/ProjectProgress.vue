<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
    <div class="text-center mb-6">
      <div class="text-3xl font-bold text-gray-900 mb-2">
        {{ formatCurrency(progress.current) }}
      </div>
      <div class="text-sm text-gray-600">
        목표 {{ formatCurrency(progress.goal) }} 중
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="mb-6">
      <div class="flex justify-between text-sm text-gray-600 mb-2">
        <span>{{ progress.percentage }}% 달성</span>
        <span class="text-[#FF5858] font-medium">{{ progress.daysLeft }}일 남음</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div 
          class="bg-gradient-to-r from-[#FFD338] to-[#6B5B4C] h-3 rounded-full transition-all duration-300" 
          :style="{ width: progress.percentage + '%' }"
        ></div>
      </div>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="text-center p-4 bg-gray-50 rounded-xl">
        <div class="flex items-center justify-center mb-2">
          <i class="ri-user-heart-line text-[#FFD338] w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div class="text-xl font-bold text-gray-900">
          {{ progress.backers.toLocaleString() }}
        </div>
        <div class="text-xs text-gray-600">참여자</div>
      </div>
      
      <div class="text-center p-4 bg-gray-50 rounded-xl">
        <div class="flex items-center justify-center mb-2">
          <i class="ri-heart-line text-[#6B5B4C] w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div class="text-xl font-bold text-gray-900">
          {{ progress.likes.toLocaleString() }}
        </div>
        <div class="text-xs text-gray-600">좋아요</div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="space-y-3">
      <button class="w-full bg-gradient-to-r from-[#FFD338] to-[#FFBC00] text-black py-4 rounded-xl font-bold text-lg hover:from-[#FFBC00] hover:to-[#FFD338] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl">
        후원하기
      </button>
      
      <div class="grid grid-cols-2 gap-3">
        <button class="border border-[#6B5B4C] text-[#6B5B4C] hover:bg-[#6B5B4C] hover:text-white py-3 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap">
          알림 설정
        </button>
        <button class="border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap">
          공유하기
        </button>
      </div>
    </div>
    
    <!-- Safety Info -->
    <div class="mt-6 p-4 bg-blue-50 rounded-xl">
      <div class="flex items-center gap-2 mb-2">
        <i class="ri-shield-check-line text-blue-600 w-4 h-4 flex items-center justify-center"></i>
        <span class="text-sm font-medium text-blue-900">안전한 후원 보장</span>
      </div>
      <p class="text-xs text-blue-700 leading-relaxed">
        펀딩 목표 미달성시 전액 환불되며, 카드 결제는 프로젝트 성공 후 실제 결제됩니다.
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const formatCurrency = (amount) => {
  return `₩${(amount / 10000).toFixed(0)}만원`;
};
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
