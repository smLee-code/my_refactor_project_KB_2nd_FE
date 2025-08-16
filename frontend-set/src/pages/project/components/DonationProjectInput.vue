<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">기부형 프로젝트 정보</h3>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                기부처 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.recipient"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="목표 금액을 원 단위로 입력하세요"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                사용 계획 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.usagePlan"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="목표 금액을 원 단위로 입력하세요"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                목표 모금액 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="displayAmount"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="목표 금액을 원 단위로 입력하세요"
                @input="handleAmountInput"
                required
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const form = ref({
    recipient: '',
    usagePlan: '',
    targetAmount: 0,
})

const displayAmount = ref('')

const formatNumber = (num) => {
    if (!num) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseNumber = (str) => {
    return parseInt(str.replace(/,/g, '')) || 0
}

const handleAmountInput = (event) => {
    const value = event.target.value
    const numericValue = parseNumber(value)
    form.value.targetAmount = numericValue
    displayAmount.value = formatNumber(numericValue)
}

watch(() => form.value.targetAmount, (newVal) => {
    if (newVal && displayAmount.value !== formatNumber(newVal)) {
        displayAmount.value = formatNumber(newVal)
    }
})

const isFormValid = computed(() => {
    return (
        form.value.recipient.trim() !== '' &&
        form.value.usagePlan.trim() !== '' &&
        form.value.targetAmount > 0
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
