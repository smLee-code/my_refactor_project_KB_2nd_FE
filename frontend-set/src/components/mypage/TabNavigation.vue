<template>
    <div class="sticky top-16 bg-gray-50 z-40 pb-4">
        <div class="border-b border-gray-200">
            <nav class="flex space-x-8">
                <button
                    @click="$emit('update:activeTab', 'info')"
                    :class="{
                        'border-b-2 border-yellow-400 text-gray-900 font-bold':
                            activeTab === 'info',
                        'text-gray-600 hover:text-gray-900': activeTab !== 'info',
                    }"
                    class="py-3 px-1 cursor-pointer transition-colors whitespace-nowrap"
                >
                    내 정보
                </button>
                <button
                    @click="$emit('update:activeTab', 'activity')"
                    :class="{
                        'border-b-2 border-yellow-400 text-gray-900 font-bold':
                            activeTab === 'activity',
                        'text-gray-600 hover:text-gray-900': activeTab !== 'activity',
                    }"
                    class="py-3 px-1 cursor-pointer transition-colors whitespace-nowrap"
                >
                    내 활동
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
defineProps({
    activeTab: {
        type: String,
        required: true,
    },
})

defineEmits(['update:activeTab'])
</script>
