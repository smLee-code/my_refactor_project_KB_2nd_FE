<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen bg-white w-full">
    <!-- 메인 콘텐츠 영역 -->
    <div class="container mx-auto px-6 lg:px-20 py-8">
      <!-- 공통 탭 메뉴 -->
      <TabMenu :tabs="tabOptions" v-model="activeTab" />
      <!-- 공통 카테고리 필터 -->
      <CategoryFilter :categories="categoryList" v-model="selectedCategory" />
      <!-- 공통 정렬 드롭다운 -->
      <div class="flex justify-end mb-8">
        <SortSelect :options="sortOptions" v-model="selectedSort" />
      </div>
      <!-- 프로젝트 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @toggle-like="toggleLike"
        />
      </div>
      <!-- 새 프로젝트 등록 버튼 -->
      <div class="fixed bottom-8 right-8">
        <button
          @click="showCreateForm = true"
          class="bg-yellow-400 text-gray-900 w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          <i class="fas fa-plus text-xl"></i>
        </button>
      </div>
      <!-- 프로젝트 등록 모달 -->
      <div
        v-if="showCreateForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">새 프로젝트 등록</h2>
            <button
              @click="showCreateForm = false"
              class="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <form @submit.prevent="createProject" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">프로젝트 제목</label>
              <input
                v-model="newProject.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="프로젝트 제목을 입력하세요"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <div class="relative">
                <button
                  type="button"
                  @click="showCategoryDropdown = !showCategoryDropdown"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>{{ newProject.category || '카테고리를 선택하세요' }}</span>
                  <i class="fas fa-chevron-down text-sm"></i>
                </button>
                <div
                  v-if="showCategoryDropdown"
                  class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  <button
                    v-for="category in categories"
                    :key="category"
                    type="button"
                    @click="((newProject.category = category), (showCategoryDropdown = false))"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ category }}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">프로젝트 설명</label>
              <textarea
                v-model="newProject.description"
                required
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="프로젝트에 대한 상세한 설명을 입력하세요"
              ></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">목표 금액</label>
                <input
                  v-model="newProject.targetAmount"
                  type="number"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="목표 금액을 입력하세요"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">진행 기간 (일)</label>
                <input
                  v-model="newProject.duration"
                  type="number"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="진행 기간을 입력하세요"
                />
              </div>
            </div>
            <div class="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                @click="showCreateForm = false"
                class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button"
              >
                취소
              </button>
              <button
                type="submit"
                class="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 font-medium cursor-pointer whitespace-nowrap !rounded-button"
              >
                프로젝트 등록
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- 프로젝트 수정 모달 -->
      <div
        v-if="showEditForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">프로젝트 수정</h2>
            <button
              @click="showEditForm = false"
              class="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <form @submit.prevent="updateProject" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">프로젝트 제목</label>
              <input
                v-model="editingProject.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">프로젝트 설명</label>
              <textarea
                v-model="editingProject.description"
                required
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">프로젝트 상태</label>
              <div class="relative">
                <button
                  type="button"
                  @click="showStatusDropdown = !showStatusDropdown"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>{{ editingProject.status }}</span>
                  <i class="fas fa-chevron-down text-sm"></i>
                </button>
                <div
                  v-if="showStatusDropdown"
                  class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  <button
                    v-for="status in statusOptions"
                    :key="status"
                    type="button"
                    @click="((editingProject.status = status), (showStatusDropdown = false))"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ status }}
                  </button>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4">
              <button
                type="button"
                @click="deleteProject(editingProject.id)"
                class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium cursor-pointer whitespace-nowrap !rounded-button"
              >
                프로젝트 삭제
              </button>
              <div class="flex items-center space-x-4">
                <button
                  type="button"
                  @click="showEditForm = false"
                  class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button"
                >
                  취소
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 font-medium cursor-pointer whitespace-nowrap !rounded-button"
                >
                  수정 완료
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 푸터 -->
    <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner mt-16">
      <div class="container mx-auto px-6 lg:px-20">
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
import { ref, computed } from 'vue'
import TabMenu from '@/components/common/TabMenu.vue'
import CategoryFilter from '@/components/common/CategoryFilter.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'

