<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        @click.self="$emit('close')"
    >
        <div
            class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all"
        >
            <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4"
                :class="iconBgClass"
            >
                <i class="fas text-2xl text-white" :class="iconClass"></i>
            </div>

            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-2">{{ title }}</h3>

            <div class="text-sm text-gray-500 mb-6">
                <p>{{ message }}</p>
            </div>

            <button
                @click="$emit('close')"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:text-sm"
                :class="buttonClass"
            >
                확인
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    show: Boolean,
    type: { type: String, default: 'success' },
    title: String,
    message: String,
})

defineEmits(['close'])

const isSuccess = computed(() => props.type === 'success')

const iconBgClass = computed(() => (isSuccess.value ? 'bg-green-500' : 'bg-red-500'))
const iconClass = computed(() => (isSuccess.value ? 'fa-check' : 'fa-times'))
const buttonClass = computed(() =>
    isSuccess.value ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700',
)
</script>
