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

              <!-- 공유/좋아요 버튼 -->
              <div class="absolute top-4 right-4 flex space-x-2">
                <!-- 공유 버튼 -->
                <div class="relative">
                  <button
                    @click="toggleShare"
                    class="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    <i class="fas fa-share-alt text-gray-700"></i>
                  </button>

                  <!-- 공유 박스 -->
                  <div
                    v-if="showShare"
                    ref="shareBoxRef"
                    class="absolute top-12 right-0 bg-white p-4 rounded-lg shadow-xl w-72 z-50"
                    @click.stop
                  >
                    <p class="text-sm font-semibold text-gray-800 mb-2">공유 링크</p>
                    <div class="flex items-center space-x-2">
                      <input
                        type="text"
                        :value="currentUrl"
                        readonly
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <button
                        @click="copyToClipboard"
                        class="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        복사
                      </button>
                    </div>
                    <p v-if="copySuccess" class="text-xs text-green-500 mt-1">
                      링크가 복사되었습니다!
                    </p>
                  </div>
                </div>

                <!-- 좋아요 버튼 -->
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
          <ProjectInfo :project="projectData" />

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
          <summary-basic-info :detail="projectData"></summary-basic-info>

          <!-- 작성자 정보 -->
          <writer-info :detail="projectData"></writer-info>

          <!-- 좋아요 -->
          <project-vote
            :detail="projectData"
            :userId="loginId"
            :projectId="projectId"
          ></project-vote>
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

import axios from 'axios'
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

import { useRoute } from 'vue-router'
import ProjectInfo from '@/components/project/detail/ProjectInfo.vue'
import SummaryBasicInfo from '@/components/project/detail/SummaryBasicInfo.vue'
import WriterInfo from '@/components/project/detail/WriterInfo.vue'
import ProjectVote from '@/components/project/detail/ProjectVote.vue'
import '@/assets/styles/projectDetail.css'


const route = useRoute()
const projectId = route.params.id

const projectData = ref(null)
const isLoggedIn = ref(false)
const isLiked = ref(false)
const likeCount = ref(98)
const currentImageIndex = ref(0)
const newMessage = ref('')
const loginId = ref(null) // 로그인된 사용자 ID
const writerId = computed(() => projectData.value?.userId) // 작성자 ID

// 공유 박스
const showShare = ref(false)
const copySuccess = ref(false)

//초기 좋아요 상태 fetch
const fetchLikeStatus = async () => {
  try {
    const res = await axios.get(`/api/votes/status`, {
      params: {
        userId: loginId.value,
        projectId: props.projectId,
      },
    })
    isLiked.value = res.data.liked // true or false
  } catch (e) {
    console.warn('좋아요 상태 불러오기 실패:', e)
  }
}

// 공유 박스 토글
const toggleShare = async () => {
  showShare.value = !showShare.value
  copySuccess.value = false

  if (showShare.value) {
    await nextTick() // DOM 렌더링 보장
    document.addEventListener('click', handleClickOutside, true)
  }
}

const currentUrl = window.location.href

//클립보드에 링크 복사
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl)
    copySuccess.value = true
  } catch (err) {
    alert('복사에 실패했습니다.')
  }
}

// 👇 공유 박스 영역 참조용
const shareBoxRef = ref(null)

const handleClickOutside = (event) => {
  if (shareBoxRef.value && !shareBoxRef.value.contains(event.target)) {
    showShare.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}

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

// const toggleLike = () => {
//   isLiked.value = !isLiked.value
//   likeCount.value += isLiked.value ? 1 : -1
// }

const toggleLike = async () => {
  const payload = {
    userId: loginId.value,
    projectId: props.projectId,
  }

  try {
    if (isLiked.value) {
      await axios.delete('/api/votes', { data: payload })
      likeCount.value--
    } else {
      await axios.post('/api/votes', payload) // 여기서 500 에러 발생
      likeCount.value++
    }
    isLiked.value = !isLiked.value
  } catch (error) {
    console.error('좋아요 요청 실패:', error)
  }
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
    const res = await axios.get(`/api/project/list/detail/${projectId}/full`)
    projectData.value = res.data
    console.log('✅ 프로젝트 API 응답:', res.data)

    document.addEventListener('click', handleClickOutside)
  } catch (e) {
    console.error('❌ 프로젝트 정보 요청 실패:', e)
    alert('프로젝트 정보를 불러올 수 없습니다.')
    return
  }

  // 사용자 정보는 별도 처리 (로그인 안 된 경우 대비)
  try {
    const userRes = await axios.get('/api/user/me')
    loginId.value = userRes.data.id
    console.log('✅ 사용자 API 응답:', loginId.value)
  } catch (e) {
    console.warn('⚠ 사용자 정보 요청 실패 (비로그인 상태일 수 있음):', e)
    loginId.value = 2
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
