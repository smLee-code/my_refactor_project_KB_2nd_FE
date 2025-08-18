<template>
    <div class="min-h-screen bg-gray-50 p-8">
        <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">챌린지 참여자 관리</h1>
            <p class="text-gray-600 mb-8"></p>

            <div v-if="isLoading" class="text-center py-20">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                ></div>
            </div>
            <div v-else-if="error" class="text-center bg-red-50 text-red-700 p-6 rounded-lg">
                {{ error }}
            </div>
            <div
                v-else-if="participants.length === 0"
                class="text-center py-20 bg-white rounded-xl shadow"
            >
                <p class="text-xl font-medium text-gray-700">아직 참여자가 없습니다.</p>
            </div>

            <div v-else class="bg-white rounded-xl shadow overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
                            >
                                참여자
                            </th>
                            <th
                                class="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase"
                            >
                                성공/실패
                            </th>
                            <!-- <th
                                class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
                            >
                                참여일
                            </th> -->
                            <th
                                class="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase"
                            >
                                인증 관리
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr
                            v-for="p in participants"
                            :key="p.userChallengeId"
                            class="hover:bg-gray-50"
                        >
                            <td class="px-6 py-4">
                                <div class="font-medium text-gray-900">
                                    {{ p.username }} ({{ p.nickname }})
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span class="text-green-600 font-semibold"
                                    >{{ p.currentCount }}회</span
                                >
                                /
                                <span class="text-red-600 font-semibold">{{ p.failCount }}회</span>
                            </td>
                            <!-- <td class="px-6 py-4 text-sm text-gray-600">
                                {{ formatDate(p.joinAt) }}
                            </td> -->
                            <td class="px-6 py-4 text-center">
                                <router-link
                                    :to="`/admin/challenge/logs/${p.userChallengeId}`"
                                    class="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    기록 보기
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getChallengeParticipants } from '@/api/challengeAdminApi'

const route = useRoute()
const authStore = useAuthStore()
const fundId = ref(Number(route.params.fundId))
const participants = ref([])
const isLoading = ref(true)
const error = ref(null)

const fetchParticipants = async () => {
    try {
        const response = await getChallengeParticipants(fundId.value, authStore.token)
        participants.value = response.data
    } catch (err) {
        error.value = '참여자 목록을 불러오는 데 실패했습니다.'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const formatDate = (dateArray) => {
    if (!dateArray) return 'N/A'
    return new Date(dateArray).toLocaleDateString('ko-KR')
}

onMounted(fetchParticipants)
</script>
