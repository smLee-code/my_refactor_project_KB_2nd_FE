<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">저축형 프로젝트 정보</h3>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                저축 기간 (일) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.periodDays"
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="저축할 기간을 일 단위로 입력하세요"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                이자율 (%) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.interestRate"
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="이자율(%)를 입력하세요"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                성공 조건 <span class="text-red-500">*</span>
            </label>
            <input
                v-model="form.successCondition"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="성공 조건을 입력하세요"
                required
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['update-data'])

const sendValue = () => {
    emit('update-data', '자식에서 보낸 데이터')
}

const form = ref({
    periodDays: 0,
    interestRate: 0.0,
    successCondition: '',
})
</script>
