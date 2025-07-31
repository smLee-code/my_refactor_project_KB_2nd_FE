<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">챌린지형 프로젝트 정보</h3>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                챌린지 기간 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.challengePeriodDays"
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="예: 매일 1만원씩 저금하기"
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
                placeholder="예: 매일 1만원씩 저금하기"
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
                placeholder="예: 매일 1만원씩 저금하기"
                required
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const form = ref({
    challengePeriodDays: 0,
    reward: '',
    rewardCondition: '',
})

const isFormValid = computed(() => {
    return (
        form.value.challengePeriodDays > 0 &&
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
