<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <!-- 로고 -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900 drop-shadow-sm">Fund:ing</h1>
          </div>
          <!-- 네비게이션 -->
          <nav class="hidden md:flex items-center space-x-8">
            <a
              href="#"
              class="text-gray-900 font-bold border-b-2 border-gray-900 pb-1 cursor-pointer transition-colors"
              >홈</a
            >
            <a
              href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/bf3c3730-13fb-49ff-95a2-077909301a84"
              data-readdy="true"
              class="text-gray-700 hover:text-gray-900 font-medium cursor-pointer transition-colors hover:border-b-2 hover:border-gray-900 pb-1"
              >펀딩</a
            >
            <a
              href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/667465ea-2228-4a0e-a50f-775409dad035"
              data-readdy="true"
              class="text-gray-700 hover:text-gray-900 font-medium cursor-pointer transition-colors hover:border-b-2 hover:border-gray-900 pb-1"
              >프로젝트</a
            >
          </nav>
          <!-- 로그인/사용자 메뉴 -->
          <div class="flex items-center space-x-4">
            <template v-if="!isLoggedIn">
              <button
                @click="login"
                class="bg-gray-900 text-white px-6 py-2 !rounded-button font-medium hover:bg-gray-800 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                로그인
              </button>
            </template>
            <template v-else>
              <div class="flex items-center space-x-4">
                <button
                  class="relative p-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                >
                  <i class="fas fa-bell text-lg"></i>
                  <span
                    v-if="notifications.length > 0"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                    >{{ notifications.length }}</span
                  >
                </button>
                <div class="relative">
                  <button
                    id="user-menu-button"
                    @click="toggleUserMenu"
                    class="p-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    <i class="fas fa-user text-lg"></i>
                  </button>
                  <div
                    v-if="showUserMenu"
                    class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    <a
                      href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/9c7621a2-0b18-41bc-9f53-482da82efbc2"
                      data-readdy="true"
                      class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                    >
                      <i class="fas fa-user-circle mr-3 text-gray-400"></i>
                      내 정보
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                    >
                      <i class="fas fa-chart-line mr-3 text-gray-400"></i>
                      내 참여
                    </a>
                  </div>
                </div>
                <button
                  @click="logout"
                  class="bg-gray-100 text-gray-700 px-4 py-2 !rounded-button font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap transition-all"
                >
                  로그아웃
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>
    <!-- 메인 콘텐츠 영역 -->
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <!-- 좌측: 메인 배너 + 당신이 좋아할만한 펀딩 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 메인 배너 슬라이더 -->
          <section
            class="bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-2xl shadow-2xl overflow-hidden h-[360px]"
          >
            <div class="p-8">
              <div class="relative">
                <div class="flex items-center justify-between">
                  <div class="flex-1 pr-12">
                    <div class="text-sm text-gray-700 mb-4 font-medium">{{ currentSlide }}/3</div>
                    <h2 class="text-4xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
                      신규 펀딩 신규 펀딩 신규 펀딩 신규 펀딩 신규 펀딩 신규 펀딩
                    </h2>
                    <div class="flex space-x-2 mt-8">
                      <div
                        v-for="n in 3"
                        :key="n"
                        class="w-3 h-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        :class="
                          currentSlide === n
                            ? 'bg-gray-900 shadow-lg'
                            : 'bg-gray-400 hover:bg-gray-500'
                        "
                        @click="currentSlide = n"
                      ></div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div
                      class="w-full h-64 bg-gray-300 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src="https://readdy.ai/api/search-image?query=modern%20financial%20technology%20platform%20interface%20with%20clean%20design%2C%20professional%20investment%20dashboard%2C%20bright%20yellow%20accent%20colors%2C%20minimalist%20style%2C%20high%20quality%20digital%20illustration%2C%203D%20depth%20effect&width=600&height=300&seq=banner1&orientation=landscape"
                        alt="펀딩 프로젝트"
                        class="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- 당신이 좋아할만한 펀딩 -->
          <div>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900 drop-shadow-sm">
                당신이 좋아할만한 펀딩
              </h3>
              <a
                href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/667465ea-2228-4a0e-a50f-775409dad035"
                data-readdy="true"
                class="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 pb-0.5 font-medium cursor-pointer whitespace-nowrap transition-all flex items-center space-x-1"
              >
                <span>더 보기</span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="item in popularFundings"
                :key="item.id"
                class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
              >
                <div class="p-1">
                  <div class="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-inner">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div class="px-3 pb-4">
                    <h4 class="font-semibold text-gray-900 mb-2">
                      {{ item.title }}
                    </h4>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between text-sm text-gray-600">
                        <span class="bg-gray-100 px-2 py-1 rounded-full"
                          >남은일수: {{ item.daysLeft }}일</span
                        >
                        <span class="bg-blue-50 px-2 py-1 rounded-full">{{ item.progress }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          :style="{ width: item.progress + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 우측: 인기 프로젝트 -->
        <div class="h-full">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 drop-shadow-sm">인기 프로젝트</h3>
          <div class="space-y-4 h-[680px] flex flex-col justify-between">
            <div
              v-for="(project, index) in topProjects"
              :key="project.id"
              class="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 flex-1"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 mb-1">
                    {{ project.title }}
                  </h4>
                  <p class="text-sm text-gray-600 mb-2">
                    {{ project.description }}
                  </p>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
                      >좋아요: {{ project.likes }}</span
                    >
                    <span class="text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                      >참여수: {{ project.participants }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 관심 기반 추천 프로젝트 -->
    <section class="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-bold text-gray-900 drop-shadow-sm">관심 기반 추천 프로젝트</h3>
          <a
            href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/667465ea-2228-4a0e-a50f-775409dad035"
            data-readdy="true"
            class="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 pb-0.5 font-medium cursor-pointer whitespace-nowrap transition-all flex items-center space-x-1"
          >
            <span>더 보기</span>
            <i class="fas fa-arrow-right text-sm"></i>
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            v-for="item in recommendedProjects"
            :key="item.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div class="relative">
              <div class="w-full h-48 overflow-hidden rounded-t-xl">
                <a
                  href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/82f5ffe3-16bc-46df-838f-f4c2efcffc9d"
                  data-readdy="true"
                >
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover object-top"
                  />
                </a>
              </div>
              <div class="absolute top-3 right-3">
                <button class="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                  <i class="far fa-heart text-gray-600"></i>
                </button>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{{
                  item.category
                }}</span>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">진행중</span>
              </div>
              <h4 class="font-bold text-gray-900 mb-2 line-clamp-2">
                {{ item.title }}
              </h4>
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                {{ item.description }}
              </p>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <i class="fas fa-map-marker-alt text-gray-400"></i>
                  <span class="text-gray-600">{{ item.location }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <i class="fas fa-heart text-red-500"></i>
                  <span class="text-gray-600">{{ item.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 마감 임박 펀딩 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 drop-shadow-sm">마감 임박 펀딩</h3>
        <div class="relative">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="(item, index) in visibleUrgentFundings"
              :key="item.id"
              class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-red-100"
            >
              <div class="p-6">
                <div class="flex items-start space-x-6">
                  <div
                    class="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-inner"
                  >
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-lg text-gray-900 mb-2">
                      {{ item.title }}
                    </h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div class="flex items-center bg-red-50 px-3 py-1 rounded-full">
                        <i class="fas fa-clock text-red-500 mr-1"></i>
                        <span>{{ item.timeLeft }}</span>
                      </div>
                      <div class="flex items-center bg-red-50 px-3 py-1 rounded-full">
                        <i class="fas fa-user text-red-500 mr-1"></i>
                        <span>{{ item.likes }}명 참여</span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="flex justify-between text-sm text-gray-600 mb-1">
                        <span>진행률</span>
                        <span>{{ item.progress }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div
                          class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm transition-all duration-500"
                          :style="{ width: item.progress + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 좌우 화살표 (3개 이상일 때만 표시) -->
          <template v-if="urgentFundings.length > 2">
            <button
              @click="prevUrgentSlide"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-110 border border-gray-200"
              :class="{ 'opacity-50': urgentCurrentIndex === 0 }"
            >
              <i class="fas fa-chevron-left text-gray-600"></i>
            </button>
            <button
              @click="nextUrgentSlide"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-110 border border-gray-200"
              :class="{
                'opacity-50': urgentCurrentIndex >= urgentFundings.length - 2,
              }"
            >
              <i class="fas fa-chevron-right text-gray-600"></i>
            </button>
          </template>
        </div>
      </div>
    </section>
    <!-- 푸터 -->
    <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-center space-x-8">
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
            >Terms and Conditions</a
          >
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
            >Privacy Policy</a
          >
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
            >Contact Us</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isLoggedIn = ref(false)
const currentSlide = ref(1)
const showUserMenu = ref(false)
const notifications = ref([
  { id: 1, message: '새로운 펀딩이 등록되었습니다.' },
  { id: 2, message: '회원님의 펀딩이 마감되었습니다.' },
])

const login = () => {
  isLoggedIn.value = true
}

const logout = () => {
  isLoggedIn.value = false
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    const userMenuButton = document.getElementById('user-menu-button')
    const userMenuDropdown = userMenuButton?.nextElementSibling
    if (userMenuButton && userMenuDropdown) {
      if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
        showUserMenu.value = false
      }
    }
  })
})

