<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">내 대출 상품 관리</h1>

            <div v-if="isLoading" class="text-center py-20">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                ></div>
                <p class="mt-4 text-gray-600">데이터를 불러오는 중입니다...</p>
            </div>

            <div v-else-if="error" class="text-center bg-red-50 text-red-700 p-6 rounded-lg">
                <p class="font-bold">오류 발생</p>
                <p>{{ error }}</p>
            </div>

            <div
                v-else-if="myLoans.length === 0"
                class="text-center py-20 bg-white rounded-xl shadow"
            >
                <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                <p class="text-xl font-medium text-gray-700">생성한 대출 상품이 없습니다.</p>
                <p class="text-gray-500 mt-2">새로운 대출 상품을 등록해보세요.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="loan in myLoans" :key="loan.fundId">
                    <router-link
                        :to="`/admin/loan-management/${loan.fundId}`"
                        class="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                    >
                        <div class="w-full h-48 bg-gray-200">
                            <img
                                :src="loan.productImageUrl || '/images/default-loan.png'"
                                alt="대출 상품 이미지"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="p-5">
                            <h2 class="text-lg font-bold text-gray-900 truncate mb-1">
                                {{ loan.productName }}
                            </h2>
                            <p class="text-sm text-gray-600 mb-4">
                                {{ loan.financialInstitution }}
                            </p>

                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>시작일: {{ formatDate(loan.launchAt) }}</span>
                                <span>종료일: {{ formatDate(loan.endAt) }}</span>
                            </div>

                            <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                <span
                                    class="text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold"
                                >
                                    신청자 관리하기 <i class="fas fa-arrow-right ml-1"></i>
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getMyCreatedLoans } from '@/api/fundApi' // 1번에서 만든 API 함수

const router = useRouter()
const authStore = useAuthStore()

const myLoans = ref([])
const isLoading = ref(true)
const error = ref(null)

// 내가 생성한 대출 목록 조회 함수
const fetchMyLoans = async () => {
    try {
        isLoading.value = true
        const response = await getMyCreatedLoans(authStore.token)
        myLoans.value = response.data
    } catch (err) {
        console.error('내 대출 목록 조회 실패:', err)
        error.value = err.response?.data?.message || '대출 목록을 가져오는 데 실패했습니다.'
    } finally {
        isLoading.value = false
    }
}

// 날짜 포맷팅 유틸리티
const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return 'N/A'
    const [year, month, day] = dateArray
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}

// 컴포넌트가 마운트될 때 데이터 조회 실행
onMounted(fetchMyLoans)
</script>
