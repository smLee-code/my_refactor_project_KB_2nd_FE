<template>
  <div class="mb-4">
    <label v-if="label" class="block mb-2 text-kb-ui-03 text-body-md"
      >{{ label }}<span v-if="required" class="text-red-500 ml-1">*</span></label
    >
    <input
      type="date"
      :class="[
        'w-full px-4 py-3 border rounded-lg focus:ring-0 text-kb-ui-02',
        modelValue ? 'border-kb-ui-03' : 'border-kb-ui-08',
        'focus:border-kb-ui-03',
      ]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    />
    <p v-if="error" class="text-status-error text-xs mt-1">{{ error }}</p>
  </div>
</template>
<script setup>
// label: 날짜 입력 상단에 표시될 라벨 텍스트
// modelValue: 입력 값 (v-model)
// required: 필수 입력 여부
// error: 에러 메시지

defineProps({
  label: String,
  modelValue: String,
  required: Boolean,
  error: String,
})
</script>
