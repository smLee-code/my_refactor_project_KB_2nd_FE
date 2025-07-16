<template>
  <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
        <i class="ri-fire-line text-white w-6 h-6 flex items-center justify-center"></i>
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-900">인기 프로젝트</h3>
        <p class="text-sm text-gray-500">실시간 랭킹</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <router-link :to="`/project/${project.id}`" v-for="project in projects" :key="project.id">
        <div class="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100">
          <div :class="`
            w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold text-white shadow-lg
            bg-gradient-to-br ${getRankStyle(project.rank)} transform group-hover:scale-110 transition-transform duration-300
          `">
            {{ project.rank }}
          </div>
          
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {{ project.title }}
            </h4>
            
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {{ project.category }}
              </span>
              <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span class="text-xs text-gray-500">{{ project.progress }}% 달성</span>
            </div>
            
            <div class="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500" 
                :style="{ width: project.progress + '%' }"
              ></div>
            </div>
            
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-600 font-medium">{{ project.current }}</span>
              <div class="flex items-center gap-1 text-amber-600">
                <i class="ri-time-line w-3 h-3 flex items-center justify-center"></i>
                <span class="font-medium">{{ project.days }}일</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    
    <router-link to="/projects" class="block mt-6 text-center">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 py-3 rounded-2xl font-semibold transition-all duration-300 border border-blue-100 hover:border-blue-200">
        더 많은 프로젝트 보기 →
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    id: 1,
    rank: 1,
    title: "스마트폰을 위한 혁신적인 스마트 케이스",
    category: "테크",
    progress: 85,
    goal: "50만원",
    current: "42만 5천원",
    days: 15
  },
  {
    id: 2,
    rank: 2,
    title: "친환경 소재로 만든 스마트 백팩 디자인",
    category: "디자인",
    progress: 92,
    goal: "100만원",
    current: "92만원",
    days: 8
  },
  {
    id: 3,
    rank: 3,
    title: "인디게임 개발을 위한 크리에이티브 펀딩",
    category: "게임",
    progress: 67,
    goal: "200만원",
    current: "134만원",
    days: 22
  },
  {
    id: 4,
    rank: 4,
    title: "도시농업을 위한 스마트 화분 시스템",
    category: "테크",
    progress: 78,
    goal: "80만원",
    current: "62만 4천원",
    days: 12
  },
  {
    id: 5,
    rank: 5,
    title: "지속가능한 패션 브랜드 런칭 프로젝트",
    category: "디자인",
    progress: 55,
    goal: "150만원",
    current: "82만 5천원",
    days: 30
  }
]);

const getRankStyle = (rank) => {
  if (rank === 1) return 'from-amber-400 to-yellow-500';
  if (rank === 2) return 'from-gray-300 to-gray-400';
  if (rank === 3) return 'from-amber-600 to-orange-500';
  return 'from-slate-400 to-slate-500';
};
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
