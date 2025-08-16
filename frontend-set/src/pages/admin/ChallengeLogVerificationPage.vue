<template>
    <div class="min-h-screen bg-gray-50 p-8">
        <div class="container mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">참여자 인증 기록 관리</h1>
            <p class="text-gray-600 mb-8">참여 ID: {{ userChallengeId }}</p>

            <div class="mb-6 border-b border-gray-200">
                <nav class="-mb-px flex space-x-6">
                    <button
                        v-for="tab in tabs"
                        :key="tab.key"
                        @click="changeTab(tab.key)"
                        :class="[
                            activeTab === tab.key
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                        ]"
                    >
                        {{ tab.name }}
                    </button>
                </nav>
            </div>

            <div v-if="isLoading" class="text-center py-20">...로딩 중...</div>
            <div v-else-if="error" class="text-center bg-red-50 text-red-700 p-6 rounded-lg">
                {{ error }}
            </div>
            <div v-else-if="logs.length === 0" class="text-center py-20 bg-white rounded-xl shadow">
                <p class="text-xl font-medium text-gray-700">해당하는 인증 기록이 없습니다.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="log in logs"
                    :key="log.logId"
                    class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                >
                    <img :src="log.imageUrl" alt="인증샷" class="w-full h-56 object-cover" />
                    <div class="p-4 flex-grow flex flex-col">
                        <div class="mb-2">
                            <span class="font-bold text-gray-800">{{ log.logDate }} 인증</span>
                            <span
                                class="ml-2 px-2 py-1 text-xs rounded-full"
                                :class="statusClass(log.verified)"
                                >{{ statusText(log.verified) }}</span
                            >
                        </div>
                        <p class="text-xs text-gray-600 flex-grow mb-4">
                            AI 분석: {{ log.verifiedResult }}
                        </p>

                        <div
                            v-if="log.verified === 'HumanVerify'"
                            class="mt-auto pt-4 border-t border-gray-100 flex gap-2"
                        >
                            <button
                                @click="handleVerification(log.logId, true)"
                                class="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600"
                            >
                                승인
                            </button>
                            <button
                                @click="handleVerification(log.logId, false)"
                                class="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600"
                            >
                                반려
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getParticipantLogs, manuallyApproveLog, manuallyRejectLog } from '@/api/challengeAdminApi'

const route = useRoute()
const authStore = useAuthStore()
const userChallengeId = ref(Number(route.params.userChallengeId))
const logs = ref([])
const isLoading = ref(true)
const error = ref(null)
const activeTab = ref('HumanVerify')

const tabs = [
    { key: 'HumanVerify', name: '수동 검증 필요' },
    { key: 'Verified', name: '검증 완료' },
    { key: 'UnVerified', name: '미검증' },
    { key: 'ALL', name: '전체' },
]

const fetchLogs = async () => {
    isLoading.value = true
    try {
        const response = await getParticipantLogs(
            userChallengeId.value,
            activeTab.value,
            authStore.token,
        )
        logs.value = response.data
    } catch (err) {
        error.value = '인증 기록을 불러오는 데 실패했습니다.'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const changeTab = (status) => {
    activeTab.value = status
    fetchLogs()
}

const handleVerification = async (logId, isApproved) => {
    if (!confirm(`해당 인증을 '${isApproved ? '승인' : '반려'}' 처리하시겠습니까?`)) return

    try {
        const apiCall = isApproved ? manuallyApproveLog : manuallyRejectLog
        await apiCall(logId, authStore.token)

        // UI 즉시 업데이트
        const targetLog = logs.value.find((log) => log.logId === logId)
        if (targetLog) {
            targetLog.verified = isApproved ? 'Verified' : 'UnVerified'
        }
        alert('처리가 완료되었습니다.')
    } catch (err) {
        alert('처리 중 오류가 발생했습니다.')
        console.error(err)
    }
}

const statusText = (status) =>
    ({ HumanVerify: '수동 검증', Verified: '검증 완료', UnVerified: '미검증' })[status] || status
const statusClass = (status) =>
    ({
        HumanVerify: 'bg-orange-100 text-orange-800',
        Verified: 'bg-green-100 text-green-800',
        UnVerified: 'bg-red-100 text-red-800',
    })[status] || 'bg-gray-100'

onMounted(fetchLogs)
</script>
