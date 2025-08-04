<template>
    <div class="space-y-2">
        <h3 class="text-xl font-semibold">챌린지형 상세 정보</h3>
        <ul class="space-y-1">
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>챌린지 참여 기간: {{ detail.challengePeriodDays }}일</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>성공 보상: {{ detail.reward }}일</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>성공 조건: {{ detail.rewardCondition }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    detail: Object,
})
</script>
