<template>
  <div class="mb-4">
    <label v-if="label" class="block mb-2 text-kb-ui-03 text-body-md"
      >{{ label }}<span v-if="required" class="text-red-500 ml-1">*</span></label
    >
    <div class="relative">
      <input
        :type="type"
        :class="[
          'w-full px-4 py-3 border rounded-lg focus:ring-0 text-kb-ui-02 placeholder-kb-ui-06',
          modelValue ? 'border-kb-ui-03' : 'border-kb-ui-08',
          'focus:border-kb-ui-03',
        ]"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
      />
      <span
        v-if="rightSlot"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-kb-ui-05 text-sm"
        >{{ rightSlot }}</span
      >
    </div>
    <p v-if="error" class="text-status-error text-xs mt-1">{{ error }}</p>
  </div>
</template>
<script setup>
// label: 입력 필드 상단에 표시될 라벨 텍스트
// placeholder: 입력 필드에 표시될 플레이스홀더
// modelValue: 입력 값 (v-model)
// required: 필수 입력 여부
// type: 입력 타입 (text, number 등)
// error: 에러 메시지
// rightSlot: 입력 필드 우측에 표시할 텍스트/아이콘 등

defineProps({
  label: String,
  placeholder: String,
  modelValue: [String, Number],
  required: Boolean,
  type: { type: String, default: 'text' },
  error: String,
  rightSlot: String,
})
</script>
