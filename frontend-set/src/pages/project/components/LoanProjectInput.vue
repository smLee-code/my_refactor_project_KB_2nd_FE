<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">대출형 프로젝트 정보</h3>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                대출 한도 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="displayLoanLimit"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="대출 한도를 입력하세요"
                @input="handleLoanLimitInput"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                희망 이자율 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.desiredInterestRate"
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="희망 이자율을 입력하세요"
                required
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                리워드 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.reward"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="리워드를 입력하세요"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                리워드 조건 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.rewardCondition"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="리워드 조건을 입력하세요"
                required
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const form = ref({
    loanLimit: 0,
    desiredInterestRate: 0.0,
    reward: '',
    rewardCondition: '',
})

const displayLoanLimit = ref('')

const formatNumber = (num) => {
    if (!num) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseNumber = (str) => {
    return parseInt(str.replace(/,/g, '')) || 0
}

const handleLoanLimitInput = (event) => {
    const value = event.target.value
    const numericValue = parseNumber(value)
    form.value.loanLimit = numericValue
    displayLoanLimit.value = formatNumber(numericValue)
}

watch(() => form.value.loanLimit, (newVal) => {
    if (newVal && displayLoanLimit.value !== formatNumber(newVal)) {
        displayLoanLimit.value = formatNumber(newVal)
    }
})

const isFormValid = computed(() => {
    return (
        form.value.loanLimit > 0 &&
        form.value.desiredInterestRate > 0.0 &&
        form.value.reward.trim() !== '' &&
        form.value.rewardCondition.trim() !== ''
    )
})

watch(isFormValid, (newVal) => {
    emit('update:is-form-valid', newVal)
})

const emit = defineEmits(['update:is-form-valid'])

const getFormData = () => {
    return { ...form.value }
}

defineExpose({ getFormData })
</script>
