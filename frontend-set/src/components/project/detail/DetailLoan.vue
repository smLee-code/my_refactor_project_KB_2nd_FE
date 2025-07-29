<template>
  <div class="space-y-2">
    <h3 class="text-xl font-semibold">저축형 상세 정보</h3>
    <ul class="space-y-1">
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>대출 한도: {{ detail.loanLimit.toLocaleString() }}원</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>희망 금리: {{ detail.desiredInterstRate }}일</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>참여자 보상: {{ detail.reward }}</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>보상 조건: {{ detail.rewardCondition }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  detail: Object,
})
</script>
