<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50 w-full">
        <div class="container mx-auto px-4 sm:px-6 lg:px-32 py-8">
            <!-- 마감 임박 펀딩 섹션 -->
            <section class="mb-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 drop-shadow-sm">마감 임박 펀딩</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <FundingUrgentCard
                        v-for="urgent in urgentFundings"
                        :key="urgent.id"
                        :image="urgent.image"
                        :title="urgent.title"
                        :timeLeft="urgent.timeLeft"
                        :participants="urgent.participants"
                        :progress="urgent.progress"
                    />
                </div>
            </section>
            <!-- 탭 메뉴 -->
            <TabMenu :tabs="tabOptions" v-model="activeTab" />
            <!-- 검색/정렬/카테고리 필터 -->
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
                <CategoryFilter :categories="categories" v-model="selectedCategory" />
            </div>
            <!-- 펀딩 카드 그리드 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
                <FundingCard
                    v-for="project in displayedProjects"
                    :key="project.id"
                    :image="project.image"
                    :title="project.title"
                    :description="project.description"
                    :daysLeft="project.daysLeft"
                    :category="project.category"
                    :likes="project.likes"
                    :progress="project.progress"
                    :link="getProjectLink(project)"
                    @click="goToProject(project)"
                />
            </div>
            <!-- 페이지네이션 -->
            <Pagination v-model="currentPage" :totalPages="totalPages" />
        </div>
        <!-- 푸터 -->
        <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner mt-16">
            <div class="container mx-auto px-4 sm:px-6 lg:px-32">
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
import { useRouter } from 'vue-router'
import FundingUrgentCard from '@/components/funding/FundingUrgentCard.vue'
import FundingCard from '@/components/funding/FundingCard.vue'
import TabMenu from '@/components/common/TabMenu.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import CategoryFilter from '@/components/common/CategoryFilter.vue'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()

const tabOptions = [
    { value: 'ongoing', label: '진행중인 펀딩' },
    { value: 'ended', label: '종료된 펀딩' },
    { value: 'liked', label: '좋아요한 펀딩' },
]
const activeTab = ref('ongoing')
const selectedCategory = ref('전체')
const currentPage = ref(1)
const totalPages = ref(5)
const searchQuery = ref('')
const selectedSort = ref('latest')

const sortOptions = {
    latest: '최신순',
    popular: '인기순',
    deadline: '마감임박순',
}

const categories = ref(['전체', '적금형', '대출형', '기부형', '챌린지형'])

// 마감 임박 펀딩 mock data
const urgentFundings = ref([
    {
        id: 1,
        image: 'https://readdy.ai/api/search-image?query=urgent%20funding%20deadline%20project%20with%20clean%20white%20background%2C%20time-sensitive%20investment%20opportunity%2C%20red%20warning%20elements%2C%20professional%20financial%20design%2C%203D%20depth%20effect&width=150&height=150&seq=urgent1&orientation=squarish',
        title: '다양한 위험 관리 펀딩 1',
        timeLeft: '12시간 남음',
        participants: 75,
        progress: 90,
    },
    {
        id: 2,
        image: 'https://readdy.ai/api/search-image?query=last%20chance%20crowdfunding%20project%20with%20clean%20white%20background%2C%20urgent%20investment%20deadline%2C%20red%20accent%20colors%2C%20modern%20financial%20platform%20design%2C%203D%20depth%20effect&width=150&height=150&seq=urgent2&orientation=squarish',
        title: '다양한 위험 관리 펀딩 2',
        timeLeft: '6시간 남음',
        participants: 85,
        progress: 80,
    },
])

const ongoingProjects = ref([
    {
        id: 1,
        title: 'Project A',
        description: 'Environment Sustainability Initiative',
        daysLeft: 15,
        likes: 142,
        progress: 75,
        participants: 89,
        category: '적금형',
        image: 'https://readdy.ai/api/search-image?query=environmental%20sustainability%20project%20with%20clean%20white%20background%2C%20green%20technology%20innovation%2C%20modern%20eco-friendly%20design%2C%20professional%20investment%20concept%2C%203D%20depth%20effect&width=300&height=240&seq=proj1&orientation=landscape',
        link: '#',
    },
    {
        id: 2,
        title: 'Project B',
        description: 'Local Art Fund Raising',
        daysLeft: 8,
        likes: 98,
        progress: 60,
        participants: 67,
        category: '기부형',
        image: 'https://readdy.ai/api/search-image?query=local%20art%20community%20funding%20project%20with%20clean%20white%20background%2C%20creative%20arts%20initiative%2C%20colorful%20artistic%20elements%2C%20modern%20cultural%20design%2C%203D%20depth%20effect&width=300&height=240&seq=proj2&orientation=landscape',
        link: '#',
    },
])
const endedProjects = ref([
    {
        id: 16,
        title: 'Completed Project A',
        description: 'Successfully Funded Initiative',
        daysLeft: 0,
        likes: 245,
        progress: 100,
        participants: 189,
        category: '적금형',
        image: 'https://readdy.ai/api/search-image?query=successfully%20completed%20funding%20project%20with%20clean%20white%20background%2C%20achievement%20celebration%20concept%2C%20success%20elements%2C%20professional%20completion%20design%2C%203D%20depth%20effect&width=300&height=240&seq=completed1&orientation=landscape',
        link: '#',
    },
])
const likedProjects = ref([
    {
        id: 18,
        title: 'Liked Project A',
        description: 'Sustainable Energy Initiative',
        daysLeft: 25,
        likes: 320,
        progress: 75,
        participants: 245,
        category: '적금형',
        image: 'https://readdy.ai/api/search-image?query=sustainable%20energy%20project%20with%20clean%20white%20background%2C%20renewable%20power%20initiative%2C%20green%20technology%20elements%2C%20professional%20environmental%20design%2C%203D%20depth%20effect&width=300&height=240&seq=liked1&orientation=landscape',
        link: '#',
    },
])

const currentProjects = computed(() => {
    if (activeTab.value === 'ongoing') return ongoingProjects.value
    if (activeTab.value === 'ended') return endedProjects.value
    return likedProjects.value
})

const displayedProjects = computed(() => {
    // 검색, 카테고리, 정렬 등 필터링 로직 추가 가능
    let filtered = currentProjects.value
    if (selectedCategory.value !== '전체') {
        filtered = filtered.filter((p) => p.category === selectedCategory.value)
    }
    if (searchQuery.value) {
        filtered = filtered.filter(
            (p) => p.title.includes(searchQuery.value) || p.description.includes(searchQuery.value),
        )
    }
    // 정렬 예시
    if (selectedSort.value === 'popular') {
        filtered = [...filtered].sort((a, b) => b.likes - a.likes)
    } else if (selectedSort.value === 'deadline') {
        filtered = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft)
    }
    // 페이지네이션
    const startIndex = (currentPage.value - 1) * 10
    return filtered.slice(startIndex, startIndex + 10)
})

function handleSearch() {
    currentPage.value = 1
}

// 프로젝트 타입에 따른 링크 생성
function getProjectLink(project) {
    if (project.category === '챌린지형' || project.category === '기부형') {
        return `/funding/join-payment/${project.id}`
    } else {
        return `/funding/join-apply/${project.id}`
    }
}

// 프로젝트 클릭 시 라우팅
function goToProject(project) {
    if (project.category === '챌린지형' || project.category === '기부형') {
        router.push(`/funding/join-payment/${project.id}`)
    } else {
        router.push(`/funding/join-apply/${project.id}`)
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

@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>
