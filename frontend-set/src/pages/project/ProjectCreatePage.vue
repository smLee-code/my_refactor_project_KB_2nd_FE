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
                            >
                                <div class="space-y-1 text-center">
                                    <div v-if="imagePreview" class="mb-4">
                                        <img
                                            :src="imagePreview"
                                            alt="Preview"
                                            class="mx-auto h-32 w-auto object-cover rounded-lg"
                                        />
                                        <button
                                            @click="removeImage"
                                            type="button"
                                            class="mt-2 text-sm text-red-600 hover:text-red-700 !rounded-button whitespace-nowrap"
                                        >
                                            이미지 삭제
                                        </button>
                                    </div>
                                    <div v-else class="flex text-sm text-gray-600">
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
                                            />
                                        </label>
                                        <p class="pl-1">또는 드래그 앤 드롭</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
import { ref, computed, watch } from 'vue'
import axios from 'axios'

import SavingsProjectInput from './components/SavingsProjectInput.vue'
import LoanProjectInput from './components/LoanProjectInput.vue'
import DonationProjectInput from './components/DonationProjectInput.vue'
import ChallengeProjectInput from './components/ChallengeProjectInput.vue'

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
    // image: null,
})

const imagePreview = ref(null)

const handleImageUpload = (event) => {
    const target = event.target
    const file = target.files?.[0]
    if (file) {
        if (file.size > 10 * 1024 * 1024) {
            alert('File size should not exceed 10MB')
            return
        }
        form.value.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target?.result
        }
        reader.readAsDataURL(file)
    }
}

const removeImage = () => {
    form.value.image = null
    imagePreview.value = null
    const fileInput = document.getElementById('file-upload')
    if (fileInput) {
        fileInput.value = ''
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

    getChildForm()
    totalForm.value = { ...form.value, ...childForm.value }
    console.log('totalForm: ', totalForm.value)

    isLoading.value = true
    try {
        const response = await axios.post('/api/project', totalForm.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log('서버 응답: ', response.data)

        // Reset form
        form.value = {
            userId: userId.value,
            title: '',
            promotion: '',
            projectType: '',
            deadline: '',
            // image: null,
        }
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
