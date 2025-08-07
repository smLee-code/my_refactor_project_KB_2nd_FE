<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Main Content -->
        <main class="min-h-screen">
            <div class="max-w-[1200px] mx-auto px-5">
                <!-- Header -->
                <header class="py-8 border-b border-gray-200">
                    <div class="flex items-center">
                        <button
                            @click="handleBackClick"
                            class="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            <i class="fas fa-arrow-left text-lg"></i>
                        </button>
                        <h1 class="text-3xl font-bold text-gray-800">새 프로젝트 만들기</h1>
                    </div>
                </header>
                <!-- Form Section -->
                <section class="py-8 pb-40">
                    <form @submit.prevent="createProject" class="space-y-8">
                        <!-- Project Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                프로젝트명 <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.title"
                                type="text"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="프로젝트명을 입력하세요"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                프로젝트 타입 <span class="text-red-500">*</span>
                            </label>
                            <select
                                v-model="form.projectType"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option
                                    v-for="category in projectTypeInfos"
                                    :value="category.value"
                                >
                                    {{ category.label }}
                                </option>
                            </select>
                        </div>

                        <div v-if="form.projectType">
                            <component
                                :is="selectedCategory.component"
                                :form="form"
                                ref="childRef"
                                @update:is-form-valid="isChildFormValid = $event"
                            ></component>
                        </div>

                        <!-- Project Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                프로젝트 설명 <span class="text-red-500">*</span>
                            </label>
                            <textarea
                                v-model="form.promotion"
                                rows="4"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                                placeholder="프로젝트에 대한 설명을 입력하세요"
                                required
                            ></textarea>
                        </div>
                        <!-- Project Image -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                프로젝트 이미지 <span class="text-red-500">*</span>
                            </label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
                                @drop="handleDrop"
                                @dragover.prevent
                                @dragenter.prevent
                            >
                                <div class="space-y-1 text-center">
                                    <!-- 이미지 미리보기 영역 -->
                                    <div v-if="imagePreviews.length > 0" class="mb-4">
                                        <div
                                            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4"
                                        >
                                            <div
                                                v-for="(preview, index) in imagePreviews"
                                                :key="index"
                                                class="relative group"
                                            >
                                                <img
                                                    :src="preview"
                                                    alt="Preview"
                                                    class="w-full h-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    @click="removeImage(index)"
                                                    type="button"
                                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                        <p class="text-sm text-gray-600">
                                            업로드된 이미지: {{ imagePreviews.length }}개
                                        </p>
                                    </div>

                                    <!-- 이미지 업로드 영역 -->
                                    <div
                                        v-if="imagePreviews.length < 5"
                                        class="flex text-sm text-gray-600"
                                    >
                                        <label
                                            for="file-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                        >
                                            <span>이미지 업로드</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                class="sr-only"
                                                accept="image/*"
                                                @change="handleImageUpload"
                                                multiple
                                            />
                                        </label>
                                        <p class="pl-1">또는 드래그 앤 드롭</p>
                                    </div>

                                    <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB (최대 5개)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                프로젝트 마감일 <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.deadline"
                                type="date"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <div v-for="ck in categoryAndKeywords">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    :key="ck.category.id"
                                >
                                    {{ ck.category.name }}
                                </label>
                                <div class="w-2/5 flex flex-wrap justify-between gap-2 mb-6">
                                    <button
                                        v-for="keyword in ck.keywords"
                                        :key="keyword.id"
                                        @click="toggleKeywordSelection(keyword.id)"
                                        :class="[
                                            'px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
                                            isKeywordSelected(keyword.id)
                                                ? 'bg-yellow-400 text-gray-900'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                                        ]"
                                        type="button"
                                    >
                                        {{ keyword.name }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
                <!-- Bottom Buttons -->
                <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
                    <div class="max-w-[1200px] mx-auto px-5">
                        <div class="flex justify-between">
                            <button
                                @click="handleCancelClick"
                                type="button"
                                class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                취소
                            </button>
                            <button
                                @click="createProject"
                                type="submit"
                                :disabled="!isFormValid || isLoading"
                                :class="[
                                    'px-6 py-3 font-medium rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap',
                                    isFormValid && !isLoading
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                                ]"
                            >
                                <span v-if="isLoading">
                                    <i class="fas fa-spinner fa-spin mr-2"></i>
                                    생성 중...
                                </span>
                                <span v-else>프로젝트 생성</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- Warning Modal -->
        <div
            v-if="showWarningModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex items-center mb-4">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-xl mr-3"></i>
                    <h3 class="text-lg font-semibold text-gray-800">확인 필요</h3>
                </div>
                <p class="text-gray-600 mb-6">
                    입력하신 내용이 저장되지 않습니다.<br />
                    정말 나가시겠습니까?
                </p>
                <div class="flex justify-end space-x-3">
                    <button
                        @click="showWarningModal = false"
                        class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                        계속 작성
                    </button>
                    <button
                        @click="confirmCancel"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                        나가기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

