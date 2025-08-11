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
                placeholder="예: 30"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                가입 조건 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.joinCondition"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="예: 누구나 참여 가능"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                검증 기준 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.verifyStandard"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="예: 영수증 인증 또는 계좌 내역 확인"
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
                placeholder="예: 스타벅스 기프티콘"
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
                placeholder="예: 목표 금액 절약 달성시"
                required
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const form = ref({
    challengePeriodDays: 0,
    joinCondition: '',
    verifyStandard: '',
    reward: '',
    rewardCondition: '',
})

const isFormValid = computed(() => {
    return (
        form.value.challengePeriodDays > 0 &&
        form.value.joinCondition.trim() !== '' &&
        form.value.verifyStandard.trim() !== '' &&
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
