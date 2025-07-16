<template>
  <div class="min-h-screen bg-white">
    <FundingHeader />
    
    <!-- Breadcrumb -->
    <div class="bg-gray-50 py-4 px-6">
      <div class="max-w-7xl mx-auto">
        <nav class="flex items-center text-sm text-gray-600">
          <router-link to="/" class="hover:text-[#FFD338] transition-colors">
            홈
          </router-link>
          <i class="ri-arrow-right-s-line mx-2 w-4 h-4 flex items-center justify-center"></i>
          <router-link to="/projects" class="hover:text-[#FFD338] transition-colors">
            테크
          </router-link>
          <i class="ri-arrow-right-s-line mx-2 w-4 h-4 flex items-center justify-center"></i>
          <span class="text-gray-900">프로젝트 상세</span>
        </nav>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <ProjectHero :project="projectData" />
          <CreatorInfo :creator="projectData.creator" />
          
          <!-- Tab Navigation -->
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors`, 
                  activeTab === tab.id
                    ? 'border-[#FFD338] text-[#FFD338]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                <i :class="`${tab.icon} w-4 h-4 flex items-center justify-center`"></i>
                {{ tab.label }}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="min-h-[600px]">
            <ProjectDescription v-if="activeTab === 'description'" :project="projectData" />
            <RealtimeChat v-if="activeTab === 'chat'" />
            <div v-if="activeTab === 'updates'" class="text-center py-16 text-gray-500">
              <i class="ri-notification-line text-4xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
              <p>아직 업데이트가 없습니다.</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <ProjectProgress :progress="projectData.progress" />
          <FundingOptions />
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import FundingHeader from '@/tailwind_temp/components/FunddingHeader.vue';
import Footer from '@/tailwind_temp/components/Footer.vue';
import ProjectHero from '@/tailwind_temp/components/project/ProjectHero.vue';
import CreatorInfo from '@/tailwind_temp/components/project/CreatorInfo.vue';
import ProjectProgress from '@/tailwind_temp/components/project/ProjectProgress.vue';
import ProjectDescription from '@/tailwind_temp/components/project/ProjectDescription.vue';
import RealtimeChat from '@/tailwind_temp/components/project/RealtimeChat.vue';
import FundingOptions from '@/tailwind_temp/components/project/FundingOptions.vue';

const route = useRoute();
const projectId = route.params.id;

const activeTab = ref('description');

// Mock data based on project ID
const projectData = ref({
  id: projectId,
  title: "스마트폰을 위한 혁신적인 스마트 케이스",
  subtitle: "무선 충전과 모듈러 디자인을 결합한 차세대 스마트폰 액세서리",
  category: "테크",
  mainImage: "Innovative smartphone smart case with wireless charging, modular design features, sleek modern technology, premium product photography with clean background&width=800&height=500&seq=projectmain1&orientation=landscape",
  creator: {
    name: "김테크",
    company: "스마트테크 이노베이션",
    avatar: "Professional tech entrepreneur portrait, friendly smile, modern office background, business casual attire, confident expression&width=200&height=200&seq=creator1&orientation=squarish",
    badge: "검증된 창작자",
    description: "10년간 모바일 액세서리 개발 경험을 보유한 전문가입니다.",
    projects: 12,
    successRate: 95
  },
  progress: {
    current: 42500000,
    goal: 50000000,
    percentage: 85,
    backers: 1247,
    likes: 3892,
    daysLeft: 15
  },
  description: "혁신적인 기술과 실용적인 디자인이 만나 탄생한 스마트 케이스입니다. 무선 충전 기능뿐만 아니라 모듈러 시스템을 통해 다양한 액세서리를 연결할 수 있습니다.",
  images: [
    "Smart case wireless charging demonstration, phone on charging pad, LED indicators, modern tech setup&width=600&height=400&seq=detail1&orientation=landscape",
    "Modular smartphone case components, interchangeable parts, premium materials showcase, technical product photography&width=600&height=400&seq=detail2&orientation=landscape",
    "Smart case in real life usage, person using phone with case, lifestyle photography, modern urban setting&width=600&height=400&seq=detail3&orientation=landscape"
  ]
});

const tabs = ref([
  { id: 'description', label: '프로젝트 소개', icon: 'ri-article-line' },
  { id: 'chat', label: '실시간 채팅', icon: 'ri-chat-3-line' },
  { id: 'updates', label: '업데이트', icon: 'ri-notification-line' }
]);
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
