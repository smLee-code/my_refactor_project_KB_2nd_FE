<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-white w-full">
        <!-- 메인 콘텐츠 영역 -->
        <div class="container mx-auto px-6 lg:px-20 py-8">
            <!-- Tab 메뉴 -->
            <TabMenu :tabs="tabOptions" v-model="activeTab" />

            <!-- 검색 / 정렬 / 카테고리 -->
            <div class="mb-8">
                <div
                    class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0"
                >
                    <SearchBox
                        v-model="searchQuery"
                        placeholder="검색어를 입력하세요"
                        @search="handleSearch"
                    />
                    <SortSelect :options="sortOptions" v-model="selectedSort" />
                </div>
                <CategoryFilter :categories="categoriesFromProjects" v-model="selectedCategory" />
            </div>

            <!-- 프로젝트 카드 그리드 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <ProjectCard
                    v-for="project in filteredProjects"
                    :key="project.id"
                    :project="project"
                    @toggle-like="toggleLike"
                    @click="goToDetail(project)"
                />
            </div>
            <!-- 새 프로젝트 등록 버튼 -->
            <div class="fixed bottom-8 right-8">
                <button
                    @click="goToCreatePage"
                    class="bg-yellow-400 text-gray-900 w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all transform hover:-translate-y-1 cursor-pointer"
                >
                    <i class="fas fa-plus text-xl"></i>
                </button>
            </div>
        </div>
        <!-- 푸터 -->
        <Footer></Footer>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SearchBox from '@/components/common/SearchBox.vue'

//컴포넌트 import
import TabMenu from '@/components/common/TabMenu.vue'
import CategoryFilter from '@/components/common/CategoryFilter.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import ProjectCard from '@/components/project/list/ProjectCard.vue'
import Footer from '@/components/layout/Footer.vue'

//style import
import '@/assets/styles/projectList.css'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.loadToken()

const projects = ref([])
const router = useRouter()
const userId = ref(1)

//라우터
const goToCreatePage = () => {
    router.push(`/project/create`) // 원하는 페이지 경로
}

const goToDetail = (project) => {
    router.push({
        path: `project/detail/${project.id}`,
        state: {
            project,
        },
    })
}

const tabOptions = [
    { value: 'all', label: '전체' },
    { value: 'liked', label: '좋아요한 프로젝트' },
]
const activeTab = ref('all')
const searchQuery = ref('')
const includeEnded = ref(false)
const selectedSort = ref('latest')
const selectedCategory = ref('전체')

const sortOptions = {
    latest: '최신순',
    likes: '좋아요순',
}

const categoriesFromProjects = computed(() => {
    const base = ['전체']
    const uniqueTypes = [...new Set(projects.value.map((p) => p.type))]
    // 한글 변환 + 중복 제거
    const translated = uniqueTypes.map((type) => categoryMap[type] || type)
    return base.concat(translated)
})

const categoryMap = {
    Savings: '적금형',
    Loan: '대출형',
    Challenge: '챌린지형',
    Donation: '기부형',
}

const categories = ['전체', '적금형', '대출형', '기부형', '챌린지형']

const statusOptions = ['진행중', '완료', '중단']

const filteredProjects = computed(() => {
    let filtered = projects.value

    // 탭 필터링
    if (activeTab.value === 'liked') {
        filtered = filtered.filter((p) => p.isLiked)
    }

    // 카테고리 필터링 (단일 선택)
    if (selectedCategory.value && selectedCategory.value !== '전체') {
        filtered = filtered.filter((p) => categoryMap[p.type] === selectedCategory.value)
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

const toggleLike = async (projectId) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return

    const token = authStore.token
    console.log('👍 좋아요 요청 보낼 데이터:', {
        userId: userId.value,
        projectId: projectId,
    })

    if (!token) {
        console.warn('❗ 토큰 없음, 로그인 필요')
        return
    }

    try {
        if (project.isLiked) {
            await axios.post(
                '/votes',
                { userId: userId.value, projectId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- 헤더에 JWT 토큰 추가
                    },
                },
            )
            project.likes--
        } else {
            await axios.post(
                '/votes',
                { userId: userId.value, projectId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- 헤더에 JWT 토큰 추가
                    },
                },
            )
            project.likes++
        }
        project.isLiked = !project.isLiked
    } catch (err) {
        console.error('❌ 좋아요 토글 실패:', err)
        console.log(token)
    }
}

onMounted(async () => {
    console.log('토큰 상태:', {
        token: authStore.token,
        tokenValue: authStore.token.value,
        isLoggedIn: authStore.isLoggedIn,
    })
    try {
        const res = await axios.get('/project/list', {
            // headers: {
            //     Authorization: `Bearer ${authStore.token}`,
            // },
        }) // DB에서 받아온 응답
        projects.value = res.data.map((item) => ({
            id: item.projectId,
            title: item.title,
            deadline: item.deadline,
            createAt: item.createAt,
            proposer: item.userId,
            type: item.projectType || '기타',
            image: item.imageUrl || '/default-thumbnail.png', // <- S3ImageVO 객체로 변경
            description: item.promotion || '설명이 없습니다.',
            proposer: `작성자 ${item.userId}`,
            createdAt: formatDate(item.createAt),
            likes: item.likes || 0,
            isLiked: item.isLiked || false,
            status:
                item.progress === 'Active'
                    ? '진행중'
                    : item.progress === 'Close'
                      ? '마감'
                      : '알수없음',
        }))
        console.log('api 호출: ', res.data)
        console.log(
            'status:',
            projects.value.map((p) => p.status),
        )
    } catch (err) {
        console.error('❌ 프로젝트 불러오기 실패:', err)
    }
})

const formatDate = (arr) => {
    if (!arr) return ''
    const [y, m, d] = arr
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

const getStatus = (deadlineArr) => {
    if (!deadlineArr) return '진행중'
    const deadline = new Date(...deadlineArr)
    return deadline > new Date() ? '진행중' : '완료'
}
</script>