const tabOptions = [
  { value: 'all', label: '전체' },
  { value: 'liked', label: '좋아요한 프로젝트' },
]
const activeTab = ref('all')
const searchQuery = ref('')
const includeEnded = ref(false)
const selectedSort = ref('latest')
const categoryList = ['전체', '적금형', '대출형', '기부형', '챌린지형']
const selectedCategory = ref('전체')

const showSortDropdown = ref(false)
const showCreateForm = ref(false)
const showEditForm = ref(false)
const showCategoryDropdown = ref(false)
const showStatusDropdown = ref(false)

const sortOptions = {
  latest: '최신순',
  likes: '좋아요순',
}

const categories = ['전체', '적금형', '대출형', '기부형', '챌린지형']

const statusOptions = ['진행중', '완료', '중단']

const newProject = ref({
  title: '',
  category: '',
  description: '',
  targetAmount: '',
  duration: '',
})

const editingProject = ref({
  id: null,
  title: '',
  description: '',
  status: '',
})

const projects = ref([
  {
    id: 1,
    title: '혁신적인 모바일 결제 솔루션 개발',
    description:
      '사용자 친화적인 인터페이스와 강력한 보안 기능을 갖춘 차세대 모바일 결제 플랫폼을 개발하여 금융 서비스의 접근성을 높이고자 합니다.',
    category: '적금형',
    proposer: '김혁신',
    createdAt: '2024-01-15',
    status: '진행중',
    likes: 142,
    isLiked: false,
    image:
      'https://readdy.ai/api/search-image?query=innovative%20mobile%20payment%20solution%20development%20with%20clean%20white%20background%2C%20modern%20fintech%20interface%20design%2C%20secure%20payment%20technology%2C%20professional%20financial%20app%20concept%2C%203D%20depth%20effect&width=360&height=240&seq=fintech1&orientation=landscape',
  },
  {
    id: 2,
    title: '블록체인 기반 투명한 기부 플랫폼',
    description:
      '블록체인 기술을 활용하여 기부금의 투명한 사용처를 추적할 수 있는 혁신적인 기부 플랫폼을 구축하여 신뢰성 있는 기부 문화를 조성하고자 합니다.',
    category: '기부형',
    proposer: '박블록',
    createdAt: '2024-01-20',
    status: '진행중',
    likes: 98,
    isLiked: true,
    image:
      'https://readdy.ai/api/search-image?query=blockchain%20based%20transparent%20donation%20platform%20with%20clean%20white%20background%2C%20cryptocurrency%20charity%20concept%2C%20digital%20transparency%20elements%2C%20modern%20blockchain%20design%2C%203D%20depth%20effect&width=360&height=240&seq=blockchain1&orientation=landscape',
  },
  {
    id: 3,
    title: 'AI 기반 개인 맞춤형 투자 자문 서비스',
    description:
      '인공지능 알고리즘을 활용하여 개인의 투자 성향과 목표에 맞는 최적의 투자 포트폴리오를 제안하는 지능형 투자 자문 서비스를 개발합니다.',
    category: '대출형',
    proposer: '이에이아이',
    createdAt: '2024-01-25',
    status: '진행중',
    likes: 156,
    isLiked: false,
    image:
      'https://readdy.ai/api/search-image?query=AI%20based%20personalized%20investment%20advisory%20service%20with%20clean%20white%20background%2C%20artificial%20intelligence%20finance%20concept%2C%20smart%20investment%20technology%2C%20modern%20AI%20design%2C%203D%20depth%20effect&width=360&height=240&seq=ai1&orientation=landscape',
  },
  {
    id: 4,
    title: '디지털 헬스케어 통합 플랫폼',
    description:
      '개인의 건강 데이터를 통합 관리하고 AI 분석을 통해 맞춤형 건강 관리 솔루션을 제공하는 종합 헬스케어 플랫폼을 구축합니다.',
    category: '챌린지형',
    proposer: '정헬스',
    createdAt: '2024-02-01',
    status: '진행중',
    likes: 203,
    isLiked: true,
    image:
      'https://readdy.ai/api/search-image?query=digital%20healthcare%20integrated%20platform%20with%20clean%20white%20background%2C%20medical%20technology%20interface%2C%20health%20data%20management%2C%20modern%20healthcare%20design%2C%203D%20depth%20effect&width=360&height=240&seq=health1&orientation=landscape',
  },
  {
    id: 5,
    title: '온라인 교육 혁신 프로젝트',
    description:
      'VR/AR 기술을 활용한 몰입형 온라인 교육 플랫폼을 개발하여 교육의 효과성을 높이고 접근성을 개선하는 혁신적인 교육 솔루션을 제공합니다.',
    category: '교육',
    proposer: '최교육',
    createdAt: '2024-02-05',
    status: '진행중',
    likes: 87,
    isLiked: false,
    image:
      'https://readdy.ai/api/search-image?query=online%20education%20innovation%20project%20with%20clean%20white%20background%2C%20VR%20AR%20learning%20technology%2C%20immersive%20education%20platform%2C%20modern%20educational%20design%2C%203D%20depth%20effect&width=360&height=240&seq=edu1&orientation=landscape',
  },
  {
    id: 6,
    title: '친환경 에너지 관리 시스템',
    description:
      '스마트 그리드 기술을 활용하여 가정과 기업의 에너지 사용량을 최적화하고 재생 에너지 활용을 극대화하는 친환경 에너지 관리 솔루션입니다.',
    category: '환경',
    proposer: '강환경',
    createdAt: '2024-02-10',
    status: '완료',
    likes: 134,
    isLiked: true,
    image:
      'https://readdy.ai/api/search-image?query=eco-friendly%20energy%20management%20system%20with%20clean%20white%20background%2C%20smart%20grid%20technology%2C%20renewable%20energy%20optimization%2C%20green%20technology%20design%2C%203D%20depth%20effect&width=360&height=240&seq=env1&orientation=landscape',
  },
  {
    id: 7,
    title: '디지털 아트 NFT 마켓플레이스',
    description:
      '아티스트들이 자신의 작품을 NFT로 발행하고 거래할 수 있는 전문 마켓플레이스를 구축하여 디지털 아트의 새로운 생태계를 조성합니다.',
    category: '문화예술',
    proposer: '윤아트',
    createdAt: '2024-02-15',
    status: '진행중',
    likes: 176,
    isLiked: false,
    image:
      'https://readdy.ai/api/search-image?query=digital%20art%20NFT%20marketplace%20with%20clean%20white%20background%2C%20blockchain%20art%20platform%2C%20creative%20digital%20gallery%2C%20modern%20art%20technology%20design%2C%203D%20depth%20effect&width=360&height=240&seq=art1&orientation=landscape',
  },
  {
    id: 8,
    title: '사회적 약자를 위한 금융 접근성 개선',
    description:
      '신용등급이 낮거나 금융 서비스 접근이 어려운 사회적 약자들을 위한 대안적 금융 서비스 플랫폼을 개발하여 금융 포용성을 높입니다.',
    category: '사회공헌',
    proposer: '임사회',
    createdAt: '2024-02-20',
    status: '진행중',
    likes: 219,
    isLiked: true,
    image:
      'https://readdy.ai/api/search-image?query=financial%20accessibility%20improvement%20for%20social%20minorities%20with%20clean%20white%20background%2C%20inclusive%20finance%20concept%2C%20social%20impact%20technology%2C%20community%20support%20design%2C%203D%20depth%20effect&width=360&height=240&seq=social1&orientation=landscape',
  },
  {
    id: 9,
    title: '스마트 농업 IoT 솔루션',
    description:
      'IoT 센서와 AI 분석을 통해 농작물의 생육 환경을 실시간 모니터링하고 최적화하는 스마트 농업 솔루션으로 농업 생산성을 혁신합니다.',
    category: '스타트업',
    proposer: '조스마트',
    createdAt: '2024-02-25',
    status: '중단',
    likes: 145,
    isLiked: false,
    image:
      'https://readdy.ai/api/search-image?query=smart%20agriculture%20IoT%20solution%20with%20clean%20white%20background%2C%20farming%20technology%20sensors%2C%20agricultural%20innovation%2C%20modern%20farming%20design%2C%203D%20depth%20effect&width=360&height=240&seq=agri1&orientation=landscape',
  },
  {
    id: 10,
    title: '지역 상권 활성화 플랫폼',
    description:
      '지역 소상공인들을 위한 통합 마케팅 및 결제 플랫폼을 구축하여 지역 경제 활성화와 상생 생태계 조성에 기여하는 프로젝트입니다.',
    category: '기타',
    proposer: '한지역',
    createdAt: '2024-03-01',
    status: '진행중',
    likes: 98,
    isLiked: true,
    image:
      'https://readdy.ai/api/search-image?query=local%20business%20district%20revitalization%20platform%20with%20clean%20white%20background%2C%20community%20commerce%20support%2C%20local%20economy%20boost%2C%20neighborhood%20business%20design%2C%203D%20depth%20effect&width=360&height=240&seq=local1&orientation=landscape',
  },
])