const urgentCurrentIndex = ref(0)

const popularFundings = ref([
  {
    id: 1,
    title: '핀딩 프로젝트 1',
    daysLeft: 5,
    progress: 75,
    image:
      'https://readdy.ai/api/search-image?query=modern%20financial%20investment%20project%20card%20with%20clean%20white%20background%2C%20professional%20business%20concept%2C%20yellow%20accent%20elements%2C%20minimalist%20design%2C%20high%20quality%20digital%20illustration%2C%203D%20depth%20effect&width=300&height=200&seq=fund1&orientation=landscape',
  },
  {
    id: 2,
    title: '핀딩 프로젝트 2',
    daysLeft: 2,
    progress: 92,
    image:
      'https://readdy.ai/api/search-image?query=innovative%20crowdfunding%20platform%20interface%20with%20clean%20white%20background%2C%20modern%20financial%20technology%2C%20yellow%20accent%20colors%2C%20professional%20design%2C%20high%20quality%20digital%20illustration%2C%203D%20depth%20effect&width=300&height=200&seq=fund2&orientation=landscape',
  },
  {
    id: 3,
    title: '핀딩 프로젝트 3',
    daysLeft: 7,
    progress: 45,
    image:
      'https://readdy.ai/api/search-image?query=digital%20investment%20opportunity%20showcase%20with%20clean%20white%20background%2C%20modern%20financial%20services%2C%20yellow%20branding%20elements%2C%20professional%20minimalist%20style%2C%203D%20depth%20effect&width=300&height=200&seq=fund3&orientation=landscape',
  },
])

