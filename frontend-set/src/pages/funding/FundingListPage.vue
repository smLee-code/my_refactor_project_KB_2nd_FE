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
                        :id="urgent.id"
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
                    v-for="funding in displayedFundingList"
                    :key="funding.fundId"
                    :id="funding.fundId"
                    :fundType="funding.fundType"
                    :image="funding.thumbnailImage?.imageUrl || '/default.jpg'"
                    :title="funding.name"
                    :description="funding.financialInstitution || '금융기관 정보 없음'"
                    :daysLeft="getDaysLeft(funding.endAt)"
                    :category="funding.fundType"
                    :likes="funding.retryVotesCount || 0"
                    :progress="funding.progress"
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
import FundingUrgentCard from '@/components/funding/FundingUrgentCard.vue'
import FundingCard from '@/components/funding/FundingCard.vue'
import TabMenu from '@/components/common/TabMenu.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import CategoryFilter from '@/components/common/CategoryFilter.vue'
import Pagination from '@/components/common/Pagination.vue'
import { onMounted } from 'vue'
import axios from 'axios'

const fundingList = ref([])
const launchFunds = ref([])
const endFunds = ref([])
const likedFunds = ref([])

const filteredByTab = computed(() => {
    if (activeTab.value === 'ongoing') return launchFunds.value
    if (activeTab.value === 'ended') return endFunds.value
    if (activeTab.value === 'liked') return likedFunds.value
    return []
})

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

const categories = ref(['전체', '저축형', '대출형', '기부형', '챌린지형'])
const fundTypeMap = {
    Savings: '저축형',
    Loan: '대출형',
    Donation: '기부형',
    Challenge: '챌린지형',
}

const urgentFundings = computed(() => {
    return [...launchFunds.value]
        .filter((fund) => new Date(fund.endAt) > new Date()) // 오늘 이후
        .sort((a, b) => {
            const dateDiff = new Date(a.endAt) - new Date(b.endAt)

            // 마감일이 같으면 2차 정렬 기준 적용
            if (dateDiff === 0) {
                // 1. 진행률이 높은 순 (목표 달성에 가까운 것 우선)
                const progressDiff = (b.progress || 0) - (a.progress || 0)
                if (progressDiff !== 0) return progressDiff

                // 2. 참여자(투표수)가 많은 순 (인기 있는 것 우선)
                const votesDiff = (b.retryVotesCount || 0) - (a.retryVotesCount || 0)
                if (votesDiff !== 0) return votesDiff

                // 3. 펀딩 ID 순서 (먼저 등록된 것 우선)
                return a.fundId - b.fundId
            }

            return dateDiff
        }) // 마감 빠른 순 + 2차 정렬
        .slice(0, 2) // 상위 2개만
        .map((fund) => ({
            id: fund.fundId, // fundId로 변경
            image: fund.thumbnailImage?.imageUrl || '/default.jpg',
            title: fund.name,
            timeLeft: getDaysLeft(fund.endAt),
            participants: fund.retryVotesCount || 0,
            progress: fund.progress,
        }))
})

const displayedFundingList = computed(() => {
    let filtered = [...filteredByTab.value]

    // 카테고리 필터링
    if (selectedCategory.value !== '전체') {
        filtered = filtered.filter((item) => {
            const typeLabel = fundTypeMap[item.fundType] || item.category
            return typeLabel === selectedCategory.value
        })
    }

    // 검색 필터링
    if (searchQuery.value.trim()) {
        const keyword = searchQuery.value.toLowerCase()
        filtered = filtered.filter((item) => {
            return item.name?.toLowerCase().includes(keyword)
        })
    }

    // 정렬
    if (selectedSort.value === 'latest') {
        filtered.sort((a, b) => new Date(b.launchAt) - new Date(a.launchAt))
    } else if (selectedSort.value === 'popular') {
        filtered.sort((a, b) => (b.retryVotesCount || 0) - (a.retryVotesCount || 0))
    } else if (selectedSort.value === 'deadline') {
        filtered.sort((a, b) => new Date(a.endAt) - new Date(b.endAt))
    }

    return filtered
})

function handleSearch() {
    currentPage.value = 1
}

const getDaysLeft = (endAt) => {
    const end = new Date(endAt)
    const today = new Date()
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
    return diff >= 0 ? diff : 0
}

onMounted(async () => {
    try {
        const [launchRes, endRes] = await Promise.all([
            axios.get('/fund/list', { params: { progress: 'Launch' } }),
            axios.get('/fund/list', { params: { progress: 'End' } }),
        ])

        launchFunds.value = launchRes.data
        endFunds.value = endRes.data

        // 임시 likedFunds (ex: 투표 수 10 이상만)
        likedFunds.value = [...launchRes.data, ...endRes.data].filter(
            (item) => item.retryVotesCount > 10,
        )

        console.log('진행중 펀딩:', launchFunds.value)
        console.log('종료된 펀딩:', endFunds.value)
        console.log('좋아요한 펀딩:', likedFunds.value)
    } catch (err) {
        console.error(`❌ 펀딩 목록 실패:`, err)
    }
})
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
