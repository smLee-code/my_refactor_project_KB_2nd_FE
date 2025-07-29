<template>
  <!-- 공유 버튼 -->
  <div class="relative">
    <button
      @click="toggleShare"
      class="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
    >
      <i class="fas fa-share-alt text-gray-700"></i>
    </button>

    <!-- 공유 박스 -->
    <div
      v-if="showShare"
      ref="shareBoxRef"
      class="absolute top-12 right-0 bg-white p-4 rounded-lg shadow-xl w-72 z-50"
      @click.stop
    >
      <p class="text-sm font-semibold text-gray-800 mb-2">공유 링크</p>
      <div class="flex items-center space-x-2">
        <input
          type="text"
          :value="currentUrl"
          readonly
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          @click="copyToClipboard"
          class="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          복사
        </button>
      </div>
      <p v-if="copySuccess" class="text-xs text-green-500 mt-1">링크가 복사되었습니다!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'

// 공유 박스
const showShare = ref(false)
const copySuccess = ref(false)

// 공유 박스 토글
const toggleShare = async () => {
  showShare.value = !showShare.value
  copySuccess.value = false

  if (showShare.value) {
    await nextTick() // DOM 렌더링 보장
    document.addEventListener('click', handleClickOutside, true)
  }
}

const currentUrl = window.location.href

//클립보드에 링크 복사
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl)
    copySuccess.value = true
  } catch (err) {
    alert('복사에 실패했습니다.')
  }
}

// 👇 공유 박스 영역 참조용
const shareBoxRef = ref(null)

const handleClickOutside = (event) => {
  if (shareBoxRef.value && !shareBoxRef.value.contains(event.target)) {
    showShare.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true)
})
</script>
