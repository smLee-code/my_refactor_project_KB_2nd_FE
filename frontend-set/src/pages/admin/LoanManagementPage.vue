<template>
    <div class="container mx-auto p-4 md:p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">대출 신청 관리</h1>
        <p class="text-gray-600 mb-8">대출 상품에 대한 사용자 신청 내역을 관리합니다.</p>

        <div class="mb-6 border-b border-gray-200">
            <nav class="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    @click="changeTab(tab.key)"
                    :class="[
                        activeTab === tab.key
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    ]"
                >
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div
                class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
            ></div>
        </div>

        <div v-else-if="error" class="text-center bg-red-50 text-red-700 p-6 rounded-lg">
            <p class="font-bold">데이터를 불러오는데 실패했습니다.</p>
            <p>{{ error }}</p>
        </div>

        <ApplicantList
            v-else
            :applicants="applicants"
            :processing-ids="processingIds"
            @view-details="handleViewDetails"
            @approve="(applicant) => handleAction('approve', applicant)"
            @reject="(applicant) => handleAction('reject', applicant)"
            @pay="(applicant) => handleAction('pay', applicant)"
        />

        <ConfirmationModal
            :show="modal.show"
            :title="modal.title"
            :message="modal.message"
            :confirm-text="modal.confirmText"
            :confirm-type="modal.confirmType"
            @close="closeModal"
            @confirm="executeAction"
        />

        <UserDetailsModal
            :show="userDetailsModal.show"
            :user-id="userDetailsModal.userId"
            :token="authStore.token"
            @close="userDetailsModal.show = false"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getLoanApplicants } from '@/api/adminApi'
import { approveLoan, rejectLoan, processLoanPayment } from '@/api/userLoanApi'
import ApplicantList from '@/components/admin/ApplicantList.vue'
import ConfirmationModal from '@/components/common/ConfirmationModal.vue'
import { useAuthStore } from '@/stores/auth'
import UserDetailsModal from '@/components/common/UserDetailsModal.vue'

const route = useRoute()
const authStore = useAuthStore()
const loanId = ref(Number(route.params.id))
const allApplicants = ref([])
const isLoading = ref(true)
const error = ref(null)
const processingIds = ref(new Set()) // 동시 다발적 요청 제어

const tabs = [
    { key: 'PENDING', name: '승인 대기' },
    { key: 'APPROVED', name: '승인 완료' },
    { key: 'REJECTED', name: '반려' },
    { key: 'ALL', name: '전체' },
]
const activeTab = ref('PENDING')

// 현재 탭에 맞는 데이터만 필터링
const applicants = computed(() => {
    if (activeTab.value === 'ALL') {
        return allApplicants.value
    }
    return allApplicants.value.filter((a) => a.status === activeTab.value)
})
// 데이터 로딩 함수 수정
const fetchApplicants = async () => {
    isLoading.value = true
    error.value = null
    try {
        // [수정] getLoanApplicants 호출 시 authStore.token 전달
        const response = await getLoanApplicants(loanId.value, 'ALL', authStore.token)
        allApplicants.value = response.data.sort(
            (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt),
        )
    } catch (err) {
        console.error('신청자 목록 조회 실패:', err)
        error.value = err.response?.data?.message || '서버 통신 중 오류가 발생했습니다.'
    } finally {
        isLoading.value = false
    }
}

// 탭 변경
const changeTab = (tabKey) => {
    activeTab.value = tabKey
}

onMounted(() => {
    loanId.value = Number(route.params.id)
    if (loanId.value) {
        fetchApplicants()
    } else {
        error.value = '유효한 대출 상품 ID가 없습니다.'
        isLoading.value = false
    }
})

// 모달 관리
const modal = ref({
    show: false,
    title: '',
    message: '',
    confirmText: '',
    confirmType: 'primary',
    action: null,
})
const userDetailsModal = ref({ show: false, userId: null })

const handleViewDetails = (userId) => {
    userDetailsModal.value.userId = userId
    userDetailsModal.value.show = true
}

const handleAction = (type, applicant) => {
    const { userLoanId, username } = applicant
    const actions = {
        approve: {
            title: '대출 승인',
            message: `'${username}'님의 대출 신청을 승인하시겠습니까?`,
            confirmText: '승인',
            confirmType: 'primary',
        },
        reject: {
            title: '대출 반려',
            message: `'${username}'님의 대출 신청을 반려하시겠습니까?`,
            confirmText: '반려',
            confirmType: 'danger',
        },
        pay: {
            title: '대출금 지급',
            message: `'${username}'님에게 대출금을 지급 처리하시겠습니까?`,
            confirmText: '지급',
            confirmType: 'success',
        },
    }

    modal.value = {
        ...actions[type],
        show: true,
        action: () => callApiAction(type, userLoanId),
    }
}

const closeModal = () => {
    modal.value.show = false
}

const executeAction = async () => {
    if (modal.value.action) {
        await modal.value.action()
    }
    closeModal()
}

// API 호출 액션 함수 수정
const callApiAction = async (type, userLoanId) => {
    processingIds.value.add(userLoanId)
    try {
        const apiMap = {
            approve: approveLoan,
            reject: rejectLoan,
            pay: processLoanPayment,
        }
        await apiMap[type](userLoanId, authStore.token)

        // --- [추가] API 성공 후 화면 데이터 즉시 업데이트 ---
        const targetIndex = allApplicants.value.findIndex(
            (applicant) => applicant.userLoanId === userLoanId,
        )

        if (targetIndex !== -1) {
            const newStatusMap = { approve: 'APPROVED', reject: 'REJECTED', pay: 'PAID' }
            allApplicants.value[targetIndex].status = newStatusMap[type]
        }

        // ... (성공 시 데이터 업데이트 로직은 동일)
    } catch (err) {
        console.error(`${type} 처리 실패:`, err)
        alert(`처리 중 오류가 발생했습니다: ${err.response?.data?.message || err.message}`)
    } finally {
        processingIds.value.delete(userLoanId)
    }
}
</script>
