<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
        <!-- 프로젝트 진행상황, 타입 -->
        <div class="flex items-center space-x-3 mb-4">
            <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                {{ getProgressLabel(projectData?.basicInfo?.progress) }}
            </span>
            <span class="text-gray-500 text-sm">
                {{ getTypeLabel(projectData?.basicInfo?.projectType) }}
            </span>
        </div>
        <!-- 프로젝트 기본 설명 -->

        <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ projectData?.basicInfo?.title }}
        </h1>
        <p class="text-gray-600 text-lg leading-relaxed mb-6">
            {{ projectData?.basicInfo?.promotion }}
        </p>

        <div class="space-y-6">
            <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">프로젝트 배경</h3>
                <p class="text-gray-600 leading-relaxed">배경 설명</p>
            </div>

            <!-- 타입별 상세 정보 -->
            <div v-if="projectData">
                <component
                    :is="getDetailComponent(projectData.basicInfo.projectType)"
                    :detail="projectData.detailInfo"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

import DetailChallenge from './DetailChallenge.vue'
import DetailDonation from './DetailDonation.vue'
import DetailLoan from './DetailLoan.vue'
import DetailSavings from './DetailSavings.vue'

import { getProjectFullDetail } from '@/api/projectApi'

const props = defineProps(['project'])
const route = useRoute()
const projectId = ref(route.params.id)
const projectData = ref(null)

const getDetailComponent = (type) => {
    switch (type) {
        case 'Savings':
            return DetailSavings
        case 'Loan':
            return DetailLoan
        case 'Challenge':
            return DetailChallenge
        case 'Donation':
            return DetailDonation
        default:
            return null
    }
}

const getProgressLabel = (status) => {
    switch (status) {
        case 'Active':
            return '진행중'
        case 'Closed':
            return '마감'
        default:
            return '알 수 없음'
    }
}

const getTypeLabel = (type) => {
    switch (type) {
        case 'Savings':
            return '저축형'
        case 'Loan':
            return '대출형'
        case 'Challenge':
            return '챌린지형'
        case 'Donation':
            return '기부형'
        default:
            return '기타'
    }
}

const fetchProjectData = async (projectId) => {
    console.log('fetchProjectData 호출!')
    try {
        projectData.value = await getProjectFullDetail(projectId)
    } catch (e) {
        console.error('❌ 프로젝트 정보 불러오기 실패:', e)
    }
}

onMounted(async () => {
    fetchProjectData(projectId.value)
})

watch(
    () => route.params.id, // 여기서 id만 감시
    (newId, oldId) => {
        console.log('watch route.params.id 호출', route.params.id)
        if (newId && newId !== oldId) {
            projectId.value = newId
            fetchProjectData(newId)
        }
    },
)
</script>
