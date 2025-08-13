<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        @click.self="$emit('close')"
    >
        <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-900">사용자 상세 정보</h3>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>

            <div v-if="isLoading" class="flex justify-center items-center h-48">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>

            <div v-if="error" class="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                <p>사용자 정보 조회에 실패했습니다.</p>
                <p class="text-sm">{{ error }}</p>
            </div>

            <div v-if="user" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <InfoItem icon="fa-user" label="이름" :value="user.username" />
                    <InfoItem icon="fa-id-card" label="닉네임" :value="user.nickname" />
                    <InfoItem icon="fa-envelope" label="이메일" :value="user.email" />
                    <InfoItem icon="fa-phone" label="전화번호" :value="user.phoneNumber" />
                    <InfoItem icon="fa-user-tag" label="권한" :value="user.role" />
                    <InfoItem
                        icon="fa-calendar-alt"
                        label="가입일"
                        :value="formatDate(user.createAt)"
                    />
                    <InfoItem icon="fa-vote-yea" label="총 투표 수" :value="user.totalVotes" />
                    <InfoItem
                        icon="fa-tasks"
                        label="작성 프로젝트 수"
                        :value="user.totalProjects"
                    />
                </div>
                <div v-if="user.keywords && user.keywords.length > 0">
                    <h4 class="font-semibold text-gray-700 mt-6 mb-2">관심 키워드</h4>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="keyword in user.keywords"
                            :key="keyword"
                            class="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                            {{ keyword }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getUserDetails } from '@/api/adminApi'

const InfoItem = {
    props: ['icon', 'label', 'value'],
    template: `
        <div class="p-3 bg-gray-50 rounded-lg">
            <span class="text-sm text-gray-500 flex items-center mb-1"><i class="fas w-4 mr-2" :class="icon"></i>{{ label }}</span>
            <span class="font-semibold text-gray-900">{{ value }}</span>
        </div>
    `,
}

// @param {boolean} show - 모달 표시 여부
// @param {number} userId - 조회할 사용자 ID
const props = defineProps({
    show: Boolean,
    userId: Number,
    token: String,
})
const emit = defineEmits(['close'])

const user = ref(null)
const isLoading = ref(false)
const error = ref(null)

watch(
    () => props.userId,
    (newUserId) => {
        if (newUserId && props.show) {
            fetchUserDetails(newUserId)
        } else {
            user.value = null
        }
    },
)

const fetchUserDetails = async (id) => {
    isLoading.value = true
    error.value = null
    user.value = null
    try {
        const response = await getUserDetails(id, props.token)
        user.value = response.data
    } catch (err) {
        console.error('사용자 상세 정보 조회 실패:', err)
        error.value = err.response?.data?.message || err.message
    } finally {
        isLoading.value = false
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('ko-KR')
}
</script>
