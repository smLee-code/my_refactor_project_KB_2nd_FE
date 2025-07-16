<template>
  <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">프로젝트 소개</h3>
    
    <div class="prose max-w-none">
      <p class="text-lg text-gray-700 leading-relaxed mb-8">
        {{ project.description }}
      </p>
      
      <div class="space-y-8">
        <section>
          <h4 class="text-xl font-bold text-gray-900 mb-4">주요 특징</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start gap-4">
              <div class="bg-[#FFD338]/20 p-3 rounded-xl">
                <i class="ri-wireless-charging-line text-[#FFD338] w-6 h-6 flex items-center justify-center"></i>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900 mb-2">무선 충전 기능</h5>
                <p class="text-gray-600 text-sm">Qi 표준 무선 충전을 지원하여 편리한 충전이 가능합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="bg-[#6B5B4C]/20 p-3 rounded-xl">
                <i class="ri-puzzle-line text-[#6B5B4C] w-6 h-6 flex items-center justify-center"></i>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900 mb-2">모듈러 시스템</h5>
                <p class="text-gray-600 text-sm">다양한 액세서리를 연결할 수 있는 모듈러 디자인입니다.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h4 class="text-xl font-bold text-gray-900 mb-6">제품 이미지</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(image, index) in project.images" :key="index" class="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img
                :src="`https://readdy.ai/api/search-image?query=${image}`"
                :alt="`제품 이미지 ${index + 1}`"
                class="w-full h-64 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>
        
        <section>
          <h4 class="text-xl font-bold text-gray-900 mb-4">기술 사양</h4>
          <div class="bg-gray-50 rounded-xl p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="flex justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">호환성</span>
                <span class="font-medium text-gray-900">iPhone 12 이상</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">충전 속도</span>
                <span class="font-medium text-gray-900">15W 고속 충전</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">재질</span>
                <span class="font-medium text-gray-900">프리미엄 TPU</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">색상</span>
                <span class="font-medium text-gray-900">블랙, 화이트</span>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h4 class="text-xl font-bold text-gray-900 mb-4">개발 일정</h4>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 bg-[#FFD338] rounded-full flex items-center justify-center">
                <i class="ri-check-line text-black w-4 h-4 flex items-center justify-center"></i>
              </div>
              <div>
                <h5 class="font-medium text-gray-900">프로토타입 완성</h5>
                <p class="text-sm text-gray-600">2024년 1월</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 bg-[#6B5B4C] rounded-full flex items-center justify-center">
                <i class="ri-settings-line text-white w-4 h-4 flex items-center justify-center"></i>
              </div>
              <div>
                <h5 class="font-medium text-gray-900">대량 생산 준비</h5>
                <p class="text-sm text-gray-600">2024년 3월</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i class="ri-truck-line text-gray-600 w-4 h-4 flex items-center justify-center"></i>
              </div>
              <div>
                <h5 class="font-medium text-gray-900">제품 출시 및 배송</h5>
                <p class="text-sm text-gray-600">2024년 5월</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