const topProjects = ref([
  {
    id: 1,
    title: '1위 프로젝트',
    description: '가장 인기있는 프로젝트입니다',
    likes: 520,
    participants: 280,
  },
  {
    id: 2,
    title: '2위 프로젝트',
    description: '두 번째로 인기있는 프로젝트입니다',
    likes: 480,
    participants: 250,
  },
  {
    id: 3,
    title: '3위 프로젝트',
    description: '세 번째로 인기있는 프로젝트입니다',
    likes: 420,
    participants: 220,
  },
  {
    id: 4,
    title: '4위 프로젝트',
    description: '네 번째로 인기있는 프로젝트입니다',
    likes: 380,
    participants: 190,
  },
  {
    id: 5,
    title: '5위 프로젝트',
    description: '다섯 번째로 인기있는 프로젝트입니다',
    likes: 350,
    participants: 170,
  },
])

const recommendedProjects = ref([
  {
    id: 1,
    title: '지역 상권 활성화 프로젝트',
    description: '지역 소상공인을 위한 통합 마케팅 및 결제 플랫폼 구축',
    category: '기타',
    location: '서울',
    likes: 98,
    image:
      'https://readdy.ai/api/search-image?query=vibrant%20local%20marketplace%20street%20scene%20with%20traditional%20storefronts%2C%20small%20businesses%2C%20and%20modern%20urban%20development%2C%20clean%20architectural%20style%2C%20warm%20sunlight%2C%20professional%20photography%20perspective&width=400&height=300&seq=rec1&orientation=landscape',
  },
  {
    id: 2,
    title: '스마트 도시 인프라 구축',
    description: '도시 문제 해결을 위한 IoT 기반 스마트 시티 솔루션',
    category: '기술',
    location: '부산',
    likes: 87,
    image:
      'https://readdy.ai/api/search-image?query=modern%20smart%20city%20infrastructure%20with%20IoT%20sensors%2C%20clean%20urban%20design%2C%20technological%20integration%2C%20professional%20architectural%20visualization&width=400&height=300&seq=rec2&orientation=landscape',
  },
  {
    id: 3,
    title: '친환경 에너지 전환',
    description: '지역 커뮤니티 기반 재생에너지 프로젝트',
    category: '환경',
    location: '제주',
    likes: 76,
    image:
      'https://readdy.ai/api/search-image?query=renewable%20energy%20installation%20in%20urban%20setting%2C%20solar%20panels%2C%20clean%20energy%20infrastructure%2C%20professional%20environmental%20photography&width=400&height=300&seq=rec3&orientation=landscape',
  },
  {
    id: 4,
    title: '문화예술 공간 조성',
    description: '유휴공간을 활용한 복합 문화예술 센터 건립',
    category: '문화',
    location: '인천',
    likes: 65,
    image:
      'https://readdy.ai/api/search-image?query=modern%20cultural%20arts%20center%20with%20creative%20spaces%2C%20artistic%20architecture%2C%20clean%20design%20elements%2C%20professional%20venue%20photography&width=400&height=300&seq=rec4&orientation=landscape',
  },
])

