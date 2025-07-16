<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <h3 class="text-xl font-bold text-gray-900 mb-6">후원 옵션 선택</h3>
    
    <div class="space-y-4">
      <div
        v-for="option in fundingOptions"
        :key="option.id"
        :class="[`border-2 rounded-xl p-5 cursor-pointer transition-all`, 
          selectedOption === option.id
            ? 'border-[#FFD338] bg-[#FFD338]/5'
            : 'border-gray-200 hover:border-[#FFD338]/50'
        ]"
        @click="selectedOption = option.id"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h4 class="font-bold text-lg text-gray-900">{{ option.title }}</h4>
              <span v-if="option.limited" class="bg-[#FF5858] text-white px-2 py-1 text-xs rounded-full">
                한정 {{ option.remaining }}개 남음
              </span>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ option.description }}</p>
            
            <!-- Benefits -->
            <div class="space-y-1 mb-3">
              <div v-for="(benefit, index) in option.benefits" :key="index" class="flex items-center gap-2 text-sm">
                <i class="ri-check-line text-[#FFD338] w-4 h-4 flex items-center justify-center"></i>
                <span class="text-gray-700">{{ benefit }}</span>
              </div>
            </div>
            
            <div class="text-xs text-gray-500">
              예상 배송: {{ option.delivery }}
            </div>
          </div>
          
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-900">
              {{ formatPrice(option.amount) }}
            </div>
            <div v-if="option.originalPrice" class="text-sm text-gray-500 line-through">
              {{ formatPrice(option.originalPrice) }}
            </div>
          </div>
        </div>
        
        <div v-if="option.limited" class="mt-3">
          <div class="flex justify-between text-xs text-gray-600 mb-1">
            <span>한정 수량</span>
            <span>{{ option.remaining }}/{{ option.limited }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-[#FF5858] to-[#FFD338] h-2 rounded-full" 
              :style="{ width: (((option.limited - option.remaining) / option.limited) * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedOption" class="mt-6 pt-6 border-t border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <span class="text-gray-700">선택한 옵션:</span>
        <span class="font-bold text-gray-900">
          {{ fundingOptions.find(opt => opt.id === selectedOption)?.title }}
        </span>
      </div>
      
      <button class="w-full bg-gradient-to-r from-[#FFD338] to-[#6B5B4C] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap">
        {{ formatPrice(fundingOptions.find(opt => opt.id === selectedOption)?.amount || 0) }} 후원하기
      </button>
      
      <p class="text-xs text-gray-500 text-center mt-3">
        결제는 펀딩 성공 후에 진행됩니다
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedOption = ref(null);

const fundingOptions = ref([
  {
    id: 1,
    amount: 25000,
    title: "얼리버드 할인",
    description: "제품 1개 + 스페셜 패키징",
    originalPrice: 35000,
    delivery: "2024년 5월",
    limited: 50,
    remaining: 12,
    benefits: ["30% 할인", "스페셜 패키징", "우선 배송"]
  },
  {
    id: 2,
    amount: 45000,
    title: "스탠다드 패키지",
    description: "제품 1개 + 추가 액세서리",
    delivery: "2024년 5월",
    benefits: ["제품 1개", "무선 충전 패드", "전용 파우치"]
  },
  {
    id: 3,
    amount: 85000,
    title: "프리미엄 패키지",
    description: "제품 2개 + 풀 액세서리 세트",
    delivery: "2024년 5월",
    benefits: ["제품 2개", "무선 충전 패드", "모든 모듈 액세서리", "전용 케이스"]
  }
]);

const formatPrice = (price) => {
  return `₩${price.toLocaleString()}`;
};
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
