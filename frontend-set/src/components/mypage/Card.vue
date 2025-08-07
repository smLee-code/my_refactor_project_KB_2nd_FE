<template>
    <div
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer h-100"
    >
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
            <i :class="icon" :style="{ color: iconColor }" class="text-xl"></i>
        </div>
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    icon: String,
    iconColor: String,
})
</script>
