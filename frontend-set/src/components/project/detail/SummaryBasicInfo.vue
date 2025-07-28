<template>
  <div v-if="detail" class="bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
    <div class="space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-600">카테고리</span>
        <span class="text-gray-900 font-medium">{{
          getTypeLabel(detail.basicInfo.projectType)
        }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">지역</span>
        <span class="text-gray-900 font-medium">서울</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">진행 상태</span>
        <span class="text-green-600 font-medium">{{
          getProgressLabel(detail.basicInfo.progress)
        }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">좋아요</span>
        <span class="text-gray-900 font-medium">1개</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">조회수</span>
        <span class="text-gray-900 font-medium">1,247회</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const getTypeLabel = (type) => {
  switch (type) {
    case 'Savings':
      return '저축형'
    case 'Loan':
      return '대출형'
    case 'Challenge':
      return '챌린지형'
    case 'Donation':
      return '기부형'
    default:
      return '기타'
  }
}

const getProgressLabel = (status) => {
  switch (status) {
    case 'Active':
      return '진행중'
    case 'Closed':
      return '마감'
    default:
      return '알 수 없음'
  }
}
defineProps({
  detail: Object,
})
</script>
