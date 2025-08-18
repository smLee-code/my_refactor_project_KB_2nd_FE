<template>
    <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="show"
            class="fixed top-5 right-5 w-full max-w-sm rounded-lg shadow-lg pointer-events-auto z-[100]"
            :class="type === 'success' ? 'bg-green-500' : 'bg-red-500'"
        >
            <div class="p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg
                            v-if="type === 'success'"
                            class="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <svg
                            v-else
                            class="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-bold text-white">{{ title }}</p>
                        <p class="mt-1 text-sm text-white">{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
    show: Boolean,
    type: { type: String, default: 'success' },
    title: String,
    message: String,
})

const emit = defineEmits(['close'])

watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            setTimeout(() => {
                emit('close')
            }, 2000) // 2초
        }
    },
)
</script>