const filteredProjects = computed(() => {
  let filtered = projects.value

  // 탭 필터링
  if (activeTab.value === 'liked') {
    filtered = filtered.filter((p) => p.isLiked)
  }

  // 카테고리 필터링 (단일 선택)
  if (selectedCategory.value && selectedCategory.value !== '전체') {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }

  // 마감된 프로젝트 필터링
  if (!includeEnded.value) {
    filtered = filtered.filter((p) => p.status !== '완료' && p.status !== '중단')
  }

  // 검색 필터링
  if (searchQuery.value) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // 정렬
  if (selectedSort.value === 'likes') {
    filtered = filtered.sort((a, b) => b.likes - a.likes)
  } else {
    filtered = filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }

  return filtered
})

const toggleLike = (projectId) => {
  const project = projects.value.find((p) => p.id === projectId)
  if (project) {
    project.isLiked = !project.isLiked
    project.likes += project.isLiked ? 1 : -1
  }
}

const createProject = () => {
  const project = {
    id: Date.now(),
    title: newProject.value.title,
    description: newProject.value.description,
    category: newProject.value.category,
    proposer: '사용자',
    createdAt: new Date().toISOString().split('T')[0],
    status: '진행중',
    likes: 0,
    isLiked: false,
    image:
      'https://readdy.ai/api/search-image?query=new%20project%20proposal%20concept%20with%20clean%20white%20background%2C%20innovative%20business%20idea%2C%20startup%20development%2C%20modern%20project%20design%2C%203D%20depth%20effect&width=360&height=240&seq=new' +
      Date.now() +
      '&orientation=landscape',
  }

  projects.value.unshift(project)
  newProject.value = {
    title: '',
    category: '',
    description: '',
    targetAmount: '',
    duration: '',
  }
  showCreateForm.value = false
  showCategoryDropdown.value = false
}

const editProject = (project) => {
  editingProject.value = {
    id: project.id,
    title: project.title,
    description: project.description,
    status: project.status,
  }
  showEditForm.value = true
}

const updateProject = () => {
  const project = projects.value.find((p) => p.id === editingProject.value.id)
  if (project) {
    project.title = editingProject.value.title
    project.description = editingProject.value.description
    project.status = editingProject.value.status
  }
  showEditForm.value = false
  showStatusDropdown.value = false
}

const deleteProject = (projectId) => {
  const index = projects.value.findIndex((p) => p.id === projectId)
  if (index !== -1) {
    projects.value.splice(index, 1)
  }
  showEditForm.value = false
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
