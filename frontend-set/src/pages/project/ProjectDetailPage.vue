<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen" style="background-color: var(--kb-ui-10)">
    <!-- 메인 콘텐츠 -->
    <div class="max-w-[1200px] mx-auto px-5 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 좌측 콘텐츠 영역 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 프로젝트 헤더 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <!-- 이미지 갤러리 -->
            <div class="relative">
              <div class="w-full h-96 bg-gray-200 overflow-hidden">
                <img
                  :src="currentImage"
                  alt="프로젝트 이미지"
                  class="w-full h-full object-cover object-top"
                />
              </div>
              <!-- 재생 버튼 -->
              <button
                class="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <i class="fas fa-play text-gray-700"></i>
              </button>
              <!-- 공유/좋아요 버튼 -->
              <div class="absolute top-4 right-4 flex space-x-2">
                <button
                  class="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <i class="fas fa-share-alt text-gray-700"></i>
                </button>
                <button
                  class="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  @click="toggleLike"
                >
                  <i
                    :class="isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-700'"
                  ></i>
                </button>
              </div>
            </div>
            <!-- 썸네일 -->
            <div class="p-4 border-t border-gray-200">
              <div class="flex space-x-2 overflow-x-auto">
                <div
                  v-for="(image, index) in projectImages"
                  :key="index"
                  class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 transition-all"
                  :class="
                    currentImageIndex === index
                      ? 'border-gray-400'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                  @click="setCurrentImage(index)"
                >
                  <img :src="image" alt="썸네일" class="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
          <!-- 프로젝트 정보 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center space-x-3 mb-4">
              <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium"
                >진행중</span
              >
              <span class="text-gray-500 text-sm">기타</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-4">제목: {{ projectData?.title }}</h1>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              {{ projectData?.promotion }}
            </p>
            <!-- 프로젝트 상세 내용 -->
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">프로젝트 배경</h3>
                <p class="text-gray-600 leading-relaxed">
                  코로나19 이후 급변하는 소비 패턴과 디지털 전환의 필요성이 대두되면서, 지역
                  소상공인들은 새로운 도전에 직면하고 있습니다. 본 프로젝트는 이러한 문제를 해결하기
                  위해 지역 상권의 디지털 혁신을 통한 경쟁력 강화를 목표로 합니다.
                </p>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">핵심 내용</h3>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>통합 마케팅 플랫폼 구축으로 온라인 홍보 효과 극대화</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>간편 결제 시스템 도입으로 고객 편의성 향상</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>데이터 분석을 통한 맞춤형 비즈니스 솔루션 제공</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>지역 커뮤니티 네트워크 강화 및 상생 생태계 조성</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">참여 방법</h3>
                <p class="text-gray-600 leading-relaxed">
                  본 프로젝트는 지역 소상공인, 시민, 지방자치단체, 그리고 관련 기업들의 협력을 통해
                  추진됩니다. 관심 있는 분들은 프로젝트 설명회 참석, 온라인 설문조사 참여, 그리고
                  다양한 형태의 후원을 통해 함께할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
          <!-- 실시간 채팅 섹션 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">실시간 채팅</h3>
            <!-- 채팅 메시지 영역 -->
            <div class="h-96 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4 space-y-4">
              <div
                v-for="message in chatMessages"
                :key="message.id"
                :class="[
                  'flex items-start space-x-3',
                  message.isSelf ? 'flex-row-reverse space-x-reverse' : '',
                ]"
              >
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-gray-600 text-sm"></i>
                  </div>
                </div>
                <div :class="['max-w-[70%]', message.isSelf ? 'items-end' : 'items-start']">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-medium text-gray-900">{{ message.author }}</span>
                    <span class="text-gray-500 text-xs">{{ message.time }}</span>
                  </div>
                  <div
                    :class="[
                      'p-3 rounded-lg break-words',
                      message.isSelf ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200',
                    ]"
                  >
                    {{ message.content }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 메시지 입력 영역 -->
            <div class="relative">
              <input
                v-model="newMessage"
                type="text"
                placeholder="메시지를 입력하세요..."
                class="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @keyup.enter="sendMessage"
              />
              <button
                @click="sendMessage"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 !rounded-button font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap transition-all"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- 우측 정보 영역 -->
        <div class="space-y-6">
          <!-- 기본 정보 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">카테고리</span>
                <span class="text-gray-900 font-medium">기타</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">지역</span>
                <span class="text-gray-900 font-medium">서울</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">진행 상태</span>
                <span class="text-green-600 font-medium">진행중</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">좋아요</span>
                <span class="text-gray-900 font-medium">{{ likeCount }}개</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">조회수</span>
                <span class="text-gray-900 font-medium">1,247회</span>
              </div>
            </div>
          </div>
          <!-- 작성자 정보 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">작성자 정보</h3>
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <i class="fas fa-user text-gray-600"></i>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">서울시 중구청</h4>
                <p class="text-sm text-gray-600">공공기관</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-4">
              지역 발전과 소상공인 지원을 위한 다양한 프로젝트를 추진하고 있습니다.
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <i class="fas fa-envelope text-gray-400"></i>
                <span class="text-gray-600">contact@junggu.seoul.kr</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-phone text-gray-400"></i>
                <span class="text-gray-600">02-3396-4000</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-globe text-gray-400"></i>
                <a href="#" class="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >www.junggu.seoul.kr</a
                >
              </div>
            </div>
          </div>
          <!-- 좋아요 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">좋아요</h3>
            <p class="text-gray-600 text-sm mb-4">
              이 프로젝트가 마음에 드시나요? 좋아요를 눌러 관심을 표현해보세요.
            </p>
            <button
              @click="toggleLike"
              class="w-full bg-gray-100 text-gray-700 px-4 py-3 !rounded-button font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap transition-all border border-gray-300"
            >
              <i :class="isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart'" class="mr-2"></i>
              {{ isLiked ? '좋아요 취소' : '좋아요' }}
            </button>
          </div>
        </div>
      </div>
      <!-- 관련 프로젝트 추천 -->
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
    </div>
    <!-- 푸터 -->
    <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner mt-16">
      <div class="max-w-[1200px] mx-auto px-5">
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
import { ref, nextTick } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id

const projectData = ref(null)
const isLoggedIn = ref(false)
const isLiked = ref(false)
const likeCount = ref(98)
const currentImageIndex = ref(0)
const newMessage = ref('')

const projectImages = ref([
  'https://readdy.ai/api/search-image?query=vibrant%20local%20marketplace%20street%20scene%20with%20traditional%20storefronts%2C%20small%20businesses%2C%20and%20modern%20urban%20development%2C%20clean%20architectural%20style%2C%20warm%20sunlight%2C%20professional%20photography%20perspective&width=800&height=600&seq=main1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=modern%20digital%20payment%20system%20integration%20in%20traditional%20local%20market%2C%20small%20business%20owners%20using%20technology%2C%20clean%20urban%20environment%2C%20professional%20documentary%20style&width=800&height=600&seq=main2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=community%20collaboration%20meeting%20for%20local%20business%20development%2C%20diverse%20group%20of%20entrepreneurs%20and%20officials%2C%20modern%20conference%20room%2C%20professional%20business%20photography&width=800&height=600&seq=main3&orientation=landscape',
  'https://readdy.ai/api/search-image?query=successful%20local%20business%20district%20revitalization%20with%20increased%20foot%20traffic%2C%20thriving%20storefronts%2C%20modern%20urban%20planning%2C%20vibrant%20commercial%20atmosphere&width=800&height=600&seq=main4&orientation=landscape',
])

const currentImage = ref(projectImages.value[0])

const chatMessages = ref([
  {
    id: 1,
    author: '김상인',
    time: '2024-01-15',
    content:
      '정말 필요한 프로젝트라고 생각합니다. 우리 지역 소상공인들에게 큰 도움이 될 것 같아요.',
    isSelf: false,
  },
  {
    id: 2,
    author: '이지역',
    time: '2024-01-14',
    content: '디지털 전환이 시급한 상황에서 이런 지원이 있다니 감사합니다. 적극 참여하겠습니다.',
    isSelf: false,
  },
  {
    id: 3,
    author: '박시민',
    time: '2024-01-13',
    content: '구체적인 실행 계획이 궁금합니다. 더 자세한 정보를 알 수 있을까요?',
    isSelf: false,
  },
])

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

const setCurrentImage = (index) => {
  currentImageIndex.value = index
  currentImage.value = projectImages.value[index]
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
}

const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatMessages.value.push({
      id: Date.now(),
      author: '나',
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      content: newMessage.value.trim(),
      isSelf: true,
    })
    newMessage.value = ''

    // Scroll to bottom after message is sent
    nextTick(() => {
      const chatContainer = document.querySelector('.overflow-y-auto')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    })
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/project/list/detail/${projectId}`)
    projectData.value = res.data
    console.log('✅ API 응답:', res.data)
  } catch (e) {
    console.error('❌ API 요청 실패:', e)
    alert('프로젝트 정보를 불러올 수 없습니다.')
  }
})
</script>

<style scoped>
:root {
  --kb-yellow-positive: #ffbc00;
  --kb-yellow: #ffd338;
  --kb-yellow-native: #ffcc00;
  --kb-gray-dark: #60584c;
  --kb-gray-light: #918274;
  --kb-ui-01: #000000;
  --kb-ui-02: #26282c;
  --kb-ui-03: #484b51;
  --kb-ui-04: #696e76;
  --kb-ui-05: #484b51;
  --kb-ui-06: #aab0b8;
  --kb-ui-07: #c6cbd0;
  --kb-ui-08: #dde1e4;
  --kb-ui-09: #ebeef0;
  --kb-ui-10: #f7f7f8;
  --kb-ui-11: #ffffff;
  --kb-positive: #287eff;
  --kb-error: #f23f3f;
  --kb-error-input: #ff5858;
  --kb-caution: #ffd338;
}

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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* KB Color System Utility Classes */
.bg-kb-yellow {
  background-color: var(--kb-yellow);
}

.text-kb-yellow {
  color: var(--kb-yellow);
}

.border-kb-yellow {
  border-color: var(--kb-yellow);
}

.bg-kb-gray {
  background-color: var(--kb-gray-dark);
}

.text-kb-gray {
  color: var(--kb-gray-dark);
}

.bg-kb-positive {
  background-color: var(--kb-positive);
}

.text-kb-positive {
  color: var(--kb-positive);
}

.bg-kb-error {
  background-color: var(--kb-error);
}

.text-kb-error {
  color: var(--kb-error);
}
</style>
