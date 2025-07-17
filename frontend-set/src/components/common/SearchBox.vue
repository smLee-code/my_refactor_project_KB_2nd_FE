<template>
  <div class="relative w-80">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('search')"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-kb-ui-08 rounded-lg focus:outline-none text-sm text-kb-ui-02 placeholder-kb-ui-06"
    />
    <button
      type="button"
      @click="$emit('search')"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-kb-ui-06 hover:text-kb-ui-04 cursor-pointer"
    >
      <FontAwesomeIcon :icon="faSearch" class="text-sm" />
    </button>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: '검색어를 입력해주세요',
  },
})

defineEmits(['update:modelValue', 'search'])
</script>
