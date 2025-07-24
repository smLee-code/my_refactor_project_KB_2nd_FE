<template>
  <div class="mb-4">
    <label v-if="props.label" class="block mb-2 text-kb-ui-03 text-body-md">{{
      props.label
    }}</label>
    <div
      class="flex flex-col items-center justify-center border-2 border-dashed border-kb-ui-08 rounded-lg p-6 bg-white"
    >
      <div v-if="preview" class="mb-4">
        <img :src="preview" alt="Preview" class="mx-auto h-32 w-auto object-cover rounded-lg" />
        <button
          @click="removeImage"
          type="button"
          class="mt-2 text-sm text-red-600 hover:text-red-700 !rounded-button whitespace-nowrap"
        >
          이미지 삭제
        </button>
      </div>
      <div v-else class="flex flex-col items-center">
        <label for="file-upload" class="cursor-pointer text-blue-600 hover:text-blue-500">
          <span>이미지 업로드</span>
          <input
            id="file-upload"
            type="file"
            class="sr-only focus:ring-0 focus:border-kb-ui-08"
            accept="image/*"
            @change="handleImageUpload"
          />
        </label>
        <p class="text-xs text-kb-ui-05 mt-2">
          PNG, JPG, GIF up to {{ props.maxSize / 1024 / 1024 }}MB
        </p>
      </div>
      <p v-if="props.error" class="text-status-error text-xs mt-2">{{ props.error }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
// label: 업로더 상단에 표시될 라벨 텍스트
// modelValue: 업로드된 파일 객체 (v-model)
// maxSize: 허용 최대 파일 크기 (byte)
// error: 에러 메시지

const props = defineProps({
  label: String,
  modelValue: File,
  maxSize: { type: Number, default: 10 * 1024 * 1024 },
  error: String,
})

const emit = defineEmits(['update:modelValue'])
const preview = ref(null)

watch(
  () => props.modelValue,
  (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        preview.value = e.target.result
      }
      reader.readAsDataURL(file)
    } else {
      preview.value = null
    }
  },
  { immediate: true },
)

function handleImageUpload(e) {
  const file = e.target.files?.[0]
  if (file) {
    if (file.size > props.maxSize) {
      alert('파일 크기는 ' + props.maxSize / 1024 / 1024 + 'MB를 초과할 수 없습니다.')
      return
    }
    emit('update:modelValue', file)
  }
}
function removeImage() {
  emit('update:modelValue', null)
}
</script>
