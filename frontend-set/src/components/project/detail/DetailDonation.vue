<template>
    <div class="space-y-2">
        <h3 class="text-xl font-semibold">기부형 상세 정보</h3>
        <ul class="space-y-1">
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>기부: {{ detail.recipient.toLocaleString() }}원</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>기부금 사용 계획: {{ detail.usagePlan }}</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>목표 모금 금액: {{ detail.targetAmount.toLocaleString() }}원</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    detail: Object,
})
</script>
