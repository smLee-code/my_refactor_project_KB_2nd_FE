<template>
    <div class="flex flex-wrap gap-2 mb-6">
        <button
            v-for="category in categories"
            :key="category"
            @click="$emit('update:modelValue', category)"
            :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
                modelValue === category
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
        >
            {{ category }}
        </button>
    </div>
</template>
<script setup>
// categories: 카테고리 목록 배열
// modelValue: 현재 선택된 카테고리 (v-model)
defineProps({
    categories: { type: Array, default: () => [] },
    modelValue: String,
})
</script>
