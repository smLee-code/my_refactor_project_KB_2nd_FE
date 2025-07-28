<template>
  <div class="space-y-2">
    <h3 class="text-xl font-semibold">저축형 상세 정보</h3>
    <ul class="space-y-1">
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>이자율: {{ detail.interestRate }}%</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>예치 기간: {{ detail.periodDays }}일</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <span>성공 조건: {{ detail.successCondition }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  detail: Object,
})
</script>
