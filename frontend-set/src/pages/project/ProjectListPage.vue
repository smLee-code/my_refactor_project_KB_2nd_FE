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
                    v-for="project in paginatedProjects"
                    :key="project.id"
                    :project="project"
                    @toggle-like="toggleLike"
                    @click="goToDetail(project)"
                />
            </div>

            <Pagination v-model="currentPage" :totalPages="totalPages" />

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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SearchBox from '@/components/common/SearchBox.vue'

// 컴포넌트 import
import TabMenu from '@/components/common/TabMenu.vue'
import CategoryFilter from '@/components/common/CategoryFilter.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import ProjectCard from '@/components/project/list/ProjectCard.vue'
import Footer from '@/components/layout/Footer.vue'
import Pagination from '@/components/common/Pagination.vue'

// style import
import '@/assets/styles/projectList.css'
import { useAuthStore } from '@/stores/auth'

const currentPage = ref(1)
const itemsPerPage = 9 // 한 페이지당 카드 수 (3열 * 3행 기준, 필요시 조정)
const totalPages = computed(() => {
    const count = filteredProjects.value.length
    return Math.max(1, Math.ceil(count / itemsPerPage))
})

const authStore = useAuthStore()
authStore.loadToken()

const projects = ref([])
const router = useRouter()

/* ---------- 라우터 ---------- */
const goToCreatePage = () => {
    router.push(`/project/create`)
}

const goToDetail = (project) => {
    router.push({
        path: `project/detail/${project.id}`,
        state: { project },
    })
}

/* ---------- 탭/필터/정렬 상태 ---------- */
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

const categoryMap = {
    Savings: '저축형',
    Loan: '대출형',
    Challenge: '챌린지형',
    Donation: '기부형',
}

const categoriesFromProjects = computed(() => {
    const base = ['전체']
    const uniqueTypes = [...new Set(projects.value.map((p) => p.type))]
    const translated = uniqueTypes.map((type) => categoryMap[type] || type)
    return base.concat(translated)
})

/* ---------- 헬퍼들 ---------- */
// 날짜 배열([yyyy, M, d, hh, mm, ss]) → Date
const toDate = (v) => {
    if (!v) return null
    if (v instanceof Date) return v
    if (Array.isArray(v)) {
        const [y, m, d, hh = 0, mm = 0, ss = 0] = v
        return new Date(y, (m ?? 1) - 1, d ?? 1, hh, mm, ss)
    }
    return new Date(v)
}

// 화면용 날짜 포맷(배열/Date 둘 다 지원)
const formatDate = (val) => {
    const dt = toDate(val)
    if (!dt || isNaN(dt)) return ''
    const y = dt.getFullYear()
    const m = String(dt.getMonth() + 1).padStart(2, '0')
    const d = String(dt.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

// 이미지 우선순위: thumbnailImage > images(Project) > images[0] > 기본값
const pickImageUrl = (item) => {
    if (item.thumbnailImage) return item.thumbnailImage
    if (Array.isArray(item.images) && item.images.length > 0) {
        const projectImg = item.images.find((img) => img.imageType === 'Project')
        return (projectImg?.imageUrl || item.images[0]?.imageUrl) ?? '/default-thumbnail.png'
    }
    return '/default-thumbnail.png'
}

/* ---------- 파생 데이터 ---------- */
const filteredProjects = computed(() => {
    let filtered = projects.value.slice()

    // 탭 필터링
    if (activeTab.value === 'liked') {
        filtered = filtered.filter((p) => p.isLiked)
    }

    // 카테고리 필터링
    if (selectedCategory.value && selectedCategory.value !== '전체') {
        filtered = filtered.filter(
            (p) => (categoryMap[p.type] || p.type) === selectedCategory.value,
        )
    }

    // 마감된 프로젝트 제외
    if (!includeEnded.value) {
        filtered = filtered.filter((p) => p.status !== '완료' && p.status !== '중단')
    }

    // 검색
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q),
        )
    }

    // 정렬
    if (selectedSort.value === 'likes') {
        filtered.sort((a, b) => b.likes - a.likes)
    } else {
        // 최신순: createdAt(Date) 기준
        filtered.sort((a, b) => (b.createdAt?.getTime?.() || 0) - (a.createdAt?.getTime?.() || 0))
    }

    return filtered
})

// 현재 페이지 슬라이스
const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProjects.value.slice(start, start + itemsPerPage)
})

/* ---------- 페이지 보정 ---------- */
// 필터/검색/정렬/탭 변경 시 1페이지로 리셋
watch([activeTab, searchQuery, selectedCategory, selectedSort], () => {
    currentPage.value = 1
})

// 전체 개수가 줄어들어 현재 페이지가 초과하면 마지막 페이지로 보정
watch([filteredProjects, totalPages], () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
    }
})

/* ---------- 좋아요 토글 ---------- */
const toggleLike = async (projectId) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return

    const token = authStore.loadToken()
    if (!token) {
        console.warn('❗ 토큰 없음, 로그인 필요')
        return
    }

    try {
        await axios.post(`/votes/${projectId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (project.isLiked) project.likes--
        else project.likes++
        project.isLiked = !project.isLiked
    } catch (err) {
        console.error('❌ 좋아요 토글 실패:', err)
    }
}

/* ---------- 데이터 로딩 ---------- */
onMounted(async () => {
    try {
        const res = await axios.get('/project/list', {
            headers: {
                Authorization: `Bearer ${authStore.loadToken()}`,
            },
        }) // DB에서 받아온 응답

        projects.value = res.data.map((item) => {
            const createdAt = toDate(item.createAt)
            const deadline = toDate(item.deadline)

            return {
                id: item.projectId,
                title: item.title,
                // Date 객체 그대로 보관
                createdAt,
                deadline,

                // 표시용 텍스트(필요 시 카드 컴포넌트에서 사용)
                createdAtText: formatDate(createdAt),
                deadlineText: formatDate(deadline),

                proposerId: item.userId,
                proposer: `작성자 ${item.userId}`,

                type: item.projectType || '기타',
                image: pickImageUrl(item),
                description: item.promotion || '설명이 없습니다.',

                likes: item.likes ?? 0,
                isLiked: item.isLiked,

                status:
                    item.progress === 'Active'
                        ? '진행중'
                        : item.progress === 'Close'
                          ? '마감'
                          : '알수없음',
            }
        })

        console.log('⏹️res data: ', res.data)
        console.log('⏹️projects value: ', projects.value)
    } catch (err) {
        console.error('❌ 프로젝트 불러오기 실패:', err)
    }
})

/* ---------- 이벤트 핸들러(검색 박스용) ---------- */
const handleSearch = () => {
    // SearchBox에서 엔터/버튼 클릭 시 호출되는 훅 (필요 시 추가 동작)
}
</script>

<style scoped>
/* .!rounded-button {
    border-radius: 8px;
} */

@media (max-width: 768px) {
    .grid-cols-2 {
        grid-template-columns: 1fr;
    }
}
</style>