import SavingsProjectInput from './components/SavingsProjectInput.vue'
import LoanProjectInput from './components/LoanProjectInput.vue'
import DonationProjectInput from './components/DonationProjectInput.vue'
import ChallengeProjectInput from './components/ChallengeProjectInput.vue'

const categoryAndKeywords = ref([])
// const categoryAndKeywords = ref([
//     {
//         category: { id: 1, name: '라이프스타일' },
//         keywords: [
//             { id: 8, name: '운동' },
//             { id: 9, name: '식습관' },
//             { id: 10, name: '수면' },
//             { id: 11, name: '루틴 설정' },
//             { id: 12, name: '청소' },
//         ],
//     },
//     {
//         category: { id: 2, name: '자기계발' },
//         keywords: [
//             { id: 13, name: '독서' },
//             { id: 14, name: '학습' },
//             { id: 15, name: '글쓰기' },
//             { id: 16, name: '취미 활동' },
//             { id: 17, name: '명상' },
//         ],
//     },
//     {
//         category: { id: 3, name: '환경' },
//         keywords: [
//             { id: 18, name: '환경 보호' },
//             { id: 19, name: '동물 보호' },
//             { id: 20, name: '봉사' },
//             { id: 21, name: '기후' },
//         ],
//     },
//     {
//         category: { id: 4, name: '경제습관' },
//         keywords: [
//             { id: 22, name: '저축' },
//             { id: 23, name: '소비 절약' },
//             { id: 24, name: '투자 학습' },
//         ],
//     },
//     {
//         category: { id: 5, name: '웰빙' },
//         keywords: [
//             { id: 25, name: '마음 건강' },
//             { id: 26, name: '건강관리' },
//             { id: 27, name: '디지털 디톡스' },
//         ],
//     },
// ])

const selectedKeywordIds = ref([])

const userId = ref(1)

const childRef = ref(null)

const childForm = ref({})
const isChildFormValid = ref(false)

const totalForm = ref({})

const form = ref({
    userId: userId.value,
    title: '',
    promotion: '',
    projectType: '',
    deadline: '',
    keywordIds: [],
    images: [], // 이미지 배열로 변경
})

const imagePreviews = ref([])

const handleImageUpload = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
        // 최대 5개 이미지 제한 확인
        if (form.value.images.length + files.length > 5) {
            alert('이미지는 최대 5개까지 업로드할 수 있습니다.')
            return
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            // 이미지 파일인지 확인
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드할 수 있습니다.')
                continue
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('10MB를 초과할 수 없습니다.')
                continue
            }

            // 이미지 파일을 form에 추가
            form.value.images.push(file)

            // 미리보기 생성
            const reader = new FileReader()
            reader.onload = (e) => {
                imagePreviews.value.push(e.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }
}

const handleDrop = (event) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
        // 최대 5개 이미지 제한 확인
        if (form.value.images.length + files.length > 5) {
            alert('이미지는 최대 5개까지 업로드할 수 있습니다.')
            return
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            // 이미지 파일인지 확인
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드할 수 있습니다.')
                continue
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('File size should not exceed 10MB')
                continue
            }

            // 이미지 파일을 form에 추가
            form.value.images.push(file)

            // 미리보기 생성
            const reader = new FileReader()
            reader.onload = (e) => {
                imagePreviews.value.push(e.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }
}

const removeImage = (index) => {
    imagePreviews.value.splice(index, 1)
    form.value.images.splice(index, 1) // form에서도 제거
    const fileInput = document.getElementById('file-upload')
    if (fileInput) {
        fileInput.value = '' // 선택한 파일 제거
    }
}

const showWarningModal = ref(false)
const isLoading = ref(false)

const projectTypeInfos = [
    {
        value: '',
        label: '프로젝트 타입을 선택하세요',
        description: '',
        icon: '',
        component: null,
    },
    {
        value: 'Savings',
        label: '저축형',
        description: '목표 금액을 설정하여 저축하는 프로젝트',
        icon: 'fas fa-piggy-bank text-green-600',
        component: SavingsProjectInput,
    },
    {
        value: 'Loan',
        label: '대출형',
        description: '대출 상환 계획을 관리하는 프로젝트',
        icon: 'fas fa-hand-holding-usd text-orange-600',
        component: LoanProjectInput,
    },
    {
        value: 'Donation',
        label: '기부형',
        description: '기부 목표를 설정하고 관리하는 프로젝트',
        icon: 'fas fa-heart text-red-600',
        component: DonationProjectInput,
    },
    {
        value: 'Challenge',
        label: '챌린지형',
        description: '금융 관련 도전 과제를 수행하는 프로젝트',
        icon: 'fas fa-trophy text-yellow-600',
        component: ChallengeProjectInput,
    },
]

const selectedCategory = computed(() => {
    return projectTypeInfos.find((category) => category.value === form.value.projectType)
})

