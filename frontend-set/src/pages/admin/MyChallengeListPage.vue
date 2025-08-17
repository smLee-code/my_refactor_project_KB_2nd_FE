<template>
    <div class="min-h-screen bg-gray-50 p-8">
        <div class="container mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">내 챌린지 상품 관리</h1>

            <div v-if="isLoading" class="text-center py-20">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"
                ></div>
                <p class="mt-4 text-gray-600">데이터를 불러오는 중입니다...</p>
            </div>

            <div v-else-if="error" class="text-center bg-red-50 text-red-700 p-6 rounded-lg">
                <p class="font-bold">오류 발생</p>
                <p>{{ error }}</p>
            </div>

            <div
                v-else-if="myChallenges.length === 0"
                class="text-center py-20 bg-white rounded-xl shadow"
            >
                <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                <p class="text-xl font-medium text-gray-700">생성한 챌린지 상품이 없습니다.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="challenge in myChallenges" :key="challenge.fundId">
                    <router-link
                        :to="`/admin/challenge/${challenge.fundId}/participants`"
                        class="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                    >
                        <div class="w-full h-48 bg-gray-200">
                            <img
                                :src="challenge.productImageUrl || '/images/default-challenge.png'"
                                alt="챌린지 상품 이미지"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="p-5">
                            <h2 class="text-lg font-bold text-gray-900 truncate mb-1">
                                {{ challenge.productName }}
                            </h2>
                            <p class="text-sm text-gray-600 mb-4">
                                {{ challenge.financialInstitution }}
                            </p>

                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>시작일: {{ formatDate(challenge.launchAt) }}</span>
                                <span>종료일: {{ formatDate(challenge.endAt) }}</span>
                            </div>

                            <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                <span
                                    class="text-white bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold"
                                >
                                    참여자 관리하기 <i class="fas fa-arrow-right ml-1"></i>
                                </span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getMyCreatedChallenges } from '@/api/fundApi'

const authStore = useAuthStore()
const myChallenges = ref([])
const isLoading = ref(true)
const error = ref(null)

// 내가 생성한 챌린지 목록 조회 함수
const fetchMyChallenges = async () => {
    try {
        isLoading.value = true
        const response = await getMyCreatedChallenges(authStore.token)
        myChallenges.value = response.data
    } catch (err) {
        console.error('내 챌린지 목록 조회 실패:', err)
        error.value = '챌린지 목록을 가져오는 데 실패했습니다.'
    } finally {
        isLoading.value = false
    }
}

// 날짜 포맷팅 유틸리티 (LocalDateTime 배열 형식 기준)
const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return 'N/A'
    const [year, month, day] = dateArray
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}

// 컴포넌트가 마운트될 때 데이터 조회 실행
onMounted(fetchMyChallenges)
</script>
