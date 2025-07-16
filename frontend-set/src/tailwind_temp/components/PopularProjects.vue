<template>
  <section class="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <i class="ri-fire-line text-white w-4 h-4 flex items-center justify-center"></i>
          </div>
          <span class="text-sm text-blue-700 font-semibold">인기 프로젝트</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">당신이 좋아할만한 펀딩</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">혁신적인 아이디어들이 현실이 되는 순간을 함께해보세요</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link :to="`/project/${project.id}`" v-for="project in projects" :key="project.id">
          <div class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
            <div class="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <img 
                :src="`https://readdy.ai/api/search-image?query=${project.image}`"
                :alt="project.title"
                class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              <div class="absolute top-4 left-4">
                <div :class="`bg-gradient-to-r ${getCategoryColor(project.category)} px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg`">
                  <i :class="`${getCategoryIcon(project.category)} text-white w-4 h-4 flex items-center justify-center`"></i>
                  <span class="text-white text-sm font-semibold">{{ project.category }}</span>
                </div>
              </div>
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                  <i class="ri-heart-line text-gray-700 w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {{ project.title }}
              </h3>
              
              <div class="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div class="flex items-center gap-1">
                  <i class="ri-user-line w-4 h-4 flex items-center justify-center"></i>
                  <span>{{ project.backers }}명</span>
                </div>
                <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div class="flex items-center gap-1">
                  <i class="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                  <span class="text-amber-600 font-medium">{{ project.days }}일 남음</span>
                </div>
              </div>
              
              <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-3">
                  <span class="font-semibold">{{ project.progress }}% 달성</span>
                  <span>목표: {{ project.goal }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 shadow-sm" 
                    :style="{ width: project.progress + '%' }"
                  ></div>
                </div>
                <p class="font-bold text-xl text-gray-900">
                  {{ project.current }}
                </p>
              </div>
              
              <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform group-hover:scale-105">
                자세히 보기
              </button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    id: 1,
    title: "스마트폰을 위한 혁신적인 스마트 케이스",
    category: "테크",
    image: "Modern smartphone with innovative smart case featuring wireless charging and modular design, clean white background, product photography style, high-tech accessories&width=300&height=200&seq=project1&orientation=landscape",
    progress: 85,
    goal: "50만원",
    current: "42만 5천원",
    days: 15,
    backers: 127
  },
  {
    id: 2,
    title: "친환경 소재로 만든 스마트 백팩 디자인",
    category: "디자인",
    image: "Eco-friendly smart backpack made from sustainable materials, minimalist design with tech integration, clean studio lighting, modern lifestyle product&width=300&height=200&seq=project2&orientation=landscape",
    progress: 92,
    goal: "100만원",
    current: "92만원",
    days: 8,
    backers: 203
  },
  {
    id: 3,
    title: "인디게임 개발을 위한 크리에이티브 펀딩",
    category: "게임",
    image: "Creative indie game development workspace with colorful art assets, pixel art characters, retro gaming elements, artistic studio environment&width=300&height=200&seq=project3&orientation=landscape",
    progress: 67,
    goal: "200만원",
    current: "134만원",
    days: 22,
    backers: 89
  },
  {
    id: 4,
    title: "도시농업을 위한 스마트 화분 시스템",
    category: "테크",
    image: "Smart urban farming pot system with IoT sensors, hydroponic setup, green plants in modern white containers, clean technology design&width=300&height=200&seq=project4&orientation=landscape",
    progress: 78,
    goal: "80만원",
    current: "62만 4천원",
    days: 12,
    backers: 156
  },
  {
    id: 5,
    title: "지속가능한 패션 브랜드 런칭 프로젝트",
    category: "디자인",
    image: "Sustainable fashion brand showcase with eco-friendly clothing, organic cotton materials, minimalist fashion photography, natural textures&width=300&height=200&seq=project5&orientation=landscape",
    progress: 55,
    goal: "150만원",
    current: "82만 5천원",
    days: 30,
    backers: 74
  },
  {
    id: 6,
    title: "음악 창작을 위한 AI 기반 작곡 도구",
    category: "테크",
    image: "AI music composition software interface with waveforms, digital audio workstation, modern music production setup, creative technology&width=300&height=200&seq=project6&orientation=landscape",
    progress: 89,
    goal: "120만원",
    current: "106만 8천원",
    days: 5,
    backers: 234
  }
]);

const getCategoryColor = (category) => {
  switch(category) {
    case '테크': return 'from-blue-500 to-cyan-500';
    case '디자인': return 'from-purple-500 to-pink-500';
    case '게임': return 'from-emerald-500 to-teal-500';
    default: return 'from-gray-500 to-slate-500';
  }
};

const getCategoryIcon = (category) => {
  switch(category) {
    case '테크': return 'ri-smartphone-line';
    case '디자인': return 'ri-palette-line';
    case '게임': return 'ri-gamepad-line';
    default: return 'ri-star-line';
  }
};
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
