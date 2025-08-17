<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 헤더 섹션 -->
        <div class="bg-white border-b border-gray-200">
            <div class="max-w-[1200px] mx-auto px-5">
                <div class="flex items-center justify-between py-4">
                    <div class="flex items-center space-x-4">
                        <button class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <i class="fas fa-arrow-left text-gray-600"></i>
                        </button>
                        <h1 class="text-2xl font-bold text-gray-900">챌린지 펀딩 생성</h1>
                    </div>
                </div>
                <!-- 프로그레스 바 -->
                <div class="pb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-blue-600">진행률</span>
                        <span class="text-sm text-gray-500">{{ progressPercentage }}% 완료</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div
                            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            :style="{ width: progressPercentage + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 메인 컨텐츠 -->
        <div class="max-w-[1200px] mx-auto px-5 py-8">
            <form class="space-y-8">
                <!-- 챌린지 프로젝트명 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        챌린지 프로젝트명 <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="formData.name"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="예: 30일 운동 챌린지"
                    />
                </div>

                <!-- 챌린지 기간 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        챌린지 기간 <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="formData.challengePeriodDays"
                            class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="30"
                        />
                        <span
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
                            >일</span
                        >
                    </div>
                </div>

                <!-- 가입 조건 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        가입 조건 <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="formData.joinCondition"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="예: 누구나 참여 가능"
                    />
                </div>

                <!-- 검증 기준 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        검증 기준 <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="formData.verifyStandard"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="예: 영수증 인증 또는 계좌 내역 확인"
                    />
                </div>

                <!-- 날짜 설정 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            챌린지 생성일
                        </label>
                        <input
                            type="text"
                            :value="formData.launchDate"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                            readonly
                            placeholder="자동으로 현재 날짜가 설정됩니다"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            모집 마감일 <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            v-model="formData.endDate"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            챌린지 시작일 <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            v-model="formData.challengeStartDate"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            챌린지 종료일 <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            v-model="formData.challengeEndDate"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>

                <!-- 이미지 업로드 (여러 장) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        이미지 업로드 <span class="text-red-500">*</span>
                    </label>
                    <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
                    >
                        <div v-if="uploadedImages.length === 0" class="space-y-4">
                            <div
                                class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center"
                            >
                                <i class="fas fa-image text-gray-400 text-xl"></i>
                            </div>
                            <div>
                                <p class="text-gray-600 text-sm mb-2">
                                    이미지를 업로드해주세요 (여러 장 선택 가능)
                                </p>
                                <label class="cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        @change="handleFileUpload"
                                        class="hidden"
                                        ref="fileInput"
                                    />
                                    <span
                                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap !rounded-button inline-block"
                                    >
                                        파일 선택
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div v-else>
                            <div class="grid grid-cols-3 gap-4 mb-4">
                                <div
                                    v-for="(image, index) in uploadedImages"
                                    :key="index"
                                    class="relative"
                                >
                                    <img
                                        :src="image.preview"
                                        alt="업로드 이미지"
                                        class="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        @click="removeImage(index)"
                                        class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer text-xs"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <label class="cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    @change="handleFileUpload"
                                    class="hidden"
                                    ref="fileInput"
                                />
                                <span
                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm cursor-pointer whitespace-nowrap !rounded-button inline-block"
                                >
                                    <i class="fas fa-plus mr-2"></i>
                                    이미지 추가
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 상세 설명 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        상세 설명 <span class="text-red-500">*</span>
                    </label>
                    <textarea
                        v-model="formData.detail"
                        rows="8"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                        placeholder="챌린지에 대한 상세한 설명을 입력해주세요. 참여 방법, 인증 규칙, 주의사항 등을 포함하여 작성해 주세요."
                    ></textarea>
                </div>

                <!-- 리워드 설정 -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">리워드 설정</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                리워드 내용 <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                v-model="formData.reward"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="예: 스타벅스 기프티콘"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                리워드 조건 <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                v-model="formData.rewardCondition"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="예: 목표 금액 절약 달성시"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!-- 하단 네비게이션 -->
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div class="max-w-[1200px] mx-auto px-5 py-4">
                <div class="flex items-center justify-between">
                    <button
                        type="button"
                        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium cursor-pointer whitespace-nowrap !rounded-button"
                    >
                        임시저장
                    </button>
                    <button
                        type="button"
                        @click="submitFunding"
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer whitespace-nowrap !rounded-button"
                    >
                        생성하기
                    </button>
                </div>
            </div>
        </div>
        <!-- 하단 네비게이션 공간 확보 -->
        <div class="h-20"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { createChallengeFunding } from '@/api/fundingApi'

const router = useRouter()
const route = useRoute()
const projectId = route.query.projectId

// 챌린지 펀딩 폼 데이터
const formData = ref({
    name: '',
    detail: '',
    thumbnail: null,
    joinCondition: '',
    challengePeriodDays: '',
    reward: '',
    rewardCondition: '',
    verifyStandard: '',
    projectId: projectId || null, // 프로젝트 선택에서 가져옴
    progress: 'Launch',
    launchDate: new Date().toISOString().split('T')[0], // 현재 날짜로 자동 설정
    endDate: '',
    challengeStartDate: '',
    challengeEndDate: '',
    financialInstitution: '우리은행', // 임시값
    keywordIds: [],
})

