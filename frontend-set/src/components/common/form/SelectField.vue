<template>
  <div class="mb-4">
    <label v-if="label" class="block mb-2 text-kb-ui-03 text-body-md"
      >{{ label }}<span v-if="required" class="text-red-500 ml-1">*</span></label
    >
    <select
      :class="[
        'w-full px-4 py-3 border rounded-lg focus:ring-0 text-kb-ui-02 bg-white',
        modelValue ? 'border-kb-ui-03' : 'border-kb-ui-08',
        'focus:border-kb-ui-03',
      ]"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
    >
      <option value="" disabled selected hidden>선택하세요</option>
      <option
        v-for="option in options"
        :key="option.value || option"
        :value="option.value || option"
      >
        {{ option.label || option }}
      </option>
    </select>
    <!-- 오류 메시지 -->
    <p v-if="error" class="text-status-error text-xs mt-1">{{ error }}</p>
  </div>
</template>
<script setup>
// label: 셀렉트 상단에 표시될 라벨 텍스트
// options: 선택지 배열 (문자열 또는 { value, label })
// modelValue: 선택된 값 (v-model)
// required: 필수 선택 여부
// error: 에러 메시지

defineProps({
  label: String,
  options: { type: Array, default: () => [] },
  modelValue: [String, Number],
  required: Boolean,
  error: String,
})
</script>
