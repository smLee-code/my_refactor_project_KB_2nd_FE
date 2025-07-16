<template>
  <section class="py-20 px-6 bg-gradient-to-br from-white via-red-50 to-orange-50">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-16">
        <div>
          <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 px-6 py-3 rounded-2xl border border-red-100 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <i class="ri-alarm-warning-line text-white w-5 h-5 flex items-center justify-center"></i>
            </div>
            <span class="text-red-700 font-semibold">마감 임박</span>
          </div>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">놓치면 안 될 기회</h2>
          <p class="text-xl text-gray-600">시간이 얼마 남지 않은 특별한 프로젝트들</p>
        </div>
        
        <div class="hidden md:flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg border border-red-100">
          <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
            <i class="ri-time-line text-white w-6 h-6 flex items-center justify-center"></i>
          </div>
          <div>
            <div class="text-2xl font-bold text-red-600">2개</div>
            <div class="text-sm text-gray-500">마감 임박 프로젝트</div>
          </div>
        </div>
      </div>
      
      <div class="space-y-12">
        <router-link :to="`/project/${project.id}`" v-for="project in deadlineProjects" :key="project.id">
          <div class="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden cursor-pointer border-2 border-red-100 hover:border-red-200 transform hover:-translate-y-2">
            <div class="md:flex">
              <div class="md:w-2/5 h-80 md:h-auto bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <img 
                  :src="`https://readdy.ai/api/search-image?query=${project.image}`"
                  :alt="project.title"
                  class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div class="absolute top-6 left-6">
                  <div class="bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                    <div class="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center animate-pulse">
                      <i class="ri-alarm-warning-line w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <div class="font-bold text-lg">{{ project.days }}일 {{ project.hours }}시간</div>
                      <div class="text-xs opacity-90">남음</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="md:w-3/5 p-8 md:p-12">
                <div class="flex items-center gap-4 mb-6">
                  <div class="bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-xl shadow-lg">
                    <span class="text-white font-bold text-sm">마감 임박</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-500 text-sm">
                    <i class="ri-user-heart-line w-4 h-4 flex items-center justify-center"></i>
                    <span class="font-medium">{{ project.backers.toLocaleString() }}명 참여</span>
                  </div>
                </div>
                
                <h3 class="font-bold text-3xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {{ project.title }}
                </h3>
                
                <p class="text-gray-600 mb-8 leading-relaxed text-lg">
                  {{ project.description }}
                </p>
                
                <div class="mb-8">
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-4">
                      <span class="text-3xl font-bold text-gray-900">{{ project.current }}</span>
                      <span class="text-gray-500">/ {{ project.goal }}</span>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-blue-600">{{ project.progress }}%</div>
                      <div class="text-sm text-gray-500">달성</div>
                    </div>
                  </div>
                  
                  <div class="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-blue-500 via-indigo-600 to-red-500 h-4 rounded-full transition-all duration-1000 shadow-lg" 
                      :style="{ width: project.progress + '%' }"
                    ></div>
                  </div>
                </div>
                
                <div class="flex gap-4">
                  <button class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xl hover:shadow-2xl transform group-hover:scale-105">
                    지금 후원하기
                  </button>
                  <button class="bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 cursor-pointer">
                    <i class="ri-heart-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const deadlineProjects = ref([
  {
    id: 1,
    title: "스마트 반려동물 케어 시스템",
    description: "AI 기반 반려동물 건강관리 및 모니터링 솔루션으로, 실시간 건강 상태 추적과 응급상황 알림 기능을 제공합니다. 사랑하는 반려동물의 건강을 더욱 체계적으로 관리할 수 있습니다.",
    current: "420만원",
    goal: "500만원",
    progress: 84,
    backers: 1247,
    days: 3,
    hours: 14,
    image: "Smart pet care system with AI health monitoring, modern pet technology, cute animals with high-tech devices, clean veterinary technology design&width=600&height=300&seq=deadline1&orientation=landscape"
  },
  {
    id: 2,
    title: "지속가능한 패키징 혁신 프로젝트",
    description: "100% 생분해성 소재로 제작된 친환경 포장재 개발 프로젝트입니다. 플라스틱을 대체할 수 있는 혁신적인 솔루션을 제공하여 지구 환경 보호에 기여합니다.",
    current: "680만원",
    goal: "800만원",
    progress: 85,
    backers: 892,
    days: 1,
    hours: 8,
    image: "Sustainable biodegradable packaging materials, eco-friendly product design, zero waste packaging solutions, green environmental technology&width=600&height=300&seq=deadline2&orientation=landscape"
  }
]);
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
