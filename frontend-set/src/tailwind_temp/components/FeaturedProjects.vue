<template>
  <section class="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-3 rounded-2xl border border-purple-100 mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <i class="ri-star-line text-white w-5 h-5 flex items-center justify-center"></i>
          </div>
          <span class="text-purple-700 font-semibold">편집자 추천</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 mb-6">특별한 프로젝트</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          엄선된 혁신적인 아이디어들과 함께 미래를 만들어보세요
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link :to="`/project/${project.id}`" v-for="project in featuredProjects" :key="project.id">
          <div class="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-3">
            <div class="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <img 
                :src="`https://readdy.ai/api/search-image?query=${project.image}`"
                :alt="project.title"
                class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="absolute top-4 left-4">
                <div :class="`bg-gradient-to-r ${getCategoryConfig(project.category).gradient} px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg`">
                  <i :class="`${getCategoryConfig(project.category).icon} text-white w-4 h-4 flex items-center justify-center`"></i>
                  <span class="text-white text-sm font-semibold">{{ project.category }}</span>
                </div>
              </div>
              
              <div class="absolute top-4 right-4">
                <div class="bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-2 rounded-xl shadow-lg">
                  <span class="text-white text-xs font-bold">추천</span>
                </div>
              </div>

              <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2 text-gray-600">
                      <i class="ri-user-line w-4 h-4 flex items-center justify-center"></i>
                      <span>{{ project.backers }}명 참여</span>
                    </div>
                    <div class="text-blue-600 font-semibold">{{ project.progress }}% 달성</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-8">
              <h3 class="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">
                {{ project.description }}
              </p>
              
              <div class="mb-6">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 shadow-sm" 
                    :style="{ width: project.progress + '%' }"
                  ></div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">목표: {{ project.goal }}</span>
                  <span class="text-sm font-semibold text-blue-600">{{ project.progress }}%</span>
                </div>
              </div>
              
              <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform group-hover:scale-105">
                후원하기
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

const featuredProjects = ref([
  {
    id: 1,
    title: "혁신적인 웨어러블 디바이스",
    description: "건강 모니터링과 스마트 기능을 결합한 차세대 웨어러블",
    goal: "500만원",
    category: "테크",
    progress: 78,
    backers: 342,
    image: "Innovative wearable device with health monitoring features, sleek modern design, fitness tracker with smart functions, clean product photography&width=400&height=300&seq=featured1&orientation=landscape"
  },
  {
    id: 2,
    title: "친환경 스마트 홈 솔루션",
    description: "지속가능한 미래를 위한 에너지 효율적인 홈 시스템",
    goal: "300만원",
    category: "디자인",
    progress: 85,
    backers: 189,
    image: "Eco-friendly smart home solution with solar panels, energy efficient systems, modern sustainable architecture, green technology integration&width=400&height=300&seq=featured2&orientation=landscape"
  },
  {
    id: 3,
    title: "창작자를 위한 AI 도구",
    description: "인공지능 기술을 활용한 창작 지원 플랫폼",
    goal: "800만원",
    category: "테크",
    progress: 92,
    backers: 567,
    image: "AI-powered creative tools interface, digital art creation, modern software design, creative workspace with artificial intelligence&width=400&height=300&seq=featured3&orientation=landscape"
  },
  {
    id: 4,
    title: "도시농업 스타트업",
    description: "도심 속 수직농장 시스템으로 신선한 채소 재배",
    goal: "200만원",
    category: "디자인",
    progress: 67,
    backers: 123,
    image: "Urban vertical farming system, hydroponic vegetable growing in modern city setting, green agriculture technology, sustainable food production&width=400&height=300&seq=featured4&orientation=landscape"
  },
  {
    id: 5,
    title: "교육용 VR 콘텐츠",
    description: "몰입형 가상현실 학습 경험을 제공하는 교육 솔루션",
    goal: "400만원",
    category: "테크",
    progress: 73,
    backers: 298,
    image: "Educational VR content with virtual reality headset, immersive learning environment, futuristic classroom technology, 3D educational visualization&width=400&height=300&seq=featured5&orientation=landscape"
  },
  {
    id: 6,
    title: "수공예 패션 브랜드",
    description: "전통 기법과 현대적 디자인이 만나는 특별한 패션",
    goal: "150만원",
    category: "디자인",
    progress: 89,
    backers: 156,
    image: "Handcrafted fashion brand with traditional techniques, artisanal clothing design, modern meets traditional fashion, craft workshop atmosphere&width=400&height=300&seq=featured6&orientation=landscape"
  }
]);

const getCategoryConfig = (category) => {
  switch(category) {
    case '테크':
      return {
        gradient: 'from-blue-500 to-indigo-600',
        icon: 'ri-smartphone-line',
        bgGradient: 'from-blue-50 to-indigo-50'
      };
    case '디자인':
      return {
        gradient: 'from-purple-500 to-pink-600',
        icon: 'ri-palette-line',
        bgGradient: 'from-purple-50 to-pink-50'
      };
    default:
      return {
        gradient: 'from-gray-500 to-slate-600',
        icon: 'ri-star-line',
        bgGradient: 'from-gray-50 to-slate-50'
      };
  }
};
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
