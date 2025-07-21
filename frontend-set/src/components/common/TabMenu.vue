<template>
  <div class="relative border-b border-gray-200 overflow-x-auto">
    <div class="flex space-x-8 h-12 relative">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="$emit('update:modelValue', tab.key)"
        :class="[
          'pb-4 transition-colors whitespace-nowrap text-base',
          modelValue === tab.key
            ? 'border-b-2 border-kb-yellow font-bold text-kb-ui-02'
            : 'text-kb-ui-05',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: Array,
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>
