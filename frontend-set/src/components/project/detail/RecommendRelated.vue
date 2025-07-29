<template>
  <div class="mt-16">
    <h3 class="text-2xl font-bold text-gray-900 mb-8">관련 프로젝트</h3>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div
        v-for="project in relatedProjects"
        :key="project.id"
        class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      >
        <div class="relative">
          <div class="w-full h-48 overflow-hidden rounded-t-xl">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover object-top"
            />
          </div>
          <div class="absolute top-3 right-3">
            <button
              class="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <i class="far fa-heart text-gray-600"></i>
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center space-x-2 mb-2">
            <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{{
              project.category
            }}</span>
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">진행중</span>
          </div>
          <h4 class="font-bold text-gray-900 mb-2 line-clamp-2">
            {{ project.title }}
          </h4>
          <p class="text-sm text-gray-600 mb-4 line-clamp-2">
            {{ project.description }}
          </p>
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center space-x-1">
              <i class="fas fa-map-marker-alt text-gray-400"></i>
              <span class="text-gray-600">{{ project.location }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <i class="fas fa-heart text-red-500"></i>
              <span class="text-gray-600">{{ project.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const relatedProjects = ref([
  {
    id: 1,
    title: '스마트 도시 인프라 구축',
    description: '도시 문제 해결을 위한 IoT 기반 스마트 시티 솔루션',
    category: '기술',
    location: '부산',
    likes: 87,
    image:
      'https://readdy.ai/api/search-image?query=modern%20smart%20city%20infrastructure%20with%20IoT%20sensors%2C%20clean%20urban%20design%2C%20technological%20integration%2C%20professional%20architectural%20visualization&width=400&height=300&seq=related1&orientation=landscape',
  },
  {
    id: 2,
    title: '친환경 에너지 전환',
    description: '지역 커뮤니티 기반 재생에너지 프로젝트',
    category: '환경',
    location: '제주',
    likes: 76,
    image:
      'https://readdy.ai/api/search-image?query=renewable%20energy%20installation%20in%20urban%20setting%2C%20solar%20panels%2C%20clean%20energy%20infrastructure%2C%20professional%20environmental%20photography&width=400&height=300&seq=related2&orientation=landscape',
  },
  {
    id: 3,
    title: '문화예술 공간 조성',
    description: '유휴공간을 활용한 복합 문화예술 센터 건립',
    category: '문화',
    location: '인천',
    likes: 65,
    image:
      'https://readdy.ai/api/search-image?query=modern%20cultural%20arts%20center%20with%20creative%20spaces%2C%20artistic%20architecture%2C%20clean%20design%20elements%2C%20professional%20venue%20photography&width=400&height=300&seq=related3&orientation=landscape',
  },
  {
    id: 4,
    title: '청년 창업 지원 센터',
    description: '청년 창업가들을 위한 통합 지원 플랫폼',
    category: '창업',
    location: '대전',
    likes: 54,
    image:
      'https://readdy.ai/api/search-image?query=modern%20startup%20incubator%20space%20with%20young%20entrepreneurs%20working%20collaboratively%2C%20contemporary%20office%20design%2C%20innovative%20business%20environment&width=400&height=300&seq=related4&orientation=landscape',
  },
])
</script>
