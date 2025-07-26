<template>
  <div class="space-y-2">
    <h3 class="text-xl font-semibold">저축형 상세 정보</h3>
    <p><strong>이자율:</strong> {{ detail.detailInfo.interestRate }}%</p>
    <p><strong>예치 기간:</strong> {{ detail.detailInfo.periodDays }}일</p>
    <p><strong>성공 조건:</strong> {{ detail.detailInfo.successCondition }}</p>
  </div>
</template>

<script setup>
defineProps({
  detail: Object,
})
</script>