const urgentFundings = ref([
  {
    id: 1,
    title: '마감 임박 펀딩 1',
    timeLeft: '12시간 남음',
    likes: 75,
    progress: 90,
    image:
      'https://readdy.ai/api/search-image?query=urgent%20funding%20deadline%20project%20with%20clean%20white%20background%2C%20time-sensitive%20investment%20opportunity%2C%20red%20warning%20elements%2C%20professional%20financial%20design%2C%203D%20depth%20effect&width=150&height=150&seq=urgent1&orientation=squarish',
  },
  {
    id: 2,
    title: '마감 임박 펀딩 2',
    timeLeft: '6시간 남음',
    likes: 85,
    progress: 80,
    image:
      'https://readdy.ai/api/search-image?query=last%20chance%20crowdfunding%20project%20with%20clean%20white%20background%2C%20urgent%20investment%20deadline%2C%20red%20accent%20colors%2C%20modern%20financial%20platform%20design%2C%203D%20depth%20effect&width=150&height=150&seq=urgent2&orientation=squarish',
  },
  {
    id: 3,
    title: '마감 임박 펀딩 3',
    timeLeft: '3시간 남음',
    likes: 95,
    progress: 95,
    image:
      'https://readdy.ai/api/search-image?query=final%20hour%20funding%20opportunity%20with%20clean%20white%20background%2C%20urgent%20financial%20deadline%2C%20red%20warning%20colors%2C%20professional%20investment%20design%2C%203D%20depth%20effect&width=150&height=150&seq=urgent3&orientation=squarish',
  },
  {
    id: 4,
    title: '마감 임박 펀딩 4',
    timeLeft: '1시간 남음',
    likes: 105,
    progress: 98,
    image:
      'https://readdy.ai/api/search-image?query=last%20minute%20investment%20chance%20with%20clean%20white%20background%2C%20critical%20funding%20deadline%2C%20red%20alert%20elements%2C%20modern%20financial%20interface%2C%203D%20depth%20effect&width=150&height=150&seq=urgent4&orientation=squarish',
  },
])

const visibleUrgentFundings = computed(() => {
  return urgentFundings.value.slice(urgentCurrentIndex.value, urgentCurrentIndex.value + 2)
})

const nextUrgentSlide = () => {
  if (urgentCurrentIndex.value < urgentFundings.value.length - 2) {
    urgentCurrentIndex.value++
  }
}

const prevUrgentSlide = () => {
  if (urgentCurrentIndex.value > 0) {
    urgentCurrentIndex.value--
  }
}
</script>

<style scoped>
.\!rounded-button {
  border-radius: 8px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
