<template>
    <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">참여 중인 펀딩 목록</h2>

        <!-- 참여 중인 펀딩이 없을 때 -->
        <div
            v-if="participatingFundings.length === 0"
            class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        >
            <div class="text-gray-400 mb-4">
                <i class="fas fa-handshake text-4xl"></i>
            </div>
            <p class="text-gray-600 mb-2">아직 참여 중인 펀딩이 없습니다.</p>
            <p class="text-sm text-gray-500 mb-6">진행중인 펀딩에 참여해보세요!</p>
            <button
                @click="goToFundingList"
                class="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors duration-200 font-medium"
            >
                펀딩 살펴보기 →
            </button>
        </div>

        <!-- 참여 중인 펀딩 목록 -->
        <div v-else class="space-y-4">
            <div
                v-for="participation in participatingFundings"
                :key="participation.id"
                class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <h3
                                class="font-bold text-lg text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                                @click="goToFundingDetail(participation.fundId)"
                            >
                                {{ participation.title }}
                            </h3>
                            <div class="flex items-center space-x-2">
                                <!-- 타입별 아이콘 -->
                                <span
                                    :class="getTypeBadgeClass(participation.type)"
                                    class="px-2 py-1 rounded-full text-xs font-medium"
                                >
                                    {{ getTypeLabel(participation.type) }}
                                </span>
                                <!-- 상태 배지 -->
                                <span
                                    :class="getStatusBadgeClass(participation.status)"
                                    class="px-2 py-1 rounded-full text-xs font-medium"
                                >
                                    {{ participation.status }}
                                </span>
                            </div>
                        </div>

                        <div class="flex items-center space-x-6 text-sm text-gray-600">
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-calendar text-gray-400"></i>
                                <span>참여일: {{ participation.joinDate }}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-won-sign text-gray-400"></i>
                                <span
                                    >참여 금액: {{ participation.amount.toLocaleString() }}원</span
                                >
                            </div>
                        </div>

                        <!-- 챌린지 타입인 경우 ChallengeUploadSection 컴포넌트 사용 -->
                        <div v-if="participation.type === 'challenge'" class="mt-4">
                            <ChallengeUploadSection
                                :funding-id="participation.fundId"
                                :certification-data="participation.certificationImages || []"
                                :start-date="participation.startDate || '2024-01-01'"
                                :end-date="participation.endDate || '2024-12-31'"
                                :user-challenge-id="participation.userChallengeId"
                                @imageUploaded="handleCertificationUploaded"
                                @uploadError="handleUploadError"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ChallengeUploadSection from '@/components/funding/ChallengeUploadSection.vue'

const router = useRouter()

// Props 정의
// @param {Array} participatingFundings - 참여 중인 펀딩 목록

const props = defineProps({
    participatingFundings: {
        type: Array,
        default: () => [],
    },
})

// 데이터 디버깅을 위한 watch
import { watch } from 'vue'

watch(
    () => props.participatingFundings,
    (newFundings) => {
        console.log('ParticipatingFundingsSection - 받은 데이터:', newFundings)
        if (newFundings.length > 0) {
            console.log('첫 번째 펀딩 상세 데이터:', newFundings[0])
        }
    },
    { immediate: true },
)

// Emits 정의
// @emits {Array} update:participatingFundings - 참여 펀딩 목록 업데이트 이벤트

const emit = defineEmits(['update:participatingFundings'])

const goToFundingList = () => {
    router.push('/funding')
}

// 타입별 라벨 반환
const getTypeLabel = (type) => {
    const typeMap = {
        saving: '저축',
        loan: '대출',
        donation: '기부',
        challenge: '챌린지',
    }
    return typeMap[type] || type
}

// 타입별 배지 클래스 반환
const getTypeBadgeClass = (type) => {
    const classMap = {
        saving: 'bg-green-100 text-green-800',
        loan: 'bg-blue-100 text-blue-800',
        donation: 'bg-purple-100 text-purple-800',
        challenge: 'bg-yellow-100 text-yellow-800',
    }
    return classMap[type] || 'bg-gray-100 text-gray-800'
}

// 상태별 배지 클래스 반환
const getStatusBadgeClass = (status) => {
    const classMap = {
        진행중: 'bg-blue-100 text-blue-800',
        완료: 'bg-green-100 text-green-800',
        중단: 'bg-red-100 text-red-800',
    }
    return classMap[status] || 'bg-gray-100 text-gray-800'
}

// 펀딩 상세 페이지로 이동
const goToFundingDetail = (fundId) => {
    if (fundId) {
        router.push(`/funding/detail/${fundId}`)
    }
}

// 인증샷 업로드 완료 처리
const handleCertificationUploaded = (data) => {
    // 새로운 인증샷 데이터 추가
    const newCertification = {
        url: data.image,
        isApproved: data.isApproved,
        uploadedAt: data.uploadedAt,
    }

    // 펀딩 목록 업데이트
    const updatedFundings = props.participatingFundings.map((funding) => {
        if (funding.fundId === data.fundingId) {
            const certificationImages = funding.certificationImages || []
            return {
                ...funding,
                certificationImages: [...certificationImages, newCertification],
            }
        }
        return funding
    })

    emit('update:participatingFundings', updatedFundings)
    console.log('인증샷 업로드 완료:', data)
}

// 업로드 에러 처리
const handleUploadError = (errorMessage) => {
    alert(errorMessage)
    console.error('업로드 에러:', errorMessage)
}
</script>

<style scoped>
.rounded-button {
    border-radius: 8px;
}
</style>