const uploadedImages = ref([])
const uploadedFiles = ref([])
const fileInput = ref(null)

// 진행률 계산
const progressPercentage = computed(() => {
    let filledFields = 0
    const totalFields = 9 // 챌린지형 필수 필드 수 (생성일 제외)

    // 각 필드 검사
    if (formData.value.name) filledFields++
    if (formData.value.challengePeriodDays) filledFields++
    if (formData.value.endDate) filledFields++
    if (formData.value.challengeStartDate) filledFields++
    if (formData.value.challengeEndDate) filledFields++
    if (uploadedImages.value.length > 0) filledFields++
    if (formData.value.joinCondition) filledFields++
    if (formData.value.detail) filledFields++
    if (formData.value.verifyStandard) filledFields++
    if (formData.value.reward) filledFields++
    if (formData.value.rewardCondition) filledFields++

    return Math.round((filledFields / totalFields) * 100)
})

// 파일 업로드 처리
const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)

    files.forEach((file) => {
        // 파일 크기 제한 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert(`${file.name}은 10MB를 초과합니다.`)
            return
        }

        // 파일 미리보기 생성
        const reader = new FileReader()
        reader.onload = (e) => {
            uploadedImages.value.push({
                preview: e.target.result,
                file: file,
            })
            uploadedFiles.value.push(file)
        }
        reader.readAsDataURL(file)
    })

    // 입력 초기화
    event.target.value = ''
}

// 이미지 제거
const removeImage = (index) => {
    uploadedImages.value.splice(index, 1)
    uploadedFiles.value.splice(index, 1)
}

// 펀딩 생성 API 호출
const submitFunding = async () => {
    try {
        // 유효성 검사
        if (
            !formData.value.name ||
            !formData.value.detail ||
            !formData.value.endDate ||
            !formData.value.challengeStartDate ||
            !formData.value.challengeEndDate ||
            !formData.value.joinCondition ||
            !formData.value.challengePeriodDays ||
            !formData.value.reward ||
            !formData.value.rewardCondition ||
            !formData.value.verifyStandard
        ) {
            alert('필수 항목을 모두 입력해주세요.')
            return
        }

        // FormData 객체 생성 (multipart/form-data로 전송)
        const formDataToSend = new FormData()

        // JSON 데이터 추가
        const jsonData = {
            name: formData.value.name,
            detail: formData.value.detail,
            joinCondition: formData.value.joinCondition,
            challengePeriodDays: parseInt(formData.value.challengePeriodDays),
            reward: formData.value.reward,
            rewardCondition: formData.value.rewardCondition,
            verifyStandard: formData.value.verifyStandard,
            projectId: formData.value.projectId,
            progress: formData.value.progress,
            launchDate: formData.value.launchDate,
            endDate: formData.value.endDate,
            challengeStartDate: formData.value.challengeStartDate,
            challengeEndDate: formData.value.challengeEndDate,
            financialInstitution: '우리은행', // 임시값 고정
            keywordIds: [14, 15],
        }

        // JSON 데이터를 Blob으로 변환하여 FormData에 추가 (UTF-8 인코딩 명시)
        formDataToSend.append(
            'challengeInfo',
            new Blob([JSON.stringify(jsonData)], { type: 'application/json;charset=UTF-8' }),
        )

        // 파일들 추가
        uploadedFiles.value.forEach((file, index) => {
            formDataToSend.append('images', file)
        })

        console.log('전송 데이터 (JSON):', jsonData)
        console.log('업로드 파일 수:', uploadedFiles.value.length)

        const response = await createChallengeFunding(formDataToSend)
        // 생성된 펀딩의 ID를 사용하여 상세 페이지로 이동
        if (response.data && response.data.fundingId) {
            router.push(`/funding/detail/${response.data.fundingId}`)
        } else {
            router.push('/funding') // ID가 없으면 목록 페이지로 이동
        }
    } catch (error) {
        console.error('챌린지 펀딩 생성 실패:', error)
        alert('챌린지 펀딩 프로젝트 생성에 실패했습니다. 다시 시도해주세요.')
    }
}

// 프로젝트 정보 자동 채우기
onMounted(async () => {
    if (projectId) {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/project/list/detail/${projectId}/full`,
            )
            const projectData = response.data

            // 기본 정보 매핑
            if (projectData.basicInfo) {
                formData.value.name = projectData.basicInfo.title || ''
                formData.value.detail = projectData.basicInfo.promotion || ''
            }

            // 챌린지형 특정 정보 매핑
            if (projectData.detailInfo) {
                formData.value.challengePeriodDays =
                    projectData.detailInfo.challengePeriodDays || ''
                formData.value.joinCondition = projectData.detailInfo.joinCondition || ''
                formData.value.verifyStandard = projectData.detailInfo.verifyStandard || ''
                formData.value.reward = projectData.detailInfo.reward || ''
                formData.value.rewardCondition = projectData.detailInfo.rewardCondition || ''
            }
        } catch (error) {
            console.error('프로젝트 정보 조회 실패:', error)
        }
    }
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}
</style>
