<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        @click.self="close"
    >
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
            <p class="text-gray-600 mb-6">{{ message }}</p>
            <div class="flex justify-end space-x-3">
                <button
                    @click="close"
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                    취소
                </button>
                <button
                    @click="confirm"
                    class="px-4 py-2 text-white rounded-lg"
                    :class="confirmButtonClass"
                >
                    {{ confirmText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// @param {boolean} show - 모달 표시 여부
// @param {string} title - 모달 제목
// @param {string} message - 모달 메시지
// @param {string} confirmText - 확인 버튼 텍스트
// @param {string} confirmType - 확인 버튼 색상 타입 (e.g., 'primary', 'danger')
const props = defineProps({
    show: Boolean,
    title: String,
    message: String,
    confirmText: { type: String, default: '확인' },
    confirmType: { type: String, default: 'primary' },
})

const emit = defineEmits(['close', 'confirm'])

const close = () => emit('close')
const confirm = () => emit('confirm')

const confirmButtonClass = computed(() => {
    return {
        'bg-blue-600 hover:bg-blue-700': props.confirmType === 'primary',
        'bg-red-600 hover:bg-red-700': props.confirmType === 'danger',
        'bg-green-600 hover:bg-green-700': props.confirmType === 'success',
    }
})
</script>