const isFormValid = computed(() => {
    return (
        form.value.title.trim() !== '' &&
        form.value.promotion.trim() !== '' &&
        form.value.projectType !== '' &&
        form.value.deadline !== '' &&
        // form.value.image !== null &&
        isChildFormValid.value
    )
})

const hasFormData = computed(() => {
    return (
        form.value.title.trim() !== '' ||
        form.value.promotion.trim() !== '' ||
        form.value.projectType !== '' ||
        form.value.deadline !== '' // ||
        // form.value.image !== null
    )
})

watch(selectedCategory, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        console.log(`프로젝트 타입 변경: ${oldVal} -> ${newVal}. 자식 폼 데이터를 초기화합니다.`)
        childForm.value = {}
        isChildFormValid.value = false
    }
})

const fetchCategories = async () => {
    try {
        const response = await axios.get('/category/all')
        categoryAndKeywords.value = response.data

        console.log('모든 카테고리 및 키워드 목록: ', categoryAndKeywords.value)
    } catch (err) {
        console.error('프로젝트 생성 실패:', err)
    }
}

const handleBackClick = () => {
    if (hasFormData.value) {
        showWarningModal.value = true
    } else {
        // Navigate back
        window.history.back()
    }
}

const handleCancelClick = () => {
    if (hasFormData.value) {
        showWarningModal.value = true
    } else {
        // Navigate back
        window.history.back()
    }
}

const confirmCancel = () => {
    showWarningModal.value = false
    // Navigate back
    window.history.back()
}

const createProject = async () => {
    if (!isFormValid.value) return

    form.value.keywordIds = selectedKeywordIds.value

    getChildForm()
    totalForm.value = { ...form.value, ...childForm.value }
    console.log('totalForm: ', totalForm.value)

    isLoading.value = true
    try {
        // FormData 생성
        const formData = new FormData()

        // 기본 프로젝트 정보 추가
        formData.append('userId', totalForm.value.userId)
        formData.append('title', totalForm.value.title)
        formData.append('promotion', totalForm.value.promotion)
        formData.append('projectType', totalForm.value.projectType)
        formData.append('deadline', totalForm.value.deadline)
        formData.append('keywordIds', JSON.stringify(totalForm.value.keywordIds))

        // 자식 폼 데이터 추가 (펀딩 타입별 정보)
        Object.keys(childForm.value).forEach((key) => {
            formData.append(key, childForm.value[key])
        })

        // 이미지 파일들 추가
        if (form.value.images && form.value.images.length > 0) {
            form.value.images.forEach((image, index) => {
                formData.append(`images`, image)
            })
        }

        // FormData 내용을 콘솔에 출력
        console.log('=== FormData 내용임다 확인 부탁스딱스===')
        console.log('userId:', totalForm.value.userId)
        console.log('title:', totalForm.value.title)
        console.log('promotion:', totalForm.value.promotion)
        console.log('projectType:', totalForm.value.projectType)
        console.log('deadline:', totalForm.value.deadline)
        console.log('keywordIds:', totalForm.value.keywordIds)
        console.log('childForm:', childForm.value)
        console.log('이미지 개수:', form.value.images.length)
        form.value.images.forEach((image, index) => {
            console.log(`이미지 ${index + 1}:`, {
                name: image.name,
                size: image.size,
                type: image.type,
            })
        })

        const response = await axios.post('/project', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // FormData용 헤더
            },
        })

        console.log('서버 응답: ', response.data)

        // 폼 초기화
        form.value = {
            userId: userId.value,
            title: '',
            promotion: '',
            projectType: '',
            deadline: '',
            keywordIds: [],
            images: [],
        }

        selectedKeywordIds.value = []
        imagePreviews.value = [] // 이미지 미리보기 초기화
    } catch (error) {
        console.error('프로젝트 생성 실패:', error)
    } finally {
        isLoading.value = false
    }
}

const getChildForm = () => {
    const data = childRef.value?.getFormData()

    console.log(data)

    if (data) {
        childForm.value = { ...data }
    }
}

const isKeywordSelected = (keywordId) => {
    return selectedKeywordIds.value.includes(keywordId)
}

const toggleKeywordSelection = (keywordId) => {
    if (isKeywordSelected(keywordId)) {
        console.log(keywordId, '선택 해제')
        selectedKeywordIds.value = selectedKeywordIds.value.filter((id) => id !== keywordId)
    } else {
        console.log('배열 길이 : ', selectedKeywordIds.value.length)
        if (selectedKeywordIds.value.length == 3) {
            console.log('키워드는 3개까지 선택 가능')
            return
        }
        console.log(keywordId, '선택')
        selectedKeywordIds.value.push(keywordId)
    }

    console.log('선택된 키워드 : ', selectedKeywordIds.value)
}

onMounted(() => {
    fetchCategories()
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}

input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}

@media (max-width: 768px) {
    .grid-cols-2 {
        grid-template-columns: 1fr;
    }
}
</style>
