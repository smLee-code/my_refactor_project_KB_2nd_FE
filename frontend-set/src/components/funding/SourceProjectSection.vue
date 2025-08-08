<template>
    <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
                <i class="fas fa-project-diagram text-blue-500 text-xl mr-3"></i>
                <h3 class="text-xl font-bold text-gray-900">출처 프로젝트</h3>
            </div>

            <!-- 로딩 상태 -->
            <div v-if="isLoading" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span class="ml-3 text-gray-600">프로젝트 정보를 불러오는 중...</span>
            </div>

            <!-- 프로젝트 정보 -->
            <div v-else-if="projectData" class="space-y-6">
                <div class="flex items-start space-x-6">
                    <div class="w-40 h-28 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                            :src="projectData.thumbnail || '/public/images/logo.png'"
                            :alt="projectData.title + ' 썸네일'"
                            class="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900 mb-3 text-lg">
                            {{ projectData.title }}
                        </h4>
                        <p class="text-sm text-gray-600 mb-4">{{ projectData.organization }}</p>
                        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span
                                v-for="tag in projectData.tags"
                                :key="tag"
                                class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 에러 상태 -->
            <div v-else class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p>{{ errorMessage || '프로젝트 정보를 불러올 수 없습니다.' }}</p>
                <button
                    v-if="errorMessage"
                    @click="fetchProjectDetail"
                    class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    다시 시도
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

// Props 정의
// @param {number} projectId - 프로젝트 ID

const props = defineProps({
    projectId: {
        type: Number,
        required: true,
    },
})

// 상태 관리
const projectData = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

// 프로젝트 정보 조회
const fetchProjectDetail = async () => {
    if (!props.projectId || props.projectId <= 0) {
        isLoading.value = false
        errorMessage.value = '유효하지 않은 프로젝트 ID입니다.'
        return
    }

    try {
        console.log('프로젝트 ID로 상세 정보 요청:', props.projectId)
        const response = await api.get(`/project/list/detail/${props.projectId}/full`)
        const data = response.data

        // API 응답 구조에 맞게 데이터 처리
        if (data && data.basicInfo) {
            projectData.value = {
                title: data.basicInfo.title,
                description: data.basicInfo.promotion,
                organization: data.basicInfo.nickname || '알 수 없음',
                period: data.basicInfo.deadline
                    ? new Date(data.basicInfo.deadline).toLocaleDateString('ko-KR')
                    : '미정',
                stage: data.basicInfo.progress || '진행중',
                tags: [data.basicInfo.projectType, data.basicInfo.progress].filter(Boolean),
                thumbnail:
                    data.imageList && data.imageList.length > 0 ? data.imageList[0].imageUrl : null,
            }
        } else {
            projectData.value = data // 기존 구조 그대로 사용
        }

        console.log('출처 프로젝트 정보:', projectData.value)
    } catch (error) {
        console.error('프로젝트 상세 정보 조회 실패:', error)
        console.error('에러 상세:', error.response?.data)
        projectData.value = null

        // 404 에러인 경우 프로젝트가 존재하지 않는 것
        if (error.response?.status === 404) {
            errorMessage.value = '프로젝트를 찾을 수 없습니다.'
        }
        // 500 에러인 경우 서버 에러
        else if (error.response?.status === 500) {
            errorMessage.value = '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
        }
        // 기타 에러
        else {
            errorMessage.value = '프로젝트 정보를 불러오는 중 오류가 발생했습니다.'
        }
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchProjectDetail()
})
</script>
