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
            class="fixed bottom-5 right-5 w-full max-w-xs p-4 rounded-xl shadow-lg text-white"
            :class="type === 'success' ? 'bg-green-500' : 'bg-red-500'"
        >
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i
                        class="fas"
                        :class="type === 'success' ? 'fa-check-circle' : 'fa-times-circle'"
                    ></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">{{ message }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    show: Boolean,
    message: String,
    type: {
        type: String,
        default: 'success',
    },
})
</script>
