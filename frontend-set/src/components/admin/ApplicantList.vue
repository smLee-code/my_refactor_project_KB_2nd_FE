<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                        신청자
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                        신청 금액
                    </th>
                    <!-- <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                        신청일
                    </th> -->
                    <th
                        scope="col"
                        class="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                        상태
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                        관리
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="applicants.length === 0">
                    <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                        <i class="fas fa-exclamation-circle text-2xl mb-2"></i>
                        <p>해당하는 신청 내역이 없습니다.</p>
                    </td>
                </tr>
                <tr
                    v-for="applicant in applicants"
                    :key="applicant.userLoanId"
                    class="hover:bg-gray-50 transition-colors"
                >
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div
                                class="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                                @click="$emit('view-details', applicant.userId)"
                            >
                                {{ applicant.username }} ({{ applicant.nickname }})
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {{ applicant.loanAmount.toLocaleString() }}원
                    </td>
                    <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {{ formatDate(applicant.appliedAt) }}
                    </td> -->
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <span class="px-3 py-1 rounded-full" :class="statusClass(applicant.status)">
                            {{ statusText(applicant.status) }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div class="flex justify-center items-center space-x-2">
                            <div
                                v-if="isProcessing(applicant.userLoanId)"
                                class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"
                            ></div>
                            <template v-else>
                                <div v-if="applicant.status === 'PENDING'">
                                    <button
                                        @click="$emit('approve', applicant)"
                                        class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
                                    >
                                        승인
                                    </button>
                                    <button
                                        @click="$emit('reject', applicant)"
                                        class="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-xs ml-2"
                                    >
                                        반려
                                    </button>
                                </div>
                                <div v-else-if="applicant.status === 'APPROVED'">
                                    <button
                                        @click="$emit('pay', applicant)"
                                        class="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs"
                                    >
                                        지급
                                    </button>
                                </div>
                                <span v-else class="text-gray-400 text-xs">-</span>
                            </template>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
// @param {Array} applicants - 신청자 목록
// @param {Set} processingIds - 현재 처리 중인 userLoanId Set
const props = defineProps({
    applicants: { type: Array, required: true },
    processingIds: { type: Set, required: true },
})

const emit = defineEmits(['view-details', 'approve', 'reject', 'pay'])

const isProcessing = (id) => props.processingIds.has(id)

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ko-KR')
const statusText = (status) => {
    const map = {
        PENDING: '승인대기',
        APPROVED: '승인완료',
        REJECTED: '반려',
        PAID: '지급완료',
        DONE: '지급완료',
    }
    return map[status] || status
}

const statusClass = (status) => {
    const map = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        APPROVED: 'bg-blue-100 text-blue-800',
        REJECTED: 'bg-red-100 text-red-800',
        PAID: 'bg-green-100 text-green-800',
        DONE: 'bg-green-100 text-green-800',
    }
    return map[status] || 'bg-gray-100 text-gray-800'
}
</script>
