<template>
  <section class="py-16 px-6 bg-gradient-to-br from-[#FFD338]/10 to-[#FFBC00]/5">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">함께 만들어가는 성과</h2>
        <p class="text-gray-600 text-lg">창작자와 후원자가 함께 이룬 놀라운 결과들</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(stat, index) in stats" :key="index" class="text-center group">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FFD338]">
            <div :class="`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 group-hover:bg-[#FFD338]/10 transition-colors`">
              <i :class="`${stat.icon} text-2xl ${stat.color} w-8 h-8 flex items-center justify-center`"></i>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-2">
              {{ stat.number }}
            </div>
            <div class="text-gray-600 text-sm font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-4">지금도 계속 성장하고 있어요</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div class="flex items-center gap-2 text-gray-600">
              <i class="ri-time-line text-[#FFD338] w-5 h-5 flex items-center justify-center"></i>
              <span>실시간 업데이트</span>
            </div>
            <div class="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div class="flex items-center gap-2 text-gray-600">
              <i class="ri-global-line text-[#287EFF] w-5 h-5 flex items-center justify-center"></i>
              <span>전 세계 창작자 지원</span>
            </div>
            <div class="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div class="flex items-center gap-2 text-gray-600">
              <i class="ri-shield-check-line text-[#00C851] w-5 h-5 flex items-center justify-center"></i>
              <span>안전한 펀딩 보장</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref([
  {
    number: "2,847",
    label: "성공한 프로젝트",
    icon: "ri-trophy-line",
    color: "text-[#FFD338]"
  },
  {
    number: "₩45억",
    label: "누적 펀딩 금액",
    icon: "ri-funds-line",
    color: "text-[#287EFF]"
  },
  {
    number: "125,000+",
    label: "후원자 수",
    icon: "ri-user-heart-line",
    color: "text-[#FF5858]"
  },
  {
    number: "98.5%",
    label: "후원자 만족도",
    icon: "ri-heart-line",
    color: "text-[#00C851]"
  }
]);
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
