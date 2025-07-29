<template>
  <div class="mb-4">
    <label v-if="label" class="block mb-2 text-kb-ui-03 text-body-md"
      >{{ label }}<span v-if="required" class="text-red-500 ml-1">*</span></label
    >
    <textarea
      :class="[
        'w-full px-4 py-3 border rounded-lg focus:ring-0 text-kb-ui-02 placeholder-kb-ui-06 resize-none',
        modelValue ? 'border-kb-ui-03' : 'border-kb-ui-08',
        'focus:border-kb-ui-03',
      ]"
      :placeholder="placeholder"
      :rows="rows"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    ></textarea>
    <p v-if="error" class="text-status-error text-xs mt-1">{{ error }}</p>
  </div>
</template>
<script setup>
// label: 텍스트에어리어 상단에 표시될 라벨 텍스트
// placeholder: 텍스트에어리어에 표시될 플레이스홀더
// modelValue: 입력 값 (v-model)
// required: 필수 입력 여부
// rows: 표시할 줄 수
// error: 에러 메시지

defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  required: Boolean,
  rows: { type: Number, default: 4 },
  error: String,
})
</script>
